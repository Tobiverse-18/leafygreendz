from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework.decorators import (
    api_view,
    permission_classes,
)
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework import status


# ============================================================
# CSRF
# ============================================================

@ensure_csrf_cookie
@api_view(["GET"])
@permission_classes([AllowAny])
def admin_csrf(request):

    csrf_token = get_token(request)

    return Response(
        {
            "csrfToken": csrf_token,
        },
        status=status.HTTP_200_OK,
    )


# ============================================================
# LOGIN
# ============================================================

@api_view(["POST"])
@permission_classes([AllowAny])
def admin_login(request):

    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:

        return Response(
            {
                "detail": "Username and password are required."
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = authenticate(
        request,
        username=username,
        password=password,
    )

    if user is None:

        return Response(
            {
                "detail": "Invalid username or password."
            },
            status=status.HTTP_401_UNAUTHORIZED,
        )

    if not user.is_staff:

        return Response(
            {
                "detail": "You do not have administrator access."
            },
            status=status.HTTP_403_FORBIDDEN,
        )

    login(request, user)

    return Response(
        {
            "message": "Login successful.",
            "username": user.username,
        },
        status=status.HTTP_200_OK,
    )


# ============================================================
# LOGOUT
# ============================================================

@api_view(["POST"])
@permission_classes([IsAdminUser])
def admin_logout(request):

    logout(request)

    return Response(
        {
            "message": "Logout successful."
        },
        status=status.HTTP_200_OK,
    )