<template>
  <v-app id="inspire" :key="componentKey">
    <v-app-bar color="white" elevation="1" clipped-left app>
      <v-btn :to="'/'" text color="secondary">
        <v-icon color="secondary">mdi-keyboard-backspace</v-icon>
        Назад
      </v-btn>
      <v-toolbar-title>&nbsp; Партия - {{ title }}</v-toolbar-title>
      <v-spacer/>
      <v-btn @click="deleteDialog=true" text color="secondary">
        <v-icon color="secondary">mdi-delete</v-icon>
        Очистить историю
      </v-btn>
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
            <div>
            <p style="display: inline-block; text-align: left; margin-left: 2%; padding:2%; margin-bottom: 0; margin-top: 2%;">{{ `${title}/${item.bobbin_number}`}}
              </p>
              <p v-if="!item.successful" style="display: inline-block">(defect)</p>
            </div>
          </v-list-item-content>

        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main style="background-color: #eeeeee;">
      <router-view></router-view>
    </v-main>

    <v-dialog v-model="deleteDialog" persistent max-width="300">
        <v-card>
          <v-card-title class="headline">Удаление</v-card-title>
          <v-card-text>Вы уверены, что хотите удалить историю операции всей партии?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" flat @click="deleteTask">Да</v-btn>
            <v-btn color="secondary" flat @click="deleteDialog = false">Отмена</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      items: [],
      deleteDialog: false,
      componentKey: 0
    }
  },
  methods: {

    async load() {
      this.forceRerender();
      const res = await axios.get(DOMAIN_NAME+'/batch/' + this.id + '/product');
      const batch = await axios.get(DOMAIN_NAME+'/batch/' + this.id);
      const kit = await axios.get(DOMAIN_NAME+'/kit/' + batch.data.kit_id);
      this.title = `${kit.data.kit_number}-${batch.data.batch_number}`;
      await this.totalCount(res.data);
    },
    async deleteTask() {
      await axios.delete(DOMAIN_NAME + `batch/${this.id}/history`);
      this.deleteDialog = false;
      this.load();
    },
    forceRerender() {
      this.componentKey += 1;  
    }
,
    totalCount: async function (bobbins) {
      let tmp = [];

      for (const bobbin of bobbins) {
        let temp = {
          id: String,
          bobbin_number: Number,
          successful: Boolean
        };
        temp.id = bobbin.id;
        temp.bobbin_number = bobbin.product_number;
        temp.successful = bobbin.active;
        tmp.push(temp);
        }

      this.sortName(tmp)
    },

    sortName(bobbins) {
      bobbins.sort(function (a, b) {
        if (a.successful !== b.successful) {
          if (a.successful) {
            return -1
          } else {
            return 1
          }
        } else {
          return a.bobbin_number - b.bobbin_number;
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
  /* text-align: left; */
  background-color: #dceffd;
}

.acti-l p {
  color: #2196f3;
}
</style>
