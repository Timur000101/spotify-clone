<template>
  <div class="header__body">
    <div class="header__arrows">
      <button class="active arrow-btn">
        <svg
          role="img"
          focusable="false"
          height="24"
          width="24"
          viewBox="0 0 24 24"
          class="arrow-icon"
        >
          <polyline points="16 4 7 12 16 20" fill="none"></polyline>
        </svg>
      </button>
      <button class="arrow-btn">
        <svg
          role="img"
          focusable="false"
          height="24"
          width="24"
          viewBox="0 0 24 24"
          class="arrow-icon"
        >
          <polyline points="8 4 17 12 8 20" fill="none"></polyline>
        </svg>
      </button>
    </div>
    <div class="header__action"></div>
    <div class="header__profile">
      <img
        src="https://i.scdn.co/image/ab6775700000ee858c673b1bca1a28a4144b311e"
        alt="profile"
      />
      <span>Temur</span>
      <svg
        role="img"
        height="16"
        width="16"
        class="arrow-down"
        viewBox="0 0 16 16"
      >
        <path d="M3 6l5 5.794L13 6z"></path>
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header__body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  .header__arrows {
    display: flex;
    justify-content: space-between;
    flex: 0 0 80px;
    .arrow-btn {
      width: 32px;
      height: 32px;
      background-color: rgba(0, 0, 0, 0.5);
      border: none;
      border-radius: 50%;
      cursor: not-allowed;
      .arrow-icon {
        polyline {
          stroke: #b3b3b3;
        }
      }
    }
    .arrow-btn.active {
      background-color: black;
      cursor: pointer;
      .arrow-icon {
        polyline {
          stroke: #ffffff;
        }
      }
    }
  }
  .header__profile {
    display: flex;
    align-items: center;
    height: 32px;
    padding: 2px;
    border-radius: 23px;
    background-color: rgba(0,0,0,.7);
    cursor: pointer;
    img {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
    }
    span {
      color: #ffffff;
    }
    .arrow-down {
      fill: #ffffff;
      margin-left: 10px;
      margin-right: 6px;
    }
  }
}
</style>
