from django.db.models import Sum

from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from books.models import Book
from orders.models import Order
from contact.models import ContactMessage


class AdminDashboardView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request):

        # ============================================================
        # ORDERS
        # ============================================================

        paid_orders = Order.objects.filter(
            status="paid"
        )

        pending_orders = Order.objects.filter(
            status="pending"
        )

        failed_orders = Order.objects.filter(
            status="failed"
        )

        # ============================================================
        # REVENUE
        # ============================================================

        revenue = (
            paid_orders.aggregate(
                total=Sum("total")
            )["total"]
            or 0
        )

        # ============================================================
        # BOOKS
        # ============================================================

        total_books = Book.objects.count()

        published_books = Book.objects.filter(
            is_published=True
        ).count()

        # ============================================================
        # MESSAGES
        # ============================================================

        total_messages = ContactMessage.objects.count()

        new_messages = ContactMessage.objects.filter(
            status="new"
        ).count()

        # ============================================================
        # RECENT ORDERS
        # ============================================================

        recent_orders = (
            Order.objects
            .order_by("-created_at")[:8]
        )

        # ============================================================
        # RECENT MESSAGES
        # ============================================================

        recent_messages = (
            ContactMessage.objects
            .order_by("-created_at")[:8]
        )

        # ============================================================
        # RESPONSE
        # ============================================================

        return Response({

            "stats": {

                "revenue": str(revenue),

                "paid_orders": paid_orders.count(),

                "pending_orders": pending_orders.count(),

                "failed_orders": failed_orders.count(),

                "total_books": total_books,

                "published_books": published_books,

                "total_messages": total_messages,

                "new_messages": new_messages,

            },

            "recent_orders": [

                {
                    "id": order.id,

                    "order_number": order.order_number,

                    "customer_name": order.customer_name,

                    "customer_email": order.customer_email,

                    "total": str(order.total),

                    "currency": order.currency,

                    "status": order.status,

                    "created_at": order.created_at,

                }

                for order in recent_orders

            ],

            "recent_messages": [

                {
                    "id": message.id,

                    "name": message.name,

                    "email": message.email,

                    "subject": message.subject,

                    "status": message.status,

                    "created_at": message.created_at,

                }

                for message in recent_messages

            ],

        })