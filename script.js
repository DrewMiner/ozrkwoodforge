const slides = document.querySelectorAll(".hero-slideshow img");
let currentSlide = 0;

function showNextSlide() {
    slides[currentSlide].style.opacity = "0";
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.opacity = "1";
}

setInterval(showNextSlide, 4000); // Change image every 4 seconds
