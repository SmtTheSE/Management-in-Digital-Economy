document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const slidesContainer = document.getElementById('slides-container');
    const slideCounter = document.getElementById('current-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Get all slides
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    // Update the display to show the current slide
    function showSlide(n) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Update current slide index
        currentSlide = (n + slides.length) % slides.length;
        
        // Show current slide
        slides[currentSlide].classList.add('active');
        
        // Update slide counter
        slideCounter.textContent = currentSlide + 1;
        
        // Update navigation buttons
        updateNavButtons();
    }
    
    // Update navigation buttons state
    function updateNavButtons() {
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === slides.length - 1;
    }
    
    // Next slide function
    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            showSlide(currentSlide + 1);
        }
    }
    
    // Previous slide function
    function prevSlide() {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    }
    
    // Add event listeners to navigation buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
    
    // Initialize the presentation
    showSlide(currentSlide);
    
    // Add touch swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for swipe to be considered
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swiped left - go to next slide
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swiped right - go to previous slide
            prevSlide();
        }
    }
    
    // Add click functionality to visualizations to show/hide details
    const visualizations = document.querySelectorAll('.visualization');
    visualizations.forEach(vis => {
        vis.addEventListener('click', function() {
            // In a real implementation, this would show a detailed visualization of the concept
            // For now, we'll just log the click
            console.log('Visualization clicked - would show detailed view in full implementation');
        });
    });
});