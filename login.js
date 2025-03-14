document.addEventListener("DOMContentLoaded", () => {
    // ============= LOCAL STORAGE ===============
    const usernameInput = document.querySelector("#login input");
    usernameInput.value = localStorage.getItem("username") || "";

    usernameInput.addEventListener("input", () => {
        localStorage.setItem("username", usernameInput.value);
    });

    // ======== CANVAS BACKGROUND =========
    const canvas = document.getElementById("background-canvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    
    let particles = [];

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 3 + 1;
            this.alpha = Math.random() * 0.8 + 0.2;
            this.speed = Math.random() * 0.5 + 0.2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.fill();
        }

        update() {
            this.y -= this.speed;
            this.alpha -= 0.002;

            if (this.alpha <= 0 || this.y < 0) {
                this.reset();
            }
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle) => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    window.addEventListener("resize", () => {
        resizeCanvas();
        initParticles();
    });

    initParticles();
    animateParticles();

    // ===== REDIRECTION VERS Menu.html =======
    const btnConnect = document.querySelector("button");
    const passwordInput = document.querySelector("#pwd input");

    btnConnect.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === "" || password === "") {
            alert("Veuillez entrer un nom d'utilisateur et un mot de passe");
            return;
        }

        localStorage.setItem("username", username);
        window.location.href = "Menu.html";
    });
});
