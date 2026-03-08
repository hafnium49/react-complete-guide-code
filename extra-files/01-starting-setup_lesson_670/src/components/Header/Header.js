// This file sits two folders below src, so the image import must step back up before entering assets.
import keyConceptsImage from '../../assets/images/key-concepts.png';

// A React component is a regular JavaScript function that returns JSX.
// The uppercase name marks it as a custom component in JSX.
function Header() {
  return (
    <header>
      {/* This component does not need props because App always renders the same header content. */}
      {/* The header-specific image import lives here now because this component owns that part of the UI. */}
      <img src={keyConceptsImage} alt="Medal badge with a star" />
      <h1>Key React Concepts</h1>
      <p>Selected key React concepts you should know about</p>
    </header>
  );
}

// Default export keeps the import in App.js straightforward.
export default Header;
