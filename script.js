// Slideshow functionality
function showNextSlide() {
    slides[currentSlide].style.opacity = "0";
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.opacity = "1";
}

// Debugging message to confirm script is running
console.log("✅ script.js is running!");

// Initialize slideshow images
const slides = document.querySelectorAll(".hero-slideshow img");
let currentSlide = 0;
setInterval(showNextSlide, 4000);

// FAQ Toggle functionality
document.querySelectorAll(".faq-question").forEach(question => {
    question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
});

// Load all blog posts
fetch("/blog.json")
    .then(response => response.json())
    .then(posts => {
        let blogContainer = document.getElementById("blog-section");
        blogContainer.innerHTML = "";

        posts.forEach(post => {
            let blogPost = document.createElement("div");
            blogPost.classList.add("blog-post");

            let imageHTML = post.image ? `<img src="${post.image}" alt="${post.title}">` : "";
            let excerpt = post.excerpt ? post.excerpt : post.content.substring(0, 100) + "...";

            blogPost.innerHTML = `
                ${imageHTML}
                <h3>${post.title}</h3>
                <p><small>${post.date}</small></p>
                <p>${excerpt}</p>
                <a href="blog-post.html?post=${post.slug}" class="read-more">Read More</a>
            `;

            blogContainer.appendChild(blogPost);
        });
    })
    .catch(error => console.log("Error loading blog posts:", error));

// Load latest blog post for homepage
fetch("/blog.json")
    .then(response => response.json())
    .then(posts => {
        let blogContainer = document.getElementById("latest-blog-post");
        blogContainer.innerHTML = "";

        if (!posts || posts.length === 0) {
            blogContainer.innerHTML = "<p>No blog posts available.</p>";
            return;
        }

        let latestPost = posts[0];
        let imageHTML = latestPost.image ? `<img src="${latestPost.image}" alt="${latestPost.title}">` : "";
        let excerpt = latestPost.excerpt ? latestPost.excerpt : latestPost.content.substring(0, 100) + "...";

        blogContainer.innerHTML = `
            ${imageHTML}
            <h3>${latestPost.title}</h3>
            <p><small>${latestPost.date}</small></p>
            <p>${excerpt}</p>
            <a href="blog-post.html?post=${latestPost.slug}" class="read-more">Read More</a>
        `;
    })
    .catch(error => console.log("Error loading latest blog post:", error));

// Ensure back buttons are visible
let mainBackButton = document.getElementById("back-button");
if (mainBackButton) {
    mainBackButton.style.opacity = "1";
}

let headerBackButton = document.getElementById("header-back-button");
if (headerBackButton) {
    headerBackButton.style.opacity = "1";
}

// EMAIL POPUP FUNCTIONALITY
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ script.js is running!");

    const popup = document.getElementById("email-popup");
    const closePopup = document.querySelector(".close-popup");
    const emailForm = document.getElementById("email-form");

    if (popup) {
        // Show popup after 10 seconds
        setTimeout(function () {
            console.log("Triggering email popup...");
            popup.style.visibility = "visible";
            popup.style.opacity = "1";
        }, 10000);

        // Close popup when clicking "X"
        if (closePopup) {
            closePopup.addEventListener("click", function () {
                console.log("Closing popup...");
                popup.style.visibility = "hidden";
                popup.style.opacity = "0";
            });
        }

        // Close popup when clicking outside the popup content
        popup.addEventListener("click", function (event) {
            if (event.target === popup) {
                console.log("Closing popup from outside click...");
                popup.style.visibility = "hidden";
                popup.style.opacity = "0";
            }
        });
    }

    // EMAIL FORM SUBMISSION
    if (emailForm) {
        emailForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const email = document.getElementById("email-input").value;

            try {
                const response = await fetch("/.netlify/functions/subscribe", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: email })
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("User subscribed:", data);
                    alert("Thank you for subscribing!");
                    popup.style.visibility = "hidden";
                } else {
                    console.error("Error subscribing:", data.error);
                    alert("There was an issue subscribing. Please try again.");
                }
            } catch (error) {
                console.error("Error subscribing:", error);
                alert("There was an issue subscribing. Please try again.");
            }
        });
    }

    // Load static text from info.txt
    fetch("/info.txt")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch info.txt");
        }
        return response.text();
    })
    .then(text => {
        const staticText = document.getElementById("static-text");
        if (staticText) {
            staticText.innerText = text;
        }
    })
    .catch(error => console.log("Error loading text file:", error));

});
