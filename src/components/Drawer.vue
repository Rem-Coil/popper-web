<template>
  <div>
    <v-navigation-drawer
        class="accent-4"
        height="100vh"
        width="100%"
        permanent>

      <v-list>
        <img alt="logo" src="../assets/logo.png" style="width: 80%; margin:40px 0 40px 0">

        <v-divider/>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.path"
            style="padding:0; "
            active-class="act-link"
            color = "#dceffdff"
        >
          <v-list-item-content style="padding:0;" :to="item.path">
           <div class="div1"> <v-icon style="margin-left:5%">{{ item.icon }}</v-icon>
            <p style="margin-top: auto; margin-bottom: auto; margin-left: 3%">{{ item.title }}</p></div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>


<script>
export default {
  name: 'navDrawer',
  data() {
    return {
      items: [
        {title: 'Список заданий', icon: 'mdi-order-bool-descending-variant', path: "/"},
        {title: 'Сотрудники', icon: 'mdi-account', path: "/Worker"}
      ],
    }
  },
};
</script>

<style>

.act-link{
  border-left: solid 5px #2196f3;
  background-color: #dceffd;
}

.act-link div{
  width: 100%;
  height: 100%;
  padding: 0;
  text-align: left;
  color: #2196f3;
}

.act-link p{
  color: #2196f3;
}
.div1 {
  display: flex;
  flex-direction: row;}
</style>