<template>
  <router-view :key ='$route.params'/>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Gotham', sans-serif;
}
a {
  text-decoration: none;
}

@font-face {
  font-family: 'Gotham';
  src: url('./assets/fonts/GothamMedium.ttf') format('truetype');
  font-style: normal;
  font-weight: medium;
}

@font-face {
  font-family: 'Gotham';
  src: url('./assets/fonts/GothamBold.ttf') format('truetype');
  font-style: normal;
  font-weight: bold;
}

@font-face {
  font-family: 'Gotham';
  src: url('./assets/fonts/GothamLight.ttf') format('truetype');
  font-style: normal;
  font-weight: normal;
}
</style>