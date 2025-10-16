'use strict';
//selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);
console.log(document.getElementById('section--1'));
const allbuttons = document.getElementsByTagName('button');
console.log(allbuttons);
console.log(document.getElementsByClassName('btn'));
const h1 = document.querySelector('h1');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

//Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//creating & inserting elements
//.inserAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'We use cookie for improving the funcytionality and analiytics.';
message.innerHTML =
  'We use cookie to improve the funcytionality and analiytics. <button class ="btn btn--close-cookie">Got it</button>';
header.append(message);
//header.prepend(message);
//header.append(message.cloneNode(true)); //clones the message element
//header.before(message); //inserts before the headerbtn
//header.after(message); //inserts after the headerbtn

//delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    //older method...
    //message.parentElement.removeChild(message);
  });
//style
message.style.backgroundColor = '#37383d';
message.style.width = '100%';
console.log(getComputedStyle(message).height); //get inline style information
//get the computed style information
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 20 + 'px';
console.log(getComputedStyle(message).height);
//change color from css
document.documentElement.style.setProperty('--color-primary', 'olive');
//attribute
const logo = document.querySelector('.nav__logo');
console.log(logo.src);
console.log(logo.alt);
console.log(logo.className);
logo.alt = 'beautiful logo';
//non standard attributes
console.log(logo.getAttribute('designer'));
console.log(logo.getAttribute('src'));
logo.setAttribute('company', 'Bankist');

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

//data attributes
console.log(logo.dataset.versionNumber);
//classes
logo.classList.add('c', 'd');
logo.classList.remove('c', 'd');
logo.classList.toggle('c');
logo.classList.contains('c'); //returns true or false same as includes in array.
//!!!Don't use className to set class names! it will overwrite the other class names.

//button scroll smoothly
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('current scroll (X/Y)', window.scrollX, scrollY);
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  //For old browsers
  // window.scrollTo({
  // left:s1coords.left + window.scrollX,
  // top:s1coords.top + window.scrollY,
  // behavior: "smooth",
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});
//page navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});


