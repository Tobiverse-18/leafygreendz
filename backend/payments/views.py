import requests

from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from orders.models import Order


# ============================================================
# INITIALIZE PAYMENT
# ============================================================

class InitializePaymentView(APIView):

    def post(self, request):

        order_number = request.data.get("order_number")

        if not order_number:
            return Response(
                {
                    "detail": "Order number is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ====================================================
        # FIND ORDER
        # ====================================================

        try:
            order = Order.objects.get(
                order_number=order_number
            )

        except Order.DoesNotExist:
            return Response(
                {
                    "detail": "Order not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        # ====================================================
        # CHECK ORDER STATUS
        # ====================================================

        if order.status == "paid":
            return Response(
                {
                    "detail": "This order has already been paid."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ====================================================
        # CHECK PAYSTACK KEY
        # ====================================================

        if not settings.PAYSTACK_SECRET_KEY:
            return Response(
                {
                    "detail": "Paystack secret key is not configured."
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        # ====================================================
        # PAYSTACK HEADERS
        # ====================================================

        headers = {
            "Authorization": (
                f"Bearer {settings.PAYSTACK_SECRET_KEY}"
            ),
            "Content-Type": "application/json",
        }

        # ====================================================
        # PAYSTACK PAYLOAD
        # ====================================================

        payload = {

            "email": order.customer_email,

            # Paystack expects amount in kobo
            "amount": int(order.total * 100),

            "currency": order.currency,

            "reference": order.order_number,

            "callback_url": settings.PAYSTACK_CALLBACK_URL,

            "metadata": {

                "order_number": order.order_number,

                "customer_name": order.customer_name,

                "customer_email": order.customer_email,

                "customer_phone": order.customer_phone,
            },
        }

        # ====================================================
        # INITIALIZE WITH PAYSTACK
        # ====================================================

        try:

            response = requests.post(
                settings.PAYSTACK_INITIALIZE_URL,
                json=payload,
                headers=headers,
                timeout=30,
            )

            data = response.json()

        except requests.RequestException as error:

            return Response(
                {
                    "detail": "Unable to connect to Paystack.",
                    "error": str(error),
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        except ValueError:

            return Response(
                {
                    "detail": "Invalid response received from Paystack."
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        # ====================================================
        # PAYSTACK ERROR
        # ====================================================

        if not response.ok or not data.get("status"):

            return Response(
                {
                    "detail": data.get(
                        "message",
                        "Payment initialization failed."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ====================================================
        # GET PAYSTACK DATA
        # ====================================================

        payment_data = data.get("data", {})

        authorization_url = payment_data.get(
            "authorization_url"
        )

        access_code = payment_data.get(
            "access_code"
        )

        reference = payment_data.get(
            "reference"
        )

        if not authorization_url or not reference:

            return Response(
                {
                    "detail":
                        "Paystack did not return the required payment information."
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        # ====================================================
        # SAVE PAYMENT REFERENCE
        # ====================================================

        order.payment_reference = reference

        order.save(
            update_fields=[
                "payment_reference",
                "updated_at",
            ]
        )

        # ====================================================
        # RETURN TO REACT
        # ====================================================

        return Response(
            {
                "message":
                    "Payment initialized successfully.",

                "authorization_url":
                    authorization_url,

                "access_code":
                    access_code,

                "reference":
                    reference,

                "order_number":
                    order.order_number,

                "amount":
                    str(order.total),

                "currency":
                    order.currency,
            },
            status=status.HTTP_200_OK,
        )


# ============================================================
# VERIFY PAYMENT
# ============================================================

class VerifyPaymentView(APIView):

    def get(self, request):

        reference = request.query_params.get(
            "reference"
        )

        if not reference:

            return Response(
                {
                    "detail":
                        "Payment reference is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ====================================================
        # FIND ORDER
        # ====================================================

        try:

            order = Order.objects.get(
                payment_reference=reference
            )

        except Order.DoesNotExist:

            return Response(
                {
                    "detail":
                        "Order associated with this payment was not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        # ====================================================
        # ALREADY PAID
        # ====================================================

        if order.status == "paid":

            return Response(
                {
                    "message":
                        "Payment has already been verified.",

                    "status":
                        "paid",

                    "order_number":
                        order.order_number,

                    "download_token":
                        order.download_token,
                },
                status=status.HTTP_200_OK,
            )

        # ====================================================
        # PAYSTACK HEADERS
        # ====================================================

        headers = {
            "Authorization":
                f"Bearer {settings.PAYSTACK_SECRET_KEY}",
        }

        # ====================================================
        # VERIFY PAYMENT WITH PAYSTACK
        # ====================================================

        verify_url = (
            f"{settings.PAYSTACK_VERIFY_URL}{reference}"
        )

        try:

            response = requests.get(
                verify_url,
                headers=headers,
                timeout=30,
            )

            data = response.json()

        except requests.RequestException as error:

            return Response(
                {
                    "detail":
                        "Unable to connect to Paystack.",

                    "error":
                        str(error),
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        except ValueError:

            return Response(
                {
                    "detail":
                        "Invalid response received from Paystack."
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        # ====================================================
        # PAYSTACK RESPONSE ERROR
        # ====================================================

        if not response.ok or not data.get("status"):

            return Response(
                {
                    "detail":
                        data.get(
                            "message",
                            "Unable to verify payment."
                        ),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ====================================================
        # TRANSACTION DATA
        # ====================================================

        transaction = data.get(
            "data",
            {}
        )

        transaction_status = transaction.get(
            "status"
        )

        transaction_amount = transaction.get(
            "amount"
        )

        transaction_currency = transaction.get(
            "currency"
        )

        transaction_reference = transaction.get(
            "reference"
        )

        # ====================================================
        # VERIFY REFERENCE
        # ====================================================

        if transaction_reference != order.payment_reference:

            return Response(
                {
                    "detail":
                        "Payment reference mismatch."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ====================================================
        # VERIFY CURRENCY
        # ====================================================

        if transaction_currency != order.currency:

            return Response(
                {
                    "detail":
                        "Payment currency does not match the order."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ====================================================
        # VERIFY AMOUNT
        # ====================================================

        expected_amount = int(
            order.total * 100
        )

        if transaction_amount != expected_amount:

            return Response(
                {
                    "detail":
                        "Payment amount does not match the order."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ====================================================
        # PAYMENT SUCCESS
        # ====================================================

        if transaction_status == "success":

            order.mark_as_paid()

            return Response(
                {
                    "message":
                        "Payment verified successfully.",

                    "status":
                        "paid",

                    "order_number":
                        order.order_number,

                    "payment_reference":
                        order.payment_reference,

                    "download_token":
                        order.download_token,
                },
                status=status.HTTP_200_OK,
            )

        # ====================================================
        # PAYMENT NOT SUCCESSFUL
        # ====================================================

        return Response(
            {
                "message":
                    "Payment has not been completed.",

                "status":
                    transaction_status or "unknown",

                "order_number":
                    order.order_number,
            },
            status=status.HTTP_200_OK,
        )