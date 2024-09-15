import React, { useState } from "react";
import Nav from "../components/Nav";

const AboutUs = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      title: "4K Ultra HD",
      description:
        "Experience movies in stunning 4K resolution for the ultimate visual experience.",
      icon: "🎞️",
      image: "https://via.placeholder.com/150x100?text=4K+Ultra+HD",
    },
    {
      title: "Dolby Atmos",
      description:
        "Immerse yourself in three-dimensional audio with our Dolby Atmos-equipped theaters.",
      icon: "🔊",
      image: "https://via.placeholder.com/150x100?text=Dolby+Atmos",
    },
    {
      title: "VIP Seating",
      description:
        "Enjoy premium comfort with our luxurious VIP seating options.",
      icon: "💺",
      image: "https://via.placeholder.com/150x100?text=VIP+Seating",
    },
    {
      title: "Mobile Tickets",
      description:
        "Skip the queue with our convenient mobile ticketing system.",
      icon: "📱",
      image: "https://via.placeholder.com/150x100?text=Mobile+Tickets",
    },
    {
      title: "Gourmet Snacks",
      description:
        "Indulge in a variety of delicious snacks and beverages at our concession stands.",
      icon: "🍿",
      image: "https://via.placeholder.com/150x100?text=Gourmet+Snacks",
    },
    {
      title: "3D Movies",
      description:
        "Experience the thrill of 3D movies with our state-of-the-art projection technology.",
      icon: "🕶️",
      image: "https://via.placeholder.com/150x100?text=3D+Movies",
    },
  ];

  return (<>
    <Nav />
    <div className="bg-[#1E2028] text-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Cinema"
              className="w-1/2 rounded-lg mr-8"
            />
            <p className="text-lg">
              Welcome to our movie booking platform! We are passionate about
              bringing the magic of cinema right to your fingertips. Our mission
              is to provide a seamless and enjoyable experience for movie lovers
              across Nepal.
            </p>
          </div>
          <p className="mb-6 text-lg">
            Founded in 2023, we've quickly grown to become one of the leading
            online movie ticket booking services in the country. We partner with
            top cinemas in major cities including Kathmandu, Pokhara,
            Biratnagar, and many more to offer you a wide selection of the
            latest movies and showtimes.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Our Features:</h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => (

              <div
                key={index}
                className="bg-[#2A2D36] p-4 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#3A3D46]"
                onMouseEnter={() => setActiveFeature(feature.title)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="flex items-center mb-2">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <h3 className="text-xl font-semibold">
                    {feature.icon} {feature.title}
                  </h3>
                </div>
                {activeFeature === feature.title && (
                  <p className="text-sm">{feature.description}</p>
                )}
              </div>
            ))}
          </div>
          <div className="mb-8 flex items-center">
            <p className="text-lg mr-8">
              We're committed to enhancing your movie-going experience. Whether
              you're planning a solo watch, a date night, or a fun outing with
              friends and family, we're here to make sure your cinema journey
              starts off right.
            </p>
            <img
              src="https://via.placeholder.com/400x300"
              alt="Movie Audience"
              className="w-1/2 rounded-lg"
            />
          </div>
          <p className="text-lg text-center italic">
            Thank you for choosing us as your go-to movie booking platform.
            Lights, camera, action – your next great movie experience is just a
            click away!
          </p>
        </div>
      </div>
    </div>
  </>
  );
};

export default AboutUs;
