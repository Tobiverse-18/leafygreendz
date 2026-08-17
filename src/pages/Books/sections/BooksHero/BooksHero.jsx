import "./BooksHero.css";

function BooksHero() {
  return (
    <section className="books-hero">
      <div className="books-hero__container">
        <p className="books-hero__eyebrow">
          THE LEAFYGREENDZ LIBRARY
        </p>

        <h1 className="books-hero__title">
          Knowledge worth
          <span> applying.</span>
        </h1>

        <p className="books-hero__description">
          Practical books created to help you think better,
          start smarter, build with clarity and turn knowledge
          into meaningful action.
        </p>
      </div>
    </section>
  );
}

export default BooksHero;