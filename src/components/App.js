import logo from "../logo.svg";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Title from "./Title";
import About from "./About";
import Technologies from "./Technologies";
import Student from "./Student";
import Footer from "./Footer";
import SearchForm from "./SearchForm";
import Preloader from "./Preloader";

function App() {
  return (
    <div className="page">
      <Switch>
        <Route path="/movies">
          <Header backgroundColor={"gray"} />
          <SearchForm />
          <Preloader />
          <Footer />
        </Route>
        <Route path="/">
          <Header />
          <Title />
          <About />
          <Technologies />
          <Student />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
