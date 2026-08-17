import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./WhatWeCreate.css";

function WhatWeCreate() {
  const categories = [
    {
      number: "01",
      title: "Business & Entrepreneurship",
      description:
        "Practical resources for people building, managing or exploring business opportunities.",
    },
    {
      number: "02",
      title: "Financial Empowerment",
      description:
        "Ideas and resources designed to strengthen financial thinking and create better opportunities.",
    },
    {
      number: "03",
      title: "Marketing & Communication",
      description:
        "Practical knowledge to help you communicate clearly, position your ideas and connect with people.",
    },
    {
      number: "04",
      title: "Productivity & Growth",
      description:
        "Useful frameworks and resources to help you work smarter, develop your skills and keep moving forward.",
    },
    {
      number: "05",
      title: "Digital Opportunities",
      description:
        "Practical ideas for discovering and making use of opportunities in the digital economy.",
    },
  ];

  return (
    <section className="what-we-create">
      <div className="what-we-create__container">
        <div className="what-we-create__header">
          <div>
            <p className="what-we-create__eyebrow">
              BEYOND THE FIRST BOOK
            </p>

            <h2 className="what-we-create__title">
              Practical knowledge
              <span>for the next step.</span>
            </h2>
          </div>

        </div>

        <div className="what-we-create__list">
          {categories.map((category) => (
            <article
              className="what-we-create__item"
              key={category.number}
            >
              <span className="what-we-create__number">
                {category.number}
              </span>

              <h3>{category.title}</h3>

              <p>{category.description}</p>

              <span className="what-we-create__arrow">
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.5}
                />
              </span>
            </article>
          ))}
        </div>

        <div className="what-we-create__bottom">
          <p>
            More resources are coming.
            <span>Stay close to the angle.</span>
          </p>

          <Link
            to="/books"
            className="what-we-create__link"
          >
            Explore resources
            <ArrowUpRight size={16} strokeWidth={1.7} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WhatWeCreate;