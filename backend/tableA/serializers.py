from rest_framework import serializers
from .models import FormData
from django.contrib.auth import get_user_model

User = get_user_model

class FormsSerializer(serializers.ModelSerializer):
    form_name = serializers.StringRelatedField()
    department = serializers.StringRelatedField()
    agency = serializers.StringRelatedField()
    operating_unit = serializers.StringRelatedField()
    appropriation_source = serializers.StringRelatedField()
    year = serializers.StringRelatedField()

    class Meta:
        model = FormData
        fields = ["id", "form_name", "department", "agency","operating_unit","appropriation_source","year","created_at", "updated_at"]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Use the custom user model
        fields = ["id", "email", "name"] 