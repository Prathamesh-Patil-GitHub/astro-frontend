import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NeonForm from "./components/NeonForm/NeonForm.jsx";
import NeonTabs from "./components/NeonTabs/NeonTabs.jsx";
import AIBot from "./components/AIBot/AIBot.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<NeonForm />} />
          <Route path="/tabs" element={<NeonTabs />} />
        </Routes>
      </Router>
      <AIBot />
    </>
  );
}

export default App;
