import logo from '../../assets/investment-calculator-logo.png';

/*
  TUTOR'S GUIDANCE:
  Here is the extracted Header component. Notice how the image path is adjusted
  because this file is now nested inside the 'components/Header' directory.
*/
const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="logo" />
      <h1>Investment Calculator</h1>
    </header>
  );
};

export default Header;
