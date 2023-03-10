const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// open top song - filter top song
const topSong = $$(".menu__playList--item");
const topSongVn = $(".top-songs-VN");
const topSongUKUS = $(".top-songs-UK-US");
const topSongEDM = $(".top-songs-EDM");
const topSongIconMucsicVN = $(".top-songs-VN i");
const topSongIconMucsicUSUK = $(".top-songs-UK-US i");
const topSongIconMucsicEDM = $(".top-songs-EDM i");

// play mucsic
const prev = $(".play__mid--icon-prev");
const next = $(".play__mid--icon-next");
const play = $(".play__mid--icon-item .play");
const pause = $(".play__mid--icon-item .pause");
const loadFrist = $(".play__mid--icon-loadFrist");
const randomSongs = $(".play__mid--icon-randomSong");
const timeSongGo = $(".play__mid--progress-timeFull");
const timeProgrcess = $(".play__mid--progress-timeProgress");
const timeProgrcessChildren = $(".play__mid--progress-timeProgress-range");
const setVolumeSong = $(".play__right input");
const setVolumeIconOpen = $(".play__right .fa-volume-high");
const setVolumeIconClose = $(".play__right .fa-volume-xmark");
const timeGo = $(".play__mid--progress-timePlay .TimeGo");
const playAvt = $(".play__left--avatar img");
const playNameSong = $(".play__left--songs-name p");
const playAuthorSong = $(".play__left--songs-author span");
const playSong = $(".audio");

// main
const homePlayList = $(".main__home--playList-songs");
const homeSongNew = $(".main__home--songTop");
const homePrev = $(".main__home--playList-icon .fa-arrow-left");
const homeNext = $(".main__home--playList-icon .fa-arrow-right");
const singerNext = $(".main__home--singerTop--icon .fa-arrow-right");
const singerPrev = $(".main__home--singerTop--icon .fa-arrow-left");
const homeSinger = $(".main__home--singerTop--item");
const homeZingChart = $(".main__home--zingChart-item");
const topSinger = $(".main__home--singerTop--item");
const main = $("main");
const dark = $(".dark");
const themeIcon = $(".theme-icon");
const exitTheme = $(".exit-theme");
const theme = $(".theme");
const themeItem = $$(".theme__list--item img");
const themeItemArr = Array.from(themeItem);

// responsive
const openSubMenu = $(".nav__menu1024 i");
const menu = $(".app-menu");
const exitMenu = $(".exit-menu");
const navLogo1024 = $(".nav__logo1024");
// input search
const openSearch = $(".nav__search .fa-magnifying-glass");
const closeSearch = $(".nav__search .fa-xmark");
const search = $(".nav__search--input ");
const searchSongs = $(".seacrh__block");
// api
const songAPI = "https://615950a6601e6f0017e5a15b.mockapi.io/api/songs";
const singerAPI = "https://615950a6601e6f0017e5a15b.mockapi.io/api/singers";
const playlistAPI = "https://615950a6601e6f0017e5a15b.mockapi.io/api/playlist";
const videoAPI = "https://615950a6601e6f0017e5a15b.mockapi.io/api/videos";
const songUSUKAPI = "https://6260ea02f429c20deb979e8a.mockapi.io/USUK";
const songEDMAPI = "https://6260ea02f429c20deb979e8a.mockapi.io/EDM";
const rankTableAPI =
  "https://mp3.zing.vn/xhr/chart-realtime?songId=0&videoId=0&albumId=0&chart=song&time=-1";

var songData = [];
var singerData = [];
var playlistData = [];
var videoData = [];
var songDataUSUK = [];
var songDataEDM = [];
var rankTableData = [];

const menuSongVN = $(".menu__song-VN");
const menuSongUSUK = $(".menu__song-USUK");
const menuSongEDM = $(".menu__song-EDM");
const menuSongsList = $(".menu__song-list");

// tab
const individual = $(".tab-individual");
const discover = $(".tab-discover");

// const getData = (api) => {
//   return new Promise((resolve, reject) => {
//     var request = new XMLHttpRequest();
//     request.open("GET", api);
//     request.onload = () => {
//       if (request.status == 200) {
//         resolve(request.response);
//       } else {
//         reject(Error(request.statusText));
//       }
//     };
//     request.onerror = () => {
//       return Error("Fetching Data Failed");
//     };
//     request.send();
//   });
// };

