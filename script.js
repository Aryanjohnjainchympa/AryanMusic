console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/at my worst.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "At my worst", filePath: "songs/1.mp3", coverPath: "songcover/logoAtmyworst.jpeg"},
    {songName: "Ghost [Justin Beiber]", filePath: "songs/2.mp3", coverPath: "songcover/logoGhost.jpeg"},
    {songName: "Here's your perfect", filePath: "songs/3.mp3", coverPath: "songcover/logoHere'syourperfect.jpeg"},
    {songName: "If we have each other [Alec Benjamin]", filePath: "songs/4.mp3", coverPath: "songcover/logoIfwehaveeachother.jpg"},
    {songName: "Perfect [Ed Sheeran]", filePath: "songs/5.mp3", coverPath: "songcover/logoPerfect.jpg"},
    {songName: "Rewrite the stars", filePath: "songs/6.mp3", coverPath: "songcover/logoRewritethestars.jpg"},
    {songName: "Someone you loved", filePath: "songs/7.mp3", coverPath: "songcover/logoSomeoneyouloved.jpeg"},
    {songName: "Until i found you", filePath: "songs/8.mp3", coverPath: "songcover/logoUntilifoundyou.jpeg"},
    {songName: "We don't talk anymore", filePath: "songs/9.mp3", coverPath: "songcover/logoWedon'ttalkanymore.webp"},
    {songName: "You are the reason", filePath: "songs/10.mp3", coverPath: "songcover/logoYouarethereason.jpeg"},
    {songName: "Rang Lageya", filePath: "songs/11.mp3", coverPath: "songcover/logoRanglageya.jpeg"},                    
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
