// This component is reusable because it receives the data to display from the outside.
function Concept(props) {
  return (
    <li className="concept">
      {/* React groups the custom attributes from <Concept ... /> into the props object automatically. */}
      {/* The parent component chooses the prop names, and this component reads those same names from props. */}
      <img src={props.image} alt={props.title} />
      {/* The JSX structure stays fixed while the values can vary from one usage to the next. */}
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </li>
  );
}

// Exporting the component makes it available for import in App.js.
export default Concept;
