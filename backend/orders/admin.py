from django.contrib import admin

from .models import Order, OrderItem


# ============================================================
# ORDER ITEM INLINE
# ============================================================

class OrderItemInline(admin.TabularInline):

    model = OrderItem

    extra = 0

    fields = (
        "book",
        "title",
        "price",
        "quantity",
        "subtotal",
    )

    readonly_fields = (
        "title",
        "price",
        "subtotal",
    )


# ============================================================
# ORDER ADMIN
# ============================================================

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    # ========================================================
    # LIST DISPLAY
    # ========================================================

    list_display = (
        "order_number",
        "customer_name",
        "customer_email",
        "total",
        "currency",
        "payment_status",
        "payment_reference",
        "paid_at",
        "created_at",
    )

    # ========================================================
    # FILTERS
    # ========================================================

    list_filter = (
        "status",
        "currency",
        "created_at",
        "paid_at",
    )

    # ========================================================
    # SEARCH
    # ========================================================

    search_fields = (
        "order_number",
        "customer_name",
        "customer_email",
        "customer_phone",
        "payment_reference",
    )

    # ========================================================
    # ORDERING
    # ========================================================

    ordering = (
        "-created_at",
    )

    # ========================================================
    # READ ONLY
    # ========================================================

    readonly_fields = (
        "order_number",
        "payment_reference",
        "download_token",
        "created_at",
        "updated_at",
        "paid_at",
    )

    # ========================================================
    # INLINE ITEMS
    # ========================================================

    inlines = (
        OrderItemInline,
    )

    # ========================================================
    # FIELD GROUPS
    # ========================================================

    fieldsets = (

        (
            "Order Information",
            {
                "fields": (
                    "order_number",
                    "status",
                    "created_at",
                    "updated_at",
                )
            },
        ),

        (
            "Customer",
            {
                "fields": (
                    "customer_name",
                    "customer_email",
                    "customer_phone",
                )
            },
        ),

        (
            "Payment",
            {
                "fields": (
                    "subtotal",
                    "total",
                    "currency",
                    "payment_reference",
                    "paid_at",
                )
            },
        ),

        (
            "Digital Delivery",
            {
                "fields": (
                    "download_token",
                )
            },
        ),

    )

    # ========================================================
    # PAYMENT STATUS
    # ========================================================

    @admin.display(
        description="Payment Status",
        ordering="status",
    )
    def payment_status(self, obj):

        return obj.get_status_display()
