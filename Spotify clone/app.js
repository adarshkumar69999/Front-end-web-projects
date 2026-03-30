const albumsContainer = document.getElementById("albums");
const musicPlayer = document.getElementById("musicPlayer");
const playerCover = document.getElementById("playerCover");
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");
const audio = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "3f70b70e8emshe735d09f920e977p14ae9fjsn3b7ef4a32471",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
  }
};

async function fetchAlbums(query = "Arijit") {
  try {
    const res = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`, options);
    const data = await res.json();
    displayAlbums(data.data);
  } catch (error) {
    console.error("Error fetching albums:", error);
  }
}

function displayAlbums(albums) {
  albumsContainer.innerHTML = "";
  albums.forEach((album) => {
    const card = document.createElement("div");
    card.className = "album";
    card.innerHTML = `
      <img src="${album.album.cover_medium}" alt="cover">
      <h4>${album.title}</h4>
      <p>${album.artist.name}</p>
    `;
    card.addEventListener("click", () => playSong(album));
    albumsContainer.appendChild(card);
  });
}

function playSong(track) {
  audio.src = track.preview;
  audio.play();
  playerCover.src = track.album.cover_medium;
  playerTitle.textContent = track.title;
  playerArtist.textContent = track.artist.name;
  musicPlayer.classList.add("show");
  playPauseBtn.textContent = "pause";
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "pause";
  } else {
    audio.pause();
    playPauseBtn.textContent = "play_arrow";
  }
}

function stopSong() {
  audio.pause();
  audio.currentTime = 0;
  playPauseBtn.textContent = "play_arrow";
}

// Search functionality
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchAlbums(searchInput.value);
  }
});

// Initial load
fetchAlbums();
