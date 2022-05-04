"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from apis import views as apv
from rest_framework.authtoken.views import obtain_auth_token

router=DefaultRouter()

# Passwords: 1. archan12345678; 2.banerjee12345678

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/',include('rest_framework.urls',namespace='rest_framework')),
    path('gettoken/',obtain_auth_token),
    path('createuser/',apv.CreateUser.as_view()),
    path('getowndetails/',apv.own_details),
    path('updateuser/<int:pk>/',apv.UpdateUser.as_view()),
    path('deleteuser/<int:pk>/',apv.DeleteUser.as_view()),
    path('note/',apv.CreateOrGetNote.as_view()),
    path('note/<int:pk>/',apv.UpdateRetrieveDestroyNote.as_view()),
    path('notefunc/',apv.create_note),
    path('note/search/',apv.SearchNote.as_view()),
]
