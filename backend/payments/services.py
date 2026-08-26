import requests
import resend

from django.conf import settings


PAYSTACK_BASE_URL = "https://api.paystack.co"


# ============================================================
# PAYSTACK — INITIALIZE
# ============================================================

def initialize_paystack_transaction(
    email,
    amount,
    reference,
):
    """
    Initialize a Paystack transaction.
    """

    url = (
        f"{PAYSTACK_BASE_URL}"
        "/transaction/initialize"
    )

    headers = {
        "Authorization":
            f"Bearer {settings.PAYSTACK_SECRET_KEY}",

        "Content-Type":
            "application/json",
    }

    payload = {
        "email": email,

        "amount": int(
            amount * 100
        ),

        "reference": reference,

        "callback_url":
            settings.PAYSTACK_CALLBACK_URL,
    }

    response = requests.post(
        url,
        json=payload,
        headers=headers,
        timeout=30,
    )

    response.raise_for_status()

    data = response.json()

    if not data.get("status"):

        raise ValueError(
            data.get(
                "message",
                "Unable to initialize Paystack transaction.",
            )
        )

    return data["data"]


# ============================================================
# PAYSTACK — VERIFY
# ============================================================

def verify_paystack_transaction(
    reference,
):
    """
    Verify a Paystack transaction.
    """

    url = (
        f"{PAYSTACK_BASE_URL}"
        f"/transaction/verify/{reference}"
    )

    headers = {
        "Authorization":
            f"Bearer {settings.PAYSTACK_SECRET_KEY}",

        "Content-Type":
            "application/json",
    }

    response = requests.get(
        url,
        headers=headers,
        timeout=30,
    )

    response.raise_for_status()

    data = response.json()

    if not data.get("status"):

        raise ValueError(
            data.get(
                "message",
                "Unable to verify Paystack transaction.",
            )
        )

    return data["data"]


# ============================================================
# RESEND — TEST EMAIL
# ============================================================

def send_resend_test_email(
    to_email,
):
    """
    Send a test email using Resend.
    """

    resend.api_key = (
        settings.RESEND_API_KEY
    )

    response = resend.Emails.send(
        {
            "from":
                settings.RESEND_FROM_EMAIL,

            "to":
                [to_email],

            "subject":
                "LEAFYGREENDZ Resend Test",

            "html": """
                <h1>LEAFYGREENDZ</h1>

                <p>
                    This is a test email sent from
                    Django using Resend.
                </p>

                <p>
                    If you received this email,
                    Resend is working correctly.
                </p>
            """,
        }
    )

    return response


# ============================================================
# RESEND — EBOOK DELIVERY
# ============================================================

def send_ebook_delivery_email(
    order,
    download_url,
):
    """
    Send the purchased ebook download email.
    """

    resend.api_key = (
        settings.RESEND_API_KEY
    )

    items_html = ""

    for item in order.items.all():

        items_html += f"""
            <li>
                {item.title} × {item.quantity}
            </li>
        """

    response = resend.Emails.send(
        {
            "from":
                settings.RESEND_FROM_EMAIL,

            "to":
                [order.customer_email],

            "subject":
                "Your LEAFYGREENDZ Ebook Is Ready",

            "html": f"""
                <!DOCTYPE html>

                <html>

                <body
                    style="
                        margin: 0;
                        padding: 0;
                        background: #f5f5f5;
                        font-family: Arial, sans-serif;
                        color: #111111;
                    "
                >

                    <div
                        style="
                            max-width: 600px;
                            margin: 40px auto;
                            background: #ffffff;
                            padding: 40px;
                        "
                    >

                        <h1>
                            LEAFYGREENDZ
                        </h1>

                        <p
                            style="
                                color: #666666;
                            "
                        >
                            Digital Book Delivery
                        </p>

                        <hr>

                        <h2>
                            Thank you for your purchase.
                        </h2>

                        <p>
                            Hi {order.customer_name},
                        </p>

                        <p>
                            Your payment has been
                            successfully verified and
                            your digital book is ready
                            to download.
                        </p>

                        <h3>
                            Your order
                        </h3>

                        <ul>
                            {items_html}
                        </ul>

                        <p>
                            <strong>
                                Order:
                            </strong>

                            {order.order_number}
                        </p>

                        <div
                            style="
                                margin: 35px 0;
                            "
                        >

                            <a
                                href="{download_url}"
                                style="
                                    display: inline-block;
                                    background: #111111;
                                    color: #ffffff;
                                    padding: 15px 24px;
                                    text-decoration: none;
                                    font-weight: bold;
                                "
                            >
                                Download Your Ebook
                            </a>

                        </div>

                        <p
                            style="
                                font-size: 13px;
                                color: #777777;
                            "
                        >
                            This download link is unique
                            to your order. Please keep
                            this email for your records.
                        </p>

                        <hr>

                        <p
                            style="
                                font-size: 12px;
                                color: #999999;
                            "
                        >
                            © LEAFYGREENDZ
                        </p>

                    </div>

                </body>

                </html>
            """,
        }
    )

    return response