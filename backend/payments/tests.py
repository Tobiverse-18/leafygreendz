import resend

from django.conf import settings

def send_resend_test_email(to_email):
    """
    Send a test email using Resend.
    """

    resend.api_key = settings.RESEND_API_KEY

    response = resend.Emails.send(
        {
            "from": settings.RESEND_FROM_EMAIL,
            "to": [to_email],
            "subject": "LEAFYGREENDZ Resend Test",
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