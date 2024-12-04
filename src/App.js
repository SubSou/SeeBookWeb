import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { AuthPaths, MainPaths } from "./navigation/routes";
import Login from "./screen/Auth/Login";
import { UserProvider } from "./contexts/UserContext";
import Main from "./screen/Main/Main";
import { MainProvider } from "./contexts/MainContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path={AuthPaths.Login} element={<Login />} />

            <Route
              path={MainPaths.Main}
              element={
                <MainProvider>
                  <Main />{" "}
                </MainProvider>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
