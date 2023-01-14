<template>
  <v-row fill-height >
    <v-col cols="12" >
      <v-timeline
          align-top
          dense

          v-if="items.length!==0">

        <v-timeline-item
            v-for="item in items"
            :key="item.id"
            :color="item.color"
            :icon="item.icon"
            fill-dot>

          <v-card
              :color="item.color"
              dark
              width="80%">

            <v-card-title class="text-h6">
              <v-flex>
                <v-row>
                  <p style="font-size: 28px; margin-bottom: 0; margin-left: 2%">{{ item.action_type }}</p>
                  <v-spacer></v-spacer>
                  <p style="font-size: 14px; margin-bottom: 0;">{{ item.done_time.split(' ')[0] }} &nbsp;
                    {{ item.done_time.split(' ')[1] }}</p>
                </v-row>
                <v-row>
                  <p style="font-size: 16px; margin-top: 0; margin-left: 2%">{{ item.name }}</p>
                </v-row>
              </v-flex>
            </v-card-title>
            <div v-if="item.comment!=null">
              <v-card-text class="white text--primary">
                <p style="text-align: left; font-size: 16px">{{ item.comment }}</p>
              </v-card-text>
            </div>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-col>
<!--    <v-col cols="3">-->
<!--      <extra-drawer :bobbin_id="$route.params.bobbin_id"/>-->
<!--    </v-col>-->
  </v-row>


</template>

<script>

import axios from "axios";
import {DOMAIN_NAME} from "@/api/api";
// import extraDrawer from "@/components/progress/ExtraDrawer.vue";

export default {
  name: 'timeLine',
  // components: {
  //   extraDrawer
  // },
  props: {
    bobbin_id: String
  },
  data: () => ({
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
  }),
  async created() {
    this.$watch(
        () => this.$route.params,
        async () => {
          await this.load();
        }
    );

    await this.load();
  },
  methods: {
    async load() {
      const res = await axios.get(DOMAIN_NAME+'action/bobbin/' + this.bobbin_id+'/full');
      this.items = [];
      await this.totalCount(res.data.actions);
    },
    totalCount: async function (actions) {
      actions.sort((a, b) => new Date(a.done_time).getTime() > new Date(b.done_time).getTime() ? -1 : 1);
      for (const action of actions) {
        let temp = {
          id: String,
          action_type: String,
          done_time: String,
          first_name: String,
          second_name: String,
          successful: Boolean,
          comment: String,
          color: String,
          icon: String
        };
        temp.id = action.action_id;
        for (const t of this.translate) {
          if (t.en === action.action_type) {
            temp.action_type = t.ru;
          }
        }
        let date = new Date(action.done_time);
        let minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
        temp.done_time = date.getHours() + ':' + minutes + ' ' + date.toLocaleDateString();
        temp.name = action.first_name + ' ' + action.second_name;
        temp.successful = action.successful;
        temp.comment = action.comment;
        if (action.successful) {
          temp.color = 'green lighten-1';
          temp.icon = 'mdi-check';
        } else {
          temp.color = 'red lighten-2';
          temp.icon = 'mdi-close';
        }
        this.items.push(temp);
      }
    }
  }
};
</script>

<style>
.col {
  padding: 0;
}
</style>