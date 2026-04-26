from django.core.management.base import BaseCommand
from bookings.models import MenuItem

MENU_DATA = [
    {
        "name": "The Classic Dukkan",
        "description": "Our signature burger, the one that started it all.",
        "price": 199.00,
        "ingredients": "Beef Patty, Cheddar, Lettuce, Tomato, Special Sauce",
        "image_url": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    },
    {
        "name": "Double Smash",
        "description": "Two smashed patties, double the cheese, double the joy.",
        "price": 279.00,
        "ingredients": "Double Beef, Double Cheese, Caramelized Onion, Pickles",
        "image_url": "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600",
    },
    {
        "name": "Crispy Chicken Stack",
        "description": "Golden crispy chicken with a sriracha kick.",
        "price": 229.00,
        "ingredients": "Crispy Chicken, Sriracha Mayo, Coleslaw, Jalapeños",
        "image_url": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600",
    },
    {
        "name": "Garden Goddess",
        "description": "Plant-based and proud. Fresh, bold, delicious.",
        "price": 189.00,
        "ingredients": "Veg Patty, Hummus, Avocado, Roasted Peppers, Feta",
        "image_url": "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600",
    },
    {
        "name": "BBQ Bacon King",
        "description": "The premium pick. Smoky, cheesy, absolutely indulgent.",
        "price": 319.00,
        "ingredients": "Beef, Bacon, BBQ, Fried Onion Rings, Aged Cheddar",
        "image_url": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600",
    },
    {
        "name": "Desi Masala Burger",
        "description": "A desi twist with spiced aloo tikki and mint chutney.",
        "price": 159.00,
        "ingredients": "Spiced Aloo Tikki, Mint Chutney, Onion, Masala Sauce",
        "image_url": "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600",
    },
]

class Command(BaseCommand):
    help = 'Seed the database with initial menu items'

    def handle(self, *args, **kwargs):
        if MenuItem.objects.exists():
            self.stdout.write(self.style.WARNING('Menu items already exist. Skipping.'))
            return
        for item in MENU_DATA:
            MenuItem.objects.create(**item)
        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {len(MENU_DATA)} menu items!'))
