from django.contrib import admin
from .models import CustomUser,Note

# Register your models here.

@admin.register(CustomUser)
class UserAdmin(admin.ModelAdmin):
    list_display=['id','fullname','email','username','password']

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display=['id','title','content','postedby']