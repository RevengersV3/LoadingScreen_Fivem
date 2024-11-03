// Configuration
const CONFIG = {
    CURSOR_THROTTLE_MS: 10,
    AUDIO_VOLUME: 0.1,
    CIRCLES: [
        { width: 110, delay: 3 },
        { width: 150, delay: 7 },
        { width: 25, delay: 15, duration: 45 },
        { width: 15, delay: 2, duration: 35 },
        { width: 150, delay: 0, duration: 11 },
        { width: 80, delay: 0 },
        { width: 20, delay: 2, duration: 12 },
        { width: 20, delay: 4 },
        { width: 60, delay: 0, duration: 18 },
        { width: 20, delay: 0 }
    ]
};

// Gestionnaire du curseur personnalisé
class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('cursor');
        this.throttleTimeout = null;
        this.initEventListeners();
    }

    initEventListeners() {
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }

    handleMouseMove(event) {
        if (!this.throttleTimeout) {
            this.throttleTimeout = setTimeout(() => {
                this.updateCursorPosition(event);
                this.throttleTimeout = null;
            }, CONFIG.CURSOR_THROTTLE_MS);
        }
    }

    updateCursorPosition(event) {
        requestAnimationFrame(() => {
            this.cursor.style.transform = `translate(${event.pageX - 1}px, ${event.pageY + 1}px)`;
        });
    }
}

// Gestionnaire des cercles d'animation
class AnimationCircles {
    constructor() {
        this.container = document.getElementById('animationCircles');
        this.initCircles();
    }

    initCircles() {
        const circlesHTML = CONFIG.CIRCLES.map(circle => this.createCircleElement(circle)).join('');
        this.container.innerHTML = circlesHTML;
    }

    createCircleElement(circle) {
        const randomLeft = Math.random() * 100;
        const duration = circle.duration || 25;
        
        return `
            <li style="
                width: ${circle.width}px;
                height: ${circle.width}px;
                left: ${randomLeft}%;
                animation-delay: ${circle.delay}s;
                animation-duration: ${duration}s;
            "></li>
        `;
    }
}

// Gestionnaire audio
class AudioPlayer {
    constructor() {
        this.player = document.getElementById('audio-player');
        this.initAudio();
    }

    initAudio() {
        this.player.volume = CONFIG.AUDIO_VOLUME;
    }
}

// Gestionnaire de chargement
class LoadingManager {
    constructor() {
        this.initializeComponents();
    }

    initializeComponents() {
        this.cursor = new CustomCursor();
        this.circles = new AnimationCircles();
        this.audio = new AudioPlayer();
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    window.loadingManager = new LoadingManager();
});