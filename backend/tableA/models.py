from django.db import models

class Department(models.Model):
    """
    Model representing a government department
    """
    name = models.CharField(max_length=255)
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
    """
    Model representing a government agency under a department
    """
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, blank=True, null=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='agencies')
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
    """
    Model representing an operating unit under an agency
    """
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
    """
    Model for types of appropriation sources
    """
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.name

class BudgetYear(models.Model):
    name = models.CharField(max_length=100, default="Unknown Year")

    def __str__(self):
        return self.name
