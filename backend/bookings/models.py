from django.db import models

class MenuItem(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    ingredients = models.TextField()
    image_url = models.URLField(blank=True)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Booking(models.Model):
    customer_name = models.CharField(max_length=100)
    customer_phone = models.CharField(max_length=20)
    menu_item = models.ForeignKey(MenuItem, on_delete=models.SET_NULL, null=True)
    time_slot = models.CharField(max_length=10)
    booking_date = models.DateField()
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer_name} - {self.menu_item} @ {self.time_slot}"
