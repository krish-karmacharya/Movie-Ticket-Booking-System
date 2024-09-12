import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import StreamingSection from "./pages/StreamingSection";
import UpComming from "./pages/UpComming";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <StreamingSection />
      {/* <UpComming /> */}
      <Footer />
    </>
  );
}

export default App;
