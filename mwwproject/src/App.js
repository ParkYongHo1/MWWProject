import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./page/Main/Main";

import Header from "./layout/Header";
import Login from "./page/Login/Login";
import LoginHandeler from "./page/Login/LoginHeadeler";
import Test from "./page/Test/Test";

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
            element={<LoginHandeler />}
          />
          <Route path="/test" element={<Test />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
