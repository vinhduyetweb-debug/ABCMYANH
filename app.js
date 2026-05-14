
const lessons = [
{letter:'A',word:'Apple 🍎',emoji:'🍎'},
{letter:'B',word:'Ball ⚽',emoji:'⚽'},
{letter:'C',word:'Cat 🐱',emoji:'🐱'},
{letter:'D',word:'Dog 🐶',emoji:'🐶'},
{letter:'E',word:'Egg 🥚',emoji:'🥚'},
{letter:'F',word:'Fish 🐟',emoji:'🐟'},
{letter:'G',word:'Grape 🍇',emoji:'🍇'}
];

let current = 0;
let xp = Number(localStorage.getItem('v3_xp')) || 0;
let level = Number(localStorage.getItem('v3_level')) || 1;
let combo = Number(localStorage.getItem('v3_combo')) || 0;
let correctCount = Number(localStorage.getItem('v3_correct')) || 0;
let stickers = JSON.parse(localStorage.getItem('v3_stickers')) || [];

const letterEl = document.getElementById('letter');
const wordEl = document.getElementById('word');
const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');
const mascotEl = document.getElementById('mascot');
const speechBubble = document.getElementById('speechBubble');

function render(){

const lesson = lessons[current];

letterEl.innerText = lesson.letter;
wordEl.innerText = lesson.word;

document.getElementById('xp').innerText = xp;
document.getElementById('level').innerText = level;
document.getElementById('combo').innerText = combo;

const progress = (correctCount % 5) * 20;
document.getElementById('progressBar').style.width = progress + '%';

renderChoices();
renderStickers();
}

function renderChoices(){

choicesEl.innerHTML='';

const lesson = lessons[current];

let options = [...lessons]
.sort(()=>0.5-Math.random())
.slice(0,3);

if(!options.find(o=>o.word===lesson.word)){
options[0]=lesson;
}

options.sort(()=>0.5-Math.random());

options.forEach(option=>{

const btn = document.createElement('button');

btn.className='choice-btn';
btn.innerText=option.word;

btn.onclick=()=>checkAnswer(option.word===lesson.word, lesson);

choicesEl.appendChild(btn);

});
}

function speakBritish(){

const utterance = new SpeechSynthesisUtterance(lessons[current].word);

const voices = speechSynthesis.getVoices();

const british = voices.find(v =>
v.lang === 'en-GB'
);

if(british){
utterance.voice = british;
}

utterance.lang='en-GB';
utterance.rate=.9;
utterance.pitch=1;

speechSynthesis.speak(utterance);

}

function checkAnswer(correct, lesson){

if(correct){

feedbackEl.innerHTML='🎉 Amazing!';

mascotEl.innerText='🥳';
speechBubble.innerText='Wonderful little hero!';

xp += 10;
combo += 1;
correctCount += 1;

if(correctCount % 5 === 0){
showTreasure();
}

if(xp % 50 === 0){
level += 1;
}

if(!stickers.includes(lesson.emoji)){
stickers.push(lesson.emoji);
}

playHappySound();
fireworks();

}else{

feedbackEl.innerHTML='💥 Oops! Try Again';

mascotEl.innerText='😵';
speechBubble.innerText='Oops~ Let’s try again!';

combo = 0;

playWrongSound();
bubbleBoom();

}

saveState();
renderStickers();

setTimeout(()=>{

current = (current + 1) % lessons.length;

mascotEl.innerText='🐰';
speechBubble.innerText='You are doing great!';

render();

},1800);
}

function renderStickers(){

const container = document.getElementById('stickers');

container.innerHTML='';

stickers.forEach(sticker=>{

const div = document.createElement('div');

div.className='sticker';
div.innerText=sticker;

container.appendChild(div);

});
}

function saveState(){

localStorage.setItem('v3_xp', xp);
localStorage.setItem('v3_level', level);
localStorage.setItem('v3_combo', combo);
localStorage.setItem('v3_correct', correctCount);
localStorage.setItem('v3_stickers', JSON.stringify(stickers));

}

function playHappySound(){

const ctx = new AudioContext();

const osc = ctx.createOscillator();
const gain = ctx.createGain();

osc.connect(gain);
gain.connect(ctx.destination);

osc.frequency.value = 700;
gain.gain.value = 0.08;

osc.start();

setTimeout(()=>{
osc.stop();
},200);
}

function playWrongSound(){

const ctx = new AudioContext();

const osc = ctx.createOscillator();
const gain = ctx.createGain();

osc.connect(gain);
gain.connect(ctx.destination);

osc.frequency.value = 180;
gain.gain.value = 0.08;

osc.start();

setTimeout(()=>{
osc.stop();
},300);
}

function fireworks(){

const icons = ['⭐','✨','🎉','🌈','💖'];

for(let i=0;i<50;i++){

const fx = document.createElement('div');

fx.className='fx';
fx.innerText = icons[Math.floor(Math.random()*icons.length)];

fx.style.left=Math.random()*window.innerWidth+'px';
fx.style.top='-20px';
fx.style.fontSize=(18+Math.random()*24)+'px';

document.body.appendChild(fx);

setTimeout(()=>fx.remove(),1500);

}
}

function bubbleBoom(){

for(let i=0;i<12;i++){

const bubble = document.createElement('div');

bubble.className='bubble';

bubble.style.left=Math.random()*window.innerWidth+'px';
bubble.style.top=Math.random()*window.innerHeight+'px';

document.body.appendChild(bubble);

setTimeout(()=>bubble.remove(),1000);

}
}

function showTreasure(){

document.getElementById('chestCard').scrollIntoView({
behavior:'smooth'
});

speechBubble.innerText='Treasure unlocked!';

fireworks();

}

document.getElementById('voiceBtn').onclick=speakBritish;

document.getElementById('openChestBtn').onclick=()=>{

speechBubble.innerText='Wow! You found a magic gift!';

fireworks();

};

render();
