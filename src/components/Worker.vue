<template>
  <v-data-table
    :headers="headers"
    :items="workers"
    hide-default-footer
    class="elevation-1"
    style = "background-color: #eeeeee; margin: 2%; height: 85vh"
  ></v-data-table>
</template>


<script>

export default {
  name: 'workerTab' ,

  components: {
  },

  data () {
      return {
        headers: [
          {
            text: 'Имя',
            value: 'name',
          },
          { text: 'Фамилия', value: 'surname' },
          { text: 'Отчество', value: 'fathername' },
          { text: 'Телефон', value: 'phone' },
          { text: 'Пароль', value: 'password' },
          { text: '', value: 'delete' },
        ],
        workers: [
          {
            name: 'Илья',
            surname: 'Родионов',
            fathername: "Алексеевич",
            phone: 89324855614,
            password: 1234,
            delete: '-',
          },
          {
            name: 'Илья',
            surname: 'Родионов',
            fathername: "Алексеевич",
            phone: 89324855614,
            password: 1234,
            delete: '-',
          },
          {
            name: 'Илья',
            surname: 'Родионов',
            fathername: "Алексеевич",
            phone: 89324855614,
            password: 1234,
            delete: '-',
          },
          {
            name: 'Илья',
            surname: 'Родионов',
            fathername: "Алексеевич",
            phone: 89324855614,
            password: 1234,
            delete: '-',
          },
          {
            name: 'Илья',
            surname: 'Родионов',
            fathername: "Алексеевич",
            phone: 89324855614,
            password: 1234,
            delete: '-',
          },
          {
            name: 'Илья',
            surname: 'Родионов',
            fathername: "Алексеевич",
            phone: 89324855614,
            password: 1234,
            delete: '-',
          },
          {
            name: 'Илья',
            surname: 'Родионов',
            fathername: "Алексеевич",
            phone: 89324855614,
            password: 1234,
            delete: '-',
          },
          {
            name: 'Илья',
            surname: 'Родионов',
            fathername: "Алексеевич",
            phone: 89324855614,
            password: 1234,
            delete: '-',
          },
          {
            name: 'Илья',
            surname: 'Родионов',
            fathername: "Алексеевич",
            phone: 89324855614,
            password: 1234,
            delete: '-',
          },
          {
            name: 'Илья',
            surname: 'Родионов',
            fathername: "Алексеевич",
            phone: 89324855614,
            password: 1234,
            delete: '-',
          },
          {
            name: 'Илья',
            surname: 'Родионов',
            fathername: "Алексеевич",
            phone: 89324855614,
            password: 1234,
            delete: '-',
          },
          {
            name: 'Илья',
            surname: 'Родионов',
            fathername: "Алексеевич",
            phone: 89324855614,
            password: 1234,
            delete: '-',
          },
        ],
      }
    },
  }
</script>