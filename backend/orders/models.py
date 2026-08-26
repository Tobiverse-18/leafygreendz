from django.db import models
from django.utils import timezone

import uuid
import secrets


class Order(models.Model):

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("paid", "Paid"),
        ("failed", "Failed"),
        ("cancelled", "Cancelled"),
    ]

    order_number = models.CharField(
        max_length=32,
        unique=True,
        editable=False,
    )

    customer_name = models.CharField(
        max_length=150,
    )

    customer_email = models.EmailField()

    customer_phone = models.CharField(
        max_length=30,
    )

    subtotal = models.DecimalField(
        max_digits=12,
        decimal_places=2,
    )

    total = models.DecimalField(
        max_digits=12,
        decimal_places=2,
    )

    currency = models.CharField(
        max_length=3,
        default="NGN",
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending",
    )

    payment_reference = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        unique=True,
    )

    download_token = models.CharField(
        max_length=64,
        editable=False,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    paid_at = models.DateTimeField(
        blank=True,
        null=True,
    )

    def save(self, *args, **kwargs):

        if not self.order_number:

            self.order_number = (
                f"LG-{uuid.uuid4().hex[:12].upper()}"
            )

        if not self.download_token:

            self.download_token = (
                secrets.token_urlsafe(48)
            )

        super().save(*args, **kwargs)

    def mark_as_paid(self):

        self.status = "paid"

        self.paid_at = timezone.now()

        self.save(
            update_fields=[
                "status",
                "paid_at",
                "updated_at",
            ]
        )

    def __str__(self):

        return (
            f"{self.order_number} - "
            f"{self.customer_email}"
        )


class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items",
    )

    # IMPORTANT:
    # SET_NULL allows a Book to be deleted
    # while preserving the customer's order.
    book = models.ForeignKey(
        "books.Book",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="order_items",
    )

    title = models.CharField(
        max_length=255,
    )

    price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
    )

    quantity = models.PositiveIntegerField(
        default=1,
    )

    subtotal = models.DecimalField(
        max_digits=12,
        decimal_places=2,
    )

    def save(self, *args, **kwargs):

        self.subtotal = (
            self.price * self.quantity
        )

        super().save(*args, **kwargs)

    def __str__(self):

        return (
            f"{self.title} "
            f"x {self.quantity}"
        )