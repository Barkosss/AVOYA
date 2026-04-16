import './App.css';
import './styles/base.css'
import './styles/themes.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main/Main";
import Barkos from "./pages/Team/barkos/Barkos"
import NotFound from "./pages/NotFound/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/barkos" element={<Barkos/>}/>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
