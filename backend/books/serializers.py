from rest_framework import serializers
from .models import Book


class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book

        fields = [
            "id",
            "title",
            "subtitle",
            "author",
            "category",
            "description",
            "price",
            "cover_image",
            "ebook_file",
            "is_published",
            "created_at",
            "updated_at",
        ]