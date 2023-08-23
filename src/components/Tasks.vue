<template>
  <div>
    <title-head :title="'Наборы'"/>
    <v-card flat style="margin-right:2%; background-color: #eeeeee;">
      <v-card-title>
        <v-flex>
          <v-row>
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
              <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Поиск"
                  single-line
                  hide-details
                  style="margin-left:7%"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-flex>
      </v-card-title>
      <v-data-table
          :headers="headers"
          :items="tasks"
          :search="search"
          height="79vh"
          style="background-color: #eeeeee; margin-top: 1%"
          :items-per-page="-1"
          :footer-props="footerProps"
          hide-default-footer
          fixed-header
          :loading="isLoading"
          loading-text="Loading... Please wait"
          class="elevation-1"
      >
        <template v-slot:[`item.edit`]="props">
          <v-card-actions>
            <v-icon @click="openEditDialog(props.item, 'Редактирование');"> mdi-pencil</v-icon>
            <v-icon @click="openDeleteDialog(props.item.id);"> mdi-delete</v-icon>
          </v-card-actions>
        </template>
        <template v-slot:[`item.batchList`]="props">
          <v-icon @click="openBatchDialog(props.item);"> mdi-eye</v-icon>
        </template>
      </v-data-table>


      <v-dialog v-model="deleteDialog" persistent max-width="300">
        <v-card>
          <v-card-title class="headline">Удаление</v-card-title>
          <v-card-text>Вы уверены, что хотите удалить набор?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" flat @click="deleteTask">Да</v-btn>
            <v-btn color="secondary" flat @click="deleteDialog = false">Отмена</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">{{ this.str }}</v-card-title>
          <v-text-field
              label="Номер набора"
              v-model="defaultItem.kit_number"
              style="width: 80%; margin: auto"
          ></v-text-field>
          <v-text-field
              label="Кол-во партий"
              v-model.number="defaultItem.batches_quantity"
              style="width: 80%; margin: auto"
              type="number"
          ></v-text-field>
          <v-text-field
              label="Кол-во изделий в париях"
              v-model.number="defaultItem.batch_size"
              style="width: 80%; margin: auto"
              type="number"
          ></v-text-field>
          <v-select
              item-color="secondary"
              :items="techSpec"
              item-text="titleSpec"
              item-value="specification_id"
              v-model="defaultItem.specification_id"
              label="Тех. задание"
              style="width: 80%; margin: auto;"
          ></v-select>
          <div v-if="isErrorInput">
            <p style="color: red;">Заполните все поля</p>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" flat @click="saveTasks">Сохранить</v-btn>
            <v-btn color="secondary" flat @click="dialog = false; isErrorInput=false">Отмена</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="editDialog" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">{{ this.str }}
          </v-card-title>
          <v-text-field
              label="Номер набора"
              v-model="editedItem.kit_number"
              style="width: 80%; margin: auto"
          ></v-text-field>
          <v-text-field
              label="Кол-во партий"
              v-model.number="editedItem.batches_quantity"
              style="width: 80%; margin: auto"
              type="number"
          ></v-text-field>
          <v-text-field
              label="Кол-во изделий в париях"
              v-model.number="editedItem.batch_size"
              style="width: 80%; margin: auto"
              type="number"
          ></v-text-field>
          <v-select
              item-color="secondary"
              :items="techSpec"
              item-text="titleSpec"
              item-value="specification_id"
              v-model="editedItem.specification_id"
              label="Тех. задание"
              style="width: 80%; margin: auto;"
          ></v-select>
          <div v-if="isErrorInput">
            <p style="color: red;">Заполните все поля</p>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" flat @click="editTasks">Сохранить</v-btn>
            <v-btn color="secondary" flat @click="editDialog = false; isErrorInput=false">Отмена</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="batchDialog" persistent max-width="90vw">
        <v-card>
          <v-card-title class="headline" style="margin-left: 2%;">
            <p>Партии</p>
            <v-spacer></v-spacer>
            <v-icon @click="batchDialog=false" style="margin-top: -2%"> mdi-close</v-icon>
          </v-card-title>
          <v-data-table
              :headers="batchHead"
              :items="batches"
              height="70vh"
              style="margin-left: 1%; margin-right: 1%"
              :items-per-page="-1"
              :footer-props="footerProps"
              hide-default-footer
              fixed-header
          >
            <template v-slot:[`item.qrcode`]="props">
              <router-link :to="'/qrcode/'+props.item.id" tag="button">
                <v-icon> mdi-qrcode</v-icon>
              </router-link>
            </template>
            <template v-slot:[`item.progress`]="props">
              <router-link :to="'/Progress/'+props.item.id" tag="button">
                <v-icon> mdi-table-eye</v-icon>
              </router-link>
            </template>
          </v-data-table>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>


