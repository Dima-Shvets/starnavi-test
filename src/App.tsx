import { lazy } from "react";
import PeopleListPage from "@/routes/PeopleListPage";
import { Routes, Route } from "react-router";
import Header from "./components/Header";
const PersonGraph = lazy(() => import("@/components/PersonGraph"));

function App() {
  return (
    <>
      <Header />
      <main className="container h-[calc(100vh-76px)]">
        <Routes>
          <Route path="/" element={<PeopleListPage />} />
          <Route path="/person/:personId" element={<PersonGraph />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
