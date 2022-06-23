<template>
    <v-card
  >
    <v-navigation-drawer
      class="accent-4"
      height="100vh"
      width = "100%"
      permanent
      >
     <v-list>
        <img alt="logo" src="../assets/logo.png" style="width: 80%">

    <v-divider></v-divider>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>


<script>

export default {
  name: 'navDrawer' ,

  components: {
  },

  data() {
    return {
        items: [
          { title: 'Список заданий', icon: 'mdi-view-dashboard' },
          { title: 'Сотрудники', icon: 'mdi-account-box' },
          { title: 'Настройки', icon: 'mdi-gavel' },
        ],
      }
  },
};
</script>