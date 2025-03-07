from django.contrib import admin
from .models import Department, Agency, OperatingUnit, AppropriationType, BudgetYear

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ("name", "code", "created_at", "updated_at")
    search_fields = ("name", "code")
    ordering = ("name",)

@admin.register(Agency)
class AgencyAdmin(admin.ModelAdmin):
    list_display = ("name", "department", "code", "created_at", "updated_at")
    search_fields = ("name", "code")
    list_filter = ("department",)
    ordering = ("department", "name")

@admin.register(OperatingUnit)
class OperatingUnitAdmin(admin.ModelAdmin):
    list_display = ("name", "agency", "code", "created_at", "updated_at")
    search_fields = ("name", "code")
    list_filter = ("agency",)
    ordering = ("agency", "name")

@admin.register(AppropriationType)
class AppropriationTypeAdmin(admin.ModelAdmin):
    list_display = ("name", "description")
    search_fields = ("name",)
    ordering = ("name",)

@admin.register(BudgetYear)
class BudgetYearAdmin(admin.ModelAdmin):
    list_display = ("name",)  # Fixed tuple issue
    search_fields = ("name",)
    ordering = ("name",)
