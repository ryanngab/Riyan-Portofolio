
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('open');
}

// Initialize Typewriter Effect
document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.querySelector('.span');
    if (typewriterElement) {
        const typewriter = new Typewriter(typewriterElement, {
            loop: true,
            delay: 75
        });

        typewriter
            .pauseFor(2500)
            .typeString('Web Developer')
            .pauseFor(2000)
            .deleteAll()
            .typeString('Backend Developer')
            .pauseFor(2000)
            .deleteAll()
            .typeString('Frontend Developer')
            .pauseFor(2000)
            .deleteAll()
            .typeString('Fullstack Developer')
            .pauseFor(2000)
            .deleteAll()
            .start();
    }

    // Initialize Tilt.js for image tilt effect
    VanillaTilt.init(document.querySelector('.img img'), {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5
    });

    // Initialize Canvas animation (e.g., stars background)
    const canvas = document.getElementById('star-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars = [];
        const numStars = 150;

        function createStars() {
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.8 + 0.2
                });
            }
        }

        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            stars.forEach(star => {
                ctx.globalAlpha = star.opacity;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function animateStars() {
            drawStars();
            requestAnimationFrame(animateStars);
        }

        createStars();
        animateStars();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawStars();
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Tilt.js for skill items
    VanillaTilt.init(document.querySelectorAll('.skill'), {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.3
    });

    // Optional: Add event listeners or additional JavaScript logic here
});

// JavaScript for handling filtering and modal

// JavaScript for handling filtering and modal

// Toggle filter functionality
const toggleButtons = document.querySelectorAll('.toggle-button');
const cards = document.querySelectorAll('.card');

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' class from all buttons
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        // Add 'active' class to clicked button
        button.classList.add('active');

        const filter = button.dataset.filter;
        cards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
function openModal() {
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}


let scene, camera, renderer, controls;

function init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = null; // Set the background to null for transparency

    // Camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(-4, 3, 6);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable alpha for transparency
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.enableZoom = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 2;

    // Load model
    const loader = new THREE.GLTFLoader();
    loader.load('./planet/scene.gltf', function (gltf) {
        const earth = gltf.scene;
        earth.scale.set(1, 1, 1); // Medium size
        earth.position.set(0, 0, 0); // Center the model at the origin
        scene.add(earth);
        animate();
    });

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    const container = document.getElementById('container');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

init(); // Call the init function to set everything up
