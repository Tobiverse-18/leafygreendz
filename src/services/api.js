const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;


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