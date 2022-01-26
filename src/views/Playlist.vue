<template>
  <Wrapper>
    <div class="playlist">
      <div class="playlist__header">
        <div
          class="playlist__header-bg"
          style="background-color: rgb(232, 24, 40)"
        ></div>
        <div class="playlist__header-bg-gradient"></div>
        <div v-if="playlistInfo.images" class="playlist__img">
          <img
            v-if="playlistInfo.images[1]"
            :src="playlistInfo.images[1].url"
            alt="image"
          />
          <svg
            v-else
            role="img"
            height="48"
            width="48"
            aria-hidden="true"
            viewBox="0 0 48 48"
            class="pencil"
          >
            <path
              d="M33.402 3.006L8.852 31.751l-2.337 12.61 12.09-4.281 24.552-28.746-9.755-8.328zM9.112 41.32l1.543-8.327 6.44 5.5-7.983 2.827zm9.418-4.231l-6.712-5.732L33.625 5.825l6.711 5.731L18.53 37.089z"
            ></path>
          </svg>
        </div>
        <div class="playlist__detail">
          <h2>{{ playlistInfo.type }}</h2>
          <h1>{{ playlistInfo.name }}</h1>
          <div v-if="playlistInfo.owner">
            <a>{{ playlistInfo.owner.display_name }}</a>
            <span
              >{{ playlistInfo.tracks.total }} треков,
              {{ playlistTracksSz(allTracksSize) }}</span
            >
          </div>
        </div>
      </div>
      <div class="playlist__content">
        <div class="playlist__content-gradient"></div>
        <div class="playlist__content-header">
          <button class="playlist-play-button">
            <svg
              height="28"
              role="img"
              width="28"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <polygon
                points="21.57 12 5.98 3 5.98 21 21.57 12"
                fill="#ffffff"
              ></polygon>
            </svg>
          </button>
          <button class="playlist-actions-button">
            <svg
              role="img"
              height="32"
              width="32"
              viewBox="0 0 32 32"
              class="playlist-action-icon"
            >
              <path
                d="M5.998 13.999A2 2 0 105.999 18a2 2 0 00-.001-4zm10.001 0A2 2 0 1016 18a2 2 0 000-4zm10.001 0A2 2 0 1026.001 18 2 2 0 0026 14z"
              ></path>
            </svg>
          </button>
        </div>
        <div class="playlist__tracks">
          <div class="tracksTable">
            <div class="tracksTable__header">
              <div class="tracksTable__header-body">
                <div><span>#</span></div>
                <div><span>TITLE</span></div>
                <div><span>ALBUM</span></div>
                <div><span>DATE ADDEDD</span></div>
                <div>
                  <span
                    ><svg
                      role="img"
                      height="16"
                      width="16"
                      viewBox="0 0 16 16"
                      class="time-icon"
                    >
                      <path
                        d="M7.999 3h-1v5h3V7h-2V3zM7.5 0a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm0 14C3.916 14 1 11.084 1 7.5S3.916 1 7.5 1 14 3.916 14 7.5 11.084 14 7.5 14z"
                      ></path>
                      <path fill="none" d="M16 0v16H0V0z"></path></svg
                  ></span>
                </div>
              </div>
            </div>
            <div class="tracksTable__rows">
              <div
                v-for="(track, index) in playlistTracks"
                :key="track.added_at"
                @mouseover="trackRowOverHandler(track.track.id)"
                @mouseleave="trackRowLeaveHandler(track.track.id)"
                @click="playTrack(track.track.id)"
                class="tracksTable__row"
              >
                <div class="tracksTable__row-body">
                  <div>
                    <button v-if="track.track.hover" class="track__play-button">
                      <svg
                        height="32"
                        role="img"
                        width="32"
                        viewBox="0 0 24 24"
                        class="track-play-btn-icon"
                      >
                        <polygon
                          points="21.57 12 5.98 3 5.98 21 21.57 12"
                        ></polygon>
                      </svg>
                    </button>
                    <span v-else>{{ index + 1 }}</span>
                  </div>
                  <div>
                    <div class="track__image">
                      <img :src="track.track.album.images[2].url" alt="" />
                    </div>
                    <div class="track__info">
                      <span>{{ track.track.name }}</span>
                      <a>{{ track.track.artists[0].name }}</a>
                    </div>
                  </div>
                  <div>
                    <span>{{ track.track.album.name }}</span>
                  </div>
                  <div>
                    <span>{{ track.added_at }}</span>
                  </div>
                  <div>
                    <span>{{ playlistTracksSz(track.track.duration_ms) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Player :trackId="currentPLayTrackId" class="player" />
  </Wrapper>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { defineComponent, ref, Ref, computed, watch, onMounted } from "vue";
import SpotifyWebApi from "spotify-web-api-js";
import { playlistTracksSize } from "@/helpers/playlist";
import Wrapper from "./Wrapper.vue";
import Player from "@/components/Player.vue"
const spotify = new SpotifyWebApi();

export default defineComponent({
  components: {
    Wrapper,
    Player,
  },
  setup(props) {
    const route = useRoute();
    const playlistInfo: Ref<object> = ref<object>({});
    const playlistTracks: Ref<Array<object>> = ref<Array<object>>([]);
    const playlistId: string = String(route.params.id);
    const playlistTracksSz = playlistTracksSize;
    let currentPLayTrackId = ref<string>('')
    spotify.setAccessToken(sessionStorage.token);

    watch(currentPLayTrackId, (newValue) => {
      currentPLayTrackId.value = newValue
    })
    console.log(playlistId);
    if (sessionStorage.getItem("token")) {
      spotify.getPlaylist(playlistId).then((res) => {
        playlistInfo.value = res;
        playlistTracks.value = res.tracks.items;
      });
    }

    const allTracksSize = computed(() => {
      let playlistDurationSize = 0;
      playlistTracks.value.forEach((item) => {
        console.log(typeof item)
        playlistDurationSize += item.track.duration_ms;
      });
      return playlistDurationSize;
    });

    const trackRowOverHandler = function(trackId: string) {
      playlistTracks.value.forEach((item: any) => {
        if (item.track.id === trackId) {
          item.track.hover = true
        }
      });
    }

    const trackRowLeaveHandler = function(trackId: string) {
      playlistTracks.value.forEach((item: any) => {
        if (item.track.id === trackId) {
          item.track.hover = false
        }
      });
    }
    const playTrack = function(trackId: string) {
      currentPLayTrackId.value = trackId
      spotify
        .play({
          uris: [`spotify:track:${trackId}`]
        })
        .then((res) => {
          spotify.getMyCurrentPlayingTrack().then((r) => {
            console.log(r);
          })
        })
      sessionStorage.setItem('currentTrack', trackId)
    }

    onMounted(() => {
      console.log(typeof route.params.id, 225)
    })

    return {
      playlistInfo,
      allTracksSize,
      playlistTracksSz,
      playlistTracks,
      trackRowOverHandler,
      trackRowLeaveHandler,
      playTrack,
      currentPLayTrackId,
    };
  },
});
</script>

<style lang="scss" scoped>
.playlist {
  padding-bottom: 120px;
}
.playlist__header {
  display: flex;
  position: relative;
  padding: 90px 32px 20px 32px;
  height: 30vh;
  max-height: 500px;
  min-height: 340px;
  overflow: hidden;
  &-bg {
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
  }
  &-bg-gradient {
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    background: linear-gradient(transparent 0, rgba(0, 0, 0, 0.5) 100%);
  }
  .playlist__img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 24px;
    width: 232px;
    min-width: 232px;
    height: 232px;
    min-height: 232px;
    z-index: 2;
    background-color: #282828;
    img {
      width: 232px;
      height: 232px;
    }
    .pencil {
      fill: #ffffff;
    }
  }
  .playlist__detail {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    color: #ffffff;
    z-index: 2;
    h2 {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
    }
    h1 {
      padding: 0.08em 0px;
      font-size: calc((100vw - 300px) / 15);
      line-height: calc((100vw - 300px) / 15);
      font-weight: 900;
      letter-spacing: -0.04em;
    }
    a {
      font-weight: 600;
    }
    span::before {
      content: "•";
      margin: 0 4px;
    }
    span {
      color: rgba(255, 255, 255, 0.7);
      font-size: 14px;
      line-height: 16px;
    }
  }
}
.playlist__content {
  background: #121212;
  width: 100%;
  height: 80vh;
  position: relative;
  padding: 24px 32px;
  &-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 232px;
    background-color: rgb(232, 24, 40);
    background-image: linear-gradient(rgba(0, 0, 0, 0.6) 0, #121212 100%);
  }
  &-header {
    display: flex;
    position: relative;
    padding: 24px 0;
    z-index: 2;
  }
}

.playlist-play-button {
  width: 56px;
  height: 56px;
  margin-right: 32px;
  border: none;
  border-radius: 50%;
  background: #1db954;
  cursor: pointer;
  transition: transform 0.15s ease-in;
}
.playlist-play-button:hover {
  transform: scale(1.1);
  transition: transform 0.15s ease-out;
}

.playlist-actions-button {
  background: none;
  border: none;
  padding: 0 10px;
  cursor: pointer;
  .playlist-action-icon {
    fill: #b79ea0;
  }
}
.playlist-actions-button:hover {
  .playlist-action-icon {
    fill: #ffffff;
  }
}

.playlist__tracks {
  position: relative;
  z-index: 2;
  color: #ffffff;
  .tracksTable__header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 16px;
    &-body {
      display: grid;
      grid-template-columns: 16px 6fr 4fr 3fr minmax(120px, 1fr);
      grid-gap: 16px;
      padding: 10px 0;
      div {
        span {
          color: #b3b3b3;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          line-height: 16px;
          text-transform: uppercase;
        }
      }
      .time-icon {
        fill: #ffffff;
      }
    }
  }
}

.tracksTable__rows {
  color: #fff;
  .tracksTable__row {
    display: flex;
    align-items: center;
    height: 56px;
    padding: 0 16px;
    &:hover {
      border: 1px solid transparent;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 0.3);
    }
    &-body {
      display: grid;
      grid-template-columns: 16px 6fr 4fr 3fr minmax(120px, 1fr);
      align-items: center;
      grid-gap: 16px;
    }
  }
}

.tracksTable__row-body {
  div:nth-child(2) {
    display: flex;
    .track__image {
      margin-right: 16px;
      img {
        width: 40px;
        height: 40px;
      }
    }
    .track__info {
      display: flex;
      flex-direction: column;
      span {
        font-size: 16px;
      }
      a {
        font-size: 14px;
      }
    }
  }
}

.track__play-button {
  background: none;
  border: none;
  .track-play-btn-icon {
    width: 20px;
    height: 20px;
    polygon {
      fill: #ffffff;
    }
  }
}

.player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #181818;
  border-top: 1px solid #282828;
  z-index: 999;
}
</style>
