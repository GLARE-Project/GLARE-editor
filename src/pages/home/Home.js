import React from 'react';
import './home.css';
function Home() {

    return (
        <div className="homepage">
            <img src={`${process.env.PUBLIC_URL}/images/ConfigPhone.png`} alt="logo" />
            <div className={"side-text"}>
                <h1>GLARE</h1>
                <h2>Configuration Editor</h2>
                <h5> Welcome to the GLARE Configuration Editor! Glare is an Augumented Reality Editor enabling the development of individual experiences regarding humanties and beyond.</h5>
            </div>
        </div>
    )
};
export default Home;