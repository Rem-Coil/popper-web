<template>
  <div>
    <title-head :title="'Сотрудники'"/>
    <v-card style="margin-right:2%; background-color: #eeeeee;">
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
          :loading = "isLoading"
          loading-text="Loading... Please wait"
      >
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
          <v-card-title class="headline">{{this.str}}</v-card-title>
          <v-text-field
              label="Имя"
              v-model="editedItem.first_name"
              style="width: 80%; margin: auto"
          ></v-text-field>
          <v-text-field
              label="Фамилия"
              v-model="editedItem.second_name"
              style="width: 80%; margin: auto"
          ></v-text-field>
          <v-text-field
              label="Отчество"
              v-model="editedItem.surname"
              style="width: 80%; margin: auto"
          ></v-text-field>
          <v-text-field
              label="Телефон"
              v-model="editedItem.phone"
              style="width: 80%; margin: auto"
          ></v-text-field>
          <v-text-field
              type="password"
              label="Пароль"
              v-model="editedItem.password"
              style="width: 80%; margin: auto"
          ></v-text-field>
          <v-select
              :items="roles"
              v-model="editedItem.role"
              label="Роль"
              style="width: 80%; margin: auto"
          ></v-select>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" flat @click="saveWorker">Сохранить</v-btn>
            <v-btn color="secondary" flat @click="dialog = false">Отмена</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>


<script>
import titleHead from './Head.vue'
import axios from 'axios';

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
      roles: ['operator', 'quality_engineer'],
      deleteDialog: false,
      dialog: false,
      str:'',
      editingIndex: -1,
      editedItem: {
        first_name: '',
        second_name: '',
        surname: '',
        phone: '',
        password: '',
        active: true,
        role: 'operator'
      },
      defaultItem: {
        id:0,
        first_name: '',
        second_name: '',
        surname: '',
        phone: '',
        password: '',
        active: true,
        role: 'operator'
      },
      footerProps: {'items-per-page-options': [5, 8, 10, 20, -1]},
      search: '',
      isLoading: false,
      headers: [
        {text: 'Имя', value: 'first_name', class: 'primary'},
        {text: 'Фамилия', value: 'second_name', class: 'primary'},
        {text: 'Отчество', value: 'surname', class: 'primary'},
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
    },
    async load() {
      this.isLoading = true;
      const res = await axios.get('https://popper-service.herokuapp.com/operator?active_only=true');
      this.workers = res.data;
      this.isLoading = false;
      console.log(res.data)
    },
    async deleteWorker()
    {
      await axios.delete("https://popper-service.herokuapp.com/operator/"+this.editedIndex);
      this.deleteDialog=false;
      await this.load();
    },
    async saveWorker()
    {
      if(this.editedItem.id!=0) {
        await axios.put("https://popper-service.herokuapp.com/operator", this.editedItem);
      }else{
        await axios.post("https://popper-service.herokuapp.com/operator/sign_up", this.editedItem);
      }
      this.dialog=false;
      await this.load();
    }
  }
}
</script>
