const tablinks = document.getElementsByClassName("tab-links");
const tabcontents = document.getElementsByClassName("tab-contents")
const sidemenu = document.getElementById("sidemenu");
const slides = document.querySelectorAll('.slide')
const slider = document.querySelector('.slider')
// const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
const About = document.querySelector('#about');
const header = document.querySelector('#header')
const nav = document.querySelector('.nav')
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnsOpenModal = document.querySelectorAll('.btn--show-modal')
const btnCloseModal = document.querySelector('.btn--close-modal');
const video = document.querySelector('.video');
const btn = document.querySelector('.buttons i')
const bar = document.querySelector('.video-bar')




function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link")
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("tabcontents__active-tab")
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("tabcontents__active-tab")
}

function openmenu(){
    sidemenu.style.right = "0"
}
function closemenu(){
    sidemenu.style.right="-200px"
}

slides.forEach((s, i)=>(s.style.transform =`translateX(${100 * i}%)`));
// slider.style.transform = 'scale(0.3) translateX(-1400px)'
// slider.style.overflow ='visible'


let curSlide = 0
const maxSlide = slides.length;
btnRight.addEventListener('click', function(){
    if(curSlide === maxSlide - 1){
        curSlide = 0;
    } else {
        curSlide ++
    }
    
    slides.forEach((s, i)=>(s.style.transform =`translateX(${100 * (i - curSlide)}%)`))
})


const swiper = new Swiper('.slider-wrapper', {

    loop: true,
    grabCursor: true,
    spaceBetween: 30,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable:true,
      dynamicBullets:true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    breakpoints: {
      0:{
          slidesPerView: 1
      },
      620:{
          slidesPerView: 2
  },
       1024:{
           slidesPerView: 3
       }
    }
  });

  const navHeight = nav.getBoundingClientRect().height
  console.log(navHeight)

const stickyNav = function(entries){
    const [entry] = entries
    if(!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky')
} 
const headerObserver = new IntersectionObserver(stickyNav, {
    root:null,
    threshold:0,
    rootMargin:`-${navHeight}px`
})

headerObserver.observe(header)


const openModal = function(e){
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}


const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  }



  btnsOpenModal.forEach(btn=>btn.addEventListener('click', openModal))
// btnsOpenModal.addEventListener('click', openModal)


btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);


const playPause = () =>{
    if(video.paused){
    video.play()
    btn.className = 'far fa-pause-circle'
    video.style.opacity = '0.7'
    }
 else{
    video.pause()
    btn.className = 'far fa-play-circle'
    video.style.opacity = '0.3'
 }
}

btn.addEventListener('click', ()=>{
    playPause()
})

video.addEventListener('timeupdate', ()=>{
    const barWidth = video.currentTime/video.duration
    bar.style.width = `${barWidth * 100}%`
    if(video.ended){
        btn.classList.add('far fa-play-circle')
        // btn.className = 'far fa-play-circle'
        video.style.opacity ='0.3'
    }
})

