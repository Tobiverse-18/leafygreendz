from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import ContactMessageSerializer
from .models import ContactMessage


# ============================================================
# PUBLIC CONTACT FORM
# ============================================================

class ContactMessageView(APIView):

    def post(self, request):

        serializer = ContactMessageSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        message = serializer.save()

        return Response(
            {
                "message":
                    "Your message has been sent successfully.",

                "contact_id":
                    message.id,
            },
            status=status.HTTP_201_CREATED,
        )


# ============================================================
# ADMIN — GET ALL CONTACT MESSAGES
# ============================================================

class AdminContactMessagesView(APIView):

    def get(self, request):

        messages = ContactMessage.objects.all().order_by(
            "-created_at"
        )

        serializer = ContactMessageSerializer(
            messages,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )


# ============================================================
# ADMIN — SINGLE CONTACT MESSAGE
# ============================================================

class AdminContactMessageDetailView(APIView):

    def get(self, request, message_id):

        try:

            message = ContactMessage.objects.get(
                id=message_id
            )

        except ContactMessage.DoesNotExist:

            return Response(
                {
                    "detail":
                        "Message not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = ContactMessageSerializer(
            message
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )


    # ========================================================
    # UPDATE MESSAGE
    # ========================================================

    def patch(self, request, message_id):

        try:

            message = ContactMessage.objects.get(
                id=message_id
            )

        except ContactMessage.DoesNotExist:

            return Response(
                {
                    "detail":
                        "Message not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        allowed_fields = [
            "status",
            "reply",
        ]

        for field in request.data:

            if field not in allowed_fields:

                return Response(
                    {
                        "detail":
                            f"Field '{field}' cannot be updated."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

        serializer = ContactMessageSerializer(
            message,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )


    # ========================================================
    # DELETE MESSAGE
    # ========================================================

    def delete(self, request, message_id):

        try:

            message = ContactMessage.objects.get(
                id=message_id
            )

        except ContactMessage.DoesNotExist:

            return Response(
                {
                    "detail":
                        "Message not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        message.delete()

        return Response(
            {
                "message":
                    "Message deleted successfully."
            },
            status=status.HTTP_204_NO_CONTENT,
        )