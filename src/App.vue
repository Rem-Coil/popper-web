<template>
  <n-message-provider>
    <n-config-provider :theme-overrides="themeOverrides">
      <!-- <n-theme-editor> -->
      <router-view />
      <!-- </n-theme-editor> -->
    </n-config-provider>
  </n-message-provider>
</template>

<script setup>
import { NConfigProvider } from 'naive-ui'
import { NThemeEditor } from 'naive-ui'

const themeOverrides = {
  common: {
    borderRadius: "8px",
    baseColor: "#FFF",
    primaryColor: "#0960acFF",
    primaryColorHover: "#1B85E1FF",
    primaryColorPressed: "#0960ACFF",
    hoverColor: "rgb(243, 243, 245)"
  },
  Button: {
    heightMedium: "40px",
    fontSizeMedium: "16px"
  },
  Input: {
    heightMedium: "40px",
    fontSizeMedium: "16px"
  },
  Typography: {
    headerMargin1: "0 0 24px 0",
    headerTextColor: "rgba(51, 54, 57, 1)",
    headerFontSize1: "30px"
  },
  Card: {
    borderRadius: "16px"
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

#app {
  font-family: Roboto;
  height: 100vh;
}

.n-config-provider {
  height: 100%;
}
</style>