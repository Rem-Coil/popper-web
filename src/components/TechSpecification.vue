<template>
  <v-app id="inspire">
    <v-main style="background-color: #eeeeee;">
      <title-head :title="'Технические задания'"/>
    <v-card flat style="background-color: transparent;" class="pad">
      <v-card-title>
        <v-flex>
          <v-row style="margin-bottom: 2%">
            <v-col cols="2" style="padding:0">
              <v-btn
                  style=" background-color: white; width:100%; margin-top:9%; margin-left:7%"
                  @click="openDialog(defaultItem, 'Добавление');">
                <v-icon color="#2196f3">mdi-plus-circle</v-icon>
                <p style="font-size: 75%; margin: auto;">
                  Добавить
                </p>
              </v-btn>
            </v-col>
            <v-col cols="9" style="padding:0">
            </v-col>
          </v-row>
        </v-flex>
      </v-card-title>
      <table>
        <tr v-for = "i in stroke" :key="i">
          <td v-for ="item in techSpec.slice((i-1)*4, 4*(i-1)+4)" :key="item.id" style="width: 10%;">
            <v-card class="pad overflow-y-auto"
                    style="margin: 5%; text-align: left;"
                    v-scroll.self="onScroll"
                    height="300">
              <v-card-item>
                <v-card-title>{{item.specification_title}}
                  <v-spacer></v-spacer>
                  <v-icon size="small" @click="openDeleteDialog(item.id)" style="right: -10px; top:-20px"> mdi-close</v-icon>
                </v-card-title>
                <v-card-subtitle>Вид изделия: {{ item.product_type }}
                  <br/>Испытания: {{item.tested_percentage}}%</v-card-subtitle>
              </v-card-item>
              <v-card-text>
               <p style="color: black">Список операций:</p>
                <ol>
                  <li v-for="op in item.operations" :key="op.id">{{op.type}}</li>
                </ol>
              </v-card-text>
            </v-card>
          </td>
        </tr>
      </table>
    </v-card>

    <v-dialog v-model="dialog"  max-width="500"
              style="background-color: white;"
              >
      <v-card
          v-scroll.self="onScroll"
      style="background-color: white; height: 100%">
        <v-card-title class="headline">{{ this.str }}</v-card-title>
        <v-text-field
            label="Название"
            v-model="defaultItem.specification_title"
            style="width: 80%; margin: auto"
        ></v-text-field>
        <v-text-field
            label="Тип изделия"
            v-model="defaultItem.product_type"
            style="width: 80%; margin: auto"
        ></v-text-field>
        <v-text-field
            label="% тестирования"
            v-model.number="defaultItem.tested_percentage"
            style="width: 80%; margin: auto"
            type="number"
        ></v-text-field>
        <div class="diolog">
        <v-text-field
            label="Название операции"
            v-model="operation"
            style="width: 80%; margin: auto"
        ></v-text-field>
          <v-icon @click="formOperationItem(operation)"> mdi-plus</v-icon>
        </div>
        <p class="diolog">Последовательность операций:</p>
        <ol class="list">
          <li v-for="op in operationSec" :key="op">{{op}}</li>
        </ol>
        <div v-if="isErrorInput">
          <p style="color: red;">Заполните все поля</p>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" flat @click="saveSpec">Сохранить</v-btn>
          <v-btn color="secondary" flat @click="dialog = false; isErrorInput=false; operationSec=[]">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" persistent max-width="300">
      <v-card>
        <v-card-title class="headline">Удаление</v-card-title>
        <v-card-text>Вы уверены, что хотите удалить задание?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" flat @click="deleteSpec">Да</v-btn>
          <v-btn color="secondary" flat @click="deleteDialog = false;">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-main>
  </v-app>
</template>


