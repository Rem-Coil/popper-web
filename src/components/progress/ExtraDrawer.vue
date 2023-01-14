<template>
<!--  <div style="background-color: #2c3e50; width: 100%; height: 100%;">-->
<!--  </div>-->
  <v-data-table
      :headers="headers"
      :items="actionType"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="name"
      show-expand
      hide-default-header
      hide-default-footer
  >
    <template v-slot:expanded-item="{headers}">
      <td :colspan="headers.length">
        <div v-for="(item, i) in notFinish" :key="i">{{ item }}</div>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import {DOMAIN_NAME} from "@/api/api";

export default {
  props: {
    bobbin_id: String
  },
  data() {
    return {
      expanded: [],
      singleExpand: false,
      headers: [
        {text: '', value: 'data-table-expand'},
        {text: 'Виды задач', value: 'name'},
      ],
      itemHeaders: [
        {text: '', value: 'data-table-expand'},
        {text: 'Виды задач', value: 'name'},
      ],
      actionType: [
        {
          name: 'Невыполненные',
        },
      ],
      notFinish: [],
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
      const res = await axios.get(DOMAIN_NAME+'action/full/bobbin/' + this.bobbin_id);
      this.notFinish = [];
      let temp = [];
      for (let item of res.data) {
        temp.push(item.action_type);
      }
      let all = ['winding', 'output', 'isolation', 'molding', 'crimping', 'quality', 'testing'];
      const result = all.filter(el => !temp.includes(el));
      this.translateActions(result);
    },
    translateActions(result) {
      for (const r of result) {
        for (const t of this.translate) {
          if (t.en === r) {
            this.notFinish.push(t.ru);
          }
        }
      }
    }
  }
}
</script>


<!--class="elevation-1"-->
<!--style="height: 100%; width: 100%"-->