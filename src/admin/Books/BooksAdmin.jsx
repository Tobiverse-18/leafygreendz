import {
  BookOpen,
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./BooksAdmin.css";


const API_URL = "http://localhost:8000/api";


function BooksAdmin() {

  const navigate = useNavigate();

  const [books, setBooks] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [openMenu, setOpenMenu] = useState(null);

  const [deleteBook, setDeleteBook] = useState(null);

  const [deleting, setDeleting] = useState(false);

  const menuRef = useRef(null);


  // ============================================================
  // FETCH BOOKS
  // ============================================================

  const fetchBooks = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await fetch(
        `${API_URL}/books/`
      );

      if (!response.ok) {

        throw new Error(
          `Unable to load books. Server returned ${response.status}.`
        );

      }

      const data = await response.json();

      setBooks(
        Array.isArray(data)
          ? data
          : data.results || []
      );

    } catch (error) {

      console.error(
        "FETCH BOOKS ERROR:",
        error
      );

      setError(
        error.message ||
        "Unable to load books."
      );

    } finally {

      setLoading(false);

    }

  };


  // ============================================================
  // LOAD BOOKS
  // ============================================================

  useEffect(() => {

    fetchBooks();

  }, []);


  // ============================================================
  // CLOSE ACTION MENU
  // ============================================================

  useEffect(() => {

    const handleOutsideClick = (event) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {

        setOpenMenu(null);

      }

    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

    };

  }, []);


  // ============================================================
  // SEARCH
  // ============================================================

  const filteredBooks = books.filter((book) => {

    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return true;
    }

    return (
      book.title
        ?.toLowerCase()
        .includes(query)

      ||

      book.author
        ?.toLowerCase()
        .includes(query)

      ||

      book.category
        ?.toLowerCase()
        .includes(query)
    );

  });


  // ============================================================
  // ADD BOOK
  // ============================================================

  const handleAddBook = () => {

    setOpenMenu(null);

    navigate("/admin/books/add");

  };


  // ============================================================
  // ACTION MENU
  // ============================================================

  const handleMenuToggle = (bookId) => {

    setOpenMenu(
      openMenu === bookId
        ? null
        : bookId
    );

  };


  // ============================================================
  // EDIT BOOK
  // ============================================================

  const handleEditBook = (book) => {

    setOpenMenu(null);

    console.log(
      "Edit book:",
      book
    );

    // We will connect this to the Edit Book
    // page when we build it.

  };


  // ============================================================
  // OPEN DELETE MODAL
  // ============================================================

  const handleDeleteClick = (book) => {

    setOpenMenu(null);

    setDeleteBook(book);

  };


  // ============================================================
  // DELETE BOOK
  // ============================================================

  const handleConfirmDelete = async () => {

    if (!deleteBook) {
      return;
    }

    try {

      setDeleting(true);

      setError("");

      setSuccessMessage("");


      const response = await fetch(
        `${API_URL}/books/${deleteBook.id}/`,
        {
          method: "DELETE",
        }
      );


      console.log(
        "DELETE STATUS:",
        response.status
      );


      if (!response.ok) {

        const responseText =
          await response.text();

        console.error(
          "DELETE RESPONSE:",
          responseText
        );

        throw new Error(
          `Failed to delete book. Server returned ${response.status}.`
        );

      }


      // Remove book from the page immediately

      setBooks((currentBooks) =>
        currentBooks.filter(
          (book) =>
            book.id !== deleteBook.id
        )
      );


      setSuccessMessage(
        `"${deleteBook.title}" was deleted successfully.`
      );


      setDeleteBook(null);


      setTimeout(() => {

        setSuccessMessage("");

      }, 4000);


    } catch (error) {

      console.error(
        "DELETE BOOK ERROR:",
        error
      );


      setError(
        error.message ||
        "Failed to delete book."
      );


    } finally {

      setDeleting(false);

    }

  };


  // ============================================================
  // CANCEL DELETE
  // ============================================================

  const handleCancelDelete = () => {

    if (deleting) {
      return;
    }

    setDeleteBook(null);

  };


  // ============================================================
  // RENDER
  // ============================================================

  return (

    <div className="books-admin">


      {/* ======================================================
          HEADER
      ====================================================== */}

      <section className="books-admin__header">

        <div>

          <p className="books-admin__eyebrow">
            CONTENT MANAGEMENT
          </p>

          <h2>
            Books
          </h2>

          <p className="books-admin__description">
            Manage your published books and digital products.
          </p>

        </div>


        <button
          type="button"
          className="books-admin__add"
          onClick={handleAddBook}
        >

          <Plus
            size={17}
            strokeWidth={1.8}
          />

          <span>
            Add Book
          </span>

        </button>

      </section>


      {/* ======================================================
          SUCCESS MESSAGE
      ====================================================== */}

      {successMessage && (

        <div className="books-admin__alert books-admin__alert--success">

          <CheckCircle2
            size={18}
            strokeWidth={1.8}
          />

          <span>
            {successMessage}
          </span>

          <button
            type="button"
            onClick={() =>
              setSuccessMessage("")
            }
            aria-label="Close success message"
          >

            <X
              size={16}
              strokeWidth={1.8}
            />

          </button>

        </div>

      )}


      {/* ======================================================
          ERROR MESSAGE
      ====================================================== */}

      {error && !loading && (

        <div className="books-admin__alert books-admin__alert--error">

          <AlertTriangle
            size={18}
            strokeWidth={1.8}
          />

          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
            aria-label="Close error"
          >

            <X
              size={16}
              strokeWidth={1.8}
            />

          </button>

        </div>

      )}


      {/* ======================================================
          TOOLBAR
      ====================================================== */}

      <section className="books-admin__toolbar">

        <div className="books-admin__search">

          <Search
            size={17}
            strokeWidth={1.8}
          />

          <input
            type="search"
            placeholder="Search books..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          {search && (

            <button
              type="button"
              className="books-admin__search-clear"
              onClick={() =>
                setSearch("")
              }
              aria-label="Clear search"
            >

              <X
                size={15}
                strokeWidth={1.8}
              />

            </button>

          )}

        </div>


        <div className="books-admin__count">

          <span>
            TOTAL BOOKS
          </span>

          <strong>
            {books.length}
          </strong>

        </div>

      </section>


      {/* ======================================================
          BOOK PANEL
      ====================================================== */}

      <section className="books-admin__panel">


        {/* TABLE HEADER */}

        <div className="books-admin__table-header">

          <span>
            BOOK
          </span>

          <span>
            PRICE
          </span>

          <span>
            STATUS
          </span>

          <span>
            ACTIONS
          </span>

        </div>


        {/* ====================================================
            LOADING
        ==================================================== */}

        {loading && (

          <div className="books-admin__empty">

            <div className="books-admin__empty-icon">

              <BookOpen
                size={30}
                strokeWidth={1.4}
              />

            </div>

            <h3>
              Loading books...
            </h3>

            <p>
              Please wait while we load your catalogue.
            </p>

          </div>

        )}


        {/* ====================================================
            EMPTY
        ==================================================== */}

        {!loading &&
          !error &&
          filteredBooks.length === 0 && (

            <div className="books-admin__empty">

              <div className="books-admin__empty-icon">

                <BookOpen
                  size={30}
                  strokeWidth={1.4}
                />

              </div>

              <h3>
                {search
                  ? "No books found"
                  : "No books yet"}
              </h3>

              <p>
                {search
                  ? "Try another search."
                  : "Your books will appear here once they are added to the catalogue."}
              </p>


              {!search && (

                <button
                  type="button"
                  className="books-admin__empty-button"
                  onClick={handleAddBook}
                >

                  <Plus
                    size={16}
                    strokeWidth={1.8}
                  />

                  Add your first book

                </button>

              )}

            </div>

          )}


        {/* ====================================================
            BOOK ROWS
        ==================================================== */}

        {!loading &&
          !error &&
          filteredBooks.length > 0 && (

            <div className="books-admin__rows">

              {filteredBooks.map((book) => (

                <div
                  className="books-admin__row"
                  key={book.id}
                >


                  {/* BOOK */}

                  <div className="books-admin__book">

                    {book.cover_image ? (

                      <img
                        src={book.cover_image}
                        alt={book.title}
                        className="books-admin__cover"
                      />

                    ) : (

                      <div className="books-admin__cover-placeholder">

                        <BookOpen
                          size={20}
                          strokeWidth={1.5}
                        />

                      </div>

                    )}


                    <div className="books-admin__book-info">

                      <strong>
                        {book.title}
                      </strong>

                      <span>
                        {book.author}
                      </span>

                    </div>

                  </div>


                  {/* PRICE */}

                  <div className="books-admin__price">

                    ₦
                    {Number(book.price).toLocaleString(
                      "en-NG",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}

                  </div>


                  {/* STATUS */}

                  <div>

                    <span
                      className={
                        book.is_published
                          ? "books-admin__status books-admin__status--published"
                          : "books-admin__status"
                      }
                    >

                      {book.is_published
                        ? "Published"
                        : "Draft"}

                    </span>

                  </div>


                  {/* ACTIONS */}

                  <div
                    className="books-admin__action-cell"
                    ref={
                      openMenu === book.id
                        ? menuRef
                        : null
                    }
                  >

                    <button
                      type="button"
                      className="books-admin__actions"
                      aria-label={`Actions for ${book.title}`}
                      aria-expanded={
                        openMenu === book.id
                      }
                      onClick={() =>
                        handleMenuToggle(book.id)
                      }
                    >

                      <MoreHorizontal
                        size={19}
                        strokeWidth={1.8}
                      />

                    </button>


                    {/* ACTION MENU */}

                    {openMenu === book.id && (

                      <div className="books-admin__menu">

                        


                        <button
                          type="button"
                          className="books-admin__menu-item books-admin__menu-item--danger"
                          onClick={() =>
                            handleDeleteClick(book)
                          }
                        >

                          <Trash2
                            size={16}
                            strokeWidth={1.8}
                          />

                          <span>
                            Delete
                          </span>

                        </button>

                      </div>

                    )}

                  </div>

                </div>

              ))}

            </div>

          )}

      </section>


      {/* ======================================================
          DELETE MODAL
      ====================================================== */}

      {deleteBook && (

        <div
          className="books-admin__modal-backdrop"
          onMouseDown={(event) => {

            if (
              event.target === event.currentTarget &&
              !deleting
            ) {

              handleCancelDelete();

            }

          }}
        >

          <div
            className="books-admin__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-book-title"
          >

            <div className="books-admin__modal-icon">

              <Trash2
                size={22}
                strokeWidth={1.8}
              />

            </div>


            <div className="books-admin__modal-content">

              <h3 id="delete-book-title">
                Delete book?
              </h3>

              <p>
                Are you sure you want to delete{" "}
                <strong>
                  "{deleteBook.title}"
                </strong>
                ? This action cannot be undone.
              </p>

            </div>


            <div className="books-admin__modal-actions">

              <button
                type="button"
                className="books-admin__modal-cancel"
                onClick={handleCancelDelete}
                disabled={deleting}
              >
                Cancel
              </button>


              <button
                type="button"
                className="books-admin__modal-delete"
                onClick={handleConfirmDelete}
                disabled={deleting}
              >

                {deleting ? (

                  <>
                    <span className="books-admin__spinner" />

                    Deleting...
                  </>

                ) : (

                  <>
                    <Trash2
                      size={16}
                      strokeWidth={1.8}
                    />

                    Delete Book
                  </>

                )}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}


export default BooksAdmin;