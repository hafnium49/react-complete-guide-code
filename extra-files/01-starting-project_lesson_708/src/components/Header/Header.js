import logo from '../../assets/investment-calculator-logo.png';
import classes from './Header.module.css';

/*
  TUTOR'S GUIDANCE:
  Here is the extracted Header component. Notice how the image path is adjusted
  because this file is now nested inside the 'components/Header' directory.
  
  "CSS Modules":
  Now, by importing our module CSS object, we switch from hardcoded strings 
  (`className="header"`) to dynamically injected variables (`className={classes.header}`).
*/
const Header = () => {
  return (
    <header className={classes.header}>
      <img src={logo} alt="logo" />
      <h1>Investment Calculator</h1>
    </header>
  );
};

export default Header;
