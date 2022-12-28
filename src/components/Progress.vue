<template>
    <v-app id="inspire">
      <progress-head :title="title" style="border-bottom: solid 1px #eeeeee;" height = "10%"/>
      <v-flex>
        <v-row style="height: 100vh">
          <v-col cols="2" id="drawer" style="padding-right: 0">
            <v-navigation-drawer
                class="accent-4"
                height="100%"
                width="100%"
                permanent>

              <v-list >
                <v-list-item
                    v-for="item in items"
                    :key="item.id"
                    link
                    style="padding:0;"
                    active-class="acti-l"
                    color="#dceffdff"
                    :to="'/Progress/'+ id+'/'+item.id"
                >
                  <v-list-item-content style="padding:0">
                      <p style="text-align: center; padding:2%; margin-bottom: 0; margin-top: 2%;">{{ item.bobbin_number }}</p>
                      <p style="text-align: center; margin-bottom: 2%; margin-top: 0; font-size: 12px">
                        {{ item.action_type }}
                      </p>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-col>
          <v-col cols="8" style="background-color: #eeeeee; padding-left: 0; padding-right: 0">
            <router-view></router-view>
          </v-col>
          <v-col cols="2" style="padding-left: 0">
            <extra-drawer :bobbin_id="$route.params.bobbin_id"/>
          </v-col>
        </v-row>
      </v-flex>
    </v-app>
</template>

<script>

import extraDrawer from "@/components/ExtraDrawer.vue";
import axios from "axios";
import ProgressHead from "@/components/ProgressHead";
export default {
  name: 'ProgressPage',
  async created() {
    await this.load()
  },
  components: {
    ProgressHead,
    extraDrawer
  },
  props: {
    id: String
  },
  data() {
    return {
      title: "",
      items: [],
      translate: [
        {
          ru: 'Намотка',
          en: 'winding'
        },
        {
          ru: 'Вывод',
          en: 'output'
        },
        {
          ru: 'Изолировка',
          en: 'isolation'
        },
        {
          ru: 'Формовка',
          en: 'molding'
        },
        {
          ru: 'Опрессовка',
          en: 'crimping'
        },
        {
          ru: 'ОТК',
          en: 'quality'
        },
        {
          ru: 'Испытания',
          en: 'testing'
        },

      ]
    }
  },
  methods: {

    async load() {
      const res = await axios.get('http://remcoil.space:8080/bobbin/batch/' + this.id);
      await this.totalCount(res.data);
      const t = await axios.get('http://remcoil.space:8080/batch/' + this.id);
      this.title = t.data.batch_number;
    },
    totalCount: async function (bobbins) {
      let tmp = [];

      for (const bobbin of bobbins) {
        let temp = {
          id: String,
          bobbin_number: Number,
          action_type: String,
        };
        const res = await axios.get('http://remcoil.space:8080/action/bobbin/' + bobbin.id);
        temp.id = bobbin.id;
        temp.bobbin_number = bobbin.bobbin_number;
        temp.action_type = '';
        let max = 0;
        if (res.data.length !== 0) {
          res.data.forEach((action) => {
            if (new Date(action.done_time).getTime() > max && action.successful === true) {
              max = action.done_time;
              for (const t of this.translate) {
                if (t.en === action.action_type) {
                  temp.action_type = t.ru;
                }
              }
            }
          });
        }
        tmp.push(temp);

      }

      this.items = tmp;
    }
  }
}
</script>

<style>

.acti-l{
  width: 100%;
  height: auto;
  color: #2196f3;
  border-left: solid 5px #2196f3;
  text-align: left;
  background-color: #dceffd;
}

.acti-l p{
  color: #2196f3;
}
</style>