from rest_framework import serializers

from .models import Order, OrderItem
from books.models import Book


class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = [
            "book",
            "title",
            "price",
            "quantity",
            "subtotal",
        ]

        read_only_fields = [
            "title",
            "price",
            "subtotal",
        ]


class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
        many=True
    )

    class Meta:
        model = Order

        fields = [
            "id",
            "order_number",
            "customer_name",
            "customer_email",
            "customer_phone",
            "subtotal",
            "total",
            "currency",
            "status",
            "payment_reference",
            "created_at",
            "updated_at",
            "paid_at",
            "items",
        ]

        read_only_fields = [
            "id",
            "order_number",
            "subtotal",
            "total",
            "currency",
            "status",
            "payment_reference",
            "created_at",
            "updated_at",
            "paid_at",
        ]

    def create(self, validated_data):

        items_data = validated_data.pop(
            "items"
        )

        subtotal = 0

        prepared_items = []

        for item_data in items_data:

            book = item_data["book"]

            quantity = item_data["quantity"]

            price = book.price

            item_subtotal = (
                price * quantity
            )

            subtotal += item_subtotal

            prepared_items.append({
                "book": book,
                "title": book.title,
                "price": price,
                "quantity": quantity,
                "subtotal": item_subtotal,
            })

        order = Order.objects.create(
            customer_name=validated_data[
                "customer_name"
            ],

            customer_email=validated_data[
                "customer_email"
            ],

            customer_phone=validated_data[
                "customer_phone"
            ],

            subtotal=subtotal,

            total=subtotal,

            currency="NGN",

            status="pending",
        )

        for item in prepared_items:

            OrderItem.objects.create(
                order=order,
                **item,
            )

        return order