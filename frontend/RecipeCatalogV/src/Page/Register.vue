<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-center">Registro</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="email"
                label="Correo Electrónico"
                :rules="[rules.required, rules.email]"
                prepend-icon="mdi-email"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="username"
                label="Nombre de Usuario"
                :rules="[rules.required]"
                prepend-icon="mdi-account"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Contraseña"
                :rules="[rules.required, rules.min]"
                prepend-icon="mdi-lock"
                type="password"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="password2"
                label="Confirmar Contraseña"
                :rules="[rules.required, rules.matchPassword]"
                prepend-icon="mdi-lock"
                type="password"
                outlined
                dense
              ></v-text-field>
              <v-btn
                :disabled="!valid"
                color="warning"
                @click="register"
                class="mt-4"
                block
              >
                Registrarse
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '../API/UserServer';
import { useAuthStore } from '../store/auth';

export default defineComponent({
  setup() {
    const email = ref('');
    const username = ref('');
    const password = ref('');
    const password2 = ref('');
    const valid = ref(false);
    const form = ref(null);
    const router = useRouter();

    const rules = {
      required: value => !!value || 'Este campo es obligatorio',
      email: value => /.+@.+\..+/.test(value) || 'Correo electrónico no válido',
      min: value => value.length >= 6 || 'La contraseña debe tener al menos 6 caracteres',
      matchPassword: value => value === password.value || 'Las contraseñas no coinciden',
    };

    const register = async () => {
      if (form.value.validate()) {
        try {
          await AuthService.register({
            email: email.value,
            username: username.value,
            password: password.value,
            password2: password2.value,
          });
          const authStore = useAuthStore();
          await authStore.login(email.value, password.value);
          router.push('/Recipe_List');
        } catch (error) {
          console.error('Error during registration:', error);
        }
      }
    };

    return {
      email,
      username,
      password,
      password2,
      valid,
      form,
      rules,
      register,
    };
  },
});
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>