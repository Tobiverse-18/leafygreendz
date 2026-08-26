from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Book
from .serializers import BookSerializer


class BookListView(generics.ListCreateAPIView):

    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny]


class BookDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny]