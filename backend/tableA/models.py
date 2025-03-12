from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()  

class Form(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Department(models.Model):
    name = models.CharField(max_length=255)
    form = models.OneToOneField(Form, on_delete=models.CASCADE, related_name="departments")  
    code = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Department'
        verbose_name_plural = 'Departments'

class Agency(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, blank=True, null=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='agencies')  # Cascade delete
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.department.name})"

    class Meta:
        ordering = ['department', 'name']
        verbose_name = 'Agency'
        verbose_name_plural = 'Agencies'

class OperatingUnit(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, blank=True, null=True)
    agency = models.ForeignKey(Agency, on_delete=models.CASCADE, related_name='operating_units')  
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.agency.name})"

    class Meta:
        ordering = ['agency', 'name']
        verbose_name = 'Operating Unit'
        verbose_name_plural = 'Operating Units'

class AppropriationType(models.Model):
    name = models.CharField(max_length=255)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='approriation_unit', default=1)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class BudgetYear(models.Model):
    name = models.CharField(max_length=100, default="Unknown Year")
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='year')
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class FormData(models.Model):
    form_name = models.ForeignKey(Form, on_delete=models.CASCADE, related_name="form_data")  # Cascade delete
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="form_data")  # Cascade delete
    agency = models.ForeignKey(Agency, on_delete=models.CASCADE, related_name="form_data", blank=True, null=True)
    operating_unit = models.ForeignKey(OperatingUnit, on_delete=models.CASCADE, related_name="form_data", blank=True, null=True)
    appropriation_source = models.ForeignKey(AppropriationType, on_delete=models.CASCADE, related_name="form_data", blank=True, null=True)
    year = models.ForeignKey(BudgetYear, on_delete=models.CASCADE, related_name="form_data", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"FormData for {self.form_name.name} ({self.department.name})"
    
class AllowedUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="allowed_forms")
    form = models.ForeignKey(FormData, on_delete=models.CASCADE, related_name="allowed_users")
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "form") 

    def __str__(self):
        return f"{self.user.email} - {self.form.form_name.name}"