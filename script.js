
const startBtn = document.getElementById('startBtn');
const lessonCard = document.getElementById('lessonCard');
const rewardCard = document.getElementById('rewardCard');
const scoreText = document.getElementById('score');

const speakLetterBtn = document.getElementById('speakLetterBtn');
const speakWordBtn = document.getElementById('speakWordBtn');

let score = 0;

const lesson = {
  letter: 'A',
  word: 'Apple'
};

startBtn.addEventListener('click', () => {
  lessonCard.classList.remove('hidden');

  lessonCard.scrollIntoView({
    behavior:'smooth'
  });

  setTimeout(() => {
    speakAmerican(lesson.letter);
  }, 500);
});

function speakAmerican(text){

  if(!('speechSynthesis' in window)){
    alert('Speech synthesis is not supported on this browser.');
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = 'en-US';
  utterance.rate = 0.82;
  utterance.pitch = 1.05;
  utterance.volume = 1;

  const voices = window.speechSynthesis.getVoices();

  const americanVoice =
    voices.find(v =>
      v.lang === 'en-US' &&
      (
        v.name.includes('Google') ||
        v.name.includes('Samantha') ||
        v.name.includes('Jenny') ||
        v.name.includes('Aria')
      )
    ) || voices.find(v => v.lang === 'en-US');

  if(americanVoice){
    utterance.voice = americanVoice;
  }

  window.speechSynthesis.speak(utterance);
}

speechSynthesis.onvoiceschanged = () => {
  speechSynthesis.getVoices();
};

speakLetterBtn.addEventListener('click', () => {
  speakAmerican('A');
});

speakWordBtn.addEventListener('click', () => {
  speakAmerican('Apple');
});

document.querySelectorAll('.choice').forEach(choice => {

  choice.addEventListener('click', () => {

    if(choice.classList.contains('correct')){

      score += 10;
      scoreText.innerText = score;

      launchMagic();

      speakAmerican('Amazing! Apple!');

      setTimeout(() => {
        rewardCard.classList.remove('hidden');

        rewardCard.scrollIntoView({
          behavior:'smooth'
        });
      }, 700);

    } else {

      choice.animate([
        { transform:'translateX(0)' },
        { transform:'translateX(-6px)' },
        { transform:'translateX(6px)' },
        { transform:'translateX(0)' }
      ],{
        duration:250
      });

      speakAmerican('Try again');
    }

  });

});

function launchMagic(){

  for(let i=0;i<24;i++){

    const spark = document.createElement('div');

    spark.innerHTML = ['✨','🌈','⭐','💖'][Math.floor(Math.random()*4)];

    spark.style.position='fixed';
    spark.style.left=Math.random()*window.innerWidth+'px';
    spark.style.top='55%';
    spark.style.fontSize='30px';
    spark.style.zIndex='9999';
    spark.style.transition='1.2s ease-out';
    spark.style.pointerEvents='none';

    document.body.appendChild(spark);

    setTimeout(()=>{
      spark.style.transform=`translateY(-${Math.random()*400}px) rotate(${Math.random()*360}deg)`;
      spark.style.opacity='0';
    },10);

    setTimeout(()=>{
      spark.remove();
    },1400);

  }

}
