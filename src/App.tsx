import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Routes>
      <Route Component={Layout}>
        <Route path="/" Component={HomePage} />
      </Route>
    </Routes>
  );
};
export default App;
