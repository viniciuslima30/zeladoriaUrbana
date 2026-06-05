// importar BrowserRouter, Routes, Route do react-router-dom

import { BrowserRouter, Routes, Route} from "react-router-dom";

// importar as páginas Home, Chat, Admin

import Home from "./pages/Home.jsx";
import Chat from "./pages/Chat.jsx";
import Admin from "./pages/Admin.jsx"

// exportar o App com as rotas:
// / → Home
// /chat → Chat
// /admin → Admin

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/chat" element={<Chat />}/>
        <Route path="/admin" element={<Admin />}/>
      </Routes>
    </BrowserRouter>
  );
}