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
  Card: {
    borderRadius: "16px"
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100vh;
}

.n-config-provider {
  height: 100%;
}
</style>