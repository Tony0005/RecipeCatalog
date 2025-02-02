
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from .models import User, Category, Recipe

class UserRegistrationTest(APITestCase):
    def test_user_registration(self):
        url = reverse('register')
        data = {
            'email': 'testuser@example.com',
            'username': 'testuser',
            'password': 'testpassword123',
            'password2': 'testpassword123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().email, 'testuser@example.com')

class UserAuthenticationTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='testuser@example.com', password='testpassword123')

    def test_user_authentication(self):
        url = reverse('token_obtain_pair')
        data = {
            'email': 'testuser@example.com',
            'password': 'testpassword123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

class RecipeCreationTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='testuser@example.com', password='testpassword123')
        self.category = Category.objects.create(name='Dulces')
        self.token_url = reverse('token_obtain_pair')
        self.recipe_url = reverse('recipe-list')
        self.token_data = {
            'email': 'testuser@example.com',
            'password': 'testpassword123'
        }
        self.recipe_data = {
            'name': 'Cake de Chocolate',
            'preparation_time': '00:30:00',
            'difficulty': 'fácil',
            'ingredients': 'Chocolate, Leche, Azúcar, Huevos',
            'steps': 'Mesclar ingredientes, Batir por 30 minutos',
            'category': self.category.id
        }

    def test_recipe_creation(self):
        token_response = self.client.post(self.token_url, self.token_data, format='json')
        self.assertEqual(token_response.status_code, status.HTTP_200_OK)
        access_token = token_response.data['access']

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)

        response = self.client.post(self.recipe_url, self.recipe_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Recipe.objects.count(), 1)
        self.assertEqual(Recipe.objects.get().name, 'Cake de Chocolate')