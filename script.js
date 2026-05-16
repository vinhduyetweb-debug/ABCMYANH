
const startBtn = document.getElementById('startBtn');
const lessonCard = document.getElementById('lessonCard');
const rewardCard = document.getElementById('rewardCard');
const continueBtn = document.getElementById('continueBtn');
const stars = document.getElementById('stars');

let score = 0;

startBtn.addEventListener('click', () => {
  lessonCard.classList.remove('hidden');
  window.scrollTo({
    top: lessonCard.offsetTop - 20,
    behavior: 'smooth'
  });
});

document.querySelectorAll('.choice').forEach(choice => {
  choice.addEventListener('click', () => {

    if(choice.classList.contains('correct')){
      score += 10;
      stars.innerText = score;

      launchParticles();

      setTimeout(() => {
        rewardCard.classList.remove('hidden');

        rewardCard.scrollIntoView({
          behavior:'smooth'
        });
      }, 600);

    } else {
      choice.style.transform = 'scale(.9)';
      setTimeout(() => {
        choice.style.transform = '';
      },200);
    }
  });
});

continueBtn.addEventListener('click', () => {
  alert('Next World Coming Soon 🚀');
});

function launchParticles(){
  for(let i=0;i<18;i++){
    const p = document.createElement('div');

    p.innerHTML = ['✨','🌈','⭐','💖'][Math.floor(Math.random()*4)];

    p.style.position='fixed';
    p.style.left=Math.random()*window.innerWidth+'px';
    p.style.top='50%';
    p.style.fontSize='28px';
    p.style.zIndex='999';
    p.style.pointerEvents='none';
    p.style.transition='1s ease-out';

    document.body.appendChild(p);

    setTimeout(()=>{
      p.style.transform=`translateY(-${Math.random()*300}px)`;
      p.style.opacity='0';
    },10);

    setTimeout(()=>{
      p.remove();
    },1200);
  }
}
