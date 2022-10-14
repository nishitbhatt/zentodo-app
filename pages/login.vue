<script setup>
import { usePostFetch } from "~/utils/Fetch";
import AppProgress from "~/components/AppProgress.vue";
import { useAppLoading } from "~/store";
</script>

<script>

const { inProgress } = useAppLoading()

export default {
  name: "LoginPage",
  layout: "default",
  data: () => ({
    username: '',
    password: '',
    showError: false
  }),
  mounted() {
    localStorage.removeItem('TodoApp.User')
  },
  methods: {

    async handleUserLogin() {

      const username = this.username
      const password = this.password

      const userCredits = {
        username,
        password,
      };

      // Authenticate User
      const { response } = await usePostFetch("/api/user/authenticate", userCredits)
      if (response) {
        if (response.status === 200) {
          localStorage.setItem("TodoApp.User", JSON.stringify(userCredits));
          this.$router.push("/11100543123/tasks");
        } else {
          this.showError = true
        }
      }

    }
  }
}
</script>

<template>
  <div class="grey lighten-5">
    <AppProgress :show="inProgress" />
    <AppFullHeight>
      <AppFlexCenter>
        <v-container>
          <v-row justify="center">
            <v-col xs="12" sm="8" md="4" lg="4">
              <v-card>
                <v-card-text>
                  <form action="" @submit.prevent="handleUserLogin">
                    <v-text-field v-model="username" placeholder="Username" class="mb-4" hide-details outlined dense
                      color="blue-grey" autofocus="autofocus" required>
                    </v-text-field>
                    <v-text-field v-model="password" type="password" class="mb-4" placeholder="Password"
                      color="blue-grey" outlined dense hide-details required>
                    </v-text-field>
                    <v-btn type="submit" block dark color="blue-grey"> Login </v-btn>
                  </form>
                </v-card-text>
              </v-card>
              <p v-if="showError" class="red--text">*Username/password is wrong!</p>
              <p v-else>&nbsp;</p>
            </v-col>
          </v-row>
        </v-container>
      </AppFlexCenter>
    </AppFullHeight>
  </div>
</template>
