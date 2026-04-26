from django.contrib import admin
from .models import MenuItem, Booking

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'is_available']

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['customer_name', 'menu_item', 'time_slot', 'booking_date', 'created_at']
