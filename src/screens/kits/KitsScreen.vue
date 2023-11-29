<template>
    <div class="kit-body">
        <n-h1>Наборы</n-h1>

        <div class="kit-content">
            <n-data-table :columns="columns" :data="data" :scroll-x="1000" style="height: 100%" flex-height />
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
            key: "kit_number",
            align: 'center',
            width: 100
        },
        {
            title: "ТЗ",
            key: "specification_title",
            align: 'center',
            width: 100
        },
        {
            title: "Кол-во",
            key: "kit_size",
            align: 'center',
            width: 100
        },
        {
            title: "В работе",
            key: "products_in_work",
            align: 'center',
            width: 100
        },
        {
            title: "Готово",
            key: "products_done",
            align: 'center',
            width: 100
        },
        {
            title: "Прошло ОТК",
            key: "control_progress.OTK",
            align: 'center',
            width: 100
        },
        {
            title: "Прошло Испытания",
            key: "control_progress.TESTING",
            align: 'center',
            width: 100
        },
        {
            title: "Заблокировано",
            key: "locked_quantity",
            align: 'center',
            width: 100
        },
        {
            title: "Забраковано",
            key: "defected_quantity",
            align: 'center',
            width: 100
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
            },
            align: 'center',
            width: 100
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
        });

        return {
            data: kits,
            columns: createColumns({
                sendMail(rowData) {
                    message.info("send mail to " + rowData.products_done);
                }
            })
        };
    }
});
</script>