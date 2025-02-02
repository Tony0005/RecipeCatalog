from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El email debe ser proporcionado')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

    def get_by_natural_key(self, email):
        return self.get(email=email)

class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name 

class Recipe(models.Model):
    name = models.CharField(max_length=100)
    preparation_time = models.DurationField(help_text="Tiempo de preparación en formato HH:MM:SS")
    Difficulty_CHOICES = [
        ('fácil', 'Fácil'),
        ('regular', 'Regular'),
        ('dificil', 'Dificil'),
    ]
    difficulty = models.CharField(
        max_length=15,
        choices=Difficulty_CHOICES,
        default='fácil'
    )
    ingredients = models.TextField()
    steps = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='category_recipe' )
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='user_recipe')
    image = models.ImageField(upload_to='recipes/', null=True, blank=True)

    def __str__(self):
        return self.name