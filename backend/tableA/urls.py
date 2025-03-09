from django.urls import path 
from .views import save_data, get_data



urlpatterns = [
    path('api/save-data/', save_data, name='save-data'),
     path('api/get-data/', get_data, name='get_data'),  
]

