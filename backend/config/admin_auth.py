from django.contrib.auth import authenticate
from django.contrib.auth import logout
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response


# ============================================================
# CSRF TOKEN
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
# ADMIN LOGIN
# ============================================================

@api_view(["POST"])
@permission_classes([AllowAny])
def admin_login(request):

    username = request.data.get("username")
    password = request.data.get("password")

    # --------------------------------------------------------
    # VALIDATE INPUT
    # --------------------------------------------------------

    if not username or not password:

        return Response(
            {
                "detail": "Username and password are required."
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    # --------------------------------------------------------
    # AUTHENTICATE USER
    # --------------------------------------------------------

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

    # --------------------------------------------------------
    # CHECK ADMIN ACCESS
    # --------------------------------------------------------

    if not user.is_staff:

        return Response(
            {
                "detail": "You do not have administrator access."
            },
            status=status.HTTP_403_FORBIDDEN,
        )

    # --------------------------------------------------------
    # GET OR CREATE TOKEN
    # --------------------------------------------------------

    token, created = Token.objects.get_or_create(
        user=user
    )

    # --------------------------------------------------------
    # RESPONSE
    # --------------------------------------------------------

    return Response(
        {
            "message": "Login successful.",
            "username": user.username,
            "token": token.key,
        },
        status=status.HTTP_200_OK,
    )


# ============================================================
# ADMIN LOGOUT
# ============================================================

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def admin_logout(request):

    # --------------------------------------------------------
    # DELETE TOKEN
    # --------------------------------------------------------

    try:

        request.user.auth_token.delete()

    except Token.DoesNotExist:

        pass

    # --------------------------------------------------------
    # ALSO CLEAR DJANGO SESSION IF ONE EXISTS
    # --------------------------------------------------------

    logout(request)

    return Response(
        {
            "message": "Logout successful."
        },
        status=status.HTTP_200_OK,
    )