// Promise.all([
//   getData(songAPI),
//   getData(singerAPI),
//   getData(playlistAPI),
//   getData(videoAPI),
//   getData(songUSUKAPI),
//   getData(songEDMAPI),
//   getData(rankTableAPI),
// ])
//   .then(
//     ([songs, singers, playlists, videos, songsUSUK, songsEDM, ranksTable]) => {
//       songData = JSON.parse(songs);
//       singerData = JSON.parse(singers);
//       playlistData = JSON.parse(playlists);
//       videoData = JSON.parse(videos);
//       songDataUSUK = JSON.parse(songsUSUK);
//       songDataEDM = JSON.parse(songsEDM);
//       rankTableData = JSON.parse(ranksTable);
//     }
//   )
//   .then(() => app.start())
//   .catch((err) => alert(err));

//

const getData = async (api) => {
  try {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  } catch (error) {
    throw new Error("Fetching data failed");
  }
};

async function getAllData() {
  try {
    const [songs, singers, playlists, videos, songsUSUK, songsEDM, ranksTable] =
      await Promise.all([
        getData(songAPI),
        getData(singerAPI),
        getData(playlistAPI),
        getData(videoAPI),
        getData(songUSUKAPI),
        getData(songEDMAPI),
        getData(rankTableAPI),
      ]);

    songData = songs;
    singerData = singers;
    playlistData = playlists;
    videoData = videos;
    songDataUSUK = songsUSUK;
    songDataEDM = songsEDM;
    rankTableData = ranksTable;

    app.start();
  } catch (error) {
    alert(error);
  }
}

getAllData();