//going downward: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orange';
//going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);
//"closest" finds parents where "queryselector" finds children from the DOM tree!
h1.closest('.header').style.background = 'var(--gradient-secondary)';
//h1.closest('h1').style.background = 'var(--gradient-primary)';
//going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextSibling);
console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(el =>{
// if(el === h1) el.style.transform = 'scale(0.5)';
// });

//tabbed component
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//menu fading animation
const nav = document.querySelector('.nav');

const handleHover = function (e) {
console.log(this);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    console.log(link);
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//sticky navigation bar
//not efficient
// const initalCoords = section1.getBoundingClientRect();
// console.log(initalCoords);

// window.addEventListener('scroll',function(e){
// if(this.window.scrollY > initalCoords.top)
// nav.classList.add('sticky');
// else nav.classList.remove('sticky');
// });
//Sticky Nav using intersection observer API
/*
const obsCallBack = function(entries, observer){
entries.forEach(entry => {
console.log(entry);
})
}
const obsOption = {
root: null,
threshold: 0.1,
}
const observer = new IntersectionObserver(obsCallBack, obsOption)
observer.observe(section1);
*/
const navHeight = nav.getBoundingClientRect().height;
//console.log(navHeight);

const stickyNav = function(entries){
const [entry] = entries;
//console.log(entry);
if(!entry.isIntersecting)nav.classList.add('sticky');
else nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver(stickyNav, {
root: null,
threshold: 0,
rootMargin: `-${navHeight}px`,
})
headerObserver.observe(header);

//Reveal sections on Scrolling
const revealSections = function(entries, observer){
//console.log(entries);
entries.forEach(entry => {
if(!entry.isIntersecting)return;
entry.target.classList.remove('section--hidden');
observer.unobserve(entry.target);
});
}
const sectionsObserver = new IntersectionObserver(revealSections, {
root: null,
threshold: 0.15,
});

allSections.forEach(section =>{
sectionsObserver.observe(section);
// section.classList.add('section--hidden');
})

//Lazy Loading IMG
const imgtargets = document.querySelectorAll('img[data-src]');
//console.log(imgtargets);
const loadingHiResImg = function(entries, observer) {
const [entry] = entries;
//console.log(entry);
if(!entry.isIntersecting) return;
entry.target.src = entry.target.dataset.src;
entry.target.addEventListener('load', function(){
entry.target.classList.remove('lazy-img')
});
observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(loadingHiResImg, {
root: null,
threshold: 0,
rootMargin: '200px'
})
imgtargets.forEach(img => imgObserver.observe(img));

//Slider
const slider = function (){
const slides = document.querySelectorAll('.slide');
// console.log(slides);
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
let maxSlide = slides.length;
//making slides visible
// slider.style.transform = 'scale(0.2) translateX(-1200px)';
// slider.style.overflow = 'visible';

//Functions
const createDots = function(){
slides.forEach(function(_, i){
dotContainer.insertAdjacentHTML('beforeend',`<button class = 'dots__dot' data-slide = "${i}"></button>`)
});
};


const activeDot = function(slide){
document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
document.querySelector(`.dots__dot[data-slide = "${slide}"]`).classList.add('dots__dot--active')
};


const goToSlide = function(slide){
slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
}


//next slide
const nextSlide = function(){
if(curSlide === maxSlide - 1){
curSlide = 0;
}else{
curSlide++;
}
goToSlide(curSlide);
activeDot(curSlide);
}
const previousSlide = function(){
if (curSlide === 0){
curSlide = maxSlide - 1;
}else{
curSlide--;
}
goToSlide(curSlide);
activeDot(curSlide);
};

const init = function(){
goToSlide(0);
createDots();
activeDot(0);
}
init();

//Event handlers
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function(e){
//console.log(e);
e.key === 'ArrowLeft' && previousSlide();
e.key === 'ArrowRight' && nextSlide();
})

dotContainer.addEventListener('click', function(e){
if(e.target.classList.contains('dots__dot')){
curSlide = Number(e.target.dataset.slide);
goToSlide(curSlide);
activeDot(curSlide);
}
});
};
slider();






// const allSections2 = document.querySelectorAll('.section');
// const revealSections = function(entries, observer){
// const [entry] = entries;
// console.log(entry);
// if(!entry.isIntersecting) return;
// entry.target.classList.remove('section--hidden');
// observer.unobserve(entry.target)
// }
// const sectionObserver = new IntersectionObserver(revealSections, {
// root: null,
// threshold: 0.1
// })
// allSections2.forEach(section => {
// sectionObserver.observe(section);
// section.classList.add('section--hidden');
// })



// const handleHover = function(e, opacity){
// console.log(this);
// if(e.target.classList.contains('nav__link')){
// const link = e.target;
// const siblings = link.closest('.nav').querySelectorAll('.nav__link');
// const logo = link.closest('.nav').querySelector('img');

// siblings.forEach(el => {
// if (el !== link) el.style.opacity = this;
// });
// logo.style.opacity = this;
// }
// };
// nav.addEventListener('mouseover', handleHover.bind(0.5));
// nav.addEventListener('mouseout', handleHover.bind(1));

//scrolling
// window.scrollTo({
// left: s1coords.left +window.scrollX,
// top: s1coords.top + window.scrollY,
// behavior: 'smooth',
// });
// section1.scrollIntoView({behavior: "smooth"});
// })

//Mouse event
//const h1 = document.querySelector('h1');
// h1.addEventListener('click', function(e){
// alert('You are reading h1')
// })
// const h1Alert = function(e){
// alert('This h1 message will go away at 5 seconds')};
// h1.addEventListener('mouseenter', h1Alert);
// setTimeout(() => h1.removeEventListener('mouseenter', h1Alert), 1000);

//Event propagation: bubbling & capturing
// const randomInt = (min, max) => Math.floor(Math.random() * (max-min + 1)+ min);
// const randomColors = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
