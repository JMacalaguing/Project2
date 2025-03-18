import re
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from .models import AllowedUser, Department, Agency, OperatingUnit, AppropriationType, BudgetYear, Form, FormData
from rest_framework.permissions import AllowAny , IsAuthenticated
from .serializers import FormsSerializer
from django.contrib.auth import get_user_model
from user.serializers import UserSerializer
from django.utils import timezone


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



def clean_name(name):
    """Remove parenthesized text from name to prevent duplication."""
    return re.sub(r"\s*\(.*?\)", "", name).strip()

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_form(request, form_id):
    try:
        data = request.data
        print(f"Received Update Request for Form ID: {form_id}")
        print(f"Raw Data Received: {data}")

        # Fetch the existing FormData using the provided ID
        form_data = FormData.objects.get(id=form_id)
        print(f"Existing Form Data: Department={form_data.department.name}, Agency={form_data.agency.name}, OperatingUnit={form_data.operating_unit.name}")

        # Update Department
        if "department" in data and data["department"]:
            form_data.department.name = data["department"]
            print(f"Updated Department: {form_data.department.name}")
            form_data.department.save()

        # Update Agency
        if "agency" in data and data["agency"]:
            print(f"Original Agency: {form_data.agency.name}")
            if data["agency"] != form_data.agency.name:
                form_data.agency.name = data["agency"]
                print(f"Updated Agency: {form_data.agency.name}")
                form_data.agency.save()

        # Update Operating Unit
        if "operating_unit" in data and data["operating_unit"]:
            print(f"Original Operating Unit: {form_data.operating_unit.name}")
            if data["operating_unit"] != form_data.operating_unit.name:
                form_data.operating_unit.name = data["operating_unit"]
                print(f"Updated Operating Unit: {form_data.operating_unit.name}")
                form_data.operating_unit.save()

        # Handle appropriation_source
        if "appropriation_source" in data:
            # Check if appropriation_source exists in the database for this form
            if hasattr(form_data, 'appropriation_source') and form_data.appropriation_source:
                # If data is an empty list or None, clear the current value
                if not data["appropriation_source"]:
                    form_data.appropriation_source = None
                    print(f"Cleared Appropriation Source")
                else:
                    # If it's a list with values, join them with a separator
                    if isinstance(data["appropriation_source"], list):
                        form_data.appropriation_source.name = ", ".join(data["appropriation_source"])
                    else:
                        form_data.appropriation_source.name = data["appropriation_source"]
                    print(f"Updated Appropriation Source: {form_data.appropriation_source.name}")
                    form_data.appropriation_source.save()
            else:
                # If there's no existing appropriation_source but data is provided
                if data["appropriation_source"]:
                    # Create a new AppropriationSource instance
                    from .models import AppropriationSource  # Import the model
                    
                    source_name = ", ".join(data["appropriation_source"]) if isinstance(data["appropriation_source"], list) else data["appropriation_source"]
                    appropriation = AppropriationSource.objects.create(name=source_name)
                    form_data.appropriation_source = appropriation
                    print(f"Created New Appropriation Source: {source_name}")

        # Handle year
        if "year" in data and data["year"]:
            form_data.year.name = data["year"][0] if isinstance(data["year"], list) else data["year"]
            print(f"Updated Year: {form_data.year.name}")
            form_data.year.save()

        # Save main form data
        form_data.save()
        
        print(f"Final Saved Data: Department={form_data.department.name}, Agency={form_data.agency.name}, OperatingUnit={form_data.operating_unit.name}")

        # Include appropriation_source in the response
        appropriation_source_value = None
        if hasattr(form_data, 'appropriation_source') and form_data.appropriation_source:
            if hasattr(form_data.appropriation_source, 'name'):
                appropriation_source_value = form_data.appropriation_source.name
            else:
                appropriation_source_value = str(form_data.appropriation_source)
                
        return Response(
            {
                "message": "Form data updated successfully!",
                "id": form_data.id,
                "form_name": form_data.form_name.name if hasattr(form_data.form_name, "name") else str(form_data.form_name),
                "department": form_data.department.name,
                "agency": form_data.agency.name if form_data.agency else "",
                "operating_unit": form_data.operating_unit.name if form_data.operating_unit else "",
                "appropriation_source": appropriation_source_value,
                "year": form_data.year.name if form_data.year else "",
            },
            status=status.HTTP_200_OK,
        )
        
    except FormData.DoesNotExist:
        return Response({"error": "Form data not found"}, status=status.HTTP_404_NOT_FOUND)
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
    try:
        # Check if the user is staff
        if not request.user.is_staff:
            return Response({"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN)

        # Get the form_id from query parameters
        form_id = request.query_params.get('form_id')

        if not form_id:
            return Response({"error": "form_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Get users who are not staff and not already assigned to the form
        assigned_users = AllowedUser.objects.filter(form_id=form_id).values_list("user_id", flat=True)
        users = User.objects.filter(is_staff=False).exclude(id__in=assigned_users)

        # Serialize the users and return the response
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
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
    

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def remove_allowed_user(request, formId, userId):
    try:
        # Ensure the requester is a staff user
        if not request.user.is_staff:
            return Response({"error": "You do not have permission to manage this form."}, status=status.HTTP_403_FORBIDDEN)

        # Fetch the allowed user entry
        allowed_user = AllowedUser.objects.filter(form_id=formId, user_id=userId).first()

        if not allowed_user:
            return Response({"error": "User is not assigned to this form."}, status=status.HTTP_404_NOT_FOUND)

        # Delete the allowed user entry
        allowed_user.delete()
        return Response({"message": "User removed successfully."}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)