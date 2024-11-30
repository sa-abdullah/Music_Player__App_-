const mainPlaylistSongs = document.getElementById('playlist_songs_main');
const playButton = document.getElementById("play");
const pauseButton = document.getElementById('pause');
const prevButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const shuffleButton = document.getElementById('shuffle');
const searchIcon = document.getElementById('search_icon');
const searchInput = document.getElementById('search');

const everyMusic = [
  {
    id: 0, 
    title: "Scratching The Surface",
    artist: "Justin Bieber",
    duration: "4:25",
    cover: "/assets/imgs/guitar_player.avif", 
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
    // src: "./assets/audioFiles/stylish_electronic.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    cover: "",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    cover: "",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    cover: "",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    cover: "",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    cover: "",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    cover: "",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    cover: "",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    cover: "",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    cover: "",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
  },
];

const audio = new Audio (); 

let userActions = {
  musics: [...everyMusic],
  currentMusic: null,
  musicCurrentTime: 0,
};
const playSong = (id) => {
  const song = userActions?.musics.find((song) => song.id === id); 
  audio.src = song.src; 
  audio.title = song.title; 

  if (userActions?.currentMusic === null || userActions?.currentMusic.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userActions?.musicCurrentTime; 
  }

  userActions.currentMusic = song; 
  playButton.classList.add("playing");
  setDisplayTexts();
  audio.play();
}; 

const pauseSong = (id) => {
  userActions.musicCurrentTime = audio.currentTime; 
  pauseButton.classList.remove("playing");
  audio.pause();
}; 

const playPrevSong = (id) => {
  let prevSong;

  if (userActions.currentMusic === null) {
    return
  }

  else if (userActions.currentMusic === userActions.musics[0]) {
    prevSong = userActions.musics[userActions.musics.length - 1]
  } 
  
  else {
    const currentMusicIndex = getCurrentMusicIndex();
    prevSong = userActions.musics[currentMusicIndex - 1]
  };
  playSong(prevSong.id)
};

const playNextSong = () => {
  let nextSong;
  if (userActions.currentMusic === null) {
     nextSong = userActions.musics[0];
  }
  else {
    const currentMusicIndex = getCurrentMusicIndex();
    nextSong = userActions.musics[currentMusicIndex + 1];
  };
  playSong(nextSong.id);
}

const shuffleSong = () => {
  userActions.musics.sort(() => Math.random() - 0.5);
  userActions.currentMusic = null; 
  userActions.musicCurrentTime = 0; 

  exhibitSongs(userActions.musics);
  pauseSong();
};

const deleteSong = (id) => {

  userActions.musics = userActions.musics.filter((song) => song.id !== id);
  exhibitSongs(userActions.musics); 
  showResetButton();

  if (userActions.currentMusic.id === id) {
      userActions.currentMusic = null;
      userActions.musicCurrentTime = 0;

      setDisplayTexts()
      pauseSong();
  } 
  
  return 
};

const showResetButton = () => {
  if (userActions.musics.length === 0) {
    const resetButton = document.createElement("button"); 
    const resetText = document.createTextNode("Reset the Playlist");
  
    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset Playlist";
    resetButton.className = "reset"
  
    resetButton.appendChild(resetText);
    mainPlaylistSongs.appendChild(resetButton);
  
    resetButton.addEventListener("click", () => {
      userActions.musics = [...everyMusic];
  
      exhibitSongs(sortSongs());
      resetButton.remove();
    });
  };
};

const handleSearch = () => {
    
    const searchTerm = searchInput.value.toLowerCase();
    const filteredMusic = userActions.musics.filter((song) => {
    const titleLowerCase = song.title.toLowerCase();
    const artistLowerCase = song.artist.toLowerCase();
  
     return titleLowerCase.includes(searchTerm) || artistLowerCase.includes(searchTerm);
    });
    exhibitSongs(filteredMusic); 
};
  



// const highlightCurrentSong = () => {
//   const currentMusicHighlight = userActions.currentMusic.id
//   if (currentMusicHighlight) {
//     currentMusicHighlight.classList.add("highlighted")
//   }; 
//   const previousHighlight = document.querySelectorAll('highlighted'); 
//   previousHighlight.forEach((element) => element.classList.remove("highlighted"))
// };


const getCurrentMusicIndex = () => userActions.musics.indexOf(userActions.currentMusic);


const setDisplayTexts = () => {
  const playingMusic = document.getElementById("playing_music_title");
  const playingArtist = document.getElementById("playing_music_artist");
  const playingDuration = document.getElementById("playing_music_duration")

  const currentTitle = userActions?.currentMusic?.title; 
  const currentArtist = userActions?.currentMusic?.artist;
  const currentDuration = userActions?.currentMusic?.duration;

  playingMusic.textContent = currentTitle ? currentTitle : "";
  playingArtist.textContent = currentArtist ? currentArtist : "";
  playingDuration.textContent = currentDuration ? currentDuration : "";
};



const exhibitSongs = (render) => {
  const musicHTML = render
  .map((song) => {
    return `
    <li class="playlist_song" id="song-${song.id}">
      <button class="playlist_song_info" id="${song.id}" onclick="playSong(${song.id})">
        <span class="playlist_song_title">${song.title}</span>
        <span class="playlist_song_artist">${song.artist}</span>
      </button>
      <button class="playlist_song_delete" onclick="deleteSong(${song.id})">
        <span>
          <i class="fa fa-trash" aria-hidden="true"></i>
        </span>
      </button>
    <li>
    `;
  }).join("");
  mainPlaylistSongs.innerHTML = musicHTML;
};


playButton.addEventListener("click", () => {
  if (userActions?.currentMusic === null) {
    playSong(userActions?.musics[0].id);
  } else {
    playSong(userActions?.currentMusic.id);
  }
});

pauseButton.addEventListener("click", pauseSong);

prevButton.addEventListener("click", playPrevSong);

nextButton.addEventListener("click", playNextSong);

shuffleButton.addEventListener("click", shuffleSong);

audio.addEventListener("ended", () => {
  const currentMusicIndex = getCurrentMusicIndex(); 
  const nextMusicAvailable = userActions.musics[currentMusicIndex + 1] !== undefined;

  if (nextMusicAvailable) {
    playNextSong()
  } else {
    userActions.currentMusic = null;
    userActions.musicCurrentTime = 0; 
    alert("Sorry! You've Exhausted your Playlist/ Click again to start over")
  }
} ); 

searchIcon.addEventListener("click", () => {
  searchInput.style.display = "flex";
  searchIcon.style.display = "none";
}); 

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    searchInput.value = "";
    exhibitSongs(sortSongs());
  } else {
    handleSearch();
  }
}); 

searchInput.addEventListener("focusout", () => {
  if (searchInput.value === "") {
    searchInput.style.display = "none";
    searchIcon.style.display = "flex";
    exhibitSongs(sortSongs()); 
  }
});



const sortSongs = () => {
  userActions.musics.sort((a,b) => {
    if (a.title <  b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1
    }
    return 0
  })

  return userActions?.musics;
}; 

exhibitSongs(sortSongs())

