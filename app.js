
const lessons = [
{letter:'A',word:'Apple 🍎',emoji:'🍎',phonics:'Ah'},
{letter:'B',word:'Ball ⚽',emoji:'⚽',phonics:'Buh'},
{letter:'C',word:'Cat 🐱',emoji:'🐱',phonics:'Cuh'},
{letter:'D',word:'Dog 🐶',emoji:'🐶',phonics:'Duh'},
{letter:'E',word:'Egg 🥚',emoji:'🥚',phonics:'Eh'}
];

let current = 0;
let xp = Number(localStorage.getItem('v5_xp')) || 0;
let level = Number(localStorage.getItem('v5_level')) || 1;
let streak = Number(localStorage.getItem('v5_streak')) || 0;
let combo = Number(localStorage.getItem('v5_combo')) || 0;
let badges = JSON.parse(localStorage.getItem('v5_badges')) || [];

const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');

function render(){

const lesson = lessons[current];

document.getElementById('letter').innerText = lesson.letter;
document.getElementById('word').innerText = lesson.word;
document.getElementById('phonics').innerText = lesson.phonics;

document.getElementById('xp').innerText = xp;
document.getElementById('level').innerText = level;
document.getElementById('streak').innerText = streak;
document.getElementById('combo').innerText = combo;

renderChoices();
renderBadges();

const progress = Math.min((combo / 3) * 100, 100);
document.getElementById('missionBar').style.width = progress + '%';

}

function renderChoices(){

choicesEl.innerHTML = '';

const lesson = lessons[current];

let options = [...lessons]
.sort(()=>0.5-Math.random())
.slice(0,3);

if(!options.find(o=>o.word===lesson.word)){
options[0] = lesson;
}

options.sort(()=>0.5-Math.random());

options.forEach(option=>{

const btn = document.createElement('button');

btn.className = 'choice-btn';
btn.innerText = option.word;

btn.onclick = ()=>checkAnswer(option.word===lesson.word, lesson);

choicesEl.appendChild(btn);

});
}

function checkAnswer(correct, lesson){

const mascot = document.getElementById('mascot');
const speech = document.getElementById('speech');

if(correct){

feedbackEl.innerHTML = '🎉 Amazing!';

mascot.innerText = '🥳';
speech.innerText = 'Wonderful little hero!';

xp += 10;
combo += 1;
streak += 1;

if(xp % 50 === 0){
level += 1;
}

if(!badges.includes(lesson.emoji)){
badges.push(lesson.emoji);
}

playSound(700);
celebrate();

}else{

feedbackEl.innerHTML = '💥 Oops!';

mascot.innerText = '😵';
speech.innerText = 'Try again little hero!';

combo = 0;

playSound(180);
bubbleBoom();

}

saveData();

setTimeout(()=>{

mascot.innerText='🐰';
speech.innerText='Keep learning and have fun!';

current = (current + 1) % lessons.length;

render();

},1500);

}

function celebrate(){

const icons = ['⭐','✨','🎉','🌈','💖'];

for(let i=0;i<40;i++){

const fx = document.createElement('div');

fx.className='fx';
fx.innerText = icons[Math.floor(Math.random()*icons.length)];

fx.style.left = Math.random()*window.innerWidth+'px';
fx.style.top = '-20px';
fx.style.fontSize = (20 + Math.random()*24)+'px';

document.body.appendChild(fx);

setTimeout(()=>fx.remove(),1200);
}
}

function bubbleBoom(){

for(let i=0;i<12;i++){

const div = document.createElement('div');

div.className='fx';
div.innerText='🫧';

div.style.left=Math.random()*window.innerWidth+'px';
div.style.top=Math.random()*window.innerHeight+'px';
div.style.fontSize='30px';

document.body.appendChild(div);

setTimeout(()=>div.remove(),1000);

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

function renderBadges(){

const container = document.getElementById('badges');

container.innerHTML='';

badges.forEach(b=>{

const div = document.createElement('div');

div.className='badge';
div.innerText=b;

container.appendChild(div);

});
}

function saveData(){

localStorage.setItem('v5_xp', xp);
localStorage.setItem('v5_level', level);
localStorage.setItem('v5_streak', streak);
localStorage.setItem('v5_combo', combo);
localStorage.setItem('v5_badges', JSON.stringify(badges));

}

document.getElementById('voiceBtn').onclick = ()=>{

const lesson = lessons[current];

const utterance = new SpeechSynthesisUtterance(lesson.word);

const voices = speechSynthesis.getVoices();

const british = voices.find(v=>v.lang==='en-GB');

if(british){
utterance.voice = british;
}

utterance.lang='en-GB';
utterance.rate=.9;

speechSynthesis.speak(utterance);

};

document.getElementById('feedBtn').onclick = ()=>{

document.getElementById('petStatus').innerText =
'🐱 Your pet loves you!';

celebrate();

};

render();

const canvas = document.getElementById('traceCanvas');
const ctx = canvas.getContext('2d');

ctx.lineWidth = 10;
ctx.lineCap = 'round';
ctx.strokeStyle = '#5b7cff';

let drawing = false;

function start(e){
drawing = true;
draw(e);
}

function end(){
drawing = false;
ctx.beginPath();
}

function draw(e){

if(!drawing) return;

const rect = canvas.getBoundingClientRect();

const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

ctx.lineTo(x,y);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(x,y);

}

canvas.addEventListener('mousedown',start);
canvas.addEventListener('mouseup',end);
canvas.addEventListener('mousemove',draw);

canvas.addEventListener('touchstart',start);
canvas.addEventListener('touchend',end);
canvas.addEventListener('touchmove',draw);

document.getElementById('clearBtn').onclick = ()=>{
ctx.clearRect(0,0,canvas.width,canvas.height);
};
