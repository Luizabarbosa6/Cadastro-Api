// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const indicators = document.querySelectorAll('.indicators li');
    const number = document.querySelector('.indicators .number');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');


   
    

    let currentIndex = 0;

    function updateActiveItem(index) {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });

        number.textContent = `0${index + 1}`;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateActiveItem(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateActiveItem(currentIndex);
    });

    
    
    updateActiveItem(currentIndex);
});