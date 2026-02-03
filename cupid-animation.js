// Random floating cupid animations
function animateCupid(cupidElement, index) {
    // Random starting position (start from random edge)
    const startSide = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
    let x, y;

    switch(startSide) {
        case 0: // top
            x = Math.random() * window.innerWidth;
            y = -100;
            break;
        case 1: // right
            x = window.innerWidth + 100;
            y = Math.random() * window.innerHeight;
            break;
        case 2: // bottom
            x = Math.random() * window.innerWidth;
            y = window.innerHeight + 100;
            break;
        case 3: // left
            x = -100;
            y = Math.random() * window.innerHeight;
            break;
    }

    let rotation = Math.random() * 360;

    // Random target position within viewport
    let targetX = Math.random() * window.innerWidth;
    let targetY = Math.random() * window.innerHeight;

    // Different speeds for each cupid
    const baseSpeed = 0.5 + Math.random() * 1;
    const rotationSpeed = (Math.random() - 0.5) * 3;

    // Small stagger per cupid (100ms each) for smooth entrance
    const delay = index * 100;

    let animationRunning = false;

    function animate() {
        if (!animationRunning) return;

        // Calculate distance to target
        const dx = targetX - x;
        const dy = targetY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If close to target, pick a new random target within bounds
        if (distance < 50) {
            targetX = Math.random() * window.innerWidth;
            targetY = Math.random() * window.innerHeight;
        }

        // Move towards target
        if (distance > 0) {
            x += (dx / distance) * baseSpeed;
            y += (dy / distance) * baseSpeed;
        }
        rotation += rotationSpeed;

        // Keep cupids within viewport bounds (with small buffer)
        const buffer = 70; // cupid size
        if (x < -buffer) {
            x = window.innerWidth + buffer;
        }
        if (x > window.innerWidth + buffer) {
            x = -buffer;
        }
        if (y < -buffer) {
            y = window.innerHeight + buffer;
        }
        if (y > window.innerHeight + buffer) {
            y = -buffer;
        }

        // Apply transforms
        cupidElement.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

        requestAnimationFrame(animate);
    }

    // Start animation after delay
    setTimeout(() => {
        cupidElement.style.opacity = '0.6';
        animationRunning = true;
        animate();
    }, delay);
}

// Initialize all cupids
document.addEventListener('DOMContentLoaded', () => {
    console.log('Cupid animation script loaded');

    const cupids = document.querySelectorAll('.cupid');
    console.log(`Found ${cupids.length} cupid elements`);

    cupids.forEach((cupid, index) => {
        console.log(`Animating cupid ${index + 1}`);
        animateCupid(cupid, index);
    });

    // Add extra animated cupids dynamically
    const heartsBackground = document.querySelector('.hearts-background');
    if (heartsBackground) {
        for (let i = 0; i < 3; i++) {
            const extraCupid = document.createElement('div');
            extraCupid.className = 'cupid-extra';
            extraCupid.style.position = 'fixed';
            extraCupid.style.left = '0';
            extraCupid.style.top = '0';
            extraCupid.style.width = '60px';
            extraCupid.style.height = '60px';
            extraCupid.style.backgroundImage = 'url("cupid.svg")';
            extraCupid.style.backgroundSize = 'contain';
            extraCupid.style.backgroundRepeat = 'no-repeat';
            extraCupid.style.opacity = '0';
            extraCupid.style.pointerEvents = 'none';
            extraCupid.style.willChange = 'transform, opacity';
            extraCupid.style.transition = 'opacity 1s ease-in';
            heartsBackground.appendChild(extraCupid);

            console.log(`Adding extra cupid ${i + 1}`);
            animateCupid(extraCupid, cupids.length + i);
        }
    }
});
