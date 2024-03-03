const portFolioItems = document.querySelectorAll('.portfolio-item')
let totallyNotSneaky = 0;

const showQuickView = (id, title, content, image) => {
    const quickView = document.querySelector('.quickview');
    const quickViewHolder = document.querySelector('.quickview-holder');
    quickViewHolder.classList.add('active');
    quickView.querySelector('h2').textContent = title;
    quickView.querySelector('p').innerHTML = content;
    const quickViewImage = quickView.querySelector('.quickview-image');
    const img = document.createElement('img');
    img.src = image.slice(5, -2);
    quickViewImage.innerHTML = '';
    quickViewImage.appendChild(img);
    quickViewImage.addEventListener('click', () => {
        totallyNotSneaky++;
        if(totallyNotSneaky % 7 === 0) {
            quickViewImage.innerHTML = '';
            img.src = '/images/logo.png';
            quickViewImage.appendChild(img);
            quickViewImage.classList.add('egg');
        }else if(quickViewImage.classList.contains('egg')) {
            quickViewImage.innerHTML = '';
            img.src = image.slice(5, -2);
            quickViewImage.appendChild(img);
            quickViewImage.classList.remove('egg');
        }
        if(totallyNotSneaky > 100) {
            const imgList = document.querySelectorAll('.portfolio-item');
            imgList.forEach(item => {
                item.style.backgroundImage = 'url("/images/logo.png")';
                item.classList.add('really-huh');
            });
        }
    });
    const close = document.querySelector('#quickview-close');
    close.addEventListener('click', () => {
        quickViewHolder.classList.remove('active');
    });
}

const addQuickView = (item) => {
    item.addEventListener('click', () => {
        const id = item.querySelector('span').textContent;
        const title = item.querySelector('h2').textContent;
        const content = item.querySelector('p').textContent;
        const image = item.style.backgroundImage;
        showQuickView(id, title, content, image);
    });
}

portFolioItems?.forEach(addQuickView);