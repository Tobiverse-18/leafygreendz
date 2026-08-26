from django.db import models


class ContactMessage(models.Model):

    STATUS_CHOICES = [
        ("new", "New"),
        ("read", "Read"),
        ("replied", "Replied"),
    ]

    # ============================================================
    # CUSTOMER
    # ============================================================

    name = models.CharField(
        max_length=150,
    )

    email = models.EmailField()


    # ============================================================
    # MESSAGE
    # ============================================================

    subject = models.CharField(
        max_length=255,
    )

    message = models.TextField()


    # ============================================================
    # REPLY
    # ============================================================

    reply = models.TextField(
        blank=True,
    )

    replied_at = models.DateTimeField(
        blank=True,
        null=True,
    )


    # ============================================================
    # STATUS
    # ============================================================

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="new",
    )


    # ============================================================
    # TIMESTAMPS
    # ============================================================

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )


    # ============================================================
    # STRING
    # ============================================================

    def __str__(self):

        return (
            f"{self.name} - "
            f"{self.subject}"
        )