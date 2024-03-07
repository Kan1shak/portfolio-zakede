// check if the screen size is less than 768px
const isMobile = () => window.innerWidth < 768;

// if it is mobile, add the click event to the project items

const hamburger = document.querySelector('.hamburger');

hamburger?.addEventListener('click', () => {
    const nav = document.querySelector('.nav-links-holder');
    nav.classList.toggle('active');
    document.querySelector('.logo-holder').classList.toggle('active');
    document.querySelector('.hamburger').classList.toggle('active');
    document.querySelector('nav').classList.toggle('active');
});