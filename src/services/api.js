const API_BASE_URL = "http://127.0.0.1:8000/api";


export async function getBooks() {
  const response = await fetch(
    `${API_BASE_URL}/books/`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return response.json();
}


export async function getBook(bookId) {
  const response = await fetch(
    `${API_BASE_URL}/books/${bookId}/`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch book");
  }

  return response.json();
}