from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("email", "name", "is_staff", "is_active")
    list_filter = ("is_staff", "is_active")
    actions = ["activate_users", "deactivate_users"]  # Add custom actions

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("name",)}),
        ("Permissions", {"fields": ("is_staff", "is_active", "is_superuser", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "name", "password1", "password2", "is_staff", "is_active")}
        ),
    )
    search_fields = ("email", "name")
    ordering = ("email",)

    # Custom actions
    @admin.action(description="Activate selected users")
    def activate_users(self, request, queryset):
        queryset.update(is_active=True)

    @admin.action(description="Deactivate selected users")
    def deactivate_users(self, request, queryset):
        queryset.update(is_active=False)

# Register CustomUser with CustomUserAdmin
admin.site.register(CustomUser, CustomUserAdmin)
