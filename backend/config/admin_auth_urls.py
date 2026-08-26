from django.urls import path

from .admin_auth import (
    admin_csrf,
    admin_login,
    admin_logout,
)


urlpatterns = [

    # ========================================================
    # CSRF
    # ========================================================

    path(
        "csrf/",
        admin_csrf,
        name="admin-csrf",
    ),


    # ========================================================
    # LOGIN
    # ========================================================

    path(
        "login/",
        admin_login,
        name="admin-login",
    ),


    # ========================================================
    # LOGOUT
    # ========================================================

    path(
        "logout/",
        admin_logout,
        name="admin-logout",
    ),

]