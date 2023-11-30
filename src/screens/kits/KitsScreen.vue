<template>
    <div class="kit-body">
        <n-h1>Наборы</n-h1>

        <div class="kit-content">
            <n-data-table :columns="columns" :data="kits" scroll-x="1300px" style="height: 100% " flex-height />
        </div>
    </div>
</template>

<script setup>
import { h, defineComponent, ref, onMounted } from "vue";
import { NTag, NButton, useMessage, NIcon } from "naive-ui";
import axios from 'axios';
import { Delete16Filled as CloseIcon, Edit16Filled as PencilIcon } from '@vicons/fluent';


const createColumns = () => [
    {
        title: "Номер",
        key: "kit_number",
        align: 'center',
        width: 180
    },
    {
        title: "Тех. задание",
        key: "specification_title",
        ellipsis: true
    },
    {
        title: "Кол-во",
        key: "kit_size",
        align: 'center',
        width: 80
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
        title: "ОТК",
        key: "control_progress.OTK",
        align: 'center',
        width: 100,
        render(row) {
            const value = row.control_progress.OTK
            let type

            if (value == 0) {
                type = 'default'
            } else if (value == row.kit_size){
                type = 'success'
            } else {
                type = 'primary'
            }
            
            return h(
                NTag,
                {
                    type: type,
                    bordered: false,
                },
                { default: () => value}
            )
        }
    },
    {
        title: "Испытания",
        key: "control_progress.TESTING",
        align: 'center',
        width: 120,
        render(row) {
            const value = row.control_progress.TESTING
            let type
            if (value > 0) {
                type = 'error'
            } else {
                type = 'success'
            }
            
            return h(
                NTag,
                {
                    type: type,
                    bordered: false,
                },
                { default: () => value}
            )
        }
    },
    {
        title: "Заблокировано",
        key: "locked_quantity",
        align: 'center',
        width: 130,
        render(row) {
            const value = row.locked_quantity
            let type
            if (value > 0) {
                type = 'warning'
            } else {
                type = 'success'
            }
            
            return h(
                NTag,
                {
                    type: type,
                    bordered: false,
                },
                { default: () => value}
            )
        }
    },
    {
        title: "Забраковано",
        key: "defected_quantity",
        align: 'center',
        width: 120,
        render(row) {
            const value = row.defected_quantity
            let type
            if (value > 0) {
                type = 'error'
            } else {
                type = 'success'
            }

            return h(
                NTag,
                {
                    type: type,
                    bordered: false,
                    style: ''
                },
                { default: () => value}
            )
        }
    },
    {
        title: "",
        key: "delete",
        align: 'center',
        width: 120,
        render(row) {
            return h(
                'div',
                [
                    h(
                        NIcon,
                        {
                            onClick: (e) => deleteKit(e, row),
                            class: 'icon-button',
                        },
                        { default: () => h(PencilIcon) }
                    ),

                    h(
                        NIcon,
                        {
                            class: 'icon-button',
                            onClick: () => editKit(row),
                        },
                        { default: () => h(CloseIcon) }
                    ),
                ]
            )
        }
    }
];

const message = useMessage();
const kits = ref([]);

const columns = createColumns();

onMounted(async () => {
    const res = await axios.get("https://test.remcoil.webtm.ru/kit/progress");
    kits.value = res.data;
});

function deleteKit(e, row) {
    message.info("delete " + row.kit_id);
}

function editKit(row) {
    message.info("edit " + row.kit_id);
}


</script>

<style>
.kit-content {
    position: absolute;
    top: 104px;
    left: 20px;
    right: 20px;
    bottom: 24px;
}

.icon-button {
    font-size: 24px;
    margin: 0 4px;
    padding: 4px;
    cursor: pointer;
    border-radius: 25px;
}

.icon-button:hover {
    background-color: #E1E0E3;
}

.n-tag {
    width: 74px;
}

.n-tag__content {
    margin: 0 auto;
}
</style>