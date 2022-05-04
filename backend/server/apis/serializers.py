from rest_framework import serializers
from .models import CustomUser,Note
from django.contrib.auth.hashers import make_password

# Serilizers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields='__all__'
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).create(validated_data)

class NoteSerializer(serializers.ModelSerializer):
    postedby=UserSerializer(read_only=True)
    class Meta:
        model=Note
        fields='__all__'