from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password

User = get_user_model()  

@api_view(["POST"])
@permission_classes([AllowAny])
def signup_view(request):
    data = request.data
    email = data.get("email")
    name = data.get("name")  
    password = data.get("password")

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email is already registered"}, status=400)

    user = User(email=email, name=name)  # No username field
    user.set_password(password)  # Hash password
    user.save()

    token, created = Token.objects.get_or_create(user=user)

    return Response({
        "message": "Signup successful",
        "token": token.key,
        "user": {
            "id": user.id,
            "email": user.email,
            "name": getattr(user, "name", None)  
        }
    })


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    data = request.data
    email = data.get("email")
    password = data.get("password")

    try:
        user = User.objects.get(email=email) 
    except User.DoesNotExist:
        return Response({"message": "Invalid credentials"}, status=400)

    if not user.is_active:
        return Response({"message": "Your account is deactivated. Please contact support."}, status=403)

    if not check_password(password, user.password):  # 🔑 Validate password manually
        return Response({"message": "Invalid credentials"}, status=400)

    token, _ = Token.objects.get_or_create(user=user)

    user_data = {
        "id": user.id,
        "email": user.email,
        "name": user.name, 
        "is_staff": user.is_staff
    }

    return Response({
        "message": "Login successful",
        "token": token.key,
        "user": user_data
    })