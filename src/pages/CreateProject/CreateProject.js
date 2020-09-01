import React, { useState, useContext, useEffect, useCallback } from 'react';
import "./CreateProject.scss"
import { Context } from "./../../App"
import createFileList from "./../../utils/utils";

const CreateProject = () => {

    const { Answers, changeAnswer, checkValidity } = useContext(Context);

    const [localAnswers, setLocalAnswers] = useState({ project_name: "" });

    const [downloadURL, setURL] = useState(null);

    // generate the download URL
    const generateURL = useCallback(() => {
        // if the data is valid we'll generate the blob
        checkValidity().then(ValidityState => { 
            if (ValidityState === true) {
                const jsonData = JSON.stringify(Answers);
                // turn it into a blob object
                const blob = new Blob([jsonData], { type: "application/json" })
                // create blob url for the browser to download
                setURL(URL.createObjectURL(blob));
            }
        }); 
    }, [Answers, checkValidity]);

    // on load, if the id exists, load its data
    useEffect(() => {
        setLocalAnswers(Answers);
        // improper way of doing it, but can't seem to set files attribute properly
        document.querySelector("#intro-audio").files = createFileList(Answers.intro_audio);
        document.querySelector("#homepage-img").files = createFileList(Answers.homepage_image);
        generateURL()
    }, [Answers, generateURL])

    // if a value is changed it must:
    const handleChange = (propertytName, value) => {
        // set the new answer value
        changeAnswer(propertytName, value);
        setLocalAnswers(Answers);
        // regenerate the URL
        generateURL();
    };

    return (
        <div className="CreateProject">
            <div className="pure-form pure-form-aligned">
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
                {downloadURL && (<a className="pure-button download-btn" href={downloadURL} download="markers.json">Download File</a>)}
            </div>
        </div>
    )
};



export default CreateProject;