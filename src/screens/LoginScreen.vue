<template>
  <div class="back">
    <n-card class="card-style">
      <n-h1 class="title-label">Вход</n-h1>

      <n-form ref="formRef" :model="formValue" :rules="rules">
        <n-form-item path="password" label="Пароль">
          <n-input v-model:value="formValue.password" type="password" show-password-on="click" placeholder="" />
        </n-form-item>

        <n-button type="primary" block @click="handleValidateClick">
          Войти
        </n-button>
      </n-form>

    </n-card>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'
import { useMessage } from "naive-ui";

const router = useRouter()
const message = useMessage();

// reference for form element 
// (can use for execute functions on form, for example )
const formRef = ref(null);

// can use for accessing to forms fields
const formValue = ref({
  password: "",
});

async function validatePassword(_, value) {
  // call there api
  await new Promise(resolve => setTimeout(resolve, 3e3));

  if (value.length < 4) {
    throw Error("wrong password length");
  }
}

// validation rules
const rules = {
  password: {
    required: true,
    asyncValidator: validatePassword
  },
};

function handleValidateClick(e) {
  e.preventDefault();
  const messageReactive = message.loading("Verifying", {
    duration: 0
  });


  formRef.value?.validate(
    (errors) => {
      if (!errors) {
        router.replace('/');
      } else {
        message.error("Invalid");
        console.log("errors", errors);
      }
      messageReactive.destroy();
    }
  );
};

</script>


<style scoped>
.card-style {
  width: 25%;
  top: 30%;
  margin: auto;
}

.back {
  height: 100%;
  background-color: #0960acFF;
}

.n-h {
  text-align: center;
}

.n-form-item {
  padding-bottom: 12px;
}
</style>
