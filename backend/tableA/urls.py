from django.urls import path 
from .views import save_data



urlpatterns = [
    path('api/save-data/', save_data, name='save-data'),  
]

