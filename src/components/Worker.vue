<template>
  <div>
    <title-head :title="'Сотрудники'"/>
    <v-card flat style="margin-right:2%; background-color: #eeeeee;">
      <v-card-title>
        <v-flex>
          <v-row>
            <v-col cols="2" style="padding:0">
              <v-btn
                  style=" background-color: white; width:100%; margin-top:9%; margin-left:7%"
                  @click="openDialog(defaultItem, 'Добавление')">
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
          :items="workers"
          :search="search"
          height="79vh"
          style="background-color: #eeeeee; "
          :items-per-page="-1"
          :footer-props="footerProps"
          hide-default-footer
          fixed-header
          :loading="isLoading"
          loading-text="Loading... Please wait"
      >
        <template v-slot:[`item.role`]="props">
          <div v-if="props.item.role ==='QUALITY_ENGINEER'" >Инженер качества</div>
          <div v-if="props.item.role ==='OPERATOR'" >Оператор</div>
          <div v-if="props.item.role ==='ADMIN'" >Администратор</div>
        </template>
        <template v-slot:[`item.delete`]="props">
          <v-icon @click="openDeleteDialog(props.item.id)"> mdi-delete</v-icon>
        </template>
        <template v-slot:[`item.edit`]="props">
          <v-icon @click="openDialog(props.item, 'Редактирование')"> mdi-pencil</v-icon>
        </template>
      </v-data-table>

      <v-dialog v-model="deleteDialog" persistent max-width="300">
        <v-card>
          <v-card-title class="headline">Удаление</v-card-title>
          <v-card-text>Вы уверены, что хотите удалить сотрудника из базы?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" flat @click="deleteWorker">Да</v-btn>
            <v-btn color="secondary" flat @click="deleteDialog = false">Отмена</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">{{ this.str }}</v-card-title>
          <v-text-field
              label="Имя"
              v-model="editedItem.first_name"
              style="width: 80%; margin: auto"
          ></v-text-field>
          <v-text-field
              label="Фамилия"
              v-model="editedItem.last_name"
              style="width: 80%; margin: auto"
          ></v-text-field>
          <v-text-field
              label="Телефон"
              v-model="editedItem.phone"
              style="width: 80%; margin: auto"
          ></v-text-field>
          <v-text-field
              label="Пароль"
              v-model="editedItem.password"
              style="width: 80%; margin: auto"
          ></v-text-field>
          <v-select
              item-color="secondary"
              :items="roles"
              item-text="ru"
              item-value="en"
              v-model="editedItem.role"
              label="Роль"
              style="width: 80%; margin: auto;"
          ></v-select>
          <div v-if="isErrorInput">
            <p style="color: red;">Заполните все поля</p>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" @click="saveWorker">Сохранить</v-btn>
            <v-btn color="secondary" @click="dialog = false">Отмена</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>


<script>
import titleHead from './Head.vue'
import axios from 'axios';
import {DOMAIN_NAME} from "@/api/api";

export default {
  name: 'workerTab',
  async created() {
    await this.load()
  },
  components: {
    titleHead
  },
  data() {
    return {
      isErrorInput: false,
      deleteDialog: false,
      dialog: false,
      str: '',
      editingIndex: -1,
      roles: [
        {
          ru: 'Инженер качества',
          en: 'QUALITY_ENGINEER'
        },
        {
          ru: 'Оператор',
          en: 'OPERATOR'
        },
        {
          ru: 'Администратор',
          en: 'ADMIN'
        },

      ],
      editedItem: {
        id: 0,
        first_name: '',
        last_name: '',
        phone: '',
        password: '',
        active: true,
        role: 'OPERATOR'
      },
      defaultItem: {
        id: 0,
        first_name: '',
        last_name: '',
        phone: '',
        password: '',
        active: true,
        role: 'OPERATOR'
      },
      footerProps: {'items-per-page-options': [5, 8, 10, 20, -1]},
      search: '',
      isLoading: false,
      headers: [
        {text: 'Имя', value: 'first_name', class: 'primary'},
        {text: 'Фамилия', value: 'last_name', class: 'primary'},
        {text: 'Телефон', value: 'phone', class: 'primary'},
        {text: 'Пароль', value: 'password', class: 'primary'},
        {text: 'Роль', value: 'role', class: 'primary'},
        {text: '', value: 'edit', width: 1, class: 'primary'},
        {text: '', value: 'delete', width: 1, class: 'primary'}
      ],

      workers: [],
    }
  },
  methods: {
    openDeleteDialog(item) {
      this.deleteDialog = true;
      this.editedIndex = item
    },
    openDialog(item, str) {
      this.str = str;
      this.editedIndex = this.workers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true;
      console.log(this.editedItem)
    },
    async load() {
      this.editedItem= {
        id: 0,
            first_name: '',
            last_name: '',
            phone: '',
            password: '',
            active: true,
            role: 'OPERATOR'
      },
      this.workers = [];
      this.isLoading = true;
      const res = await axios.get(DOMAIN_NAME+'/employee?active_only=true');
      await this.totalCount(res.data);
      this.isLoading = false;
    },
    totalCount: async function (workers) {
      for (const worker of workers) {
        let temp = {};

        temp.id = worker.id;
        temp.first_name = worker.first_name;
        temp.last_name = worker.last_name;
        temp.phone = worker.phone;
        temp.password = worker.password;
        temp.active = worker.active;
        temp.role = worker.role;

        this.workers.push(temp);
      }
    },
    async deleteWorker() {
      await axios.delete(DOMAIN_NAME + "/employee/" + this.editedIndex);
      this.deleteDialog = false;
      await this.load();
    },
    async saveWorker() {
      if (this.editedItem.last_name !== '' && this.editedItem.first_name !== ''
          && this.editedItem.password !== '' && this.editedItem.phone !== '') {
        this.isErrorInput = false;
        if (this.editedItem.id !== 0) {
          await axios.put(DOMAIN_NAME+"/employee", this.editedItem);
        } else {
          await axios.post(DOMAIN_NAME+"/employee/sign_up", this.editedItem);
        }
        this.dialog = false;
        await this.load();
      } else {
        this.isErrorInput = true;
      }
    }
  }
}
</script>
