from rest_framework import serializers
from .models import Department, Agency, OperatingUnit, AppropriationType, BudgetYear

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class AgencySerializer(serializers.ModelSerializer):
    department_name = serializers.ReadOnlyField(source='department.name')

    class Meta:
        model = Agency
        fields = '__all__'

class OperatingUnitSerializer(serializers.ModelSerializer):
    agency_name = serializers.ReadOnlyField(source='agency.name')

    class Meta:
        model = OperatingUnit
        fields = '__all__'

class AppropriationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppropriationType
        fields = '__all__'

class BudgetYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetYear
        fields = '__all__'
