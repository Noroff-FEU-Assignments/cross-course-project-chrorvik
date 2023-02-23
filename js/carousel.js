const sliderContainer = document.querySelector('.slider-container');
const sliderControlsContainer = document.querySelector('.slider-controls');
const sliderControls = ['previous', 'next'];
const carouselItems = document.querySelectorAll('.carousel-item');

// Only the carousel in index.html

class Carousel {

    constructor(container, items, controls) {
        this.container = container;
        this.controls = controls;
        this.items = [...items];
    }

    updateSlider() {
        this.items.forEach(el => {
            el.classList.remove('carousel-item-1');
            el.classList.remove('carousel-item-2');
            el.classList.remove('carousel-item-3');
            el.classList.remove('carousel-item-4');
            el.classList.remove('carousel-item-5');
        });

        this.items.slice(0, 5).forEach((el, i) => {
            el.classList.add(`carousel-item-${i + 1}`);
        });
    }

    setCurrentState(direction) {
        if (direction.className == 'slider-controls-previous') {
            this.items.unshift(this.items.pop());
        } else {
            this.items.push(this.items.shift());
        }
        this.updateSlider();
    }

    setControls() {
        this.controls.forEach(control => {
            const btn = document.createElement('button');
            btn.className = `slider-controls-${control}`;
            btn.innerText = control === 'previous' ? '<' : '>';
            sliderControlsContainer.appendChild(btn);
        });
    }

    useControls() {
        const triggers = [...sliderControlsContainer.childNodes];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }
}

const sliderCarousel = new Carousel(sliderContainer, carouselItems, sliderControls);

sliderCarousel.setControls();
sliderCarousel.useControls();
