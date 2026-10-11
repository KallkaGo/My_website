const SectionWrapper = (Component, idName) =>
  function HighOrderComponent() {
    return (
      <section id={idName} className={'notebook-section notebook-container notebook-section-' + idName}>
        <Component />
      </section>
    )
  }
export default SectionWrapper
