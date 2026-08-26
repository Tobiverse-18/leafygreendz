from decimal import Decimal

from django.db import transaction
from django.http import FileResponse, Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from books.models import Book

from .models import Order, OrderItem


# ============================================================
# CREATE ORDER
# ============================================================

class CreateOrderView(APIView):

    @transaction.atomic
    def post(self, request):

        customer_name = request.data.get(
            "customer_name"
        )

        customer_email = request.data.get(
            "customer_email"
        )

        customer_phone = request.data.get(
            "customer_phone"
        )

        items = request.data.get(
            "items"
        )

        # ========================================
        # VALIDATION
        # ========================================

        if not customer_name:

            return Response(
                {
                    "detail":
                        "Customer name is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not customer_email:

            return Response(
                {
                    "detail":
                        "Customer email is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not customer_phone:

            return Response(
                {
                    "detail":
                        "Customer phone is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not items or not isinstance(
            items,
            list
        ):

            return Response(
                {
                    "detail":
                        "At least one book is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ========================================
        # CREATE ORDER
        # ========================================

        order = Order.objects.create(

            customer_name=customer_name,

            customer_email=customer_email,

            customer_phone=customer_phone,

            subtotal=Decimal("0.00"),

            total=Decimal("0.00"),

            currency="NGN",

            status="pending",
        )

        subtotal = Decimal("0.00")

        # ========================================
        # CREATE ORDER ITEMS
        # ========================================

        for item in items:

            book_id = item.get(
                "book"
            )

            quantity = item.get(
                "quantity",
                1
            )

            if not book_id:

                transaction.set_rollback(
                    True
                )

                return Response(
                    {
                        "detail":
                            "A book ID is missing."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            try:

                book = Book.objects.get(
                    id=book_id,
                    is_published=True,
                )

            except Book.DoesNotExist:

                transaction.set_rollback(
                    True
                )

                return Response(
                    {
                        "detail":
                            f"Book with ID {book_id} was not found."
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )

            try:

                quantity = int(
                    quantity
                )

            except (
                TypeError,
                ValueError,
            ):

                transaction.set_rollback(
                    True
                )

                return Response(
                    {
                        "detail":
                            "Invalid quantity."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if quantity < 1:

                transaction.set_rollback(
                    True
                )

                return Response(
                    {
                        "detail":
                            "Quantity must be at least 1."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            item_subtotal = (
                book.price *
                quantity
            )

            subtotal += item_subtotal

            OrderItem.objects.create(

                order=order,

                book=book,

                title=book.title,

                price=book.price,

                quantity=quantity,

                subtotal=item_subtotal,
            )

        # ========================================
        # SAVE TOTALS
        # ========================================

        order.subtotal = subtotal

        order.total = subtotal

        order.save(
            update_fields=[
                "subtotal",
                "total",
                "updated_at",
            ]
        )

        # ========================================
        # RESPONSE
        # ========================================

        return Response(
            {
                "message":
                    "Order created successfully.",

                "order_number":
                    order.order_number,

                "subtotal":
                    str(order.subtotal),

                "total":
                    str(order.total),

                "currency":
                    order.currency,

                "status":
                    order.status,

                "download_token":
                    order.download_token,
            },
            status=status.HTTP_201_CREATED,
        )


# ============================================================
# ADMIN GET ORDERS
# ============================================================

class AdminOrdersView(APIView):

    def get(self, request):

        # ========================================
        # GET ORDERS
        # ========================================

        orders = (
            Order.objects
            .prefetch_related("items")
            .order_by("-created_at")
        )

        orders_data = []

        for order in orders:

            items_data = []

            for item in order.items.all():

                items_data.append(
                    {
                        "id": item.id,

                        "book": (
                            item.book.id
                            if item.book
                            else None
                        ),

                        "title": item.title,

                        "price": str(
                            item.price
                        ),

                        "quantity": item.quantity,

                        "subtotal": str(
                            item.subtotal
                        ),
                    }
                )

            orders_data.append(
                {
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

                    "download_token":
                        order.download_token,

                    "created_at":
                        order.created_at.isoformat(),

                    "updated_at":
                        order.updated_at.isoformat(),

                    "items":
                        items_data,
                }
            )

        # ========================================
        # RESPONSE
        # ========================================

        return Response(
            orders_data,
            status=status.HTTP_200_OK,
        )


# ============================================================
# DOWNLOAD EBOOK
# ============================================================

class DownloadEbookView(APIView):

    def get(
        self,
        request,
        download_token
    ):

        try:

            order = Order.objects.get(
                download_token=download_token
            )

        except Order.DoesNotExist:

            raise Http404(
                "Invalid download link."
            )

        # ========================================
        # PAYMENT CHECK
        # ========================================

        if order.status != "paid":

            return Response(
                {
                    "detail":
                        "This order has not been paid."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # ========================================
        # GET BOOK
        # ========================================

        item = (
            order.items
            .select_related("book")
            .first()
        )

        if not item:

            raise Http404(
                "No book was found for this order."
            )

        book = item.book

        # ========================================
        # CHECK FILE
        # ========================================

        if not book.ebook_file:

            raise Http404(
                "The ebook file is not available."
            )

        # ========================================
        # SEND FILE
        # ========================================

        response = FileResponse(

            book.ebook_file.open(
                "rb"
            ),

            as_attachment=True,

            filename=(
                f"{book.title}.pdf"
            ),
        )

        return response