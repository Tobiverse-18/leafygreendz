import {
  ArrowLeft,
  BookOpen,
  Check,
  FileText,
  Image,
  Upload,
} from "lucide-react";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AddBook.css";


function AddBook() {

  const navigate = useNavigate();

  const coverInputRef = useRef(null);
  const ebookInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    author: "LEAFYGREENDZ",
    category: "",
    description: "",
    price: "",
    is_published: true,
  });

  const [coverImage, setCoverImage] = useState(null);
  const [ebookFile, setEbookFile] = useState(null);

  const [coverPreview, setCoverPreview] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");


  // ============================================================
  // INPUT CHANGE
  // ============================================================

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // ============================================================
  // COVER IMAGE
  // ============================================================

  const handleCoverChange = (event) => {

    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setCoverImage(file);

    setCoverPreview(
      URL.createObjectURL(file)
    );

  };


  // ============================================================
  // EBOOK FILE
  // ============================================================

  const handleEbookChange = (event) => {

    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setEbookFile(file);

  };


  // ============================================================
  // PUBLISH TOGGLE
  // ============================================================

  const handlePublishChange = () => {

    setFormData((previous) => ({
      ...previous,
      is_published: !previous.is_published,
    }));

  };


  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    if (!formData.title.trim()) {

      setError("Please enter a book title.");

      return;

    }

    if (!formData.price) {

      setError("Please enter the book price.");

      return;

    }


    try {

      setSaving(true);


      const data = new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "subtitle",
        formData.subtitle
      );

      data.append(
        "author",
        formData.author
      );

      data.append(
        "category",
        formData.category
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "price",
        formData.price
      );

      data.append(
        "is_published",
        formData.is_published
      );


      if (coverImage) {

        data.append(
          "cover_image",
          coverImage
        );

      }


      if (ebookFile) {

        data.append(
          "ebook_file",
          ebookFile
        );

      }


      const response = await fetch(
        "http://127.0.0.1:8000/api/books/",
        {
          method: "POST",
          body: data,
        }
      );


      if (!response.ok) {

        const responseData =
          await response.json().catch(
            () => null
          );

        console.error(
          "Create book error:",
          responseData
        );

        throw new Error(
          "Failed to create book."
        );

      }


        navigate("/admin/books");

    } catch (error) {

      console.error(
        "Add book error:",
        error
      );

      setError(
        "Unable to create the book. Please try again."
      );

    } finally {

      setSaving(false);

    }

  };


  return (

    <div className="add-book">


      {/* ======================================================
          HEADER
      ====================================================== */}

      <section className="add-book__header">

        <button
          type="button"
          className="add-book__back"
          onClick={() =>
            navigate("/admin/books")
          }
        >

          <ArrowLeft
            size={17}
            strokeWidth={1.8}
          />

          <span>
            Back to Books
          </span>

        </button>


        <div>

          <p className="add-book__eyebrow">
            CONTENT MANAGEMENT
          </p>

          <h2>
            Add Book
          </h2>

          <p className="add-book__description">
            Add a new digital book to your catalogue.
          </p>

        </div>

      </section>


      {/* ======================================================
          FORM
      ====================================================== */}

      <form
        className="add-book__form"
        onSubmit={handleSubmit}
      >


        {/* ====================================================
            BASIC INFORMATION
        ==================================================== */}

        <section className="add-book__section">

          <div className="add-book__section-header">

            <div className="add-book__section-icon">

              <BookOpen
                size={17}
                strokeWidth={1.7}
              />

            </div>

            <div>

              <h3>
                Book Information
              </h3>

              <p>
                Basic information about your book.
              </p>

            </div>

          </div>


          <div className="add-book__fields">


            {/* TITLE */}

            <div className="add-book__field add-book__field--full">

              <label htmlFor="title">
                Book Title
                <span>*</span>
              </label>

              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter book title"
                value={formData.title}
                onChange={handleChange}
                required
              />

            </div>


            {/* SUBTITLE */}

            <div className="add-book__field add-book__field--full">

              <label htmlFor="subtitle">
                Subtitle
              </label>

              <input
                id="subtitle"
                name="subtitle"
                type="text"
                placeholder="Enter subtitle (optional)"
                value={formData.subtitle}
                onChange={handleChange}
              />

            </div>


            {/* AUTHOR */}

            <div className="add-book__field">

              <label htmlFor="author">
                Author
              </label>

              <input
                id="author"
                name="author"
                type="text"
                value={formData.author}
                onChange={handleChange}
              />

            </div>


            {/* CATEGORY */}

            <div className="add-book__field">

              <label htmlFor="category">
                Category
              </label>

              <input
                id="category"
                name="category"
                type="text"
                placeholder="e.g. Business"
                value={formData.category}
                onChange={handleChange}
              />

            </div>


            {/* PRICE */}

            <div className="add-book__field">

              <label htmlFor="price">
                Price
                <span>*</span>
              </label>

              <div className="add-book__price">

                <span>
                  ₦
                </span>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* DESCRIPTION */}

            <div className="add-book__field add-book__field--full">

              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows="6"
                placeholder="Write a short description of the book..."
                value={formData.description}
                onChange={handleChange}
              />

            </div>

          </div>

        </section>


        {/* ====================================================
            FILES
        ==================================================== */}

        <section className="add-book__section">

          <div className="add-book__section-header">

            <div className="add-book__section-icon">

              <Upload
                size={17}
                strokeWidth={1.7}
              />

            </div>

            <div>

              <h3>
                Book Files
              </h3>

              <p>
                Upload the cover and digital book file.
              </p>

            </div>

          </div>


          <div className="add-book__uploads">


            {/* COVER */}

            <div className="add-book__upload-card">

              <div className="add-book__upload-title">

                <Image
                  size={16}
                  strokeWidth={1.7}
                />

                <span>
                  Cover Image
                </span>

              </div>


              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleCoverChange}
              />


              {coverPreview ? (

                <div className="add-book__cover-preview">

                  <img
                    src={coverPreview}
                    alt="Book cover preview"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      coverInputRef.current?.click()
                    }
                  >
                    Change cover
                  </button>

                </div>

              ) : (

                <button
                  type="button"
                  className="add-book__dropzone"
                  onClick={() =>
                    coverInputRef.current?.click()
                  }
                >

                  <Image
                    size={24}
                    strokeWidth={1.4}
                  />

                  <strong>
                    Upload cover
                  </strong>

                  <span>
                    PNG, JPG or WEBP
                  </span>

                </button>

              )}

            </div>


            {/* EBOOK */}

            <div className="add-book__upload-card">

              <div className="add-book__upload-title">

                <FileText
                  size={16}
                  strokeWidth={1.7}
                />

                <span>
                  Ebook File
                </span>

              </div>


              <input
                ref={ebookInputRef}
                type="file"
                accept=".pdf,.epub"
                hidden
                onChange={handleEbookChange}
              />


              <button
                type="button"
                className={`add-book__file-drop ${
                  ebookFile
                    ? "add-book__file-drop--selected"
                    : ""
                }`}
                onClick={() =>
                  ebookInputRef.current?.click()
                }
              >

                <FileText
                  size={24}
                  strokeWidth={1.4}
                />

                {ebookFile ? (

                  <>
                    <strong>
                      {ebookFile.name}
                    </strong>

                    <span>
                      Click to replace file
                    </span>
                  </>

                ) : (

                  <>
                    <strong>
                      Upload ebook
                    </strong>

                    <span>
                      PDF or EPUB
                    </span>
                  </>

                )}

              </button>

            </div>

          </div>

        </section>


        {/* ====================================================
            PUBLISHING
        ==================================================== */}

        <section className="add-book__section">

          <div className="add-book__publish">

            <div>

              <h3>
                Publishing Status
              </h3>

              <p>
                Published books are visible on your public website.
              </p>

            </div>


            <button
              type="button"
              className={`add-book__toggle ${
                formData.is_published
                  ? "add-book__toggle--active"
                  : ""
              }`}
              onClick={handlePublishChange}
              aria-label="Toggle publishing status"
              aria-pressed={formData.is_published}
            >

              <span />

            </button>

          </div>

          <div className="add-book__publish-status">

            <span
              className={
                formData.is_published
                  ? "add-book__status-dot add-book__status-dot--active"
                  : "add-book__status-dot"
              }
            />

            {formData.is_published
              ? "This book will be published immediately."
              : "This book will be saved as a draft."}

          </div>

        </section>


        {/* ====================================================
            ERROR
        ==================================================== */}

        {error && (

          <div className="add-book__error">

            {error}

          </div>

        )}


        {/* ====================================================
            ACTIONS
        ==================================================== */}

        <div className="add-book__actions">

          <button
            type="button"
            className="add-book__cancel"
            onClick={() =>
              navigate("/admin/dashboard/books")
            }
            disabled={saving}
          >
            Cancel
          </button>


          <button
            type="submit"
            className="add-book__save"
            disabled={saving}
          >

            <Check
              size={16}
              strokeWidth={2}
            />

            {saving
              ? "Saving..."
              : "Save Book"}

          </button>

        </div>

      </form>

    </div>

  );

}


export default AddBook;