import React from "react"

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white mt-8">
            <div className="container mx-auto py-8 px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="w-full md:w-1/2 mb-6 md:mb-0">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.0305644794424!2d85.42729731506156!3d27.67240748280386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1aae42806ba1%3A0x5449e079404e5e82!2sBhaktapur%20Multiple%20Campus!5e0!3m2!1sen!2snp!4v1651234567890!5m2!1sen!2snp"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-right">
                        <p>&copy; 2023 Your Company Name. All rights reserved.</p>
                        <p className="mt-2">Bhaktapur Multiple Campus</p>
                        <p>Bhaktapur, Nepal</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer