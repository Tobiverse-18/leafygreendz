
from django.urls import path

from .views import (
    InitializePaymentView,
    VerifyPaymentView,
)


urlpatterns = [

    # ========================================================
    # INITIALIZE PAYMENT
    # ========================================================

    path(
        "initialize/",
        InitializePaymentView.as_view(),
        name="initialize-payment",
    ),


    # ========================================================
    # VERIFY PAYMENT
    # ========================================================

    path(
        "verify/",
        VerifyPaymentView.as_view(),
        name="verify-payment",
    ),

]
