from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from .models import AllowedUser, Department, Agency, OperatingUnit, AppropriationType, BudgetYear, Form, FormData
from rest_framework.permissions import AllowAny , IsAuthenticated
from .serializers import FormsSerializer
from django.contrib.auth import get_user_model
from user.serializers import UserSerializer


User = get_user_model()

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_forms(request):
    try:
        if request.user.is_staff:
            # If the user is staff, return all forms
            forms = FormData.objects.all()
        else:
            # If the user is not staff, return only forms they are allowed to access
            allowed_forms = AllowedUser.objects.filter(user=request.user).values_list('form', flat=True)
            forms = FormData.objects.filter(id__in=allowed_forms)

        # Serialize the forms and return the response
        serializer = FormsSerializer(forms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_form_by_id(request, formId):
    try:
        form = FormData.objects.get(id=formId)  
        serializer = FormsSerializer(form)  
        return Response(serializer.data, status=status.HTTP_200_OK)
    except FormData.DoesNotExist:
        return Response({"error": "Form not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["POST"])
def save_form(request):
    try:
        data = request.data
        print("Received Data:", data)

        # Ensure Form exists
        form, _ = Form.objects.get_or_create(name=data['form_name'])
        print(f"Form ID: {form.id}")

        # Ensure Department exists
        department, _ = Department.objects.get_or_create(name=data["department"], form=form)
        print(f"Department ID: {department.id}")

        # Ensure Agency exists
        agency, _ = Agency.objects.get_or_create(name=data["agency"], department=department)
        print(f"Agency ID: {agency.id}")

        # Ensure Operating Unit exists
        operating_unit, _ = OperatingUnit.objects.get_or_create(name=data.get("operating_unit", ""), agency=agency)
        print(f"Operating Unit ID: {operating_unit.id}")

        # Ensure Appropriation Source exists - NEEDS department
        appropriation_source, _ = AppropriationType.objects.get_or_create(
            name=data.get("appropriation_source", ""),
            defaults={"department": department}  # This handles the default case when creating new
        )
        print(f"Appropriation Source ID: {appropriation_source.id}")

        # Ensure Year exists - NEEDS department
        year, _ = BudgetYear.objects.get_or_create(
            name=data.get("year", ""),
            defaults={"department": department}  # This handles the default case when creating new
        )
        print(f"Year ID: {year.id}")

        # Create FormData entry
        form_data = FormData.objects.create(
            form_name=form,  
            department=department,  
            agency=agency,  
            operating_unit=operating_unit,  
            appropriation_source=appropriation_source,  
            year=year,  
        )

        return Response({"message": "Form data saved successfully", "form_data_id": form_data.id}, status=201)

    except Exception as e:
        print(f"Error: {str(e)}")
        return Response({"error": str(e)}, status=400)

@api_view(["PUT"])
def update_form(request, form_id):
    try:
        data = request.data

        # Fetch the existing form
        form = Form.objects.get(id=form_id)

        # Ensure Department exists or update
        department, _ = Department.objects.get_or_create(name=data["department"], form=form)

        # Ensure Agency exists or update under this Department
        agency, _ = Agency.objects.get_or_create(name=data["agency"], department=department)

        # Ensure Operating Unit exists or update under this Agency
        operating_unit, _ = OperatingUnit.objects.get_or_create(name=data.get("operating_unit", ""), agency=agency)

        # Ensure Appropriation Source exists or update
        appropriation_source, _ = AppropriationType.objects.get_or_create(name=data.get("appropriation_source", ""), department=department)

        # Ensure Year exists or update
        year, _ = BudgetYear.objects.get_or_create(name=data.get("year", ""), department=department)

        # Update Form name if changed
        form.name = data["form_name"]
        form.save()

        # Update the existing FormData entry
        form_data, _ = FormData.objects.update_or_create(
            form_name=form,
            defaults={
                "department": department,
                "agency": agency,
                "operating_unit": operating_unit,
                "appropriation_source": appropriation_source,
                "year": year,
            },
        )

        return Response({"message": "Form updated successfully!", "id": form.id}, status=status.HTTP_200_OK)

    except Form.DoesNotExist:
        return Response({"error": "Form not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_allowed_user(request, formId):
    try:
        form = FormData.objects.get(id=formId)

        # Ensure the requester is the owner or has permission to manage the form
        if not request.user.is_staff:  # Only staff users can manage forms
            return Response({"error": "You do not have permission to manage this form."}, status=status.HTTP_403_FORBIDDEN)

        user_id = request.data.get("user_id")
        user = User.objects.get(id=user_id)

    
        AllowedUser.objects.create(user=user, form=form)

        return Response({"message": "User added successfully."}, status=status.HTTP_200_OK)
    except FormData.DoesNotExist:
        return Response({"error": "Form not found."}, status=status.HTTP_404_NOT_FOUND)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_users(request):
    users = User.objects.filter(is_staff=False) 
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_allowed_users(request, formId):
    try:
        form = FormData.objects.get(id=formId)
        allowed_users = AllowedUser.objects.filter(form=form).select_related("user") 
        data = [
            {
                "id": allowed_user.user.id,
                "name": allowed_user.user.name,
                "email": allowed_user.user.email,
                "date_added": allowed_user.date_added,
            }
            for allowed_user in allowed_users
        ]
        return Response(data, status=status.HTTP_200_OK)
    except FormData.DoesNotExist:
        return Response({"error": "Form not found."}, status=status.HTTP_404_NOT_FOUND)