import componentsImage from './assets/images/components.png';
import stateImage from './assets/images/state.png';
import eventsImage from './assets/images/events.png';
import Header from './components/Header/Header';
import Concept from './components/Concept/Concept';

// App still owns the shared concept data.
// The reusable child component only needs to know how one item should be displayed.
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
        {/* The same component can be reused as long as each usage receives the values it needs via props. */}
        <Concept
          image={concepts[0].image}
          title={concepts[0].title}
          description={concepts[0].description}
        />
        {/* Passing a different array element changes the content without changing the component markup. */}
        <Concept
          image={concepts[1].image}
          title={concepts[1].title}
          description={concepts[1].description}
        />
        {/* Reusing one component three times avoids redefining the card structure in multiple places. */}
        <Concept
          image={concepts[2].image}
          title={concepts[2].title}
          description={concepts[2].description}
        />
      </ul>
    </div>
  );
}

export default App;
