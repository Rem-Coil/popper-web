<template>
<body class="back">
   <n-card class="card-style">
    <h1>Вход</h1>
        <n-form>
          <n-form-item-row label="Пароль">
            <n-input
      type="password"
      show-password-on="mousedown"
      placeholder="Password"
      
    />
          </n-form-item-row>
        </n-form>
        <!-- <p v-if="errorString">Vue восхитителен!</p> -->
        <n-button  type="primary" block color="#0960ac">
          Войти
        </n-button>
  </n-card>
  
  </body>
</template>


<script >

</script>


<style>
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
.card-style{
    width: 25%;
    top: 30%;
    margin: auto;
    border: 50px;
    border-radius: 16px;
}


.back{
    background-color: #0960ac;
    height: 100%;
}

</style>
