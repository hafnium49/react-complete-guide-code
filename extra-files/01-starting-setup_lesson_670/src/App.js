import keyConceptsImage from './assets/images/key-concepts.png';
import componentsImage from './assets/images/components.png';
import stateImage from './assets/images/state.png';
import eventsImage from './assets/images/events.png';

// Asset files can be imported into React components just like JavaScript modules.
// Image imports become URL strings after the build step.
// Keeping images as imports avoids hard-coded public paths.

// Storing the content in data objects separates what to show from how to render it.
const concepts = [
  // All entries share the same shape so one reusable component can render each item later.
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

// App is the only custom component in the starter project.
// The file intentionally keeps major UI regions inline so component boundaries are easier to spot.
// The next refactor step is to extract smaller custom components.
function App() {
  return (
    <div>
      {/* The header already behaves like a self-contained UI block. */}
      <header>
        <img src={keyConceptsImage} alt="Medal badge with a star" />
        <h1>Key React Concepts</h1>
        <p>Selected key React concepts you should know about</p>
      </header>

      {/* This section should render the entries from the concepts array above. */}
      <ul id="concepts">
        {/*
          This placeholder represents one concept card.
          The first step is to replace the TODO values with real data from the concepts array.
          After that, the repeated structure is a strong hint that a separate component would help.
        */}
        <li className="concept">
          {/* These placeholders mark the values that should eventually be supplied dynamically. */}
          <img src="TODO: IMAGE" alt="TODO: TITLE" />
          <h2>TODO: TITLE</h2>
          <p>TODO: DESCRIPTION</p>
        </li>
      </ul>
    </div>
  );
}

export default App;
