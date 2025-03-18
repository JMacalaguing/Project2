from rest_framework import serializers
from .models import FormData
from django.contrib.auth import get_user_model

User = get_user_model

class FormsSerializer(serializers.ModelSerializer):
    form_name = serializers.CharField(source="form_name.name")
    department = serializers.CharField(source="department.name")
    agency = serializers.CharField(source="agency.name")
    operating_unit = serializers.CharField(source="operating_unit.name")
    appropriation_source = serializers.CharField(source="appropriation_source.name")
    year = serializers.CharField(source="year.name")

    class Meta:
        model = FormData
        fields = ["id", "form_name", "department", "agency", "operating_unit", "appropriation_source", "year", "created_at", "updated_at"]



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Use the custom user model
        fields = ["id", "email", "name"] 