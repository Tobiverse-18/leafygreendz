from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Order


# ============================================================
# ADMIN — LIST ORDERS
# ============================================================

class AdminOrderListView(APIView):

    def get(self, request):

        orders = (
            Order.objects
            .prefetch_related("items")
            .order_by("-created_at")
        )

        data = []

        for order in orders:

            items = []

            for item in order.items.all():

                items.append({
                    "id": item.id,
                    "book_id": item.book_id,
                    "title": item.title,
                    "price": str(item.price),
                    "quantity": item.quantity,
                    "subtotal": str(item.subtotal),
                })

            data.append({

                "id": order.id,

                "order_number":
                    order.order_number,

                "customer_name":
                    order.customer_name,

                "customer_email":
                    order.customer_email,

                "customer_phone":
                    order.customer_phone,

                "subtotal":
                    str(order.subtotal),

                "total":
                    str(order.total),

                "currency":
                    order.currency,

                "status":
                    order.status,

                "status_display":
                    order.get_status_display(),

                "payment_reference":
                    order.payment_reference,

                "download_token":
                    order.download_token,

                "created_at":
                    order.created_at,

                "updated_at":
                    order.updated_at,

                "paid_at":
                    order.paid_at,

                "items":
                    items,

            })

        return Response(
            data,
            status=status.HTTP_200_OK,
        )


# ============================================================
# ADMIN — ORDER DETAIL
# ============================================================

class AdminOrderDetailView(APIView):

    def get(self, request, pk):

        try:

            order = (
                Order.objects
                .prefetch_related("items")
                .get(pk=pk)
            )

        except Order.DoesNotExist:

            return Response(
                {
                    "detail":
                        "Order not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        items = []

        for item in order.items.all():

            items.append({

                "id":
                    item.id,

                "book_id":
                    item.book_id,

                "title":
                    item.title,

                "price":
                    str(item.price),

                "quantity":
                    item.quantity,

                "subtotal":
                    str(item.subtotal),

            })

        return Response({

            "id":
                order.id,

            "order_number":
                order.order_number,

            "customer_name":
                order.customer_name,

            "customer_email":
                order.customer_email,

            "customer_phone":
                order.customer_phone,

            "subtotal":
                str(order.subtotal),

            "total":
                str(order.total),

            "currency":
                order.currency,

            "status":
                order.status,

            "status_display":
                order.get_status_display(),

            "payment_reference":
                order.payment_reference,

            "download_token":
                order.download_token,

            "created_at":
                order.created_at,

            "updated_at":
                order.updated_at,

            "paid_at":
                order.paid_at,

            "items":
                items,

        })