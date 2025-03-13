from django.urls import path 
from .views import get_forms, save_form, update_form, get_form_by_id, get_users, add_allowed_user, get_allowed_users, remove_allowed_user

urlpatterns = [
    path('api/get-forms/', get_forms, name='get-forms'),
    path('api/save-form/', save_form, name='save_form'),
    path('api/update-data/', update_form, name='update_data'),
    path("api/get-form/<int:formId>/", get_form_by_id),
    path('api/get_users/', get_users, name='get_users'),
    path("api/add_allowed_user/<int:formId>/", add_allowed_user, name="add_allowed_user"),
    path("api/get-allowed-users/<int:formId>/", get_allowed_users, name="get_allowed_users"),
    path("api/remove-allowed-user/<int:formId>/<int:userId>/", remove_allowed_user, name="remove_allowed_user"),
]
