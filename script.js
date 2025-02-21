// Slideshow
const slides = document.querySelectorAll(".hero-slideshow img");
let currentSlide = 0;

function showNextSlide() {
    slides[currentSlide].style.opacity = "0";
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.opacity = "1";
}

setInterval(showNextSlide, 4000); // Change image every 4 seconds

// FAQ Expandable 
document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const answer = button.nextElementSibling;
        answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
});

// Blog script
fetch('/blog.json')
    .then(response => response.json())
    .then(posts => {
        let blogContainer = document.getElementById('blog-section');
        blogContainer.innerHTML = "";

        posts.forEach(post => {
            let blogPost = document.createElement('div');
            blogPost.classList.add('blog-post');

            let imageHTML = post.image ? `<img src="${post.image}" alt="${post.title}">` : "";

            // Ensure 'excerpt' exists; if not, generate one
            let excerpt = post.excerpt ? post.excerpt : post.content.substring(0, 100) + "...";

            blogPost.innerHTML = `
                ${imageHTML}
                <h3>${post.title}</h3>
                <p><small>${post.date}</small></p>
                <p>${excerpt}</p>
                <a href="#">Read More</a>
            `;

            blogContainer.appendChild(blogPost);
        });
    })
    .catch(error => console.log('Error loading blog posts:', error));