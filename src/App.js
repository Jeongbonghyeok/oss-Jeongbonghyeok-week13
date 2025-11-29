import logo from './logo.svg';
import './App.css';
import ListPage from  './components/ListPage.js';
import DeletePage from "./components/DeletePage";
import UpdatePage from "./components/UpdatePage";
import MainPage from './components/MainPage.js';
import AddPage from './components/AddPage.js';
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/list" element={<MainPage />} />
      <Route path="/delete" element={<DeletePage />} />
      <Route path="/update" element={<UpdatePage />} />
      <Route path="/add" element={<AddPage></AddPage>}/>
    </Routes>
  );
}

export default App;
