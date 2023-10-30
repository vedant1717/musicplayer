const mainCard = document.querySelector("#ContentWarpper");
const songImg = document.querySelector("#SongImg");
const controlButtons = document.querySelector(".control");
const currentYear = new Date().getFullYear();

const playPauseButton = document.querySelector("#PausePlay");
const audio = document.querySelector("audio");
const artist = document.querySelector("#Artist");
const songName = document.querySelector("#SongName");
const previousButton = document.querySelector("#Previous");
const nextButton = document.querySelector("#Next");
const songImgAtTheTop = document.querySelector("img");

let startDuration = document.querySelector("#Start");
const endDuration = document.querySelector("#End");
const meter = document.querySelector("#ProgrssMeterChild");
const progressBar = document.querySelector("#ProgressMeterContainer");

let isPlaying = false;
let index = 0;

const songDataBase = [
  {
    songSrc: "./music/music1.mp3",
    title: "Deva Deva",
    artist: "Arjit Singh",
    imgSrc: "./img/music1.jpg",
  },
  {
    songSrc: "./music/music2.mp3",
    title: "Chaand Baaliyan",
    artist: "Aditya A",
    imgSrc: "./img/music2.jpg",
  },
  {
    songSrc: "./music/music3.mp3",
    title: "Ishq Tera Tadpave",
    artist: "Sukhbir Singh",
    imgSrc: "./img/music3.jpg",
  },
  {
    songSrc: "./music/music4.mp3",
    title: "Sheila Ki Jawani",
    artist: "Sunidhi Chauhan and Vishal Dadlani",
    imgSrc: "./img/music4.jpg",
  },
  {
    songSrc: "./music/music5.mp3",
    title: "Kamariya",
    artist: "Aastha Gill",
    imgSrc: "./img/music5.jpg",
  },
  {
    songSrc: "./music/music6.mp3",
    title: "Bachna Ae Haseeno",
    artist: "Kishore Kumar",
    imgSrc: "./img/music6.jpg",
  },
  {
    songSrc: "./music/music7.mp3",
    title: "Revolution",
    artist: "OxiDaksi",
    imgSrc: "./img/music7.jpg",
  },
  {
    songSrc: "./music/music8.mp3",
    title: "Aa Re Pritam Pyaare",
    artist: "Mamta Sharma",
    imgSrc: "./img/music1.jpg",
  },
  {
    songSrc: "./music/music9.mp3",
    title: "Tumse Milke Dil Ka",
    artist: "Mix",
    imgSrc: "./img/music6.jpg",
  },
  {
    songSrc: "./music/music10.mp3",
    title: "Silsila Ye Chaahat Ka",
    artist: "Shreya Ghoshal",
    imgSrc: "./img/music10.jpg",
  },
];

const loadMusic = () => {
  audio.src = songDataBase[index].songSrc;
  artist.textContent = songDataBase[index].artist;
  songName.textContent = songDataBase[index].title;
  songImgAtTheTop.src = songDataBase[index].imgSrc;
};
audio.addEventListener("ended", () => {
  loadMusic(index++);
  play();
});

loadMusic();

nextButton.addEventListener("click", () => {
  if (index < songDataBase.length - 1) {
    loadMusic(index++);
    play();
  } else {
    pause();
  }
});
previousButton.addEventListener("click", () => {
  if (index > 0) {
    loadMusic(index--);
    play();
  } else {
    pause();
  }
});

const play = () => {
  isPlaying = true;
  audio.play();
  playPauseButton.classList.replace("fa-play", "fa-pause");
  songImg.classList.add("anime");
};
const pause = () => {
  isPlaying = false;
  audio.pause();
  playPauseButton.classList.replace("fa-pause", "fa-play");
  songImg.classList.remove("anime");
};

playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});
let minute, second;
const timeStamp = (event) => {
  let { duration, currentTime } = event.srcElement;
  const full_second = Math.floor(duration % 60);
  const full_minute = Math.floor(duration / 60);
  const start_second = Math.floor(currentTime % 60);
  const start_minute = Math.floor(currentTime / 60);
  const totalDuration = `${full_minute} : ${full_second}`;
  const currenDuration = `${start_minute} : ${start_second}`;
  if (duration) {
    endDuration.textContent = totalDuration;
  }
  startDuration.textContent = currenDuration;
  const percentage = (currentTime / duration) * 100;
  meter.style.width = `${percentage}%`;
};
audio.addEventListener("timeupdate", timeStamp);
progressBar.addEventListener("click", (event) => {
  const { duration } = audio;
  const moreProgress =
    (event.offsetX / event.srcElement.clientWidth) * duration;
  audio.currentTime = moreProgress;
});

document.querySelector("#Year").innerHTML = currentYear;

mainCard.addEventListener("mouseover", (event) => {
  const xAxis = (window.innerWidth / 2 - event.pageX) / 15;
  const yAxis = (window.innerHeight / 2 - event.pageY) / 15;
  mainCard.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
  songImg.style.transform = `rotate(${xAxis}deg)`;
  controlButtons.style.transform = `rotate(${xAxis}deg)`;
});
mainCard.addEventListener("mouseleave", () => {
  mainCard.style.transform = "rotateX(0deg) rotateY(0deg)";
  songImg.style.transform = "rotate(0deg)";
  controlButtons.style.transform = "rotate(0deg)";
});
