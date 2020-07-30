import React, { useState, useEffect} from 'react';
import CreateLocation from "./../CreateLocation/CreateLocation";
import "./CreateProject.scss"

const CreateProject = ({ history }) => {

    useEffect(() => {

        const fileContent = history.location?.fileContents;
        // configuration passed via upload
        if(fileContent) {
            const fileObject = JSON.parse(fileContent);
            setAnswers(fileObject)
            // improper way of doing it, but can't seem to set files attribute properly
            document.querySelector("#intro-audio").files = createFileList(fileObject.intro_audio);
            document.querySelector("#homepage-img").files = createFileList(fileObject.homepage_image);
        }

    },[history.location]);
    

    const [Answers, setAnswers] = useState({
        project_name: "",
        intro_audio: "",
        homepage_image: "",
        hotspots: [],
        // up to for links to be displayed
        links: []
    });

    const [downloadURL, setURL] = useState(null);
    // generate the download URL
    const generateURL = () => {
        const jsonData = JSON.stringify(Answers);
        // turn it into a blob object
        const blob = new Blob([jsonData], { type: "application/json" })
        // create blob url for the browser to download
        return URL.createObjectURL(blob);
    };


    // if a value is changed it must:
    const handleChange = (objectName, value) => {
        // set the new answer value
        setAnswers({ ...Answers, ...{ [objectName]: value } });
        // regenerate the URL
        setURL(generateURL());
    };

    const addProject = () => {
        let old = Answers.hotspots;
        old.push({});
        setAnswers({ ...Answers, ...{ hotspots: old } });
    };

    const updateProject = (index, updatedAnswer) => {
        let old = Answers.hotspots;
        old[index] = updatedAnswer;
        setAnswers({ ...Answers, ...{ hotspots: old } });
        setURL(generateURL());
    };

    // create the file list, so the fileName can be set
    // this is to be used to set the file input types
    // ex: input.files = new createFileList('image.png')
    const createFileList = (fileName) => {
        let fileListObj = new DataTransfer();
        // if the fileName passed add that file
        if (fileName) fileListObj.items.add(new File([''], fileName))
        return fileListObj.files
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
                        value={Answers.project_name}
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

                <div className="locationCtn">
                    <div className="locationBtn" onClick={addProject}>Create Location</div>
                    <div className="locationQuestions">
                        {Answers.hotspots.map((location, index) => {
                            return (
                                <div key={index} >
                                    <CreateLocation
                                        handleProjectSave={answer => updateProject(index, answer)}
                                        locationState={location}
                                        index={index}
                                    />
                                </div>
                            )

                        })}
                    </div>
                </div>
                <br />
                {downloadURL && (<a href={downloadURL} download="markers.json">Download File</a>)}
            </form>
        </div>
    )
};



export default CreateProject;