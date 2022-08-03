<template>
  <v-timeline
      align-top
      dense
      style="margin-left: 10%; background-color: #eeeeee"
  >
    <v-timeline-item
        v-for="item in items"
        :key="item.id"
        :color="item.color"
        :icon="item.icon"
        fill-dot
    >
      <v-card
          :color="item.color"
          dark
          width="80%"
      >
        <v-card-title class="text-h6">
          <v-flex>
            <v-row>
              <p style="font-size: 28px; margin-bottom: 0; margin-left: 2%">{{ item.action_type }}</p>
              <v-spacer></v-spacer>
              <p style="font-size: 16px; margin-bottom: 0;">{{ item.done_time }}</p>
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
</template>

<script>

import axios from "axios";

export default {
  name: 'timeLine',
  async created() {
    this.$watch(
        () => this.$route.params,
        async () => {
          await this.load();
        }
    );
    console.log('Timeline:');
    await this.load();
  },
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
  methods: {
    async load() {
      const res = await axios.get('https://popper-service.herokuapp.com/action/full/bobbin/' + this.bobbin_id);
      this.items = [];
      await this.totalCount(res.data);
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
        temp.done_time = new Date(action.done_time).getHours() + ':' + new Date(action.done_time).getMinutes() + ' ' + new Date(action.done_time).toLocaleDateString();
        temp.name = action.firstname + ' ' + action.second_name;
        temp.successful = action.successful;
        let res = await axios.get('https://popper-service.herokuapp.com/action/comment/' + action.action_id);
        temp.comment = res.data.comment;
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