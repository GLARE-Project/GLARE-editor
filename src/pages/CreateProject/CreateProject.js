import React, { useState, useContext, useEffect, useCallback } from 'react';
import { toast } from "react-toastify";
import "./CreateProject.scss"
import { Context } from "./../../App"
import createFileList from "./../../utils/utils";
import AlertTooClose from "./AlertTooClose";

const CreateProject = () => {

    const { Answers, changeAnswer, checkValidity, hotspotGraph } = useContext(Context);

    const [localAnswers, setLocalAnswers] = useState({ project_name: "" });

    const [downloadURL, setURL] = useState(null);

    const promptMerge = useCallback((props) => {
        toast(<AlertTooClose {...props} hotspotGraph={hotspotGraph} changeAnswer={changeAnswer} />, {
            type: toast.TYPE.WARNING,
            autoClose: false,
            draggablePercent: 50
        });
    }, [changeAnswer, hotspotGraph]);

    const checkHotspotProximity = useCallback(({ hotspots }) => {

        toast.dismiss();

        if (hotspots.length > 0) {

            const itemsLeft = new Map(hotspotGraph.adjancyList);
            const tooClose = new Map();


            // TODO: tooClose should be take into account prioritize the itemsLeft's parent with the highest neighbors
            // The current method is delete the first, but the most neighbors would be the most efficent
            itemsLeft.forEach(adjancyValue => {
                // if there is too close neighbors
                if (adjancyValue.neighbors.length > 0) {
                    // then the vertex is too close to other vertices
                    adjancyValue.neighbors.forEach(neighbor => {
                        const { index } = itemsLeft.get(neighbor);
                        // add the new item to the exisiting map of too close item
                        const previousValue = tooClose.get(adjancyValue.index) || [];
                        tooClose.set(adjancyValue.index, [...previousValue, index]);
                        // remove this vertex from being checked again
                        itemsLeft.delete(neighbor)
                    });
                }
            });

            tooClose.forEach((tooCloseIndices, parentIndex) => {
                promptMerge({hotspots, parentIndex, tooCloseIndices});
            });

        }

    }, [hotspotGraph, promptMerge]);

    // generate the download URL
    const generateURL = useCallback(() => {
        // if the data is valid we'll generate the blob
        checkValidity().then(ValidityState => {
            if (ValidityState === true) {
                // check for the points too close for GPS and alert the user
                checkHotspotProximity(Answers);
                const jsonData = JSON.stringify(Answers);
                // turn it into a blob object
                const blob = new Blob([jsonData], { type: "application/json" })
                // create blob url for the browser to download
                setURL(URL.createObjectURL(blob));
                // only alert if the project name is set and has a hotspot
            } else if (Answers.project_name !== "" && Answers.hotspots.length > 0) {
                toast('Not all the required data has been populated! Please check each hotspot to verify the required fields have been filled in.', {
                    type: toast.TYPE.ERROR,
                    draggablePercent: 50
                });
            }
        });
    }, [Answers, checkValidity, checkHotspotProximity]);

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
                <div className="pure-control-group required">
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
                {downloadURL && (<>
                    <a className="pure-button download-btn" href={downloadURL} download="markers.json">Download Configuration File</a>
                    <a className="pure-button download-btn" href={`${process.env.PUBLIC_URL}/server-files.zip`} download="server-files.zip">Download Server Files</a>
                </>)}
            </div>
        </div>
    )
};



export default CreateProject;