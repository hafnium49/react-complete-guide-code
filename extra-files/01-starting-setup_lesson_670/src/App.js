import keyConceptsImage from './assets/images/key-concepts.png';
import componentsImage from './assets/images/components.png';
import stateImage from './assets/images/state.png';
import eventsImage from './assets/images/events.png';

// Image files can be imported and then used as values inside JSX.
// This keeps the asset paths under the control of the build setup.
// The array below is the single source of truth for the concept content.
const concepts = [
  {
    title: 'Components',
    image: componentsImage,
    description:
      'Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. Components can receive data via props, and they can render dynamic output using JSX.',
  },
  {
    title: 'State',
    image: stateImage,
    description:
      'State is data that may change over time. As it changes, the UI should be updated to reflect the updated data. Each component can maintain its own state and multiple components can share state.',
  },
  {
    title: 'Events',
    image: eventsImage,
    description:
      'Event handlers are added via props to (built-in) components. You pass functions as values to such event handlers to control which functions gets executed for which event.',
  },
];

function App() {
  return (
    <div>
      {/* The header is already a self-contained page section, so it would be a reasonable component candidate. */}
      <header>
        <img src={keyConceptsImage} alt="Medal badge with a star" />
        <h1>Key React Concepts</h1>
        <p>Selected key React concepts you should know about</p>
      </header>
      <ul id="concepts">
        {/*
          Curly braces let JSX switch into regular JavaScript.
          That makes it possible to read values from the concepts array instead of pasting static text.
        */}
        {/*
          These list items share the same structure, which is a strong hint that one reusable component could render them.
          Repetition like this also makes later UI changes harder to maintain because the same edit must be repeated manually.
        */}
        <li className="concept">
          {/* [0] selects the first object in the array, then .image reads one property from that object. */}
          <img src={concepts[0].image} alt={concepts[0].title} />
          {/* The same object can supply multiple fields for different parts of the markup. */}
          <h2>{concepts[0].title}</h2>
          {/* If this paragraph ever changed shape or disappeared, the same update would be needed in every card. */}
          <p>{concepts[0].description}</p>
        </li>
        <li className="concept">
          {/* The second item confirms that the repeated JSX is not just a one-off coincidence. */}
          <img src={concepts[1].image} alt={concepts[1].title} />
          <h2>{concepts[1].title}</h2>
          <p>{concepts[1].description}</p>
        </li>
        <li className="concept">
          {/* By the third copy, the maintenance cost of leaving this inline becomes much easier to notice. */}
          <img src={concepts[2].image} alt={concepts[2].title} />
          <h2>{concepts[2].title}</h2>
          <p>{concepts[2].description}</p>
        </li>
      </ul>
    </div>
  );
}

export default App;
