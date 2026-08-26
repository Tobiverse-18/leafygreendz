import { useEffect, useState } from "react";

import BooksHero from "./sections/BooksHero/BooksHero";
import FeaturedBook from "./sections/FeaturedBook/FeaturedBook";
import BookGrid from "./sections/BookGrid/BookGrid";

import "./Books.css";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/books/`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books.");
        }

        const data = await response.json();

        const formattedBooks = data.map((book) => ({
          id: String(book.id),
          title: book.title,
          subtitle: book.subtitle,
          author: book.author,
          category: book.category,
          description: book.description,
          price: Number(book.price),

          coverImage: book.cover_image,

          published: book.is_published,

          featured: false,

          ebookFile: book.ebook_file,
        }));

        setBooks(formattedBooks);

      } catch (error) {
        console.error("Failed to load books:", error);
        setError("Unable to load books.");

      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);


  /* ========================================
     LOADING
     ======================================== */

  if (loading) {
    return (
      <main className="books-page">

        <BooksHero />

        <section className="book-grid">
          <div className="book-grid__container">

            <div className="book-grid__header">

              <div>

                <p className="book-grid__eyebrow">
                  THE COLLECTION
                </p>

                <h2 className="book-grid__title">
                  Explore the library.
                </h2>

              </div>

            </div>

            <p>
              Loading books...
            </p>

          </div>
        </section>

      </main>
    );
  }


  /* ========================================
     ERROR
     ======================================== */

  if (error) {
    return (
      <main className="books-page">

        <BooksHero />

        <section className="book-grid">
          <div className="book-grid__container">

            <p>
              {error}
            </p>

          </div>
        </section>

      </main>
    );
  }


  /* ========================================
     FEATURED BOOK
     ======================================== */

  const featuredBook =
    books.find(
      (book) =>
        book.featured &&
        book.published
    ) || books.find(
      (book) => book.published
    );


  return (
    <main className="books-page">

      <BooksHero />

      {featuredBook && (
        <FeaturedBook
          book={featuredBook}
        />
      )}

      <BookGrid
        books={books}
      />

    </main>
  );
}

export default Books;