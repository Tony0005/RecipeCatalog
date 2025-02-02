<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-card class="hero-card" color="orange darken-2" dark>
            <v-card-title class="headline text-center">
              Bienvenido al Catálogo de Recetas de Cocina
            </v-card-title>
            <v-card-text class="text-center">
              Descubre las mejores recetas para cada ocasión
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="features" justify="center">
        <v-col cols="12" md="4">
          <v-card>
            <v-img
              src="https://marketplace.canva.com/EAFfvXEP4KY/3/0/1131w/canva-documento-a4-receta-de-tortitas-%C3%A1lbum-de-recortes-verde-3tGzOahagMM.jpg"
              height="500px"
            ></v-img>
            <v-card-title class="text-center">Recetas Gourmet</v-card-title>
            <v-card-text class="text-center">
              Explora recetas gourmet para ocasiones especiales.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-img
              src="https://i.pinimg.com/originals/d2/66/6c/d2666c521d8cbd24afac794b88859621.jpg"
              height="500px"
            ></v-img>
            <v-card-title class="text-center">Recetas Fáciles</v-card-title>
            <v-card-text class="text-center">
              Encuentra recetas rápidas y fáciles de preparar.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-img
              src="https://marketplace.canva.com/EAFf0gGS2DM/1/0/1135w/canva-tarjeta-de-recetas-fruta-y-verduras-divertido-verde-M8qefC973kc.jpg"
              height="500px"
            ></v-img>
            <v-card-title class="text-center">Recetas Saludables</v-card-title>
            <v-card-text class="text-center">
              Descubre recetas saludables y nutritivas.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="contact" justify="center" align="center">
        <v-col cols="12" md="6">
          <v-card class="text-center" color="orange lighten-4">
            <v-card-title>Contáctenos</v-card-title>
            <v-card-text>
              <p>Teléfono: +123 456 7890</p>
              <v-btn icon>
                <v-icon>mdi-facebook</v-icon>
              
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-instagram</v-icon>
                
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Home',
  });
  </script>
  
  <style scoped>
  .hero-card {
    margin-bottom: 20px;
  }
  
  .features {
    margin-top: 20px;
  }
  
  .v-card-title {
    font-weight: bold;
  }
  
  .v-card-text {
    font-size: 16px;
  }
  .contact {
    margin-top: 40px;
  }
  
  .v-btn {
    margin: 5px;
  }
  </style>