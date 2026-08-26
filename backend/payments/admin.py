from django.contrib import admin

from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):

    list_display = (
        "reference",
        "order",
        "amount",
        "currency",
        "status",
        "created_at",
        "paid_at",
    )

    list_filter = (
        "status",
        "currency",
    )

    search_fields = (
        "reference",
        "order__order_number",
        "order__customer_email",
    )

    readonly_fields = (
        "created_at",
        "paid_at",
    )

    ordering = (
        "-created_at",
    )