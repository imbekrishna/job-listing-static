import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import AddJobForm from "./components/AddJobForm";

const App = () => {
  return (
    <Routes>
      <Route Component={Layout}>
        <Route path="/" Component={HomePage} />
        <Route path="/new" Component={AddJobForm} />
        <Route path="/details/:jobId" Component={DetailsPage} />
      </Route>
    </Routes>
  );
};
export default App;
