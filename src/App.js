import './App.css';
import './styles/base.css'
import './styles/themes.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main/Main";
import Barkos from "./pages/Team/barkos/Barkos"
import NotFound from "./pages/NotFound/NotFound";
import Vladimir from "./pages/Team/vladimir/Vladimir";
import Oleg from "./pages/Team/oleg/Oleg";
import Yaroslav from "./pages/Team/yaroslav/Yaroslav";
import Snails from "./pages/Team/snails/Snails";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/team/barkos" element={<Barkos/>}/>
                <Route path="/team/vova" element={<Vladimir/>}/>
                <Route path="/team/oleg" element={<Oleg/>}/>
                <Route path="/team/krakin" element={<Yaroslav/>}/>
                <Route path="/team/snails" element={<Snails/>}/>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
