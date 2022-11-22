import { useState } from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <div className="flex-1 flex flex-col bg-[#6a5c8a] backdrop-blur-lg items-center p-8">
      <h1 className="text-white text-3xl fond-bold">Authentification</h1>
      <Login />
    </div>
  );
}

export default App;
