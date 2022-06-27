<template>
<div>
    <v-navigation-drawer
      class="accent-4"
      height="100vh"
      width = "100%"
      permanent>

    <v-list>
        <img alt="logo" src="../assets/logo.png" style="width: 80%; margin:40px 0 40px 0">

        <v-divider/>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.path"
          style="padding:0px;"
        >
        <v-list-item-content style="padding:0px">
        <router-link :to="item.path" tag="button" 
        style="text-align: left"><v-icon style="margin-left:5%">{{ item.icon }}</v-icon>{{item.title}}</router-link>
        </v-list-item-content>
    </v-list-item>
      </v-list>
    </v-navigation-drawer>
</div>
</template>


<script>
export default {
  name: 'navDrawer' ,
  data() {
    return {
        items: [
          { title: '  Список заданий', icon: 'mdi-order-bool-descending-variant', path:"/Tasks" },
          { title: '  Сотрудники', icon: 'mdi-account', path:"/" },
          { title: '  Настройки', icon: 'mdi-cog', path:"/Settings" },
        ],
      }
  },
};
</script>