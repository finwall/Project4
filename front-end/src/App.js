import { BrowserRouter, Routes, Route } from "react-router-dom";

// Contexts
import { LoginContextProvider } from "./contexts/loginContext.js";

// screens
import Index from './components/screens/index.jsx';
import Login from './components/screens/login.jsx';
import Signup from './components/screens/signup.jsx';
import Search from './components/screens/search.jsx';
import Error from './components/screens/error.jsx';

// components
import Navbar from './components/navbar'

function App() {
  return (
    <>
    <LoginContextProvider>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Index />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="search" element={<Search />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </LoginContextProvider>
    </>
  );
}

export default App;
