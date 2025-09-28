const music = document.getElementById('background-music');
const toggleButton = document.getElementById('music-toggle-btn');
const musicIcon = document.getElementById('music-icon');
let isPlaying = false;

toggleButton.addEventListener('click', () => {
    if (isPlaying) {
        music.pause();
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-play');
    } else {
        music.play();
        musicIcon.classList.remove('fa-play');
        musicIcon.classList.add('fa-pause');
    }
    isPlaying = !isPlaying;
});