import PeopleListPage from "@/routes/PeopleListPage";
import PersonGraph from "@/components/PersonGraph";
import { Routes, Route } from "react-router";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<PeopleListPage />} />
        <Route path="/person/:personId" element={<PersonGraph />} />
      </Routes>
    </div>
  );
}

export default App;
