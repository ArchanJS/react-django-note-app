from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class CustomUser(AbstractUser):
    fullname=models.CharField(max_length=300)
    email=models.EmailField(max_length=300,unique=True)

    def __str__(self):
        return self.fullname

class Note(models.Model):
    title=models.CharField(max_length=300)
    content=models.TextField(max_length=3000)
    postedby=models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name='postedby')

    def __str__(self):
        return self.title[0:30]