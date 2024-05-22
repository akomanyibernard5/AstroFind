import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";

export default function Sidebar(props) {
    const [extended, setExtended] = useState(false);
    const { previousPrompt, loadPrompt, newChat, togglePage } = useContext(Context);

    return (
        <div 
            className="sidebar" 
            style={{ backgroundColor: props.mode ? '#282828' : 'wheat', color: props.mode ? 'white' : 'black' }}
        >
            <div className="top">
                <img
                    onClick={() => setExtended(prev => !prev)}
                    className="menu"
                    src={props.mode ? "https://img.icons8.com/ios-glyphs/30/FAB005/menu--v1.png" : assets.menu_icon}
                    alt="menu"
                />
                <div id="sidebar"></div>
                {extended && previousPrompt && (
                    <div className="recent">
                        <p className="recent-Title">Recent</p>
                        {previousPrompt.map((item, index) => (
                            <div 
                                key={index} 
                                onClick={() => loadPrompt(item)} 
                                className="recent-Entry"
                            >
                                <img src={assets.message_icon} alt="message" />
                                <p>{item.slice(0, 19)}...</p>
                            </div>
                        ))}
                        <div 
                            onClick={newChat} 
                            className="new-Chat" 
                            style={{ backgroundColor: props.mode ? "#282828" : "wheat", color: props.mode ? "white" : "black" }}
                        >
                            <p className="text">New Chat</p>
                            <img className="img" src={assets.plus_icon} alt="plus" />
                        </div>
                    </div>
                )}
            </div>
            <div className="bottom">
                {extended && (
                    <div className="button-container">
                        <button 
                            onClick={props.toggleMode} 
                            className="mode"
                        >
                            {props.mode ? "Light Mode" : "Dark Mode"}
                        </button>
                        <button 
                            onClick={togglePage} 
                            className="account"
                        >
                            My Account
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
