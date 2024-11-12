import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./page/Main/Main";
import Header from "./layout/Header";
import DetailPage from "./page/Main/DetailPage";
import ChatLog from "./page/Main/ChatLog";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/log" element={<ChatLog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