<script>
import titleHead from './Head.vue';
import axios from 'axios';
import {DOMAIN_NAME} from "@/api/api";

export default {
  name: "tasksScreen",
  async created() {
    await this.load()
  },
  components: {
    titleHead
  },
  data() {
    return {
      domain: DOMAIN_NAME,
      expanded: [],
      singleExpand: false,
      isErrorInput: false,
      deleteDialog: false,
      editDialog: false,
      dialog: false,
      batchDialog: false,
      str: '',
      editedIndex: -1,
      editedItem: {
        id: 0,
        kit_number: "",
        batches_quantity: 0,
        batch_size: 0,
        specification_id: 0
      },
      defaultItem: {
        id: 0,
        kit_number: "",
        batches_quantity: 0,
        batch_size: 0,
        specification_id: 0
      },
      defaultBatch: {
        task_id: 0,
        batch_size: 0
      },
      footerProps: {'items-per-page-options': [5, 8, 10, 20, -1]},
      search: '',
      isLoading: false,
      headers: [
        {text: '', value: 'batchList', class: 'primary'},
        {text: 'Номер', value: 'kit_number', class: 'primary'},
        {text: 'ТЗ', value: 'specification_title', class: 'primary'},
        {text: 'Кол-во', value: 'kit_size', class: 'primary'},
        {text: 'В работе', value: 'products_in_work', class: 'primary'},
        {text: 'Готово', value: 'products_done', class: 'primary'},
        {text: 'Прошло ОТК', value: 'otk', class: 'primary'},
        {text: 'Прошло Испытания', value: 'testing', class: 'primary'},
        {text: 'Заблокировано', value: 'locked_quantity', class: 'primary'},
        {text: 'Забраковано', value: 'defected_quantity', class: 'primary'},
        {text: '', value: 'edit', class: 'primary'}
      ],
      batchHead: [
        {text: '', value: 'progress', width: '1%'},
        {text: 'Номер партии', value: 'batch_number'},
        {text: 'Кол-во', value: 'quantity'}
      ],
      tasks: [],
      batches: [],
      techSpec: []
    }
  },
  methods: {
    openDeleteDialog(item) {
      this.deleteDialog = true;
      this.editedIndex = item
      console.log(item);
    },
    async openEditDialog(item, str) {
      this.str = str;
      this.editedIndex = this.tasks.indexOf(item)
      this.editedItem.id = item.id;
      console.log(this.editedItem.id)
      const res = await axios.get(DOMAIN_NAME + '/kit/' + this.editedItem.id);
      this.editedItem.kit_number = res.data.kit_number;
      this.editedItem.batches_quantity = res.data.batches_quantity;
      this.editedItem.batch_size = res.data.batch_size;
      this.editedItem.specification_id = res.data.specification_id;
      this.editDialog = true;
    },
    async openDialog(item, str) {
      this.str = str;
      this.editedIndex = this.tasks.indexOf(item)
      this.defaultItem = Object.assign({}, item)
      this.dialog = true;
    },
    listOfSpec(arr) {
      arr.forEach((item) => {
        let temp = {
          specification_id: 0,
          titleSpec: ''
        }
        temp.specification_id = item.id;
        temp.titleSpec = item.specification_title;
        this.techSpec.push(temp);
      });

    },
    async openBatchDialog(item) {
      this.batchHead= [
        {text: '', value: 'progress', width: '1%'},
        {text: 'Номер партии', value: 'batch_number'},
        {text: 'Кол-во', value: 'quantity'}
      ];
      this.batches = [];
      this.editedIndex = item.id;
      console.log(this.editedIndex)
      const res = await axios.get(DOMAIN_NAME + 'kit/' + this.editedIndex + '/progress');
      this.batchesHead(res.data);
      this.batchCount(res.data);
      this.batchDialog = true;
    },
    batchesHead(arr) {
      arr.operation_types.sort(function (a, b) {
        if (a.sequence_number > b.sequence_number) {
          return 1
        } else {
          return -1
        }
      });
      arr.operation_types.forEach((item) => {
        let temp = {text: '', value: ''};
        temp.text = item.type;
        temp.value = item.id.toString();
        this.batchHead.push(temp);
      });
      this.batchHead.push({text: 'Испытания', value: 'testing'});
      this.batchHead.push({text: 'ОТК', value: 'otk'});
      this.batchHead.push({text: 'Заблокировано', value: 'locked_quantity'});
      this.batchHead.push({text: 'Забраковано', value: 'defected_quantity'});
      this.batchHead.push({text: '', value: 'qrcode'});
    },
    batchCount(arr) {
      let num = arr.kit_number;
      let batch_size = arr.batch_size;
      let kit_id = arr.id;
      let tempArr = [];
      arr.batches_progress.forEach((item) => {
        let temp = {};
        this.batchHead.forEach((op) => {
          if (item.operations_progress[op.value]) {
            temp[op.value] = item.operations_progress[op.value];
          } else {
            temp[op.value] = 0;
          }
        })
        temp.batch_number = `${num}-${item.batch_number}`;
        temp.quantity = batch_size;
        temp.locked_quantity = item.locked_quantity;
        temp.defected_quantity=item.defected_quantity;
        temp.otk = item.control_progress.OTK;
        temp.testing = item.control_progress.TESTING;
        temp.id = item.id;
        temp.kit_id=kit_id;
        tempArr.push(temp);
      })
      this.batches = tempArr;
    },
    async load() {
      this.techSpec = [];
      this.tasks = [];
      this.isLoading = true;
      const res = await axios.get(DOMAIN_NAME + 'kit/progress');
      this.totalCount(res.data);
      const ts = await axios.get(DOMAIN_NAME + 'specification');
      this.listOfSpec(ts.data);
      this.isLoading = false;
    },
    async deleteTask() {
      await axios.delete(DOMAIN_NAME + "kit/" + this.editedIndex);
      this.deleteDialog = false;
      await this.load();
    },
    async saveTasks() {
      if (this.defaultItem.kit_number !== '') {
        this.isErrorInput = false;
        await axios.post(DOMAIN_NAME + "kit", this.defaultItem);
        this.defaultItem = {
          id: 0,
          kit_number: "",
          batches_quantity: 0,
          batch_size: 0,
          specification_id: 0
        },

            this.dialog = false;
        await this.load();
      } else {
        this.isErrorInput = true;
      }
    },
    async editTasks() {
      if (this.editedItem.kit_number) {
        this.isErrorInput = false;
        console.log('send');
        await axios.put(DOMAIN_NAME + "kit", this.editedItem);
        this.editDialog = false;
        await this.load();
      } else {
        this.isErrorInput = true;
      }
    },
    totalCount(arr) {
      arr.forEach((item) => {
        let temp = {
          id: 0,
          kit_number: "",
          specification_title: "",
          kit_size: 0,
          products_in_work: 0,
          products_done: 0,
          locked_quantity: 0,
          defected_quantity: 0,
          otk: 0,
          testing: 0,
          control_progress: []
        };
        temp.id = item.kit_id;
        temp.kit_number = item.kit_number;
        temp.specification_title = item.specification_title;
        temp.kit_size = item.kit_size;
        temp.products_in_work = item.products_in_work;
        temp.products_done = item.products_done;
        temp.locked_quantity = item.locked_quantity;
        temp.defected_quantity = item.defected_quantity;
        if (item.control_progress.OTK) {
          temp.otk = item.control_progress.OTK
        }
        if (item.control_progress.testing) {
          temp.testing = item.control_progress.testing
        }
        this.tasks.push(temp);
      })
    }
  }
}
</script>


