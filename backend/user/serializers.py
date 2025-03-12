# user/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Use the custom user model
        fields = ["id", "email", "name", "is_active", "is_staff"]  # Include all necessary fields
