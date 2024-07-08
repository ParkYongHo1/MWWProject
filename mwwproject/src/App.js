import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./page/Main/Main";

import Header from "./layout/Header";
import Login from "./page/Login/Login";
import LoginHandeler from "./page/Login/LoginHeadeler";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/auth/kakao" //redirect_url
            element={<LoginHandeler />} //당신이 redirect_url에 맞춰 꾸밀 컴포넌트
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
