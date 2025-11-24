// Initialize particles background
function initParticles() {
  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 150,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#999"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.3,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 2,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#999",
        "opacity": 0.2,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 40,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
}

// Typing animation for loader
function showLoader() {
  const letters = document.querySelectorAll('.letter, .dot');
  
  // Create typing effect - show letters one by one
  setTimeout(() => {
    letters.forEach((letter, index) => {
      setTimeout(() => {
        // Trigger the typing animation for each letter
        letter.style.opacity = '1';
        letter.style.transform = 'scale(1) translateY(0)';
        letter.style.animation = 'typeIn 0.3s ease-out forwards';
      }, index * 120); // 120ms delay between each letter for faster typing
    });
  }, 500);

  // Calculate total typing time + pause before fade out
  const totalTypingTime = letters.length * 120 + 250; // +250ms pause after typing
  
  // Start fade out sequence after typing completes
  setTimeout(() => {
    const loader = document.getElementById('loader');
    const loaderText = document.querySelector('.loader-text');
    const mainContent = document.getElementById('mainContent');
    
    // Fade out letters first
    loaderText.classList.add('fade-out');
    
    // Then fade out entire loader
    setTimeout(() => {
      loader.classList.add('fade-out');
      
      // Show main content with smooth entrance
      setTimeout(() => {
        mainContent.classList.add('show');
      }, 200);
      
      // Hide loader completely after transition
      setTimeout(() => {
        loader.style.display = 'none';
      }, 800);
    }, 400);
  }, totalTypingTime);
}

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
  initParticles(); // Start particles immediately
  showLoader();    // Start loader sequence
  
  // Initialize flip functionality
  const flipInner = document.getElementById("flipInner");
  const flipBtn = document.getElementById("flipBtn");
  const flipCard = document.querySelector(".flip-card");
  
  lucide.createIcons();
  
  const flipIcon = flipBtn.querySelector('[data-lucide="rotate-cw"]');
  
  flipBtn.addEventListener('click', () => {
    flipInner.classList.toggle("flipped");
    
    // Immediately update tilt direction after flip
    const isFlipped = flipInner.classList.contains('flipped');
    const currentFlip = isFlipped ? 'rotateY(180deg)' : '';
    
    // Reset any current tilt and apply flip immediately
    flipInner.style.transform = currentFlip;
    flipInner.style.transition = 'transform 0.9s cubic-bezier(.6,.04,.3,1)';
    
    if (flipIcon) {
      flipIcon.classList.add('spin');
      setTimeout(() => flipIcon.classList.remove('spin'), 900);
    }
  });
  
  // 3D Tilt Effect on Mouse Move
  flipCard.addEventListener('mousemove', (e) => {
    const rect = flipCard.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Check if card is flipped and reverse tilt direction
    const isFlipped = flipInner.classList.contains('flipped');
    const tiltMultiplier = isFlipped ? -1 : 1;
    
    const rotateX = (mouseY / rect.height) * -15 * tiltMultiplier; // Reverse X on flip
    const rotateY = (mouseX / rect.width) * 15 * tiltMultiplier;   // Reverse Y on flip
    
    // Apply tilt while preserving flip state
    const currentFlip = isFlipped ? 'rotateY(180deg)' : '';
    flipInner.style.transform = `${currentFlip} rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    flipInner.style.transition = 'transform 0.1s ease-out';
  });
  
  // Reset tilt on mouse leave
  flipCard.addEventListener('mouseleave', () => {
    const currentFlip = flipInner.classList.contains('flipped') ? 'rotateY(180deg)' : '';
    flipInner.style.transform = currentFlip;
    flipInner.style.transition = 'transform 0.5s ease-out';
    
    // Restore original flip transition after reset
    setTimeout(() => {
      flipInner.style.transition = 'transform 0.9s cubic-bezier(.6,.04,.3,1)';
    }, 500);
  });
  
  // Ensure flip button works immediately by resetting tilt on button hover
  flipBtn.addEventListener('mouseenter', () => {
    const currentFlip = flipInner.classList.contains('flipped') ? 'rotateY(180deg)' : '';
    flipInner.style.transform = currentFlip;
    flipInner.style.transition = 'transform 0.2s ease-out';
  });
});