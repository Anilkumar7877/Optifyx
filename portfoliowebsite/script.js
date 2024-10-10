console.log("hello world ji ji ")
// JavaScript for horizontal infinite scroll
const scrollContainer = document.getElementById('scroll-container');
const scrollContent = document.getElementById('scroll-content');

// Clone the content to create the illusion of infinite scroll
const clone = scrollContent.cloneNode(true);
scrollContainer.appendChild(clone);

let scrollSpeed = 1;  // Speed of scroll

function horizontalScroll() {
    // Scroll horizontally
    scrollContainer.scrollLeft += scrollSpeed;

    // If the scroll position reaches the end, reset to the start
    if (scrollContainer.scrollLeft >= scrollContent.scrollWidth) {
        scrollContainer.scrollLeft = 0;
    }

    // Continue scrolling
    requestAnimationFrame(horizontalScroll);
}

// Start the scrolling
horizontalScroll();
