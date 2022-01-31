<template>
  <div class="player__body">
    <div class="player__nowPlaying-widget">
      <div v-if="trackInfo.album" class="player__nowPlaying-img">
        <img :src="trackInfo.album.images[2].url" alt="">
      </div>
      <div v-if="trackInfo.artists" class="player__nowPlaying-info">
        <span>
          <a>{{ trackInfo.name }}</a>
        </span>
        <span>
          <a>{{ trackInfo.artists[0].name }}</a>
        </span>
      </div>
      <div class="player__nowPlaying-actions">
        <div class="player__nowPlaying-favorite">
          <svg
            role="img"
            height="16"
            width="16"
            viewBox="0 0 16 16"
            fill="#ffffff"
            class="Svg-sc-1bi12j5-0 hDgDGI"
          >
            <path
              d="M13.764 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253A4.05 4.05 0 00.974 5.61c0 1.089.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195A4.052 4.052 0 0014.96 5.61a4.057 4.057 0 00-1.196-2.883zm-.722 5.098L8.58 13.048c-.307.36-.921.36-1.228 0L2.864 7.797a3.072 3.072 0 01-.905-2.187c0-.826.321-1.603.905-2.187a3.091 3.091 0 012.191-.913 3.05 3.05 0 011.957.709c.041.036.408.351.954.351.531 0 .906-.31.94-.34a3.075 3.075 0 014.161.192 3.1 3.1 0 01-.025 4.403z"
            ></path>
          </svg>
        </div>
        <div class="player__nowPlaying-newWindow">
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <g fill="#ffffff" fill-rule="evenodd">
              <path
                d="M1 3v9h14V3H1zm0-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
                fill-rule="nonzero"
              ></path>
              <path d="M10 8h4v3h-4z"></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div class="player__controls">
      <div class="player__controls-buttons">
        <div class="player__controls-left">
          <button>
            <svg
              role="img"
              height="16"
              width="16"
              viewBox="0 0 16 16"
              class="Svg-sc-1bi12j5-0 hDgDGI"
            >
              <path
                d="M4.5 6.8l.7-.8C4.1 4.7 2.5 4 .9 4v1c1.3 0 2.6.6 3.5 1.6l.1.2zm7.5 4.7c-1.2 0-2.3-.5-3.2-1.3l-.6.8c1 1 2.4 1.5 3.8 1.5V14l3.5-2-3.5-2v1.5zm0-6V7l3.5-2L12 3v1.5c-1.6 0-3.2.7-4.2 2l-3.4 3.9c-.9 1-2.2 1.6-3.5 1.6v1c1.6 0 3.2-.7 4.2-2l3.4-3.9c.9-1 2.2-1.6 3.5-1.6z"
              ></path>
            </svg>
          </button>
          <button>
            <svg
              role="img"
              height="16"
              width="16"
              viewBox="0 0 16 16"
              class="Svg-sc-1bi12j5-0 hDgDGI"
            >
              <path d="M13 2.5L5 7.119V3H3v10h2V8.881l8 4.619z"></path>
            </svg>
          </button>
        </div>
        <div class="player__controls-playpause">
          <button>
            <svg
              role="img"
              height="16"
              width="16"
              viewBox="0 0 16 16"
              class="Svg-sc-1bi12j5-0 hDgDGI"
            >
              <path fill="none" d="M0 0h16v16H0z"></path>
              <path d="M3 2h3v12H3zm7 0h3v12h-3z"></path>
            </svg>
          </button>
        </div>
        <div class="player__controls-right">
          <button>
            <svg
              role="img"
              height="16"
              width="16"
              viewBox="0 0 16 16"
              class="Svg-sc-1bi12j5-0 hDgDGI"
            >
              <path d="M11 3v4.119L3 2.5v11l8-4.619V13h2V3z"></path>
            </svg>
          </button>
          <button>
            <svg
              role="img"
              height="16"
              width="16"
              viewBox="0 0 16 16"
              class="Svg-sc-1bi12j5-0 hDgDGI"
            >
              <path
                d="M5.5 5H10v1.5l3.5-2-3.5-2V4H5.5C3 4 1 6 1 8.5c0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.6 3.6 5 5.5 5zm9.1 1.7l-.9.5c.2.4.3.8.3 1.3 0 1.9-1.6 3.5-3.5 3.5H6v-1.5l-3.5 2 3.5 2V13h4.5C13 13 15 11 15 8.5c0-.6-.1-1.2-.4-1.8z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="player__controls-playback-bar">
        <div class="player__progressBar">
          <input type="range">
        </div>
      </div>
    </div>
    <div class="player__extraControls">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import SpotifyWebApi from "spotify-web-api-js";
const spotify = new SpotifyWebApi();
export default defineComponent({
  props: {
    trackId: {
      type: String,
    },
  },
  setup(props) {
    let trackInfo = ref<object>([]);
    watch(
      () => props.trackId,
      (newValue) => {
        if (newValue) {
          fetch(`https://api.spotify.com/v1/tracks/${newValue}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.token}`,
            },
          })
            .then(res => {
              return res.json()
            })
            .then(data => {
              trackInfo.value = data
            })
        }
      }
    );

    onMounted(() => {
      fetch(`https://api.spotify.com/v1/tracks/${sessionStorage.currentTrack}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.token}`,
        },
      })
        .then(res => {
          return res.json()
        })
        .then(data => {
          trackInfo.value = data
        })
      // spotify.getMyCurrentPlaybackState().then((res) => {
      //   if (res.is_playing) {
      //     spotify.pause()
      //   } else {
      //     spotify.play()
      //     console.log(171);
      //   }
      // })
    })

    return {
      trackInfo
    }
  },
});
</script>

<style lang="scss" scoped>
.player__body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 90px;
  padding: 0 16px;
}

.player__nowPlaying {
  &-widget {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-width: 180px;
    width: 30%;
  }
  &-img {
    width: 56px;
    height: 56px;
    background: #fff;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 14px;
    a {
      color: #ffffff;
      font-weight: 600;
    }
    span:nth-child(1) a {
      font-size: 16px;
    }
    span:nth-child(2) a {
      font-size: 11px;
    }
  }
  &-actions {
    display: flex;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
    }
  }
}

.player__controls {
  max-width: 722px;
  width: 40%;
  &-buttons {
    display: flex;
    margin-bottom: 12px;
    gap: 8px;
    button {
      background: none;
      border: none;
      svg {
        fill: #b3b3b3;
      }
    }
    button:hover {
      svg {
        fill: #ffffff;
      }
    }
  }
  &-left {
    display: flex;
    justify-content: flex-end;
    flex: 1;
    gap: 8px;
  }
  &-playpause {
    width: 32px;
    height: 32px;
    button {
      width: 100%;
      height: 100%;
      background: #ffffff;
      border-radius: 50%;
      svg {
        fill: black;
      }
      transition: transform 0.15s ease-in;
    }
    button:hover {
      transform: scale(1.1);
      transition: transform 0.15s ease-out;
      svg {
        fill: black;
      }
    }
  }
  &-playback-bar {
    .player__progressBar {
      input {
        width: 100%;
      }
    }
  }
  &-right {
    display: flex;
    flex: 1;
    gap: 8px;
  }
}

.player__extraControls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 180px;
  width: 30%;
}
</style>
