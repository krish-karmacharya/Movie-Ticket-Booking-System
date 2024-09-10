import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import StreamingSection from "./components/StreamingSection";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <StreamingSection />
      <Footer />
    </>
  );
}

export default App;
