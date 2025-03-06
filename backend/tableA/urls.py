from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    DepartmentViewSet, AgencyViewSet, OperatingUnitViewSet,
    AppropriationTypeViewSet, BudgetYearViewSet, save_data
)

router = DefaultRouter()
router.register(r'departments', DepartmentViewSet)
router.register(r'agencies', AgencyViewSet)
router.register(r'operating-units', OperatingUnitViewSet)
router.register(r'appropriation-types', AppropriationTypeViewSet)
router.register(r'budget-years', BudgetYearViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/save-data/', save_data, name='save-data'),  
]

