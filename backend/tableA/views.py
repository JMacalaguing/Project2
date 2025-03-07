from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Department, Agency, OperatingUnit, AppropriationType, BudgetYear

@api_view(['POST'])
def save_data(request):
    try:
        data = request.data

        # Validate required fields exist
        if not isinstance(data, dict):
            return Response({"error": "Invalid data format"}, status=status.HTTP_400_BAD_REQUEST)

        # Save Departments
        department_objs = []
        for item in data.get("departments", []):
            if "name" in item:
                obj, _ = Department.objects.get_or_create(name=item["name"])
                department_objs.append(obj)

        # Save Agencies
        agency_objs = []
        for item in data.get("agencies", []):
            if "name" in item and "department" in item:
                department = Department.objects.filter(name=item["department"]).first()
                if department:
                    obj, _ = Agency.objects.get_or_create(name=item["name"], department=department)
                    agency_objs.append(obj)

        # Save Operating Units
        operating_unit_objs = []
        for item in data.get("operating_units", []):
            if "name" in item and "agency" in item:
                agency = Agency.objects.filter(name=item["agency"]).first()
                if agency:
                    obj, _ = OperatingUnit.objects.get_or_create(name=item["name"], agency=agency)
                    operating_unit_objs.append(obj)

        # Save Appropriation Types
        appropriation_type_objs = []
        for item in data.get("appropriation_types", []):
            if isinstance(item, str):  # Ensure it's a valid string
                obj, _ = AppropriationType.objects.get_or_create(name=item)
                appropriation_type_objs.append(obj)
                
        # Save budget_year
        budget_year_objs = []
        for item in data.get("budget_years", []):
            if isinstance(item, str):  # Ensure it's a valid string
                obj, _ = BudgetYear.objects.get_or_create(name=item)
                budget_year_objs.append(obj)

        return Response({"message": "Data saved successfully!"}, status=status.HTTP_201_CREATED)

    except Exception as e:
        print(f"Error saving data: {e}")  # Print error in the server logs
        return Response({"error": "An error occurred while saving data", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

