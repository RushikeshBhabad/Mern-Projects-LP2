import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EventDetails from "./pages/EventDetails";
import RegistrationForm from "./pages/RegistrationForm";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/register/:id" element={<RegistrationForm />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
