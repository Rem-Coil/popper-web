<template>
  <div style="background-color: white; width: 100%; height: 100%;">
    <v-data-table
        :headers="headers"
        :items="attentions"
        height="90vh"
        style=" margin-top: 1%"
        :items-per-page="-1"
        hide-default-footer
        fixed-header
    ></v-data-table>
  </div>
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
      prod_op:[],
      spec_op:[],
      expanded: [],
      singleExpand: false,
      headers: [
        {text: 'Предупреждения', value: 'name'},
      ],
      attentions: [],
      operationNames: []
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
      const res = await axios.get(DOMAIN_NAME + '/product/' + this.bobbin_id);
      const opOPerations = await axios.get(DOMAIN_NAME + '/action/product/' + this.bobbin_id);
      const conOPerations = await axios.get(DOMAIN_NAME + 'control_action/product/' + this.bobbin_id);
      this.prod_op=opOPerations.data;
      this.attentions = [];
      await this.opNames();
      this.translateActions(res.data);
      this.controlActions(conOPerations.data)
    },
    async opNames() {
      const product = await axios.get(DOMAIN_NAME + '/product/' + this.bobbin_id);
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
      this.spec_op = oper_type;
    },
    controlActions(res){
      let failControl = res.filter((o) => !o.successful);
      let operations = this.prod_op.filter((o) => o.repair);
      // console.log(failControl)
      console.log(this.spec_op)
      for (let i = 0; i < failControl.length ; i++) {
        console.log(operations.find(item => item.operation_type === failControl[i].operation_type))
        if(!(operations.find(item => item.operation_type === failControl[i].operation_type) && 
         new Date(operations.find(item => item.operation_type == failControl[i].operation_type).done_time) > new Date(failControl[i].done_time))
){
this.attentions.push({name: `Имеется невыполненный ремонт (${this.spec_op.find(item => item.id == failControl[i].operation_type).type})`})
        }
      }
    },

    translateActions(result) {
      if (!result.active) {
        this.attentions.push({name: 'Изделие забраковано'})
      }
      let operations = this.prod_op.filter((o) => !o.repair);
      operations.sort((a, b) => {
        let a_time = new Date(a.done_time);
        let b_time = new Date(b.done_time);

        if (a_time > b_time) return 1;
        if (a_time === b_time) return 0;
        return -1;
      });
      let spec = this.spec_op;
      spec.sort((a, b) => {
        if (a.sequence_number > b.sequence_number) return 1;
        if (a.sequence_number === b.sequence_number) return 0;
        return -1;
      });


      for (let i = 0; i < operations.length ; i++) {
        let currOp = spec[i].id;
        let item = operations[i];

        if (item.operation_type !== currOp) {
          let act = spec.find(a => a.id == item.operation_type);
          this.attentions.push({name: `Операция выполнена не в свою очередь (${act.type})`})
        }
      }
    }
  }
}
</script>


<!--class="elevation-1"-->
<!--style="height: 100%; width: 100%"-->