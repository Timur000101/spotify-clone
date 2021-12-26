<template>
  <Wrapper>
    <div class="playlist__header">
      <div v-if="playlist.images" class="playlist__img">
        <img
          v-if="playlist.images[1]"
          :src="playlist.images[1].url"
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
        <h2>{{ playlist.type }}</h2>
        <h1>{{ playlist.name }}</h1>
        <div v-if="playlist.owner">
          <a>{{ playlist.owner.display_name }}</a>
          <span>{{ playlist.tracks.total }} треков, </span>
        </div>
      </div>
    </div>
  </Wrapper>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { defineComponent, ref } from "vue";
import SpotifyWebApi from "spotify-web-api-js";
import Wrapper from "./Wrapper.vue";
const spotify = new SpotifyWebApi();

export default defineComponent({
  components: {
    Wrapper,
  },
  setup() {
    const route = useRoute();
    const playlist: any = ref<Array<any>>([[]]);
    const playlistId: any = route.params.id;
    spotify.setAccessToken(sessionStorage.token);

    if (sessionStorage.getItem("token")) {
      spotify.getPlaylist(playlistId).then((res) => {
        playlist.value = res;
      });
    }

    return {
      playlist,
    };
  },
});
</script>

<style lang="scss" scoped>
.playlist__header {
  display: flex;
  .playlist__img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 24px;
    width: 232px;
    min-width: 232px;
    height: 232px;
    min-height: 232px;
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
</style>
