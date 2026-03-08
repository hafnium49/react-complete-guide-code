import componentsImage from './assets/images/components.png';
import stateImage from './assets/images/state.png';
import eventsImage from './assets/images/events.png';
import Header from './components/Header/Header';

// The concept data still lives in App because only the header is extracted in this step.
// Each object contains the values needed to fill one concept card.
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
      {/* Custom components use uppercase names so React can distinguish them from built-in HTML elements. */}
      <Header />
      <ul id="concepts">
        {/*
          The concept cards stay inline for now.
          Extracting only one section at a time keeps the refactor easy to follow.
        */}
        {/*
          These list items still share the same structure, which will matter in the next refactoring step.
        */}
        <li className="concept">
          {/* Array indexing selects one concept object, and dot notation reads a field from that object. */}
          <img src={concepts[0].image} alt={concepts[0].title} />
          {/* One data object can feed multiple pieces of JSX without duplicating the data itself. */}
          <h2>{concepts[0].title}</h2>
          <p>{concepts[0].description}</p>
        </li>
        <li className="concept">
          {/* Repeating the same JSX shape three times is useful as a learning step, even though it is not the final design. */}
          <img src={concepts[1].image} alt={concepts[1].title} />
          <h2>{concepts[1].title}</h2>
          <p>{concepts[1].description}</p>
        </li>
        <li className="concept">
          {/* This third card makes the remaining repetition easy to spot before introducing another component. */}
          <img src={concepts[2].image} alt={concepts[2].title} />
          <h2>{concepts[2].title}</h2>
          <p>{concepts[2].description}</p>
        </li>
      </ul>
    </div>
  );
}

export default App;
