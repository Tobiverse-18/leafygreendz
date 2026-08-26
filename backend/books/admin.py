from django.contrib import admin
from .models import Book


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "author",
        "category",
        "price",
        "is_published",
        "created_at",
    )

    list_filter = (
        "is_published",
        "category",
    )

    search_fields = (
        "title",
        "subtitle",
        "author",
        "category",
    )

    ordering = (
        "-created_at",
    )