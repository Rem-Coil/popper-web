<template>
  <div>
    <title-head :title="'Настройки'"/>
    <v-simple-table
        fixed-header
        height="85vh"
        style="background-color: #eeeeee; margin-right:2%; "
    >
      <template v-slot:default>
        <thead>
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
          <td>
            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>


<script>
import titleHead from './Head.vue'

export default {
  name: 'setTools',
  components: {
    titleHead
  },
  data() {
    return {
      columns: [
        'Имя',
        '',
        ''
      ],
      workers: [
        {
          id: 1,
          name: 'Илья'
        },
        {
          id: 2,
          name: 'Илья'
        },

      ],
    }
  },
}
</script>