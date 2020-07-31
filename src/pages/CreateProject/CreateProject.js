import React, { useState, useContext, useEffect } from 'react';
import "./CreateProject.scss"
import { Context } from "./../../App"
import createFileList from "./../../utils/utils";

const CreateProject = () => {

    const { Answers, changeAnswer } = useContext(Context);
    
    const [localAnswers, setLocalAnswers] = useState({ project_name: ""});

    const [downloadURL, setURL] = useState(null);

    // on load, if the id exists, load its data
    useEffect(() => {
        setLocalAnswers(Answers);
        // improper way of doing it, but can't seem to set files attribute properly
        document.querySelector("#intro-audio").files = createFileList(Answers.intro_audio);
        document.querySelector("#homepage-img").files = createFileList(Answers.homepage_image);
    }, [Answers])
    
    // generate the download URL
    const generateURL = () => {
        const jsonData = JSON.stringify(Answers);
        // turn it into a blob object
        const blob = new Blob([jsonData], { type: "application/json" })
        // create blob url for the browser to download
        return URL.createObjectURL(blob);
    };

    // if a value is changed it must:
    const handleChange = (propertytName, value) => {
        // set the new answer value
        changeAnswer(propertytName, value);
        setLocalAnswers(Answers);
        // regenerate the URL
        setURL(generateURL());
    };

    return (
        <div className="CreateProject">
            <form className="pure-form pure-form-aligned">
                <h1>New Project</h1>
                <h2>Homepage Content</h2>
                <div className="pure-control-group">
                    <label htmlFor="project-name">Project Name</label>
                    <input
                        type="text" id="project-name" placeholder="enter project name"
                        value={localAnswers.project_name}
                        onChange={e => handleChange("project_name", e.target.value)}
                    />
                </div>

                <div className="pure-control-group">
                    <label htmlFor="intro-audio">Introduction Audio</label>
                    <input
                        type="file" id="intro-audio" accept="audio/*"
                        onChange={e => handleChange("intro_audio", e.target.files[0]['name'])}
                    />
                </div>

                <div className="pure-control-group">
                    <label htmlFor="homepage-img">Homepage Image</label>
                    <input
                        type="file" id="homepage-img" accept="image/*" name="file.jpg"
                        onChange={e => handleChange("homepage_image", e.target.files[0]['name'])}
                    />
                </div>

                <br />
                {downloadURL && (<a href={downloadURL} download="markers.json">Download File</a>)}
            </form>
        </div>
    )
};



export default CreateProject;