<template>
  <v-app id="inspire">
    <v-app-bar color="white" elevation="1" clipped-left app>
      <v-btn :to="'/'" text color="secondary">
        <v-icon color="secondary">mdi-keyboard-backspace</v-icon>
        Назад
      </v-btn>
      <v-toolbar-title>&nbsp; Партия - {{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer class="accent-4" clipped permanent app>
      <v-list>
        <v-list-item
            v-for="item in items"
            :key="item.id"
            link
            style="padding:0;"
            active-class="acti-l"
            color="#dceffdff"
            :to="'/Progress/'+ id+'/'+item.id">

          <v-list-item-content style="padding:0">
            <p style="text-align: left; margin-left: 2%; padding:2%; margin-bottom: 0; margin-top: 2%;">{{ `${title}/${item.bobbin_number}`}}</p>
<!--            <p style="text-align: center; margin-bottom: 2%; margin-top: 0; font-size: 12px">-->
<!--              {{ item.action_type }}-->
<!--            </p>-->
          </v-list-item-content>

        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main style="background-color: #eeeeee;">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import axios from "axios";
import {DOMAIN_NAME} from "@/api/api";

export default {
  name: 'ProgressPage',
  async created() {
    await this.load()
  },
  props: {
    id: String
  },
  data() {
    return {
      title: "",
      items: []
    }
  },
  methods: {

    async load() {
      const res = await axios.get(DOMAIN_NAME+'v2/batch/' + this.id + '/product');
      const batch = await axios.get(DOMAIN_NAME+'v2/batch/' + this.id);
      const kit = await axios.get(DOMAIN_NAME+'v2/kit/' + batch.data.kit_id);
      this.title = `${kit.data.kit_number}-${batch.data.batch_number}`;
      await this.totalCount(res.data);
    },
    totalCount: async function (bobbins) {
      let tmp = [];

      for (const bobbin of bobbins) {
        let temp = {
          id: String,
          bobbin_number: Number,
          successful: Boolean
        };
        // const res = await axios.get(DOMAIN_NAME+'v2/action/product/' + bobbin.id);
        temp.id = bobbin.id;
        temp.bobbin_number = bobbin.product_number;
        temp.successful = bobbin.active;
        // temp.action_type = '';
        // let max = 0;
        // if (res.data.length !== 0) {
        //   res.data.forEach((action) => {
        //     if (new Date(action.done_time).getTime() > max && action.repair === false) {
        //       max = action.done_time;
        //           temp.action_type = action.operation_type;
        //       }
        //     })
        //   }
        tmp.push(temp);
        }

      this.sortName(tmp)
    },

    sortName(bobbins) {
      bobbins.sort(function (a, b) {
        if (a.active !== b.active) {
          if (a.active) {
            return -1
          } else {
            return 1
          }
        } else {
          let aLast = a.bobbin_number;
          let bLast = b.bobbin_number;
          return aLast[aLast.length - 1] - bLast[bLast.length - 1];
        }
      });
      this.items = bobbins;
    }
  }
}
</script>

<style>

.acti-l {
  width: 100%;
  height: auto;
  color: #2196f3;
  border-left: solid 5px #2196f3;
  text-align: left;
  background-color: #dceffd;
}

.acti-l p {
  color: #2196f3;
}
</style>
