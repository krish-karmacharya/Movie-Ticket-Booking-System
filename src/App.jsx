import React, { useState } from "react";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import StreamingSection from "./pages/StreamingSection";
import UpComming from "./pages/UpComming";
import AboutUs from "./pages/AboutUs";
import NowShowingBooking from "./pages/NowShowingBooking";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies";
import SignInForm from "./pages/SignInForm";
import CreateAccountForm from "./pages/CreateAccountForm";

function App() {

  const [count, setCount] = useState(0);

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/UpComming" element={<UpComming />} />
          <Route path="/StreamingSection" element={<StreamingSection />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/NowShowingBooking" element={<NowShowingBooking />} />
          <Route path="/SignInForm" element={<SignInForm />} />
          <Route path="/CreateAccountForm" element={<CreateAccountForm />} />
        </Routes>
      </BrowserRouter>

      <Footer />


    </>
  );
}

export default App;
