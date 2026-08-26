from django.urls import path

from .views import (
    CreateOrderView,
    AdminOrdersView,
    DownloadEbookView,
)


urlpatterns = [

    # ============================================================
    # CREATE ORDER
    # POST /api/orders/
    # ============================================================

    path(
        "",
        CreateOrderView.as_view(),
        name="create-order",
    ),


    # ============================================================
    # ADMIN ORDERS
    # GET /api/orders/admin/
    # ============================================================

    path(
        "admin/",
        AdminOrdersView.as_view(),
        name="admin-orders",
    ),


    # ============================================================
    # DOWNLOAD EBOOK
    # GET /api/orders/download/<token>/
    # ============================================================

    path(
        "download/<str:download_token>/",
        DownloadEbookView.as_view(),
        name="download-ebook",
    ),

]