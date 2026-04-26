from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import MenuItem, Booking
from .serializers import MenuItemSerializer, BookingSerializer


@api_view(['GET'])
def menu_list(request):
    items = MenuItem.objects.filter(is_available=True)
    serializer = MenuItemSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_booking(request):
    data = request.data.copy()
    if 'booking_date' not in data or not data['booking_date']:
        data['booking_date'] = localdate()
    
    serializer = BookingSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def time_slots(request):
    slots = [
        {'value': '12:00', 'label': '12:00 PM'},
        {'value': '13:00', 'label': '1:00 PM'},
        {'value': '14:00', 'label': '2:00 PM'},
        {'value': '18:00', 'label': '6:00 PM'},
        {'value': '19:00', 'label': '7:00 PM'},
        {'value': '20:00', 'label': '8:00 PM'},
    ]
    return Response(slots)

from django.utils.timezone import localdate

@api_view(['GET'])
def today_bookings(request):
    today = localdate()
    bookings = Booking.objects.filter(booking_date=today).order_by('-created_at')
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)
