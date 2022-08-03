<template>
  <div>
    <title-head :title="'Список задач'"/>
    <v-card style="margin-right:2%; background-color: #eeeeee;">
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
            <v-icon @click="openDeleteDialog(props.item.id)"> mdi-delete</v-icon>
          </v-card-actions>
        </template>
        <template v-slot:[`item.batchList`]="props">
          <v-icon @click="openBatchDialog(props.item);"> mdi-eye</v-icon>
        </template>
      </v-data-table>


      <v-dialog v-model="deleteDialog" persistent max-width="300">
        <v-card>
          <v-card-title class="headline">Удаление</v-card-title>
          <v-card-text>Вы уверены, что хотите удалить задачу?
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
              label="Название"
              v-model="defaultItem.task_name"
              style="width: 80%; margin: auto"
          ></v-text-field>
          <v-text-field
              label="Номер"
              v-model="defaultItem.task_number"
              style="width: 80%; margin: auto"
          ></v-text-field>
          <v-text-field
              label="Кол-во партий"
              v-model.number="defaultItem.batch_number"
              style="width: 80%; margin: auto"
              type="number"
          ></v-text-field>
          <v-text-field
              label="Кол-во катушек в париях"
              v-model.number="defaultItem.batch_size"
              style="width: 80%; margin: auto"
              type="number"
          ></v-text-field>
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
              label="Название"
              v-model="editedItem.task_name"
              style="width: 80%; margin: auto"
          ></v-text-field>
          <v-text-field
              label="Номер"
              v-model="editedItem.task_number"
              style="width: 80%; margin: auto"
          ></v-text-field>
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

      <v-dialog v-model="batchDialog" persistent max-width="70vw">
        <v-card>
          <v-card-title class="headline" style="margin-left: 2%; margin-top: 2%">
            <p>Партии</p>
            <v-spacer></v-spacer>
            <v-icon @click="batchDialog=false" style="margin-top: -2%"> mdi-close</v-icon>
          </v-card-title>
          <v-data-table
              :headers="batchHead"
              :items="batches"
              height="60vh"
              style="margin-left: 2%; margin-right: 2%"
              :items-per-page="-1"
              :footer-props="footerProps"
              hide-default-footer
              fixed-header
          >
            <template v-slot:[`item.delete`]="props">
              <v-icon @click="openDeleteBatchDialog(props.item, props.item.id)"> mdi-delete</v-icon>
            </template>
            <template v-slot:[`item.progress`]="props">
              <router-link :to="'/Tasks/Progress/'+props.item.id" tag="button">
                <v-icon> mdi-table-eye</v-icon>
              </router-link>
            </template>
          </v-data-table>
          <v-card-actions>
            <v-btn color="secondary" @click="openAddBatchDialog(defaultBatch)" style="margin: 1%">
              Добавить партию
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="secondary" @click="batchDialog = false" style="margin: 1%">Закрыть</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="deleteBatchDialog" persistent max-width="300">
        <v-card>
          <v-card-title class="headline">Удаление</v-card-title>
          <v-card-text>Вы уверены, что хотите удалить партию?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" flat @click="deleteBatch">Да</v-btn>
            <v-btn color="secondary" flat @click="deleteBatchDialog = false">Отмена</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="addBatchDialog" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">Добавление партии</v-card-title>
          <v-text-field
              label="Количество катушек в партии"
              v-model.number="defaultBatch.batch_size"
              style="width: 80%; margin: auto"
              type="number"
          ></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" flat @click="saveBatch">Сохранить</v-btn>
            <v-btn color="secondary" flat @click="addBatchDialog = false;">Отмена</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>


