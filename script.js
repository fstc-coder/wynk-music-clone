// Automatic scrolling
const bannerList = document.querySelector('.banner_list');
let scrollAmount = 0;
const bannerWidth = bannerList.firstElementChild.offsetWidth; // Width of each banner image

function scrollBannerLeft() {
  scrollAmount -= bannerWidth;

  if (scrollAmount < 0) {
    scrollAmount = bannerWidth * (bannerList.childElementCount - 1);
  }

  bannerList.style.transform = `translateX(-${scrollAmount}px)`;
}

function scrollBannerRight() {
  scrollAmount += bannerWidth;
  if (scrollAmount >= bannerWidth * (bannerList.childElementCount - 1)) {
    scrollAmount = 0;
  }

  bannerList.style.transform = `translateX(-${scrollAmount}px)`;
}

function scrollBanner() {
  const firstItem = bannerList.firstElementChild;
  const clone = firstItem.cloneNode(true);
  bannerList.appendChild(clone);
  bannerList.removeChild(firstItem);
  scrollAmount += firstItem.offsetWidth;
  bannerList.style.transform = `translateX(-${scrollAmount}px)`;
}

document.getElementById('left_scroll').addEventListener('click', scrollBannerLeft);
document.getElementById('right_scroll').addEventListener('click', scrollBannerRight);

setInterval(scrollBanner, 4000); // Start the automatic scrolling to the left

// paly music

const music = new Audio('audio/1.mp3');

//create array

const songs = [
      {
        id: '1',
        songName:`On My Way <br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "song_cover_img/1.jpg"
      },
      {
        id: '2',
        songName:`Alan Walker-Fade <br>
        <div class="subtitle">Alan Walker</div>`,
        poster: " song_cover_img/2.jpg"
      },
      {
        id:'3',
        songName:`Heeriye <br>
      <div class="subtitle">Arijit Singh</div>`,
        poster: " song_cover_img/3.jpg"
      },
      {
        id:'4',
        songName:`Khair Mangda  <br>
      <div class="subtitle">Atif Aslam</div>`,
        poster: "song_cover_img/4.jpg"
      },
      {
        id:'5',
        songName:`Lil Baby  <br>
      <div class="subtitle">Drake</div>`,
        poster: "song_cover_img/5.jpg"
      },
      {
      id:'6',
      songName:`Bodyguard <br>
    <div class="subtitle">Shreya Ghoshal
    </div>`,
      poster: "song_cover_img/6.jpg"
      },
      {
        id:'7',
        songName:`Guli Mata <br>
      <div class="subtitle">Shreya Ghoshal
      </div>`,
        poster: "song_cover_img/7.jpg"
        },
        {
          id:'8',
          songName:`Beutiful Love <br>
        <div class="subtitle">Justin Bieber
        </div>`,
          poster: "song_cover_img/8.jpg"
          },
          {
        id:'9',
        songName:`Bad To You <br>
         <div class="subtitle">Ariana Grande
        </div>`,
        poster: "song_cover_img/9.jpg"
        },
        {
        id:'10',
       songName:`Alone <br>
       <div class="subtitle">Alan Walker
       </div>`,
       poster: "song_cover_img/10.jpg"
      },
       {
      id:'11',
        songName:`Adele Hello <br>
       <div class="subtitle">Adele
       </div>`,
        poster: "song_cover_img/11.jpg"
        },
      {
        id:'12',
      songName:`Dear Mama <br>
     <div class="subtitle">2pac
     </div>`,
       poster: "song_cover_img/12.jpg"
    },
   {
    id:'13',
    songName:`I Get Her <br>
          <div class="subtitle">Chris Brown
          </div>`,
    poster: "song_cover_img/13.jpg"
    },
    {
      id:'14',
      songName:`Doggy Dogg <br>
      <div class="subtitle">Snoop Dogg
      </div>`,
      poster: "song_cover_img/14.jpg"
    },
    {
      id:'15',
      songName:`American Town <br>
      <div class="subtitle">Ed Sheeran
      </div>`,
      poster: "song_cover_img/15.jpg"
    }

    ]

    Array.from(document.getElementsByClassName('songItem')).forEach((element, i)=>{
      element.getElementsByTagName('img')[0].src = songs[i].poster;
      element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
    })

    //play music

    let masterPlay = document.getElementById('masterPlay');
     
    masterPlay.addEventListener('click',()=>{
      if(music.paused || music.currentTime <=0){
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
      }else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
      }

    })

    const makeAllPlays = () =>{
      Array.from(document.getElementsByClassName('playlistPlay')).forEach((element)=>{
        element.classList.add('bi-play-circle-fill');
        element.classList.remove('bi-pause-circle-fill');
      })
    }

    const makeAllBackgrounds = () => {
      Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
        element.style.background = "rgba(105,105,170,0)";
      })
    }

    let index=0;
    let poster_master_play = document.getElementById('poster_master_paly');
    let title = document.getElementById('title');

    Array.from(document.getElementsByClassName('playlistPlay')).forEach((element)=>{
      element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `audio/${index}.mp3`;
        poster_master_play.src = `song_cover_img/${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele)=>{
          return ele.id == index;
        })

        song_title.forEach(ele =>{
          let {songName} = ele;
          title.innerHTML = songName;
        })

        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        music.addEventListener('ended', ()=>{
          masterPlay.classList.add('bi-play-fill');
          masterPlay.classList.remove('bi-pause-fill');
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";

      })

    })

    let currentStart = document.getElementById('currentStart');
    let currendEnd = document.getElementById('currentEnd');
    let seek = document.getElementById('seek');
    let bar2 = document.getElementById('bar2');
    let dot = document.getElementsByClassName('dot')[0];

    music.addEventListener('timeupdate',() =>{
      let music_curr = music.currentTime;
      let music_dur = music.duration;

      let min = Math.floor(music_dur/60);
      let sec = Math.floor(music_dur%60);
      if(sec<10){
        sec = `0${sec}`;
      }

      currentEnd.innerText =`${min}:${sec}`;

      let min1 = Math.floor(music_curr/60);
      let sec1 = Math.floor(music_curr%60);
      if(sec1<10){
        sec1 = `0${sec1}`;
      }

      currentStart.innerText = `${min1}:${sec1}`;

      let progressbar = parseInt((music.currentTime/music.duration)*100);
      seek.value = progressbar;

      let seekbar = seek.value;
      bar2.style.width = `${seekbar}%`;
      dot.style.left = `${seekbar}%`;

    })

    seek.addEventListener('change', ()=>{
      music.currentTime = seek.value * music.duration/100;
    })
    
    music.addEventListener('ended', ()=>{
      masterPlay.classList.add('bi-play-fill');
      masterPlay.classList.remove('bi-pause-fill');
    })

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
  if (vol.value == 0) {
    vol_icon.classList.remove('bi-volume-down-fill');
    vol_icon.classList.add('bi-volume-mute-fill');
    vol_icon.classList.remove('bi-volume-up-fill');
  }
  if (vol.value > 0) {
    vol_icon.classList.add('bi-volume-down-fill');
    vol_icon.classList.remove('bi-volume-mute-fill');
    vol_icon.classList.remove('bi-volume-up-fill');
  }
  if (vol.value > 50) {
    vol_icon.classList.remove('bi-volume-down-fill');
    vol_icon.classList.remove('bi-volume-mute-fill');
    vol_icon.classList.add('bi-volume-up-fill');
  }

  let vol_a = vol.value;
  vol_bar.style.width = `${vol_a}%`;
  vol_dot.style.left = `${vol_a}%`;
  music.volume = vol_a/100;

})

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', ()=>{
  index -=1;
  if (index < 1) {
    index = Array.from(document.getElementsByClassName('songItem')).length;
  }
  music.src = `audio/${index}.mp3`;
    poster_master_play.src = `song_cover_img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele)=>{
      return ele.id == index;
    })

    song_title.forEach(ele =>{
      let {songName} = ele;
      title.innerHTML = songName;
    })
    makeAllPlays()

    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');

    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";

}) 

next.addEventListener('click', ()=>{
  index -= 0;
  index += 1;
  if (index > Array.from(document.getElementsByClassName('songItem')).length) {
    index=1;
  }
  music.src = `audio/${index}.mp3`;
    poster_master_play.src = `song_cover_img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele)=>{
      return ele.id == index;
    })

    song_title.forEach(ele =>{
      let {songName} = ele;
      title.innerHTML = songName;
    })
    makeAllPlays()

    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";

})




