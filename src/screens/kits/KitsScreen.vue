<template>
    <div class="kit-body">
        <n-h1>Наборы</n-h1>

        <div class="kit-content">
            <n-space vertical :size="12">
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
    />
  </n-space>
        </div>
    </div>
</template>

<style>
.kit-content {
    position: absolute;
    top: 104px;
    left: 20px;
    right: 20px;
    bottom: 24px;
}
</style>

<script>
import { h, defineComponent, ref, onMounted } from "vue";
import { NTag, NButton, useMessage } from "naive-ui";
import axios from 'axios';


const createColumns = ({
  sendMail
}) => {
  return [
    {
      title: "Номер",
      key: "kit_number"
    },
    {
      title: "ТЗ",
      key: "specification_title"
    },
    {
      title: "Кол-во",
      key: "kit_size"
    },
    {
      title: "В работе",
      key: "products_in_work"
    },
    {
      title: "Готово",
      key: "products_done"
    },
    {
      title: "Прошло ОТК",
      key: "control_progress.OTK"
    },
    {
      title: "Прошло Испытания",
      key: "control_progress.TESTING"
    },
    {
      title: "Заблокировано",
      key: "locked_quantity"
    },
    {
      title: "Забраковано",
      key: "defected_quantity"
    },
    {
      title: "",
      key: "delete",
      render(row) {
        return h(
          NButton,
          {
            size: "small",
            onClick: () => sendMail(row)
          },
          { default: () => "Send Email" },
        );
      }
    }
  ];
};



export default defineComponent({
  setup() {
    const message = useMessage();
    const kits = ref([]);
    onMounted(async () => {
      const res = await axios.get("https://test.remcoil.webtm.ru/kit/progress");
      kits.value = res.data;
      console.log(res);
    });

    return {
      data: kits,
      columns: createColumns({
        sendMail(rowData) {
          message.info("send mail to " + rowData.products_done);
        }
      }),
      pagination: {
        pageSize: 10
      }
    };
  }
});
</script>