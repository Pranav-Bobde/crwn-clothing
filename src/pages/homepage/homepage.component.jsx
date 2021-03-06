import React from "react";
import Directory from "../../components/directory/directory.component"
import "./homepage.styles.scss";

const HomePage = (props) => (
    <div className="homepage">
        <button onClick={() => props.history.push('/hats')}></button>
        <Directory />
    </div>
)

export default HomePage;