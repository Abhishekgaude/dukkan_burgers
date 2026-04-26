from rest_framework import serializers
from .models import MenuItem, Booking


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    menu_item_name = serializers.CharField(source='menu_item.name', read_only=True)

    class Meta:
        model = Booking
        fields = '__all__'
