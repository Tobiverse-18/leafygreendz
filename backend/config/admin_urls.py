from django.urls import include, path

from .admin_api import (
    AdminDashboardView,
)


urlpatterns = [

    # ============================================================
    # ADMIN DASHBOARD
    # ============================================================

    path(
        "dashboard/",
        AdminDashboardView.as_view(),
        name="admin-dashboard",
    ),

    # ============================================================
    # ORDERS ADMIN
    # ============================================================

    path(
        "",
        include("orders.admin_urls"),
    ),

]