document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pacmanLoading');
    const ctx = canvas.getContext('2d');


    canvas.width = 800;
    canvas.height = 600;

    // Pac-Man settings
    let pacManX = -40;
    const pacManSize = 30;
    let mouthOpenness = 0.2;
    let increasingMouth = true;


    function drawText(text, opacity) {
        ctx.fillStyle = `rgba(255, 255, 0, ${opacity})`; //
        ctx.font = '36px "Press Start 2P", monospace'; // Font style and size

        // Text positioning
        const textWidth = ctx.measureText(text).width;
        const textX = (canvas.width - textWidth) / 2;
        const textY = canvas.height / 2;

        // Draw the text
        ctx.fillText(text, textX, textY);
    }

    //  draw Pac-Man
    function drawPacMan(x, y) {
        //mouth movements
        if (increasingMouth) {
            mouthOpenness += 0.02;
            if (mouthOpenness >= 0.4) increasingMouth = false;
        } else {
            mouthOpenness -= 0.02;
            if (mouthOpenness <= 0.1) increasingMouth = true;
        }

        // Draw Pac-Man
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(x+15, y, pacManSize + 30, mouthOpenness * Math.PI, (2 - mouthOpenness) * Math.PI);
        ctx.lineTo(x, y);
        ctx.fill();
    }

    //  fade in and fade  out text
    function fadeOutText(text, callback) {
        let opacity = 1.0; // Starting opacity
        const fadeOut = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
            drawText(text, opacity);
            opacity -= 0.02;

            if (opacity <= 0) {
                callback();
            } else {
                requestAnimationFrame(fadeOut); // Continue fading
            }
        };
        fadeOut();
    }

    // Function to fade in text
    function fadeInText(text) {
        let opacity = 0; // Starting opacity
        const fadeIn = () => {
            drawText(text, opacity);
            opacity += 0.02;

            if (opacity < 1) {
                requestAnimationFrame(fadeIn);
            } else {
                animatePacMan(text); // Start animating Pac-Man after text is fully visible
            }
        };
        fadeIn();
    }

    // Function to animate Pac-Man
    function animatePacMan(text) {
        const textY = canvas.height / 2; // Vertical alignment for text and Pac-Man

        const animate = () => {
            // Clear a larger area around Pac-Man to prevent trailing effect
            ctx.clearRect(pacManX - pacManSize * 2, textY - pacManSize * 2, pacManSize * 4, pacManSize * 4);

            drawPacMan(pacManX, textY);

            pacManX += 6; // speed

            if (pacManX < canvas.width + pacManSize) {
                requestAnimationFrame(animate); // Continue animation until Pac-Man exits the screen
            } else {
                //redirect to credit roll
                window.location.href = "credits.html";
            }
        };
        animate();
    }

    function runSequence() {
        fadeInText("Group 15 presents..."), () => fadeOutText("Group 15 presents...", () => fadeInText("PAC-MAN"));
    }

    runSequence();
});