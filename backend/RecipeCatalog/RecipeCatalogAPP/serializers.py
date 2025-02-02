from rest_framework import serializers
from .models import Recipe, Category, User
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Reemplazamos 'username' por 'email' en las credenciales
        credentials = {
            'email': attrs.get('email'),
            'password': attrs.get('password'),
        }

        if not credentials['email'] or not credentials['password']:
            raise AuthenticationFailed("Se requiere email y contraseña.")

        # Intentamos autenticar al usuario
        user = authenticate(username=credentials['email'], password=credentials['password'])

        if user is None:
            raise AuthenticationFailed("Credenciales inválidas.")

        # Si la autenticación es correcta, pasamos los datos necesarios al serializer base
        return super().validate(attrs)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)  # Campo para confirmar contraseña

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')  # Eliminar el campo de confirmación
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'




# class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         # Cambia la validación para que use 'email' en lugar de 'username'
#         credentials = {
#             'email': attrs.get('email'),
#             'password': attrs.get('password')
#         }

#         if not credentials['email'] or not credentials['password']:
#             raise serializers.ValidationError("Debe proporcionar el correo electrónico y la contraseña.")

#         user = User.objects.filter(email=credentials['email']).first()
#         if user is None:
#             raise serializers.ValidationError({"email": "No se encontró un usuario con este correo electrónico."})

#         # Valida con el modelo base de TokenObtainPairSerializer
#         return super().validate({
#             'username': user.username,  # Usa el username del usuario para la validación interna
#             'password': credentials['password']
#         })


