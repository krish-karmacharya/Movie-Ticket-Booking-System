import React from "react";
import Nav from "../components/Nav";
import StreamingSection from "./StreamingSection";

const Movies = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Nav />
            <main className="flex-grow">
                <StreamingSection />
            </main>
        </div>
    );
};

export default Movies;
