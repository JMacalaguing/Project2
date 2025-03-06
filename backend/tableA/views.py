from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Department, Agency, OperatingUnit, AppropriationType, BudgetYear
from .serializers import (
    DepartmentSerializer, AgencySerializer, OperatingUnitSerializer,
    AppropriationTypeSerializer, BudgetYearSerializer
)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

@api_view(["POST"])
@permission_classes([AllowAny])  # Allow any user to access this endpoint
def save_data(request):
    """
    Custom API view to handle bulk saving of departments, agencies, and operating units.
    """
    try:
        data = request.data

        # Save Departments
        department_objects = []
        for dept in data.get("departments", []):
            department_objects.append(Department(name=dept["name"]))
        Department.objects.bulk_create(department_objects, ignore_conflicts=True)

        # Save Agencies
        agency_objects = []
        for agency in data.get("agencies", []):
            department = Department.objects.filter(name=agency["department"]).first()
            if department:
                agency_objects.append(Agency(name=agency["name"], department=department))
        Agency.objects.bulk_create(agency_objects, ignore_conflicts=True)

        # Save Operating Units
        operating_unit_objects = []
        for unit in data.get("operating_units", []):
            agency = Agency.objects.filter(name=unit["agency"]).first()
            if agency:
                operating_unit_objects.append(OperatingUnit(name=unit["name"], agency=agency))
        OperatingUnit.objects.bulk_create(operating_unit_objects, ignore_conflicts=True)

        return Response({"message": "Data saved successfully!"}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class DepartmentViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]  
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    

class AgencyViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]  
    queryset = Agency.objects.select_related('department').all()
    serializer_class = AgencySerializer
    

class OperatingUnitViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny] 
    queryset = OperatingUnit.objects.select_related('agency').all()
    serializer_class = OperatingUnitSerializer
     

class AppropriationTypeViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny] 
    queryset = AppropriationType.objects.all()
    serializer_class = AppropriationTypeSerializer
    

class BudgetYearViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]  
    queryset = BudgetYear.objects.all()
    serializer_class = BudgetYearSerializer
   
