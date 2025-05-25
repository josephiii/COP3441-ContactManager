const width = 1920;
const height = 1080;
const density = 3; // number of stars per 100x100 pixels
const numStars = Math.floor((width * height) / (100 * 100) * density);

const background = document.getElementById('background');
for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.top = `${Math.random() * height}px`;
    star.style.left = `${Math.random() * width}px`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    background.appendChild(star);
}