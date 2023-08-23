<template>
  <table>
    <tr v-for = "i in stroke" :key="i"><td v-for = "item in products.slice((i-1)*7, 7*(i-1)+7)" :key="item.id" class="pad">
      <div>
        <p>{{item.kit_num}}-{{item.batch_num}}/{{item.prod_num}}</p>
      <qrcode-vue :value="`s:${item.specification_id};p:${item.id};`"  level="H"></qrcode-vue>
      </div>
    </td></tr>
  </table>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import axios from "axios";
import {DOMAIN_NAME} from "@/api/api";

export default {
  name: 'QrPage',

  props: {
    id: String
  },

  components: {
    QrcodeVue,
  },

  data() {
    return {
      products: [],
      stroke:0
    }
  },

  async created() {
    await this.load()
  },

  methods:{
    async load() {
      this.products = [];
      const prod = await axios.get(DOMAIN_NAME + `/batch/${this.id}/product`);
      const batches = await axios.get(DOMAIN_NAME + '/batch');


      await this.totalCount(prod.data, batches.data, this.id);
    },
    async totalCount(prod, batches, id){
      let kit = '';
      let b_num = '';
      batches.forEach((item) =>{
      if (item.id == id){
        kit = item.kit_id
        b_num = item.batch_number
      }
      });
      const res = await axios.get(DOMAIN_NAME + '/kit/' + kit);
      let specific = res.data.specification_id;
      let k_num = res.data.kit_number;

      prod.forEach((item) =>{
        let product= {
          specification_id: specific,
          id: 0,
          prod_num: 0,
          kit_num: k_num,
          batch_num: b_num
        };
          product.id = item.id;
          product.prod_num = item.product_number;
          this.products.push(product)
      });
      this.stroke = Math.floor(this.products.length/7) +1;
    }
  }
}
</script>

<style>
.pad{
  padding: 1em;
  font-weight: bolder;
}
</style>