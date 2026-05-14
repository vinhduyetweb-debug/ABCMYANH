const lessons = [
{letter:'A',word:'Apple 🍎',emoji:'🍎'},
{letter:'B',word:'Ball ⚽',emoji:'⚽'},
{letter:'C',word:'Cat 🐱',emoji:'🐱'},
{letter:'D',word:'Dog 🐶',emoji:'🐶'},
{letter:'E',word:'Egg 🥚',emoji:'🥚'}
];

let current = 0;
let xp = Number(localStorage.getItem('xp')) || 0;
let level = Number(localStorage.getItem('level')) || 1;
let stickers = JSON.parse(localStorage.getItem('stickers')) || [];

const letterEl = document.getElementById('letter');
const wordEl = document.getElementById('word');
const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');

function render(){
const lesson = lessons[current];

letterEl.innerText = lesson.letter;
wordEl.innerText = lesson.word;

document.getElementById('xp').innerText = xp;
document.getElementById('level').innerText = level;

renderChoices();
renderStickers();
}

function renderChoices(){
choicesEl.innerHTML='';

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

choicesEl.appendChild(btn);
});
}

function speakBritish(){
const utterance = new SpeechSynthesisUtterance(lessons[current].word);

const voices = speechSynthesis.getVoices();
const british = voices.find(v=>v.lang==='en-GB');

if(british){
utterance.voice = british;
}

utterance.lang='en-GB';
utterance.pitch=1;
utterance.rate=.9;

speechSynthesis.speak(utterance);
}

function playTone(type){
const audio = new AudioContext();
const osc = audio.createOscillator();
const gain = audio.createGain();

osc.connect(gain);
gain.connect(audio.destination);

osc.frequency.value = type==='success' ? 700 : 220;

gain.gain.value = 0.08;

osc.start();

setTimeout(()=>{
osc.stop();
}, type==='success' ? 180 : 300);
}

function checkAnswer(correct, lesson){

if(correct){

xp += 10;

if(xp % 50 === 0){
level++;
}

feedbackEl.innerHTML='🎉 Amazing!';

playTone('success');

fireworks();

if(!stickers.includes(lesson.emoji)){
stickers.push(lesson.emoji);
}

}else{

feedbackEl.innerHTML='💥 Oops! Try Again';

playTone('wrong');

bubbleExplode();
}

localStorage.setItem('xp', xp);
localStorage.setItem('level', level);
localStorage.setItem('stickers', JSON.stringify(stickers));

renderStickers();
render();

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

function fireworks(){

for(let i=0;i<40;i++){

const fw = document.createElement('div');
fw.className='firework';

fw.style.left=Math.random()*window.innerWidth+'px';
fw.style.top=window.innerHeight+'px';

fw.style.background=[
'#ff5e9c',
'#ffd93d',
'#5b7cff',
'#6ee7b7'
][Math.floor(Math.random()*4)];

document.body.appendChild(fw);

setTimeout(()=>fw.remove(),1000);
}
}

function bubbleExplode(){

for(let i=0;i<12;i++){

const bubble = document.createElement('div');

bubble.className='bubble';

bubble.style.left=Math.random()*window.innerWidth+'px';
bubble.style.top=Math.random()*window.innerHeight+'px';

document.body.appendChild(bubble);

setTimeout(()=>bubble.remove(),1000);
}
}

document.getElementById('speakBtn').onclick=speakBritish;

render();
