const lessons = [
{letter:'A',word:'Apple 🍎',emoji:'🍎',phonics:'Ah'},
{letter:'B',word:'Ball ⚽',emoji:'⚽',phonics:'Buh'},
{letter:'C',word:'Cat 🐱',emoji:'🐱',phonics:'Cuh'},
{letter:'D',word:'Dog 🐶',emoji:'🐶',phonics:'Duh'},
{letter:'E',word:'Egg 🥚',emoji:'🥚',phonics:'Eh'}
];

let current = 0;
let xp = Number(localStorage.getItem('v6_xp')) || 0;
let level = Number(localStorage.getItem('v6_level')) || 1;
let combo = Number(localStorage.getItem('v6_combo')) || 0;
let stickers = JSON.parse(localStorage.getItem('v6_stickers')) || [];

const mascot = document.getElementById('mascot');
const pet = document.getElementById('pet');

function render(){

const lesson = lessons[current];

document.getElementById('letter').innerText = lesson.letter;
document.getElementById('word').innerText = lesson.word;
document.getElementById('phonics').innerText = lesson.phonics;

document.getElementById('xp').innerText = xp;
document.getElementById('level').innerText = level;
document.getElementById('combo').innerText = combo;

renderChoices();
renderShadowGame();
renderStickers();

}

function renderChoices(){

const container = document.getElementById('choices');
container.innerHTML='';

const lesson = lessons[current];

let options = [...lessons].sort(()=>0.5-Math.random()).slice(0,3);

if(!options.find(o=>o.word===lesson.word)){
options[0]=lesson;
}

options.sort(()=>0.5-Math.random());

options.forEach(option=>{

const btn = document.createElement('button');

btn.className='choice-btn';
btn.innerText=option.word;

btn.onclick=()=>checkAnswer(option.word===lesson.word, lesson);

container.appendChild(btn);

});
}

function checkAnswer(correct, lesson){

const feedback = document.getElementById('feedback');

if(correct){

feedback.innerHTML='🎉 Amazing!';

xp += 10;
combo += 1;

if(xp % 50 === 0){
level++;
}

if(!stickers.includes(lesson.emoji)){
stickers.push(lesson.emoji);
}

celebrate();
playSound(700);

document.getElementById('storyText').innerText =
'Rabbit found the magic item!';

}else{

feedback.innerHTML='💥 Oops! Try Again';

combo = 0;

bubbleBoom();
playSound(180);

document.getElementById('storyText').innerText =
'Rabbit still needs your help!';

}

saveState();

setTimeout(()=>{

current = (current + 1) % lessons.length;

document.getElementById('storyText').innerText =
'Can you help Rabbit find the correct item?';

render();

},1500);

}

function celebrate(){

const icons=['⭐','✨','🎉','🌈','💖'];

for(let i=0;i<40;i++){

const fx=document.createElement('div');

fx.className='fx';
fx.innerText=icons[Math.floor(Math.random()*icons.length)];

fx.style.left=Math.random()*window.innerWidth+'px';
fx.style.top='-20px';
fx.style.fontSize=(20+Math.random()*24)+'px';

document.body.appendChild(fx);

setTimeout(()=>fx.remove(),1200);
}
}

function bubbleBoom(){

for(let i=0;i<12;i++){

const fx=document.createElement('div');

fx.className='fx';
fx.innerText='🫧';

fx.style.left=Math.random()*window.innerWidth+'px';
fx.style.top=Math.random()*window.innerHeight+'px';
fx.style.fontSize='30px';

document.body.appendChild(fx);

setTimeout(()=>fx.remove(),1000);
}
}

function playSound(freq){

const ctx = new AudioContext();
const osc = ctx.createOscillator();
const gain = ctx.createGain();

osc.connect(gain);
gain.connect(ctx.destination);

osc.frequency.value = freq;
gain.gain.value = 0.08;

osc.start();

setTimeout(()=>osc.stop(),200);

}

function saveState(){

localStorage.setItem('v6_xp', xp);
localStorage.setItem('v6_level', level);
localStorage.setItem('v6_combo', combo);
localStorage.setItem('v6_stickers', JSON.stringify(stickers));

}

function renderStickers(){

const container=document.getElementById('stickers');
container.innerHTML='';

stickers.forEach(s=>{

const div=document.createElement('div');

div.className='sticker';
div.innerText=s;

div.onclick=()=>{
celebrate();
};

container.appendChild(div);

});
}

function renderShadowGame(){

const lesson = lessons[current];

document.getElementById('shadowBox').innerText = lesson.emoji;

const container = document.getElementById('shadowChoices');
container.innerHTML='';

let options=[...lessons].sort(()=>0.5-Math.random()).slice(0,3);

if(!options.find(o=>o.emoji===lesson.emoji)){
options[0]=lesson;
}

options.forEach(option=>{

const btn=document.createElement('button');

btn.className='choice-btn';
btn.innerText=option.word;

btn.onclick=()=>{

if(option.emoji===lesson.emoji){

document.getElementById('shadowFeedback').innerHTML='🌟 Correct Shadow!';

celebrate();

}else{

document.getElementById('shadowFeedback').innerHTML='🫧 Try Again';

bubbleBoom();

}

};

container.appendChild(btn);

});
}

document.getElementById('flashBtn').onclick=()=>{

const flash=document.getElementById('flashDisplay');

let index=0;

const interval=setInterval(()=>{

flash.innerText=lessons[index % lessons.length].emoji;

index++;

if(index>10){
clearInterval(interval);
flash.innerText='🎉';
celebrate();
}

},500);

};

document.getElementById('voiceBtn').onclick=()=>{

const lesson=lessons[current];

const utterance=new SpeechSynthesisUtterance(lesson.word);

const voices=speechSynthesis.getVoices();

const british=voices.find(v=>v.lang==='en-GB');

if(british){
utterance.voice=british;
}

utterance.lang='en-GB';
utterance.rate=.9;

speechSynthesis.speak(utterance);

};

document.getElementById('feedBtn').onclick=()=>{

document.getElementById('petMessage').innerText =
'🐱 Your pet is super happy!';

celebrate();

};

mascot.onclick=()=>{
document.getElementById('storyText').innerText =
'Rabbit is excited to learn with you!';
celebrate();
};

pet.onclick=()=>{
document.getElementById('petMessage').innerText =
'🐱 Meow~ Thank you little hero!';
};

document.getElementById('mysteryEgg').onclick=()=>{

const rewards=['🌈','⭐','🦄','🎁','💖'];

const reward=rewards[Math.floor(Math.random()*rewards.length)];

document.getElementById('mysteryEgg').innerText=reward;

celebrate();

};

render();
