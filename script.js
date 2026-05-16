
const lessons = [
  {
    letter:'A',
    word:'Apple 🍎',
    plainWord:'Apple',
    meaning:'Quả táo',
    phonetic:'/ˈæp.əl/',
    correct:'🍎',
    choices:['🐠','🍎','🚗']
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

const quizTitle = document.getElementById('quizTitle');
const choices = document.getElementById('choices');

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

  choices.innerHTML = '';

  lesson.choices.forEach(item => {

    const btn = document.createElement('button');

    btn.className = 'choice';
    btn.innerText = item;

    btn.addEventListener('click', () => {

      if(item === lesson.correct){

        score += 10;

        scoreText.innerText = score;

        clapEffect();

        launchMagic();

        speakEnglish(`Amazing! ${lesson.plainWord}`);

        rewardCard.classList.remove('hidden');

      } else {

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

    choices.appendChild(btn);

  });

}

function speakEnglish(text){

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = 'en-US';
  utterance.rate = 0.82;
  utterance.pitch = 1.05;

  const voices = speechSynthesis.getVoices();

  const voice = voices.find(v => v.lang === 'en-US');

  if(voice){
    utterance.voice = voice;
  }

  speechSynthesis.speak(utterance);

}

function speakVietnamese(text){

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = 'vi-VN';
  utterance.rate = 0.9;
  utterance.pitch = 1;

  const voices = speechSynthesis.getVoices();

  const voice = voices.find(v => v.lang === 'vi-VN');

  if(voice){
    utterance.voice = voice;
  }

  speechSynthesis.speak(utterance);

}

document.getElementById('speakEnglishBtn').addEventListener('click', () => {

  const lesson = lessons[current];

  speakEnglish(lesson.plainWord);

});

document.getElementById('speakVietnameseBtn').addEventListener('click', () => {

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

  for(let i=0;i<20;i++){

    const spark = document.createElement('div');

    spark.innerHTML = ['✨','🌈','⭐','💖'][Math.floor(Math.random()*4)];

    spark.style.position='fixed';
    spark.style.left=Math.random()*window.innerWidth+'px';
    spark.style.top='55%';
    spark.style.fontSize='30px';
    spark.style.zIndex='9999';
    spark.style.transition='1.2s ease-out';

    document.body.appendChild(spark);

    setTimeout(()=>{
      spark.style.transform=`translateY(-${Math.random()*350}px)`;
      spark.style.opacity='0';
    },10);

    setTimeout(()=>{
      spark.remove();
    },1300);

  }

}

function clapEffect(){

  const audio = new Audio('https://actions.google.com/sounds/v1/human_voices/applause.ogg');

  audio.volume = 0.6;

  audio.play();

}
