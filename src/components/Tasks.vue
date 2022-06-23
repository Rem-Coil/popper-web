<template>
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
          <td>{{ item.name }}</td>
          <td>{{ item.surname }}</td>
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
</template>


<script>

export default {
  name: 'workerTab' ,

  data () {
      return {
        columns: [
            'Имя',
            'Фамилия',
            '', 
            ''
        ],
        workers: [
          {
            id: 1,
            name: 'Илья',
            surname: 'Родионов',
            fathername: 'Алексеевич',
            phone: 89324855614,
            password: 1234
          },
          {
            id: 2,
            name: 'Илья',
            surname: 'Родионов',
            fathername: 'Алексеевич',
            phone: 89324855614,
            password: 1234
          },
          {
            id: 3,
            name: 'Илья',
            surname: 'Родионов',
            fathername: 'Алексеевич',
            phone: 89324855614,
            password: 1234
          },
          {
            id: 4,
            name: 'Илья',
            surname: 'Родионов',
            fathername: 'Алексеевич',
            phone: 89324855614,
            password: 1234
          },
          {
            id: 5,
            name: 'Илья',
            surname: 'Родионов',
            fathername: 'Алексеевич',
            phone: 89324855614,
            password: 1234
          },
          {
            id: 6,
            name: 'Илья',
            surname: 'Родионов',
            fathername: 'Алексеевич',
            phone: 89324855614,
            password: 1234
          },
          {
            id: 7,
            name: 'Илья',
            surname: 'Родионов',
            fathername: 'Алексеевич',
            phone: 89324855614,
            password: 1234
          },
          {
            id: 8,
            name: 'Илья',
            surname: 'Родионов',
            fathername: 'Алексеевич',
            phone: 89324855614,
            password: 1234
          },
          {
            id: 9,
            name: 'Илья',
            surname: 'Родионов',
            fathername: 'Алексеевич',
            phone: 89324855614,
            password: 1234
          },
          {
            id: 10,
            name: 'Илья',
            surname: 'Родионов',
            fathername: 'Алексеевич',
            phone: 89324855614,
            password: 1234
          },
          {
            id: 11,
            name: 'Илья',
            surname: 'Родионов',
            fathername: 'Алексеевич',
            phone: 89324855614,
            password: 1234
          },
          {
            id: 12,
            name: 'Илья',
            surname: 'Родионов',
            fathername: 'Алексеевич',
            phone: 89324855614,
            password: 1234
          },
          {
            id: 13,
            name: 'Илья',
            surname: 'Родионов',
            fathername: 'Алексеевич',
            phone: 89324855614,
            password: 1234
          },
          {
            id: 14,
            name: 'Илья',
            surname: 'Родионов',
            fathername: 'Алексеевич',
            phone: 89324855614,
            password: 1234
          },
          {
            id: 15,
            name: 'Илья',
            surname: 'Родионов',
            fathername: 'Алексеевич',
            phone: 89324855614,
            password: 1234
          },
          {
            id: 16,
            name: 'Илья',
            surname: 'Родионов',
            fathername: 'Алексеевич',
            phone: 89324855614,
            password: 1234
          },
          {
            id: 17,
            name: 'Илья',
            surname: 'Родионов',
            fathername: 'Алексеевич',
            phone: 89324855614,
            password: 1234
          },
        ],
      }
    },
  }
</script>