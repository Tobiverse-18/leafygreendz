from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path


urlpatterns = [

    # ========================================
    # DJANGO ADMIN
    # ========================================

    path(
        "admin/",
        admin.site.urls,
    ),


    # ========================================
    # CUSTOM ADMIN API
    # ========================================

    path(
        "api/admin/",
        include("config.admin_urls"),
    ),


    # ========================================
    # ADMIN AUTHENTICATION
    # ========================================

    path(
        "api/admin/auth/",
        include("config.admin_auth_urls"),
    ),


    # ========================================
    # BOOKS API
    # ========================================

    path(
        "api/books/",
        include("books.urls"),
    ),


    # ========================================
    # ORDERS API
    # ========================================

    path(
        "api/orders/",
        include("orders.urls"),
    ),


    # ========================================
    # PAYMENTS API
    # ========================================

    path(
        "api/payments/",
        include("payments.urls"),
    ),


    # ========================================
    # CONTACT API
    # ========================================

    path(
        "api/contact/",
        include("contact.urls"),
    ),

]


# ============================================================
# DEVELOPMENT MEDIA FILES
# ============================================================

if settings.DEBUG:

    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )