<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height class="back">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md3>
            <v-card class="card" flat>
              <v-card-text>
                <div class="title">Вход</div>
                <v-form>
                  <v-text-field
                      name="phone"
                      label="Логин"
                      type="phone"
                      v-model="admin.phone"
                  />

                  <v-text-field
                      id="password"
                      name="password"
                      label="Пароль"
                      type="password"
                      v-model="admin.password"
                      :error-messages=error
                  />

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn depressed class="bt" color="secondary" @click="signIN">Войти</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import {DOMAIN_NAME} from "@/api/api";
import jwt_decode from "jwt-decode";
import router from "@/router";

export default {
  name: 'LoginPage',

  data() {
    return {
      error: '',
      admin: {
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    async signIN() {
      this.error = '';
      try {
        let answer = await axios.post(DOMAIN_NAME + "v2/employee/sign_in", this.admin);
        let token = answer.data.token;
        let decoded = jwt_decode(token);

        if (decoded.role !== 'ADMIN') {
          this.error = "У вас нет доступа к сайту!";
          console.log(decoded.role)
          return;
        }

        localStorage.setItem('token', token);
        await router.replace('/');
      } catch (e) {
        if (e.response.status === 401) {
          this.error = "Введены неверные логин или пароль";
        }
      }
    }
  }
}
</script>

<style>
.back{
  background-color: #0A60AD;
  align-content: center;
}

.title{
  font-size: 14em;
}

.bt{
  width: 14em;
  margin: auto;
}

.card{
  border: white 20px solid;
}
</style>