let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scrolls.addEventListener('click', ()=>{
  pop_song.scrollLeft -= 400;
})

right_scrolls.addEventListener('click', ()=>{
  pop_song.scrollLeft += 400;
})

let left_scroll_new = document.getElementById('left_scroll_new');
let right_scroll_new = document.getElementById('right_scroll_new');
let new_songs = document.getElementsByClassName('new_songs')[0];

left_scroll_new .addEventListener('click', ()=>{
  new_songs.scrollLeft -= 400;
})

right_scroll_new.addEventListener('click', ()=>{
  new_songs.scrollLeft += 400;
})

let left_scroll_top = document.getElementById('left_scroll_top');
let right_scroll_top = document.getElementById('right_scroll_top');
let top_songs = document.getElementsByClassName('top_songs')[0];

left_scroll_top .addEventListener('click', ()=>{
  top_songs.scrollLeft -= 400;
})

right_scroll_top .addEventListener('click', ()=>{
  top_songs.scrollLeft += 400;
})

let left_scroll_indi = document.getElementById('left_scroll_indi');
let right_scroll_indi = document.getElementById('right_scroll_indi');
let indi_songs = document.getElementsByClassName('indi_songs')[0];

left_scroll_indi.addEventListener('click', ()=>{
  indi_songs.scrollLeft -= 500;
})

right_scroll_indi .addEventListener('click', ()=>{
  indi_songs.scrollLeft += 500;
})

let left_scroll_arits = document.getElementById('left_scroll_arits');
let right_scroll_artists = document.getElementById('right_scroll_artists');
let top_artists = document.getElementsByClassName('top_artists')[0];

left_scroll_arits.addEventListener('click', ()=>{
  top_artists.scrollLeft -= 500;
})

right_scroll_artists .addEventListener('click', ()=>{
  top_artists.scrollLeft += 500;
})

let left_scroll_tren = document.getElementById('left_scroll_tren');
let right_scroll_tren = document.getElementById('right_scroll_tren');
let tren_songs = document.getElementsByClassName('tren_songs')[0];

left_scroll_tren.addEventListener('click', ()=>{
  tren_songs.scrollLeft -= 500;
})

right_scroll_tren.addEventListener('click', ()=>{
  tren_songs.scrollLeft += 500;
})