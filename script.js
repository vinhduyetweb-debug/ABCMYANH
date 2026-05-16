
const lessons = [
{
letter:'A',
word:'Apple 🍎',
plainWord:'Apple',
meaning:'Quả táo',
phonetic:'/ˈæp.əl/',
correct:'🍎',
choices:['🍎','🐠','🚗']
},
{
letter:'B',
word:'Balloon 🎈',
plainWord:'Balloon',
meaning:'Bóng bay',
phonetic:'/bəˈluːn/',
correct:'🎈',
choices:['🎈','🐶','🍔']
},
{
letter:'C',
word:'Cat 🐱',
plainWord:'Cat',
meaning:'Con mèo',
phonetic:'/kæt/',
correct:'🐱',
choices:['🚀','🐱','🌈']
}
];

let current = 0;
let score = 0;

const lessonCard = document.getElementById('lessonCard');
const rewardCard = document.getElementById('rewardCard');

const letter = document.getElementById('letter');
const word = document.getElementById('word');
const meaning = document.getElementById('meaning');
const phonetic = document.getElementById('phonetic');

const choicesContainer = document.getElementById('choices');
const quizTitle = document.getElementById('quizTitle');

const scoreText = document.getElementById('score');

document.getElementById('startBtn').addEventListener('click', () => {

lessonCard.classList.remove('hidden');

renderLesson();

lessonCard.scrollIntoView({
behavior:'smooth'
});

});

function renderLesson(){

const lesson = lessons[current];

letter.innerText = lesson.letter;
word.innerText = lesson.word;
meaning.innerText = lesson.meaning;
phonetic.innerText = lesson.phonetic;

quizTitle.innerText = `Which one is ${lesson.plainWord}?`;

choicesContainer.innerHTML = '';

lesson.choices.forEach(item => {

const btn = document.createElement('button');

btn.className = 'choice';

btn.innerText = item;

btn.addEventListener('click', () => {

if(item === lesson.correct){

score += 10;

scoreText.innerText = score;

launchMagic();

playClap();

speakEnglish(`Amazing! ${lesson.plainWord}`);

rewardCard.classList.remove('hidden');

}else{

speakEnglish('Try again');

btn.animate([
{ transform:'translateX(0)' },
{ transform:'translateX(-6px)' },
{ transform:'translateX(6px)' },
{ transform:'translateX(0)' }
],{
duration:250
});

}

});

choicesContainer.appendChild(btn);

});

}

function speakEnglish(text){

window.speechSynthesis.cancel();

const utterance = new SpeechSynthesisUtterance(text);

utterance.lang = 'en-US';
utterance.rate = 0.82;
utterance.pitch = 1.05;

const voices = speechSynthesis.getVoices();

const voice = voices.find(v =>
v.lang === 'en-US'
);

if(voice){
utterance.voice = voice;
}

speechSynthesis.speak(utterance);

}

function speakVietnamese(text){

window.speechSynthesis.cancel();

const voices = speechSynthesis.getVoices();

const vietnameseVoice =
voices.find(v =>
v.lang.toLowerCase().includes('vi') &&
(
v.name.toLowerCase().includes('google') ||
v.name.toLowerCase().includes('microsoft') ||
v.name.toLowerCase().includes('an') ||
v.name.toLowerCase().includes('linh') ||
v.name.toLowerCase().includes('hoai')
)
) || voices.find(v =>
v.lang.toLowerCase().includes('vi')
);

const utterance = new SpeechSynthesisUtterance(text);

utterance.lang = 'vi-VN';

/* slower + clearer Vietnamese pronunciation */
utterance.rate = 0.72;
utterance.pitch = 1;
utterance.volume = 1;

if(vietnameseVoice){
utterance.voice = vietnameseVoice;
}

/* speak twice softly for kids clarity */
speechSynthesis.speak(utterance);

setTimeout(() => {

const repeatUtterance = new SpeechSynthesisUtterance(text);

repeatUtterance.lang = 'vi-VN';
repeatUtterance.rate = 0.68;
repeatUtterance.pitch = 1;
repeatUtterance.volume = 1;

if(vietnameseVoice){
repeatUtterance.voice = vietnameseVoice;
}

speechSynthesis.speak(repeatUtterance);

}, 900);

}

document.getElementById('letterBtn').addEventListener('click', () => {

const lesson = lessons[current];

speakEnglish(lesson.letter);

});

document.getElementById('englishBtn').addEventListener('click', () => {

const lesson = lessons[current];

speakEnglish(lesson.plainWord);

});

document.getElementById('vietnameseBtn').addEventListener('click', () => {

const lesson = lessons[current];

speakVietnamese(lesson.meaning);

});

document.getElementById('nextBtn').addEventListener('click', () => {

current++;

if(current >= lessons.length){
current = 0;
}

rewardCard.classList.add('hidden');

renderLesson();

speakEnglish(lessons[current].plainWord);

});

document.getElementById('prevBtn').addEventListener('click', () => {

current--;

if(current < 0){
current = lessons.length - 1;
}

rewardCard.classList.add('hidden');

renderLesson();

speakEnglish(lessons[current].plainWord);

});

function launchMagic(){

for(let i=0;i<24;i++){

const spark = document.createElement('div');

spark.innerHTML =
['✨','🌈','⭐','💖'][Math.floor(Math.random()*4)];

spark.style.position='fixed';
spark.style.left=Math.random()*window.innerWidth+'px';
spark.style.top='55%';
spark.style.fontSize='30px';
spark.style.zIndex='9999';
spark.style.transition='1.2s ease-out';
spark.style.pointerEvents='none';

document.body.appendChild(spark);

setTimeout(()=>{
spark.style.transform=`translateY(-${Math.random()*360}px) rotate(${Math.random()*360}deg)`;
spark.style.opacity='0';
},10);

setTimeout(()=>{
spark.remove();
},1300);

}

}

function playClap(){

const audio = new Audio('https://actions.google.com/sounds/v1/human_voices/applause.ogg');

audio.volume = 0.65;

audio.play();

}