<script>
import titleHead from './Head.vue';
import axios from 'axios';
import {DOMAIN_NAME} from "@/api/api";
export default {
  name: "TechSpecification",
  async created() {
    await this.load()
  },
  components: {
    titleHead
  },
  data() {
    return {
      domain : DOMAIN_NAME,
      stroke: 0,
      scrollInvoked: 0,
      show: false,
      operationSec: [],
      // singleExpand: false,
      seqNum:0,
      isErrorInput: false,
      deleteDialog: false,
      // editDialog: false,
      dialog: false,
      // batchDialog: false,
      // deleteBatchDialog: false,
      // addBatchDialog: false,
      str: '',
      editingIndex: -1,
      // editingBatchIndex: -1,
      // editedBatchTask: {},
      // editedItem: {
      //   task_name: "",
      //   task_number: ""
      // },
      defaultItem: {
        id:0,
        specification_title: "",
        product_type: "",
        tested_percentage: 0,
        operation_types: []
      },
      operation: '',
    //   defaultBatch: {
    //     task_id: 0,
    //     batch_size: 0
    //   },
    //   footerProps: {'items-per-page-options': [5, 8, 10, 20, -1]},
    //   search: '',
    //   isLoading: false,
      techSpec: [],
    //   batches: []
    }
  },
  methods: {
    openDeleteDialog(id) {
      this.deleteDialog = true;
      this.editedIndex = id
    },
    // openEditDialog(item, str) {
    //   this.str = str;
    //   this.editedIndex = this.tasks.indexOf(item)
    //   this.editedItem.id = item.id;
    //   this.editedItem.task_name = item.task_name;
    //   this.editedItem.task_number = item.task_number;
    //   this.editDialog = true;
    // },
    openDialog(item, str) {
      this.str = str;
      // this.editedIndex = this.tasks.indexOf(item)
      this.defaultItem = Object.assign({}, item)
      this.dialog = true;
    },
    // openBatchDialog(item) {
    //   this.editedBatchTask = item;
    //   this.editingIndex = item.index;
    //   this.batches = item.batches;
    //   this.batchDialog = true;
    // },
    // openDeleteBatchDialog(item, id) {
    //   console.log(item)
    //   this.deleteBatchDialog = true;
    //   this.editingBatchIndex = id;
    //   this.editedBatch = item;
    // },
    // openAddBatchDialog(item) {
    //   this.defaultBatch = Object.assign({}, item);
    //   this.defaultBatch.task_id = this.editedBatchTask.id;
    //   console.log(this.defaultBatch);
    //   this.addBatchDialog = true;
    // },
    async load() {
      this.seqNum=0;
      this.techSpec = [];
      this.isLoading = true;
      const res = await axios.get(DOMAIN_NAME + '/specification');
      this.totalCount(res.data);
      this.isLoading = false;
    },
    async deleteSpec() {
      await axios.delete(DOMAIN_NAME + "/specification/" + this.editedIndex);
      this.deleteDialog = false;
      await this.load();
    },
    async saveSpec() {
      if (this.defaultItem.specification_title !== '' && this.defaultItem.product_type !== '') {
        this.isErrorInput = false;
        await axios.post(DOMAIN_NAME + "specification", this.defaultItem);
        this.defaultItem = {
          id:0,
          specification_title: "",
              product_type: "",
              tested_percentage: 0,
              operation_types: []
        };
        this.operationSec = [];
        this.seqNum=0;

        this.dialog = false;
        await this.load();
      } else {
        this.isErrorInput = true;
      }
    },
    formOperationItem(title){
      let operationItem =
      {
        type: '',
        sequence_number: 0
      };
      this.seqNum=  this.seqNum + 1;
      this.operationSec.push(title);
      operationItem.type = title;
      operationItem.sequence_number = this.seqNum;
      this.defaultItem.operation_types.push(operationItem);
      console.log(this.defaultItem);
      console.log(this.seqNum)


    },
    totalCount(arr) {
      arr.forEach((item) => {
        let temp = {
          id: 0,
          specification_title: '',
          product_type: '',
          tested_percentage: 0,
          show:false,
          operations: []
        };
        temp.id = item.id;
        temp.specification_title = item.specification_title;
        temp.product_type = item.product_type;
        temp.tested_percentage = item.tested_percentage;
        temp.operations = item.operation_types;
        this.techSpec.push(temp);
      })
      this.stroke = Math.floor(this.techSpec.length/4) +1;
    },
    onScroll () {
      this.scrollInvoked++
    },
  }
}
</script>

<style>
.pad{
  padding: 2%;
}
.diolog { display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 10%;
  margin-right: 10%}
.list{
  width: 80%;
  margin: auto;
  text-align: left;
}
</style>


