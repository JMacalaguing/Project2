from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from .models import Department, Agency, OperatingUnit, AppropriationType, BudgetYear
from rest_framework.permissions import AllowAny

@api_view(['POST'])
def save_data(request):
    try:
        data = request.data

        if not isinstance(data, dict):
            return Response({"error": "Invalid data format"}, status=status.HTTP_400_BAD_REQUEST)

        # Update or create Departments
        for item in data.get("departments", []):
            if "name" in item:
                Department.objects.update_or_create(name=item["name"], defaults={"name": item["name"]})

        # Update or create Agencies
        for item in data.get("agencies", []):
            if "name" in item and "department" in item:
                department = Department.objects.filter(name=item["department"]).first()
                if department:
                    Agency.objects.update_or_create(name=item["name"], department=department, defaults={"name": item["name"]})

        # Update or create Operating Units
        for item in data.get("operating_units", []):
            if "name" in item and "agency" in item:
                agency = Agency.objects.filter(name=item["agency"]).first()
                if agency:
                    OperatingUnit.objects.update_or_create(name=item["name"], agency=agency, defaults={"name": item["name"]})

        # Update or create Appropriation Types
        for item in data.get("appropriation_types", []):
            if isinstance(item, str):  
                AppropriationType.objects.update_or_create(name=item, defaults={"name": item})

        # Update or create Budget Years
        for item in data.get("budget_years", []):
            if isinstance(item, str):
                BudgetYear.objects.update_or_create(name=item, defaults={"name": item})

        return Response({"message": "Data updated successfully!"}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": "An error occurred while updating data", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_data(request):
    try:
        # Fetch all departments
        departments = Department.objects.all().values("id", "name")
        
        # Fetch all agencies
        agencies = Agency.objects.all().values("id", "name", "department__name")
        
        # Fetch all operating units
        operating_units = OperatingUnit.objects.all().values("id", "name", "agency__name")
        
        # Fetch all appropriation types
        appropriation_types = AppropriationType.objects.all().values("id", "name")
        
        # Fetch all budget years
        budget_years = BudgetYear.objects.all().values("id", "name")

        data = {
            "departments": list(departments),
            "agencies": list(agencies),
            "operating_units": list(operating_units),
            "appropriation_types": list(appropriation_types),
            "budget_years": list(budget_years),
        }

        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": "An error occurred while fetching data", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)