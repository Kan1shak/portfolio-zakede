const contactImage = document.querySelector('.contact-image img');
if (isMobile()) {
    contactImage.src = '/images/Contact_Me.png';
} else {
    contactImage.src = '/images/Contact_Me.gif';
}