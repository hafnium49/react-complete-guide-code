function Concept(props) {
  return (
    <li className="concept">
      {/* Props let the same component render different concept entries without duplicating markup. */}
      <img src={props.image} alt={props.title} />
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </li>
  );
}

export default Concept;
