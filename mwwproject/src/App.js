import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./page/Main/Main";
import Header from "./layout/Header";
import DetailPage from "./page/Main/DetailPage";
import ChatLog from "./page/Main/ChatLog"; // ChatLog 컴포넌트 import

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/detail" element={<DetailPage />}></Route>
          <Route path="/log" element={<ChatLog />} /> {/* /log 경로 추가 */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
