<template>
<div>
  <title-head :title="'Сотрудники'"/>
<div v-if=isLoading>
    загрузка
        </div>
        <div v-else></div>
  
  <v-simple-table
    fixed-header
    height="85vh"
    style="background-color: #eeeeee; margin-right:2%; "
  >
    <template v-slot:default>
      <thead >
        <tr>
          <th class="text-left"  
            v-for="item in columns"
            :key="item">
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in workers"
          :key="item.id"
        >
          <td>{{ item.first_name }}</td>
          <td>{{ item.second_name }}</td>
          <td>{{ item.surname }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.password }}</td>
          <td><v-btn icon>
        <v-icon>mdi-pencil</v-icon>
      </v-btn></td>
      <td><v-btn icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</div>
</template>


<script>
import titleHead from './Head.vue'
import axios from 'axios';
export default {
  name: 'workerTab' ,
    async created(){
        await this.load()
    },
    components: {
        titleHead
  },
  data () {
      return {
        isLoading: false,
        columns: [
            'Имя',
            'Фамилия',
            'Отчество',
            'Телефон',
            'Пароль',
            '', 
            ''
        ],
        
        workers: [],
      }
    },
    methods: {
        async load(){
            this.isLoading=true;
            const res = await axios.get('https://popper-service.herokuapp.com/operator?active_only=true');
            this.workers = res.data;
            this.isLoading=false;
        }
    }
  }
</script>


    //   indeterminate