const app = {
  curentIndexVN: 0,
  curentIndexUSUK: 0,
  curentIndexEDM: 0,
  isActiveVN: false,
  isActiveUSUK: false,
  isActiveEDM: false,
  isPlaying: false,
  isVolume: true,
  isSongVN: true,
  isSongUSUK: false,
  isSongEDM: false,
  indexhome: 0,

  renderView: function () {
    // render view song top viet nam
    let htmlviewMenuTopSongVN = rankTableData.data.song.map((item, index) => {
      return `
          <div class="menu__song-listVN menu__song-all  ${
            index === this.curentIndexVN ? "active" : ""
          }" data-index="${index}"">
          <div class="menu__songs--number">
          <span>${item.order}</span>
         </div>
        <div class="menu__songs--avatar">
          <img
            src=${item.thumbnail}
            alt=""
          />
        </div>
        <div class="menu__song--names">
          <p>${item.name}</p>
          <span>${item.performer}</span>
        </div>
        <div class="menu__songs--iconPlay menu__songs--icons ${
          index === this.curentIndexVN && app.isActiveVN === true
            ? "active-icon"
            : ""
        }">
          <i class="fa-solid fa-circle-play"></i>
          
        </div>
        <div class="menu__songs--iconPause menu__songs--icons ${
          index === this.curentIndexVN && app.isActiveVN === true
            ? ""
            : "active-icon"
        }">
         
          <i class="fa-solid fa-circle-pause"></i>
        </div>
      </div>
    </div>
    </div>
    `;
    });
    menuSongVN.innerHTML = htmlviewMenuTopSongVN.join("");
    // render view song top usuk
    let htmlviewMenuTopSongUSUK = songDataUSUK.map((item, index) => {
      return `
      <div class="menu__song-listUSUK menu__song-all ${
        index === this.curentIndexUSUK ? "active" : ""
      }" data-index="${index}"">
      <div class="menu__songs--number">
      <span>${item.id > 9 ? "" : 0}${item.id}</span>
    </div>
    <div class="menu__songs--avatar">
      <img
        src=${item.thumbnail}
        alt=""
      />
    </div>
    <div class="menu__song--names">
      <p>${item.name}</p>
      <span>${item.singer}</span>
    </div>
    <div class="menu__songs--iconPlay menu__songs--icons ${
      index === this.curentIndexUSUK && app.isActiveUSUK === true
        ? "active-icon"
        : ""
    }">
      <i class="fa-solid fa-circle-play"></i>
    </div>
    <div class="menu__songs--iconPause menu__songs--icons ${
      index === this.curentIndexUSUK && app.isActiveUSUK === true
        ? ""
        : "active-icon"
    }">
    <i class="fa-solid fa-circle-pause"></i>
  </div>
</div>
</div>
`;
    });
    menuSongUSUK.innerHTML = htmlviewMenuTopSongUSUK.join("");
    // render view song top edm
    let htmlviewMenuTopSongEDM = songDataEDM.map((item, index) => {
      return `
      <div class="menu__song-all menu__song-listEDM ${
        index === this.curentIndexEDM ? "active" : ""
      }" data-index="${index}"">
      <div class="menu__songs--number">
      <span>0${item.id}</span>
    </div>
    <div class="menu__songs--avatar">
      <img
        src=${item.thumbnail}
        alt=""
      />
    </div>
    <div class="menu__song--names">
      <p>${item.name}</p>
      <span>${item.singer}</span>
    </div>
    <div class="menu__songs--iconPlay ${
      index === this.curentIndexEDM && app.isActiveEDM === true
        ? "active-icon"
        : ""
    }"">
      <i class="fa-solid fa-circle-play"></i>
    </div>
    <div class="menu__songs--iconPause menu__songs--icons ${
      index === this.curentIndexEDM && app.isActiveEDM === true
        ? ""
        : "active-icon"
    }">
    <i class="fa-solid fa-circle-pause"></i>
  </div>
  </div>
</div>
</div>
`;
    });
    menuSongEDM.innerHTML = htmlviewMenuTopSongEDM.join("");

    // render view play list home main
    let htmlviewHomeMainPlayList = songData.map((item) => {
      return `  <div class="main__home--playList-songs-item">
     
      <div class="main__home--playList-songs-img">
        <img src=${item.thumbnail} alt="sorry! Not file! erorr 404">
        <div class="main__home--playList-songs-icon"><i class="fa-regular fa-circle-play"></i></div>
      </div>
      <div class="main__home--playList-songs-title">
      <span>${item.name}</span>
      </div>
      <div class="main__home--playList-songs-singer">
      <span>${item.singer}</span>
      </div>
    </div>`;
    });
    homePlayList.innerHTML = htmlviewHomeMainPlayList.join("");
    // render view home new song
    let htmlviewHomeNewSong = playlistData.map((item) => {
      return `<div class="main__home--songTop-item">
      <div class="main__home--songTop-item-img">
      <img src=${item.thumbnail} alt=""/>
      </div>
      <div class="main__home--songTop-item-other">
        <div class="main__home--songTop-item-name">
        <p>${item.name}</p>
        <span>${item.singer}</span>
        </div>
        <div class="main__home--songTop-item-nambertric">
        <span>#${item.id}</span>
        <span>01.01.2050</span>
        </div>
      </div>
    </div>`;
    });
    homeSongNew.innerHTML = htmlviewHomeNewSong.join("");
    // render view home top singer
    let htmlviewHomeTopSinger = singerData.map((item) => {
      return ` <div class="main__home--singerTop--item_singers">
      <img src=${item.image} alt="">
      <h4>${item.name}</h4>
    </div>`;
    });
    homeSinger.innerHTML = htmlviewHomeTopSinger.join("");
    // render view home zingchart
    let htmlviewHomeZingChart = rankTableData.data.song.map((item) => {
      if (item.order <= 10) {
        return `<div class="main__home--zingChart-items">
        <div class="zingChart-id">${item.order}</div>
        <div class="zingChart-avt"><img src=${item.thumbnail} alt=""/></div>
        <div class="zingChart-title">
        <h3>${item.name}</h3>
        <span>${item.performer}</span>
        </div>
        <div class="zingChart-view"><h4>${item.total}</h4></div>
      </div>`;
      }
    });
    homeZingChart.innerHTML = htmlviewHomeZingChart.join("");
  },
  definePro: function () {
    Object.defineProperty(this, "currentSongVN", {
      get: function () {
        return rankTableData.data.song[app.curentIndexVN];
      },
    });
    Object.defineProperty(this, "currentSongUSUK", {
      get: function () {
        return songDataUSUK[app.curentIndexUSUK];
      },
    });
    Object.defineProperty(this, "currentSongEDM", {
      get: function () {
        return songDataEDM[app.curentIndexEDM];
      },
    });
  },
  handlesEvent: function () {
    // event filter top song
    topSongVn.onclick = function () {
      playSong.onpause();
      app.isSongUSUK = false;
      app.isSongVN = true;
      app.isSongEDM = false;
      topSongUKUS.classList.remove("active-menu");
      topSongEDM.classList.remove("active-menu");
      topSongVn.classList.add("active-menu");
      topSongIconMucsicUSUK.style.display = "none";
      topSongIconMucsicEDM.style.display = "none";
      topSongIconMucsicVN.style.display = "block";
      menuSongVN.style.display = "block";
      menuSongUSUK.style.display = "none";
      menuSongEDM.style.display = "none";
      app.loadSongs();
    };
    topSongUKUS.onclick = function () {
      playSong.onpause();
      app.isSongUSUK = true;
      app.isSongVN = false;
      app.isSongEDM = false;
      topSongVn.classList.remove("active-menu");
      topSongEDM.classList.remove("active-menu");
      topSongUKUS.classList.add("active-menu");
      topSongIconMucsicVN.style.display = "none";
      topSongIconMucsicEDM.style.display = "none";
      topSongIconMucsicUSUK.style.display = "block";
      menuSongUSUK.style.display = "block";
      menuSongVN.style.display = "none";
      menuSongEDM.style.display = "none";
      app.loadSongs();
    };
    topSongEDM.onclick = function () {
      playSong.onpause();
      app.isSongUSUK = false;
      app.isSongVN = false;
      app.isSongEDM = true;
      topSongVn.classList.remove("active-menu");
      topSongUKUS.classList.remove("active-menu");
      topSongEDM.classList.add("active-menu");
      topSongIconMucsicVN.style.display = "none";
      topSongIconMucsicUSUK.style.display = "none";
      topSongIconMucsicEDM.style.display = "block";
      menuSongEDM.style.display = "block";
      menuSongUSUK.style.display = "none";
      menuSongVN.style.display = "none";
      app.loadSongs();
    };
    //event phát nhạc
    play.onclick = function () {
      if (app.isPlaying) {
        playSong.pause();
      } else {
        playSong.play();
      }
    };
    //event tạm dừng nhạc
    pause.onclick = function () {
      if (app.isPlaying) {
        playSong.pause();
      } else {
        playSong.play();
      }
    };

    playSong.onplay = function () {
      app.isPlaying = true;
      play.classList.add("hide");
      pause.classList.remove("hide");
    };
    playSong.onpause = function () {
      app.isPlaying = false;
      play.classList.remove("hide");
      pause.classList.add("hide");
    };
    //event bài tiếp theo
    next.onclick = function () {
      app.nextSongs();
      playSong.play();
    };

    //event bai hat phia sau
    prev.onclick = function () {
      app.prevSongs();
      playSong.play();
    };
    //event load lai tu dau
    loadFrist.onclick = function () {
      playSong.currentTime = 0;
    };
    //event phát nhạc ngẫu nhiên
    randomSongs.onclick = function () {
      app.randomSongs();
      playSong.play();
    };
    // phát theo danh sách tự bấm
    menuSongVN.onclick = function (e) {
      app.isActiveVN = true;
      const ItemSongsVN = e.target.closest(".menu__song-listVN");
      if (ItemSongsVN) {
        app.curentIndexVN = Number(ItemSongsVN.dataset.index);
        app.loadSongs();
        app.renderView();
        playSong.play();
      }
    };
    menuSongUSUK.onclick = function (e) {
      app.isActiveUSUK = true;
      const ItemSongsUSUK = e.target.closest(".menu__song-listUSUK");
      if (ItemSongsUSUK) {
        app.curentIndexUSUK = Number(ItemSongsUSUK.dataset.index);
        app.loadSongs();
        app.renderView();
        playSong.play();
      }
    };
    menuSongEDM.onclick = function (e) {
      app.isActiveEDM = true;
      const ItemSongsEDM = e.target.closest(".menu__song-listEDM");
      if (ItemSongsEDM) {
        app.curentIndexEDM = Number(ItemSongsEDM.dataset.index);
        app.loadSongs();
        app.renderView();
        playSong.play();
      }
    };
    //event tắt mở âm lượng
    setVolumeIconOpen.onclick = function () {
      setVolumeIconOpen.classList.add("hide");
      setVolumeIconClose.classList.remove("hide");
      playSong.volume = 0;
    };
    setVolumeIconClose.onclick = function () {
      let volomes = setVolumeSong.value / 100;
      setVolumeIconOpen.classList.remove("hide");
      setVolumeIconClose.classList.add("hide");
      playSong.volume = volomes;
    };
    // progrcess time
    playSong.ontimeupdate = function () {
      if (playSong.duration) {
        currentPercent = Math.floor(
          (playSong.currentTime / playSong.duration) * 100
        );
        timeProgrcessChildren.style.width = currentPercent + "%";
        if (currentPercent === 100) {
          app.nextSongs();
          app.renderView();
          playSong.play();
        }
      }
      let durations = playSong.duration;
      let currentTimes = playSong.currentTime;
      let duarationTimeEven = Math.floor(durations / 60);
      let durationTimeOdd = Math.floor(durations % 60);
      let duarationTimeEvenGo = Math.floor(currentTimes / 60);
      let durationTimeOddGo = Math.floor(currentTimes % 60);
      timeSongGo.textContent = `${duarationTimeEvenGo}:${durationTimeOddGo}`;
      timeGo.textContent = `${duarationTimeEvenGo}:${durationTimeOddGo}`;
      if (duarationTimeEven || durationTimeOdd) {
        timeSongGo.textContent = `${duarationTimeEven}:${durationTimeOdd}`;
      }
      if (durationTimeOdd < 10) {
        timeSongGo.textContent = `${duarationTimeEven}:0${durationTimeOdd}`;
      }
      if (!duarationTimeEven || !durationTimeOdd) {
        timeSongGo.textContent = "0:00";
      }
      if (durationTimeOddGo < 10) {
        timeGo.textContent = `${duarationTimeEvenGo}:0${durationTimeOddGo}`;
      }
    };
    // thay đổi âm lượng cho bài hát
    setVolumeSong.onchange = function () {
      playSong.volume = setVolumeSong.value / 100;
    };
    // range progrcess time
    timeProgrcess.onclick = function (e) {
      let progrcessWidth = timeProgrcess.clientWidth;
      let progrcessOffSetX = e.offsetX;
      let songDuration = playSong.duration;
      playSong.currentTime = (progrcessOffSetX / progrcessWidth) * songDuration;
      playSong.play();
    };

    // home next songs
    homeNext.onclick = function () {
      let clientWidthSongHome = $(
        ".main__home--playList-songs-item"
      ).offsetWidth;
      homePlayList.scrollLeft += clientWidthSongHome;
    };
    homePrev.onclick = function () {
      let clientWidthSongHome = $(
        ".main__home--playList-songs-item"
      ).offsetWidth;
      homePlayList.scrollLeft -= clientWidthSongHome;
    };

    // singer top next prev
    singerNext.onclick = function () {
      let clientWidthSongHome = $(".main__home--singerTop--item").offsetWidth;
      topSinger.scrollLeft += clientWidthSongHome / 4;
    };

    singerPrev.onclick = function () {
      let clientWidthSongHome = $(".main__home--singerTop--item").offsetWidth;
      topSinger.scrollLeft -= clientWidthSongHome / 4;
    };

    // responsive open sub menu

    openSubMenu.onclick = function () {
      menu.style.left = "0";
      dark.style.display = "block";
    };

    // responsive exit menu
    exitMenu.onclick = function () {
      menu.style.left = "-200%";
      dark.style.display = "none";
    };
    dark.onclick = function () {
      menu.style.left = "-100%";
      dark.style.display = "none";
    };
    // theme

    themeIcon.onclick = function () {
      theme.style.display = "block";
    };
    exitTheme.onclick = function () {
      theme.style.display = "none";
    };
    // themeItem.onclick = function () {};
    themeItemArr.map((item) => {
      item.onclick = function () {
        let src = item.src;
        main.style.backgroundImage = `url(${src})`;
      };
    });
    // input search header
    openSearch.onclick = function () {
      search.style.width = "99%";
      closeSearch.classList.remove("active");
      openSearch.classList.add("active");
    };
    closeSearch.onclick = function () {
      search.style.width = "0";
      openSearch.classList.remove("active");
      closeSearch.classList.add("active");
    };

    search.addEventListener("input", function () {
      let combinedArray = rankTableData.data.song.concat(
        songDataUSUK,
        songDataEDM,
        songData,
        playlistData
      );
      let keyword = this.value.toLowerCase();

      if (!keyword) {
        searchSongs.innerHTML = "";
        return;
      }

      let filteredSongs = combinedArray.filter((song) =>
        song.name.toLowerCase().includes(keyword)
      );
      searchSongs.innerHTML = "";

      filteredSongs.forEach(function (song) {
        let li = document.createElement("li");
        li.innerHTML = song.name;
        li.style.padding = "10px 20px";
        searchSongs.appendChild(li);
      });
    });

    //tab nav
    discover.onclick = function () {
      alert("tính năng chưa hoàn thiện xin thông cảm");
    };
    individual.onclick = function () {
      alert("tính năng chưa hoàn thiện xin thông cảm");
    };

    // let filteredSongs = combinedArray.filter((song) =>
    //   song.name.toLowerCase().includes(keyword)
    // );
    // searchSongs.innerHTML = "";
    // filteredSongs.forEach(function (song) {
    //   let li = document.createElement("li");
    //   li.textContent = song.name;
    //   searchSongs.appendChild(li);
    // });
    // slide songtophome

    setInterval(function () {
      const as = $$(".main__home--songTop-item");
      $(".main__home--songTop").appendChild(as[0]);
    }, 3000);
  },

  //hàm load nhạc
  loadSongs: function () {
    if (app.isSongVN) {
      playNameSong.textContent = this.currentSongVN.name;
      playAuthorSong.textContent = this.currentSongVN.performer;
      playAvt.setAttribute("src", `${this.currentSongVN.thumbnail}`);
      playSong.src = `http://api.mp3.zing.vn/api/streaming/audio/${this.currentSongVN.id}/320`;
    } else if (app.isSongUSUK) {
      app.currentSongUSUK = 0;
      playNameSong.textContent = this.currentSongUSUK.name;
      playAuthorSong.textContent = this.currentSongUSUK.singer;
      playAvt.setAttribute("src", `${this.currentSongUSUK.thumbnail}`);
      playSong.src = songDataUSUK[app.curentIndexUSUK].path;
    } else if (app.isSongEDM) {
      app.currentSongEDM = 0;
      playNameSong.textContent = this.currentSongEDM.name;
      playAuthorSong.textContent = this.currentSongEDM.singer;
      playAvt.setAttribute("src", `${this.currentSongEDM.thumbnail}`);
      playSong.src = songDataEDM[app.curentIndexEDM].path;
    }
    //  else {
    //   app.currentSongVN = 0;
    //   playNameSong.textContent = this.currentSongVN.name;
    //   playAuthorSong.textContent = this.currentSongVN.performer;
    //   playAvt.setAttribute("src", `${this.currentSongVN.thumbnail}`);
    //   playSong.src = `http://api.mp3.zing.vn/api/streaming/audio/${this.currentSongVN.id}/320`;
    // }

    app.renderView();
  },
  //hàm next song
  nextSongs: function () {
    if (this.isSongVN) {
      app.curentIndexVN++;
      if (this.curentIndexVN >= rankTableData.data.song.length) {
        this.curentIndexVN = 0;
      }
    } else if (this.isSongUSUK) {
      this.curentIndexUSUK++;
      if (this.curentIndexUSUK >= songDataUSUK.length) {
        this.curentIndexUSUK = 0;
      }
    } else {
      this.isSongEDM;
      this.curentIndexEDM++;
      if (this.curentIndexEDM >= songDataEDM.length) {
        this.curentIndexEDM = 0;
      }
    }

    this.loadSongs();
  },

  //hàm prev song
  prevSongs: function () {
    if (this.isSongVN) {
      this.curentIndexVN--;
      if (this.curentIndexVN < 0) {
        this.curentIndexVN = rankTableData.data.song.length - 1;
      }
    } else if (this.isSongUSUK) {
      this.curentIndexUSUK--;
      if (this.curentIndexUSUK < 0) {
        this.curentIndexUSUK = songDataUSUK.length - 1;
      }
    } else {
      this.isSongEDM;
      this.curentIndexEDM--;
      if (this.curentIndexEDM < 0) {
        this.curentIndexEDM = songDataEDM.length - 1;
      }
    }
    this.loadSongs();
  },

  // hàm phát nhạc ngẫu nhiên
  randomSongs: function () {
    if (this.isSongVN) {
      let randoms;
      do {
        randoms = Math.floor(Math.random() * rankTableData.data.song.length);
      } while (randoms === this.curentIndexVN);
      this.curentIndexVN = randoms;
    } else if (this.isSongUSUK) {
      let randoms;
      do {
        randoms = Math.floor(Math.random() * songDataUSUK.length);
      } while (randoms === this.curentIndexUSUK);
      this.curentIndexUSUK = randoms;
    } else {
      let randoms;
      do {
        randoms = Math.floor(Math.random() * songDataEDM.length);
      } while (randoms === this.curentIndexEDM);
      this.curentIndexEDM = randoms;
    }
    this.loadSongs();
  },

  start: function () {
    this.renderView();
    this.definePro();
    this.handlesEvent();
    this.loadSongs();
  },
};
app.start();
