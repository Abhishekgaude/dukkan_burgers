from django.urls import path
from . import views

urlpatterns = [
    path('menu/', views.menu_list, name='menu-list'),
    path('bookings/', views.create_booking, name='create-booking'),
    path('bookings/today/', views.today_bookings, name='today-bookings'),
    path('timeslots/', views.time_slots, name='time-slots'),
]
