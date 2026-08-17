import "./BrandProcess.css";

function BrandProcess() {
  const steps = [
    {
      number: "01",
      title: "Learn",
      description:
        "Gain practical business knowledge that goes beyond theory and gives you clarity.",
    },
    {
      number: "02",
      title: "Apply",
      description:
        "Turn ideas into action through proven principles and practical decision-making.",
    },
    {
      number: "03",
      title: "Build",
      description:
        "Create systems, businesses and opportunities that are designed to last.",
    },
    {
      number: "04",
      title: "Grow",
      description:
        "Expand your income, improve your thinking and keep building meaningful impact.",
    },
  ];

  return (
    <section className="brand-process">
      <div className="brand-process__container">
        <div className="brand-process__header">
          <p className="brand-process__eyebrow">
            THE LEAFYGREENDZ PROCESS
          </p>

          <h2 className="brand-process__title">
            Learn. Apply.
            <span>Build. Grow.</span>
          </h2>
        </div>

        <div className="brand-process__grid">
          {steps.map((step) => (
            <article
              className="brand-process__card"
              key={step.number}
            >
              <span className="brand-process__number">
                {step.number}
              </span>

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default BrandProcess;