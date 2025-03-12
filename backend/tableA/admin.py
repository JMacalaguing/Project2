from django.contrib import admin
from .models import Department, Agency, OperatingUnit, AppropriationType, BudgetYear,Form, FormData, AllowedUser


@admin.register(Form)
class FormsAdmin(admin.ModelAdmin):
    list_display = ("id", "name","created_at", "updated_at")
    search_fields = ("name","created_at")
    list_filter = ("name",)

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ("name", "form","code", "created_at", "updated_at")
    search_fields = ("name","form","code")
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
    list_display = ("name", "department", "description","created_at", "updated_at")
    search_fields = ("name","department")
    ordering = ("name",)

@admin.register(BudgetYear)
class BudgetYearAdmin(admin.ModelAdmin):
    list_display = ("name", "department", "description","created_at", "updated_at")  
    search_fields = ("name","department")
    ordering = ("name",)

@admin.register(FormData)
class FormDataAdmin(admin.ModelAdmin):
    list_display = ("id", "form_name", "department", "agency", "operating_unit", "appropriation_source", "year")
    search_fields = ("form_name", "department__name", "agency__name")
    list_filter = ("year", "department", "agency")

@admin.register(AllowedUser)
class AllowedUserAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "get_user_email", "form", "date_added")  
    search_fields = ("user__email", "form__form_name__name", "date_added")  
    list_filter = ("date_added", "form")  

    def get_user_email(self, obj):
        return obj.user.email
    get_user_email.short_description = "Email"