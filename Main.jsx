import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../Context/Context";

export default function Main(props) {
    const {
        onSent,
        showResults,
        setInput,
        input,
        recentPrompt,
        resultdata,
        loading
    } = useContext(Context);

    const [selectedUserImage, setSelectedUserImage] = useState(null);
    const [selectedMessageImage, setSelectedMessageImage] = useState(null);

    const handleSendMessage = (message) => {
        if (onSent) {
            onSent(message);
        } else {
            console.error("Error: onSent function is not defined.");
        }
    };

    const handleUserFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedUserImage(URL.createObjectURL(file));
            console.log("Selected user file:", file);
        }
    };

    const handleMessageFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedMessageImage(URL.createObjectURL(file));
            console.log("Selected message file:", file);
        }
    };

    const handleCardClick = (message) => {
        setInput(message);
        handleSendMessage(message);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage(input);
        }
    };

    return (
        <div className="main" style={{ backgroundColor: props.mode ? '#4D4D4D' : 'white', color: props.mode ? 'white' : 'black' }}>
            <div className="nav">
                <p style={{ color: props.mode ? 'white' : 'black' }}>Astro Find</p>
                <img
                    className="id"
                    src={selectedUserImage ? selectedUserImage : "https://news.artnet.com/app/news-upload/2017/10/GettyImages-517422764-e1508246391660-1014x1024.jpg"}
                    alt="User Icon"
                    onClick={() => document.getElementById('userFileInput').click()}
                />
            </div>
            <div className="main-container">
                {!showResults ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, {props.signInData}, I'm Astro Find.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card" onClick={() => handleCardClick("Suggest beautiful places to see on an upcoming road trip")}>
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="Compass Icon" />
                            </div>
                            <div className="card" onClick={() => handleCardClick("Briefly summarize this concept: urban planning")}>
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="Bulb Icon" />
                            </div>
                            <div className="card" onClick={() => handleCardClick("Brainstorm team bonding activities for our work retreat")}>
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="Message Icon" />
                            </div>
                            <div className="card" onClick={() => handleCardClick("Improve the readability of the following code")}>
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="Code Icon" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-Title">
                            <img
                                src={selectedMessageImage ? selectedMessageImage : "https://news.artnet.com/app/news-upload/2017/10/GettyImages-517422764-e1508246391660-1014x1024.jpg"}
                                alt="User Icon"
                                onClick={() => document.getElementById('messageFileInput').click()}
                            />
                            <p>{props.fullname}: {recentPrompt}</p>
                            <br />
                        </div>
                        <div className="result-Data">
                            {loading ? (
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p className="results" dangerouslySetInnerHTML={{ __html: resultdata }}></p>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom" style={{ marginTop: resultdata ? 0 : 0 }}>
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            value={input}
                            type="text"
                            placeholder="Message Astro Find..."
                        />
                        <div>
                            <img
                                src={selectedMessageImage ? selectedMessageImage : assets.gallery_icon}
                                alt="Gallery Icon"
                                onClick={() => document.getElementById('messageFileInput').click()}
                            />
                            <img
                                onClick={() => handleSendMessage(input)}
                                src={assets.send_icon}
                                alt="Send Icon"
                            />
                        </div>
                        <input
                            type="file"
                            id="userFileInput"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleUserFileUpload}
                        />
                        <input
                            type="file"
                            id="messageFileInput"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleMessageFileUpload}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
