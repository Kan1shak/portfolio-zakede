const projectItems = document.querySelectorAll('.projects-item');

projectItems?.forEach(addQuickView);

if (isMobile){
    document.querySelector('header img').src = '/images/Website_Top_Animation.png';
}