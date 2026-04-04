// ===== PNG SEQUENCE ANIMATION =====

// Configuration - adjust these values based on your PNG sequence
const config = {
    folderPath: 'assets/frames/',  // Path to folder containing PNG frames
    framePrefix: 'frame_',          // Prefix of frame files (e.g., 'frame_' for 'frame_0001.png')
    frameExtension: '.png',         // File extension
    totalFrames: 90,                // Total number of frames in sequence
    frameRate: 30,                  // Frames per second (30 fps for smooth animation)
    padDigits: 4                    // Number of digits in frame numbers (e.g., 4 for '0001')
};

class CubeAnimation {
    constructor(elementId, config) {
        this.element = document.getElementById(elementId);
        this.config = config;
        this.frames = [];
        this.currentFrame = 0;
        this.isPlaying = false;
        this.frameInterval = null;

        this.init();
    }

    // Generate frame filename with proper padding
    getFrameName(frameNumber) {
        const paddedNumber = String(frameNumber).padStart(this.config.padDigits, '0');
        return `${this.config.folderPath}${this.config.framePrefix}${paddedNumber}${this.config.frameExtension}`;
    }

    // Preload all frames for smooth animation
    async preloadFrames() {
        const loadPromises = [];

        for (let i = 1; i <= this.config.totalFrames; i++) {
            const promise = new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    this.frames[i - 1] = img.src;
                    resolve();
                };
                img.onerror = () => {
                    console.warn(`Failed to load frame ${i}: ${this.getFrameName(i)}`);
                    resolve(); // Continue even if a frame fails
                };
                img.src = this.getFrameName(i);
            });

            loadPromises.push(promise);
        }

        await Promise.all(loadPromises);
        console.log(`Preloaded ${this.frames.length} frames`);
    }

    // Display specific frame
    showFrame(frameNumber) {
        if (this.frames[frameNumber]) {
            this.element.style.backgroundImage = `url('${this.frames[frameNumber]}')`;
        }
    }

    // Start animation loop
    play() {
        if (this.isPlaying) return;

        this.isPlaying = true;
        const frameDelay = 1000 / this.config.frameRate; // ms per frame

        this.frameInterval = setInterval(() => {
            this.showFrame(this.currentFrame);
            this.currentFrame = (this.currentFrame + 1) % this.config.totalFrames;
        }, frameDelay);
    }

    // Stop animation
    stop() {
        this.isPlaying = false;
        if (this.frameInterval) {
            clearInterval(this.frameInterval);
            this.frameInterval = null;
        }
    }

    // Initialize and start animation
    async init() {
        try {
            await this.preloadFrames();

            if (this.frames.length > 0) {
                this.showFrame(0); // Show first frame
                this.play(); // Start animation
            } else {
                console.error('No frames loaded successfully');
            }
        } catch (error) {
            console.error('Error initializing cube animation:', error);
        }
    }
}

// Initialize cube animation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const cubeAnimation = new CubeAnimation('cubeAnimation', config);
});
