
const lessons = [
{letter:"A",word:"Apple 🍎",emoji:"🍎"},
{letter:"B",word:"Ball ⚽",emoji:"⚽"},
{letter:"C",word:"Cat 🐱",emoji:"🐱"},
{letter:"D",word:"Dog 🐶",emoji:"🐶"},
{letter:"E",word:"Egg 🥚",emoji:"🥚"}
];

let current = 0;

let stars = Number(localStorage.getItem("stars")) || 0;
let streak = Number(localStorage.getItem("streak")) || 1;
let stickers = JSON.parse(localStorage.getItem("stickers")) || [];

const letterDisplay = document.getElementById("letterDisplay");
const wordDisplay = document.getElementById("wordDisplay");
const starsEl = document.getElementById("stars");
const streakEl = document.getElementById("streak");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const stickersEl = document.getElementById("stickers");

function render(){
const lesson = lessons[current];

letterDisplay.innerText = lesson.letter;
wordDisplay.innerText = lesson.word;

starsEl.innerText = stars;
streakEl.innerText = streak;

renderChoices();
renderStickers();
}

function renderChoices(){
choicesEl.innerHTML = "";

const lesson = lessons[current];

let options = [...lessons].sort(()=>0.5-Math.random()).slice(0,3);

if(!options.find(o=>o.word===lesson.word)){
options[0] = lesson;
}

options.sort(()=>0.5-Math.random());

options.forEach(option=>{
const btn = document.createElement("button");

btn.className = "choice-btn";
btn.innerText = option.word;

btn.onclick = ()=>check(option.word === lesson.word, lesson);

choicesEl.appendChild(btn);
});
}

function check(correct, lesson){

if(correct){
feedbackEl.innerHTML = "🎉 Great Job!";
stars++;
streak++;

if(!stickers.includes(lesson.emoji)){
stickers.push(lesson.emoji);
}

confetti();

}else{
feedbackEl.innerHTML = "❌ Try Again!";
}

localStorage.setItem("stars", stars);
localStorage.setItem("streak", streak);
localStorage.setItem("stickers", JSON.stringify(stickers));

render();
}

function renderStickers(){
stickersEl.innerHTML = "";

stickers.forEach(sticker=>{
const div = document.createElement("div");
div.className = "sticker";
div.innerText = sticker;

stickersEl.appendChild(div);
});
}

function confetti(){
for(let i=0;i<20;i++){

const particle = document.createElement("div");

particle.style.position = "fixed";
particle.style.width = "10px";
particle.style.height = "10px";
particle.style.borderRadius = "50%";
particle.style.left = Math.random()*window.innerWidth + "px";
particle.style.top = Math.random()*window.innerHeight + "px";
particle.style.background = ["#ff5a84","#4b73ff","#ffcc00","#00c98d"][Math.floor(Math.random()*4)];
particle.style.transition = "1s";

document.body.appendChild(particle);

setTimeout(()=>{
particle.style.transform = `translateY(${Math.random()*300}px)`;
particle.style.opacity = 0;
},50);

setTimeout(()=>{
particle.remove();
},1200);
}
}

document.getElementById("speakBtn").onclick = ()=>{
const lesson = lessons[current];

const utterance = new SpeechSynthesisUtterance(lesson.word);
utterance.lang = "en-US";

speechSynthesis.speak(utterance);
};

document.getElementById("nextBtn").onclick = ()=>{
current = (current + 1) % lessons.length;
render();
};

document.getElementById("prevBtn").onclick = ()=>{
current = (current - 1 + lessons.length) % lessons.length;
render();
};

render();
