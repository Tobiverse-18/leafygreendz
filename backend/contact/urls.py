from django.urls import path

from .views import (
    ContactMessageView,
    AdminContactMessagesView,
    AdminContactMessageDetailView,
)


urlpatterns = [

    # ========================================================
    # PUBLIC CONTACT FORM
    # ========================================================

    path(
        "",
        ContactMessageView.as_view(),
        name="contact-message",
    ),


    # ========================================================
    # ADMIN — ALL MESSAGES
    # ========================================================

    path(
        "admin/",
        AdminContactMessagesView.as_view(),
        name="admin-contact-messages",
    ),


    # ========================================================
    # ADMIN — SINGLE MESSAGE
    # ========================================================

    path(
        "admin/<int:message_id>/",
        AdminContactMessageDetailView.as_view(),
        name="admin-contact-message-detail",
    ),

]