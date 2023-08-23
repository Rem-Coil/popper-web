<template>
  <v-row fill-height>
    <v-col cols="9">
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
                  <p style="font-size: 28px; margin-bottom: 0; margin-left: 2%">{{ item.action_type }} </p>
                  <p style="font-size: 28px; margin-bottom: 0; margin-left: 2%" v-if="item.control_type!=null">
                    ({{ item.control_type }})</p>
                  <v-spacer></v-spacer>
                  <p style="font-size: 14px; margin-bottom: 0;">{{ timeCount(item.done_time) }}</p>
                </v-row>
                <v-row>
                  <p style="font-size: 16px; margin-top: 0; margin-left: 2%">{{ item.name }}</p>
                </v-row>
              </v-flex>
            </v-card-title>
            <div v-if="item.comment!=null && item.comment!=''">
              <v-card-text class="white text--primary">
                <p style="text-align: left; font-size: 16px">{{ item.comment }}</p>
              </v-card-text>
            </div>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-col>
    <v-col cols="3">
      <extra-drawer :bobbin_id="$route.params.bobbin_id" :prod_op="prodOp" :spec_op="specOp" :test_op="testOp"/>
    </v-col>
  </v-row>


</template>

<script>

import axios from "axios";
import {DOMAIN_NAME} from "@/api/api";
import extraDrawer from "@/components/progress/ExtraDrawer.vue";

export default {
  name: 'timeLine',
  components: {
    extraDrawer
  },
  props: {
    bobbin_id: String
  },
  data: () => ({
    items: [],
    specOp: [],
    prodOp: [],
    testOp: []
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
      const opOPerations = await axios.get(DOMAIN_NAME + '/action/product/' + this.bobbin_id);
      const qOPerations = await axios.get(DOMAIN_NAME + '/control_action/product/' + this.bobbin_id);
      this.items = [];
      this.specOp = [];
      this.prodOp = opOPerations.data;
      this.testOp = qOPerations.data;
      await this.totalCount(opOPerations.data, qOPerations.data);
    },
    async totalCount(actions, testing) {
      const product = await axios.get(DOMAIN_NAME + '/product/' + actions[0].product_id);
      const batch = await axios.get(DOMAIN_NAME + '/batch/' + product.data.batch_id);
      const kit = await axios.get(DOMAIN_NAME + '/kit/' + batch.data.kit_id);
      const spec = await axios.get(DOMAIN_NAME + '/specification/' + kit.data.specification_id);
      let oper_type = [];
      spec.data.operation_types.forEach((item) => {
        let temp = {
          id: 0,
          type: '',
          sequence_number: 0
        }
        temp.id = item.id;
        temp.type = item.type;
        temp.sequence_number = item.sequence_number;
        oper_type.push(temp);
      });
      this.specOp = oper_type;
      const employee = await axios.get(DOMAIN_NAME + '/employee?active_only=true');
      let users = employee.data;
      let operations = [];
      for (const action of actions) {
        let temp = {
          id: '',
          repair: false,
          action_type: '',
          done_time: '',
          name: '',
          color: '',
          icon: ''
        };
        temp.id = action.id;
        let act = oper_type.find(item => item.id == action.operation_type);
        temp.action_type = act.type;
        let date = new Date(action.done_time);
        temp.done_time = date;
        let user = users.find(item => item.id == action.employee_id);
        temp.name = `${user.first_name} ${user.last_name}`;
        temp.repair = action.repair;
        if (action.repair) {
          temp.color = 'yellow lighten-1';
        } else {
          temp.color = 'green lighten-2';
        }
        operations.push(temp);
      }
      for (const test of testing) {
        let temp = {
          id: '',
          successful: false,
          action_type: '',
          done_time: '',
          control_type: '',
          comment: '',
          name: '',
          color: '',
          icon: ''
        };
        temp.id = test.id;
        let act = oper_type.find(item => item.id == test.operation_type);
        temp.action_type = act.type;
        let date = new Date(test.done_time);
        temp.done_time = date;
        let user = users.find(item => item.id == test.employee_id);
        temp.name = `${user.first_name} ${user.last_name}`;
        temp.successful = test.successful;
        temp.comment = test.comment;
        temp.control_type = test.control_type;
        if (test.successful) {
          temp.color = 'green lighten-1';
          temp.icon = 'mdi-check';
        } else {
          temp.color = 'red lighten-2';
          temp.icon = 'mdi-close';
        }
        operations.push(temp);
      }
      operations.sort((a, b) => {
        let a_time = new Date(a.done_time);
        let b_time = new Date(b.done_time);

        if (a_time > b_time) return -1;
        if (a_time === b_time) return 0;
        return 1;
      });
      this.items = operations;
    },
    timeCount(time) {
      let minutes = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes();
      let dTime = time.getHours() + ':' + minutes + ' ' + time.toLocaleDateString();
      let res = `${dTime.split(' ')[0]}  ${dTime.split(' ')[1]}`;
      return res;
    }
  }
};
</script>

<style>
.col {
  padding: 0;
}
</style>