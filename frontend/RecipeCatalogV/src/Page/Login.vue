<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-center">Iniciar Sesión</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-alert v-if="errorMessage" type="error" dismissible>{{ errorMessage }}</v-alert>
              <v-text-field
                v-model="email"
                label="Correo Electrónico"
                :rules="[rules.required, rules.email]"
                prepend-icon="mdi-email"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Contraseña"
                :rules="[rules.required]"
                prepend-icon="mdi-lock"
                type="password"
                outlined
                dense
              ></v-text-field>
              <v-btn
                :disabled="!valid"
                color="warning"
                @click="login"
                class="mt-4"
                block
              >
                Iniciar Sesión
              </v-btn>
              <v-btn
                color="warning"
                class="mt-2"
                block
                @click="goToRegister"
              >
                ¿No tienes cuenta? Regístrate
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { VForm } from 'vuetify/components';

export default defineComponent({
  setup() {
    const email = ref('');
    const password = ref('');
    const valid = ref(false);
    const form: Ref<VForm | null> = ref(null);
    const router = useRouter();
    const errorMessage = ref('');

    const rules = {
      required: (value: any) => !!value || 'Este campo es obligatorio',
      email: (value: any) => /.+@.+\..+/.test(value) || 'Correo electrónico no válido',
    };

    const login = async () => {
      if (form.value && (await form.value.validate()).valid) {
        try {
          const authStore = useAuthStore();
          await authStore.login(email.value, password.value);
          router.push('/Recipe_List');
        } catch (error) {
          errorMessage.value = (error as Error).message;
          console.error('Error during login:', error);
        }
      }
    };

    const goToRegister = () => {
      router.push('/Register');
    };

    return {
      email,
      password,
      valid,
      form,
      rules,
      errorMessage,
      login,
      goToRegister,
    };
  },
});
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>