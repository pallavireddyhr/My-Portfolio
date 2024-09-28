let currentIndex = 0;
const pages = [
    "index.html",
    "about.html",
    "projects.html",
    "skills.html",
    "experience.html",
    "education.html",
    "certificates.html",
    "contact.html"
];

// Function to navigate to a different page based on direction
function navigate(direction) {
    currentIndex += direction;

    // Ensure currentIndex stays within bounds
    if (currentIndex < 0) {
        currentIndex = 0; // First page
    } else if (currentIndex >= pages.length) {
        currentIndex = pages.length - 1; // Last page
    }

    // Navigate to the selected page
    window.location.href = pages[currentIndex];
}

// Detect vertical swipe and scroll navigation
let startY = 0;
let isScrolling = false;

function handleScrollSwipe(event) {
    // Touch event: set starting point for swipe
    if (event.type === "touchstart") {
        startY = event.touches[0].clientY;
        isScrolling = false;
    }
    // Touch event: determine swipe direction and trigger navigation
    if (event.type === "touchmove") {
        const touchY = event.touches[0].clientY;
        if (!isScrolling && Math.abs(startY - touchY) > 30) { // Adjust threshold for swiping
            if (startY > touchY) {
                navigate(1); // Swipe up -> Next page
            } else {
                navigate(-1); // Swipe down -> Previous page
            }
            isScrolling = true;
        }
    }
    // Mouse scroll event: detect vertical scrolling
    if (event.type === "wheel" && Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        if (event.deltaY < -20) { // Adjust threshold for scroll up
            navigate(-1); // Scroll up -> Previous page
        } else if (event.deltaY > 20) { // Adjust threshold for scroll down
            navigate(1); // Scroll down -> Next page
        }
    }
}

// Add event listeners for touch and scroll
window.addEventListener("touchstart", handleScrollSwipe, false);
window.addEventListener("touchmove", handleScrollSwipe, false);
window.addEventListener("wheel", handleScrollSwipe, { passive: true });

// Ensure correct page is loaded based on URL
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();
    currentIndex = pages.indexOf(currentPage);

    if (currentIndex === -1) {
        console.error("Page not found in the list of pages:", currentPage);
    }
});
