from django.contrib import admin
from django.urls import path
from games import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='menu_juegos'),
    
    path('memorice/', views.memorice, name='memorice'),
    path('simon_dice/', views.simon_dice, name='simon_dice'),
]