<script>
import titleHead from './Head.vue';
import axios from 'axios';

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
      expanded: [],
      singleExpand: false,
      isErrorInput: false,
      deleteDialog: false,
      editDialog: false,
      dialog: false,
      batchDialog: false,
      deleteBatchDialog: false,
      addBatchDialog: false,
      str: '',
      editingIndex: -1,
      editingBatchIndex: -1,
      editedBatchTask: {},
      editedItem: {
        task_name: "",
        task_number: ""
      },
      defaultItem: {
        task_name: "",
        task_number: "",
        batch_number: 0,
        batch_size: 0
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
        {text: 'Название', value: 'task_name', class: 'primary'},
        {text: 'Номер', value: 'task_number', class: 'primary'},
        {text: 'Кол-во', value: 'quantity', class: 'primary'},
        {text: 'Намотка', value: 'winding', class: 'primary'},
        {text: 'Вывод', value: 'output', class: 'primary'},
        {text: 'Изолировка', value: 'isolation', class: 'primary'},
        {text: 'Формовка', value: 'molding', class: 'primary'},
        {text: 'Опрессовка', value: 'crimping', class: 'primary'},
        {text: 'ОТК', value: 'quality', class: 'primary'},
        {text: 'Испытания', value: 'testing', class: 'primary'},
        {text: '', value: 'edit', class: 'primary'}
      ],
      batchHead: [
        {text: '', value: 'progress', width: '1%'},
        {text: 'Номер партии', value: 'batch_number', width: '13%'},
        {text: 'Количество', value: 'quantity'},
        {text: 'Намотка', value: 'winding'},
        {text: 'Вывод', value: 'output'},
        {text: 'Изолировка', value: 'isolation'},
        {text: 'Формовка', value: 'molding'},
        {text: 'Опрессовка', value: 'crimping'},
        {text: 'ОТК', value: 'quality'},
        {text: 'Испытания', value: 'testing'},
        {text: '', value: 'delete'}
      ],
      tasks: [],
      batches: []
    }
  },
  methods: {
    openDeleteDialog(item) {
      this.deleteDialog = true;
      this.editedIndex = item
    },
    openEditDialog(item, str) {
      this.str = str;
      this.editedIndex = this.tasks.indexOf(item)
      this.editedItem.id = item.id;
      this.editedItem.task_name = item.task_name;
      this.editedItem.task_number = item.task_number;
      this.editDialog = true;
    },
    openDialog(item, str) {
      this.str = str;
      this.editedIndex = this.tasks.indexOf(item)
      this.defaultItem = Object.assign({}, item)
      this.dialog = true;
    },
    openBatchDialog(item) {
      this.editedBatchTask = item;
      this.editingIndex = item.index;
      this.batches = item.batches;
      this.batchDialog = true;
    },
    openDeleteBatchDialog(item, id) {
      console.log(item)
      this.deleteBatchDialog = true;
      this.editingBatchIndex = id;
      this.editedBatch = item;
    },
    openAddBatchDialog(item) {
      this.defaultBatch = Object.assign({}, item);
      this.defaultBatch.task_id = this.editedBatchTask.id;
      console.log(this.defaultBatch);
      this.addBatchDialog = true;
    },
    async load() {
      this.tasks = [];
      this.isLoading = true;
      const res = await axios.get('https://popper-service.herokuapp.com/task/full');
      this.totalCount(res.data);
      this.isLoading = false;
    },
    async deleteTask() {
      await axios.delete("https://popper-service.herokuapp.com/task/" + this.editedIndex);
      this.deleteDialog = false;
      await this.load();
    },
    async saveTasks() {
      if (this.defaultItem.task_name !== '' && this.defaultItem.task_number !== '') {
        this.isErrorInput = false;
        await axios.post("https://popper-service.herokuapp.com/task", this.defaultItem);
        this.defaultItem = {
          task_name: "",
          task_number: "",
          batch_number: 0,
          batch_size: 0
        }

        this.dialog = false;
        await this.load();
      } else {
        this.isErrorInput = true;
      }
    },
    async editTasks() {
      if (this.editedItem.task_name !== '' && this.editedItem.task_number !== '') {
        this.isErrorInput = false;
        console.log('send');
        await axios.put("https://popper-service.herokuapp.com/task", this.editedItem);
        this.editDialog = false;
        await this.load();
      } else {
        this.isErrorInput = true;
      }
    },
    async deleteBatch() {
      await axios.delete("https://popper-service.herokuapp.com/batch/" + this.editingBatchIndex);
      this.deleteBatchDialog = false;
      await this.load();
      this.tasks.forEach((item) => {
            if (item.id === this.editedBatchTask.id) {
              this.openBatchDialog(item);
            }
          }
      );
    },
    async saveBatch() {
      await axios.post("https://popper-service.herokuapp.com/batch", this.defaultBatch);
      this.defaultBatch = {
        task_id: 0,
        batch_size: 0
      }

      this.addBatchDialog = false;
      await this.load();
      this.tasks.forEach((item) => {
            if (item.id === this.editedBatchTask.id) {
              this.openBatchDialog(item);
            }
          }
      );
    },
    totalCount(arr) {
      arr.forEach((item) => {
        let temp = {
          id: 0,
          task_name: "",
          task_number: "",
          quantity: 0,
          winding: 0,
          output: 0,
          isolation: 0,
          molding: 0,
          crimping: 0,
          quality: 0,
          testing: 0,
          batches: []
        };
        temp.id = item.id;
        temp.task_name = item.task_name;
        temp.task_number = item.task_number;
        temp.quantity = item.batches.reduce((acc, b) => acc + b.quantity, 0);
        temp.winding = item.batches.reduce((acc, b) => acc + b.winding, 0);
        temp.output = item.batches.reduce((acc, b) => acc + b.output, 0);
        temp.isolation = item.batches.reduce((acc, b) => acc + b.isolation, 0);
        temp.molding = item.batches.reduce((acc, b) => acc + b.molding, 0);
        temp.crimping = item.batches.reduce((acc, b) => acc + b.crimping, 0);
        temp.quality = item.batches.reduce((acc, b) => acc + b.quality, 0);
        temp.testing = item.batches.reduce((acc, b) => acc + b.testing, 0);
        temp.batches = item.batches;
        this.tasks.push(temp);
      })
    }
  }
}
</script>


