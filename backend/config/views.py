from django.contrib.admin.views.decorators import staff_member_required
from django.db.models import Sum
from django.shortcuts import render

from books.models import Book
from orders.models import Order
from contact.models import ContactMessage


@staff_member_required
def admin_dashboard(request):

    # ========================================
    # ORDERS
    # ========================================

    paid_orders = Order.objects.filter(
        status="paid"
    )

    pending_orders = Order.objects.filter(
        status="pending"
    )

    failed_orders = Order.objects.filter(
        status="failed"
    )


    # ========================================
    # REVENUE
    # ========================================

    revenue = (
        paid_orders.aggregate(
            total=Sum("total")
        )["total"]
        or 0
    )


    # ========================================
    # BOOKS
    # ========================================

    total_books = Book.objects.count()


    # ========================================
    # CONTACT MESSAGES
    # ========================================

    total_messages = ContactMessage.objects.count()

    new_messages = ContactMessage.objects.filter(
        status="new"
    ).count()


    # ========================================
    # RECENT ORDERS
    # ========================================

    recent_orders = (
        Order.objects
        .order_by("-created_at")[:8]
    )


    # ========================================
    # RECENT MESSAGES
    # ========================================

    recent_messages = (
        ContactMessage.objects
        .order_by("-created_at")[:8]
    )


    # ========================================
    # DASHBOARD
    # ========================================

    context = {

        "revenue":
            revenue,

        "paid_orders":
            paid_orders.count(),

        "pending_orders":
            pending_orders.count(),

        "failed_orders":
            failed_orders.count(),

        "total_books":
            total_books,

        "total_messages":
            total_messages,

        "new_messages":
            new_messages,

        "recent_orders":
            recent_orders,

        "recent_messages":
            recent_messages,

    }


    return render(
        request,
        "admin/dashboard.html",
        context,
    )