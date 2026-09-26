const state={energy:null,time:null,meals:[],candidates:[],current:null,rotation:0,spinning:false,history:[]};
const effortLimit={fine:3,tired:2,done:1};
const energyLabel={fine:"I'm fine",tired:"Pretty tired",done:"Completely done"};
const colors=["#f1cfaa","#dce9d8","#dce6f2","#eadff2","#f2dce2","#f3e5b8","#d9ece7","#ead8c8"];
const $=id=>document.getElementById(id);
const energyBtns=[...document.querySelectorAll("[data-energy]")];
const timeBtns=[...document.querySelectorAll("[data-time]")];

async function loadMeals(){
  try{
    const r=await fetch("./meals.json");
    if(!r.ok) throw new Error(r.status);
    state.meals=await r.json();
    updateCandidates();
  }catch(e){
    $("status").textContent="Couldn't load meals.json. Make sure this is running through GitHub Pages.";
  }
}
function selectEnergy(v){state.energy=v;energyBtns.forEach(b=>b.classList.toggle("selected",b.dataset.energy===v));$("message").textContent="";updateCandidates()}
function selectTime(v){state.time=v;timeBtns.forEach(b=>b.classList.toggle("selected",b.dataset.time===v));$("message").textContent="";updateCandidates()}
function updateCandidates(){
  if(!state.meals.length||!state.energy||!state.time){
    $("spin").disabled=true;$("matchSummary").textContent="Choose your energy and time first.";$("status").textContent="Pick two answers to unlock the wheel.";renderWheel([]);return;
  }
  const maxE=effortLimit[state.energy];
  state.candidates=state.meals.filter(m=>{
    const effortOK=m.effort<=maxE;
    const timeOK=state.time==="30plus"?m.time>=21:m.time<=Number(state.time);
    return effortOK&&timeOK;
  });
  $("spin").disabled=!state.candidates.length;
  const t=state.time==="30plus"?"30+ minutes":`${state.time} minutes`;
  $("matchSummary").textContent=`${state.candidates.length} meals fit “${energyLabel[state.energy]}” with ${t} available.`;
  $("status").textContent=state.candidates.length?"The wheel now contains only suitable meals.":"No match yet. Try another combination.";
  renderWheel(state.candidates);
}
function visibleMeals(items,max=8){
  if(items.length<=max)return [...items];
  const a=[];const step=items.length/max;
  for(let i=0;i<max;i++)a.push(items[Math.floor(i*step)]);
  return a;
}
function renderWheel(items){
  const v=visibleMeals(items);$("labels").innerHTML="";
  if(!v.length){$("wheel").style.background="conic-gradient(#ebe6de 0 360deg)";$("hubText").textContent="Ready?";return}
  const slice=360/v.length;
  $("wheel").style.background=`conic-gradient(${v.map((m,i)=>`${colors[i%colors.length]} ${i*slice}deg ${(i+1)*slice}deg`).join(",")})`;
  v.forEach((m,i)=>{
    const a=i*slice+slice/2-90,r=37,rad=a*Math.PI/180;
    const d=document.createElement("div");d.className="wheel-label";
    d.style.left=`${50+r*Math.cos(rad)}%`;d.style.top=`${50+r*Math.sin(rad)}%`;
    d.textContent=`${m.emoji} ${m.name}`;$("labels").appendChild(d);
  });
  $("hubText").textContent=`${items.length} options`;
}
function spin(){
  if(state.spinning||!state.candidates.length)return;
  state.spinning=true;$("spin").disabled=true;$("accept").disabled=true;$("again").disabled=true;$("message").textContent="";
  state.current=state.candidates[Math.floor(Math.random()*state.candidates.length)];
  state.rotation+=1080+Math.floor(Math.random()*360);
  $("wheel").style.transform=`rotate(${state.rotation}deg)`;$("hubText").textContent="Deciding…";$("status").textContent="No more thinking.";
  setTimeout(()=>{showResult(state.current);state.spinning=false;$("spin").disabled=false;$("accept").disabled=false;$("again").disabled=false},1350);
}
function showResult(m){
  $("emoji").textContent=m.emoji;$("mealName").textContent=m.name;
  $("meta").textContent=`${m.time} min · effort ${m.effort}/3 · ${m.servings} serving${m.servings>1?"s":""}`;
  $("why").textContent=`${m.name} fits because your current energy allows effort level ${effortLimit[state.energy]}/3 and it matches the time you selected. ${m.note}`;
  $("hubText").textContent=m.name;$("status").textContent="Decision made. Accept it or spin again.";
}
function accept(){
  if(!state.current)return;
  state.history.unshift({...state.current,when:new Date().toLocaleString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})});
  state.history=state.history.slice(0,6);renderHistory();
  $("message").textContent="Locked in. This meal is officially no longer your problem. ✓";
}
function renderHistory(){
  if(!state.history.length){$("history").innerHTML='<p class="muted">Nothing here yet.</p>';return}
  $("history").innerHTML=state.history.map(m=>`<article class="historyitem"><strong>${m.emoji} ${m.name}</strong><span>${m.time} min · ${m.when}</span></article>`).join("");
}
energyBtns.forEach(b=>b.addEventListener("click",()=>selectEnergy(b.dataset.energy)));
timeBtns.forEach(b=>b.addEventListener("click",()=>selectTime(b.dataset.time)));
$("spin").addEventListener("click",spin);$("again").addEventListener("click",spin);$("accept").addEventListener("click",accept);
$("clear").addEventListener("click",()=>{state.history=[];renderHistory();$("message").textContent=""});
loadMeals();
