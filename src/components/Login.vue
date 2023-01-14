<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="secondary">
                <v-toolbar-title style="color: #fff">Вход</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                      prepend-icon="mdi-phone"
                      name="phone"
                      label="Номер телефона"
                      type="phone"
                      v-model="admin.phone"
                      :error-messages=error
                  />

                  <v-text-field
                      id="password"
                      prepend-icon="mdi-lock"
                      name="password"
                      label="Пароль"
                      type="password"
                      v-model="admin.password"
                  />

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" @click="signIN">Войти</v-btn>
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
        let answer = await axios.post(DOMAIN_NAME + "operator/sign_in", this.admin);
        let token = answer.data.token;
        let decoded = jwt_decode(token);

        if (decoded.role !== 'admin') {
          this.error = "У вас нет доступа к сайту!";
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