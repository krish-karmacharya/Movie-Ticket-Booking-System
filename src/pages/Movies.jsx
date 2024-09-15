import React from "react";
import Header from "../components/Nav";
import StreamingSection from "./StreamingSection";
import UpComming from "./UpComming";

const Movies = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <StreamingSection />
            </main>
        </div>
    );
};

export default Movies;
