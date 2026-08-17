import books from "../../data/books";

import BooksHero from "./sections/BooksHero/BooksHero";
import FeaturedBook from "./sections/FeaturedBook/FeaturedBook";
import BookGrid from "./sections/BookGrid/BookGrid";

import "./Books.css";

function Books() {
  const featuredBook = books.find(
    (book) => book.featured && book.published
  );

  return (
    <main className="books-page">
      <BooksHero />

      <FeaturedBook book={featuredBook} />

      <BookGrid books={books} />
    </main>
  );
}

export default Books;