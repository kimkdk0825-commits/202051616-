// Intro Cinematic Controller

document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro-overlay');
    const body = document.body;
    
    // Lock scroll during intro
    body.classList.add('locked');
    
    // Hide intro after 5 seconds
    setTimeout(() => {
        intro.classList.add('intro-fade-out');
        body.classList.remove('locked');
        
        // Remove from DOM after transition
        setTimeout(() => {
            intro.remove();
        }, 1000);
    }, 5000);
});
