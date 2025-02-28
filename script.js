// Table of contents
// 1. Slideshow 
// 2. Blog posts
// 3. Back buttons
// 4. Email popup
// 5. Info.txt

// ============================
// ===== 1. Slideshow =====
// ============================

document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    // ✅ Function to switch slides
    function showNextSlide() {
        // ✅ Hide the current slide
        slides[currentSlide].classList.remove("active");
        slides[currentSlide].style.opacity = "0"; 
        
        setTimeout(() => {
            slides[currentSlide].style.display = "none"; // ✅ Fully hide old slide
    
            // ✅ Move to the next slide
            currentSlide = (currentSlide + 1) % slides.length;
    
            // ✅ Show the new slide
            slides[currentSlide].style.display = "block";
            setTimeout(() => {
                slides[currentSlide].classList.add("active");
                slides[currentSlide].style.opacity = "1"; // ✅ Fade in new slide
            }, 50);
        }, 1000); // ✅ Matches transition duration
    }
    
    // ✅ Ensure the first slide is visible on page load
    slides.forEach((slide, index) => {
        if (index === 0) {
            slide.classList.add("active");
            slide.style.display = "block";
            slide.style.opacity = "1";
        } else {
            slide.style.display = "none";
        }
    });
    
    // ✅ Start Slideshow Interval
    setInterval(showNextSlide, 4000);
    

    // ✅ Start Slideshow Interval
    setInterval(showNextSlide, 4000);
});


// ============================
// ===== 2. Blog posts =====
// ============================

// Load all blog posts (Excerpts Only for blog.html)
console.log("✅ Blog script is running!");

fetch("/blog.json")
    .then(response => response.json())
    .then(posts => {
        console.log("✅ Blog JSON Loaded:", posts);
        let blogContainer = document.getElementById("blog-section");
        blogContainer.innerHTML = ""; // ✅ Clears previous content

        posts.forEach(post => {
            console.log("Raw blog content:", post.content); // ✅ Debugging (inside loop)

            let blogPost = document.createElement("div");
            blogPost.classList.add("blog-post");

            let image = document.createElement("img");
            image.src = post.image;
            image.alt = post.title;
            image.classList.add("blog-image");  // ✅ Adds class to the image

            let title = document.createElement("h3");
            title.innerText = post.title;

            let date = document.createElement("p");
            date.innerHTML = `<small>${post.date}</small>`;

            let excerpt = document.createElement("p"); // ✅ Ensures only an excerpt appears in blog.html
            excerpt.innerText = post.excerpt ? post.excerpt : post.content.substring(0, 100) + "...";

            let readMore = document.createElement("a");
            readMore.href = `blog-post.html?post=${post.slug}`;
            readMore.classList.add("read-more");
            readMore.innerText = "Read More";

            blogPost.appendChild(image);
            blogPost.appendChild(title);
            blogPost.appendChild(date);
            blogPost.appendChild(excerpt); // ✅ Adds excerpt
            blogPost.appendChild(readMore);

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

    // ✅ Load full blog post for blog-post.html
if (document.querySelector("#post-content")) {  // ✅ Ensures this only runs on blog-post.html
    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get("post");

    fetch("/blog.json")
        .then(response => response.json())
        .then(posts => {
            let post = posts.find(p => p.slug.toLowerCase() === postSlug.toLowerCase());
            if (!post) {
                document.getElementById("post-title").innerText = "Post Not Found";
                return;
            }            
            let postTitle = document.getElementById("post-title");
            let postDate = document.getElementById("post-date");
            let postContent = document.getElementById("post-content");
            
            console.log("🔍 Found Elements:", { postTitle, postDate, postContent });            
            
            document.getElementById("post-title").innerText = post.title;
            document.getElementById("post-date").innerText = post.date;

            let formattedContent = post.content
                .replace(/##\s*(.+)/g, "<h2>$1</h2>")  // ✅ Converts `## Heading` into `<h2>Heading</h2>`
                .replace(/\n{2,}/g, "</p><p>")  // ✅ Converts double line breaks into paragraphs
                .replace(/\n/g, " ");  // ✅ Ensures proper spacing

            document.getElementById("post-content").innerHTML = formattedContent; // ✅ Shows full blog post in blog-post.html

            if (post.image) {
                let imgElement = document.getElementById("post-image");
                imgElement.src = post.image;
                imgElement.style.display = "block";
            }
        })
        .catch(error => console.log("Error loading blog post:", error));
}

// ============================    
// ===== 3. Back buttons =====
// ============================

// Ensure back buttons are visible
let mainBackButton = document.getElementById("back-button");
if (mainBackButton) {
    mainBackButton.style.opacity = "1";
}

let headerBackButton = document.getElementById("header-back-button");
if (headerBackButton) {
    headerBackButton.style.opacity = "1";
}

// ============================
// ===== 4. Email popup =====
// ============================

// EMAIL POPUP FUNCTIONALITY
document.addEventListener("DOMContentLoaded", function () { 
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
});  


    // ============================
    // ===== 5. Info.txt =====
    // ============================

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
        } else {
            console.error("❌ Error: #static-text not found in the document.");
        }
    })
    .catch(error => console.log("Error loading text file:", error));
