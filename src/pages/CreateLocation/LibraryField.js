

import React, { useState } from 'react';

const LibraryField = ({ handleLibrarySave }) => {

    const contentTypes = ["Pictures", "Audio", "Links"];

    const [selectedContent, setContent] = useState(0);

    const [pictures, SetPictures] = useState([]);
    const [audio, SetAudio] = useState([]);
    const [links, SetLinks] = useState([]);
    

    const handleSelect = (e) => {
        setContent(e.target.value);
    };

    const handlePicture = (index, type, e) => {
        let old = pictures;
        
        if (type === "image") {
            old[index].item = e.target.files[0]['name'];
        } else {
            old[index].item_description = e.target.value;
        }

        SetPictures(old);

        handleSaveAll();
    };

    const handleAudio = (index, type, e) => {
        let old = audio;
        
        if (type === "audio") {
            old[index].item = e.target.files[0]['name'];
        } else {
            old[index].item_description = e.target.value;
        }

        SetAudio(old);

        handleSaveAll();
    };

    const handleLink = (index, type, e) => {
        let old = links;
        
        if (type === "link") {
            old[index].item = e.target.value;
        } else {
            old[index].item_description = e.target.value;
        }

        SetLinks(old);

        handleSaveAll();
    };

    // build the predefined structure to prepare it for saving
    const buildObject = contentTypes.map((contentName, index) => {
        const items = index === 1 ? audio : (index === 2 ? links : pictures);
        return (
            {
                "title": contentName,
                "content_type": index,
                "content_items": items
            }
        )
    });

    // save all the data as a predefined structure
    const handleSaveAll = () => {
        handleLibrarySave(buildObject);
    };

    const createContent = () => {

        const content = {
            "item": "",
            "item_description": ""
        };

        switch (parseInt(selectedContent)) {
            default:
                SetPictures([...pictures, content]);
                break;

            case 1:
                SetAudio([...audio, content]);
                break;

            case 2:
                SetLinks([...links, content]);
                break;
        }
    };

    return (
        <div>
            <div>Select Content Type:</div>

            <select name="content" onChange={handleSelect} value={selectedContent}>
                {contentTypes.map((contentName, index) => {
                    return (<option key={index} value={index}>{contentName}</option>)
                })}
            </select>

            <button onClick={createContent}>Create Content</button>

            {pictures.length > 0 && <h2>Pictures:</h2>}
            {pictures.map((picture, index) => {
                return (
                    <div key={index}>
                        <input
                            type="file" placeholder="select image" accept="image/*"
                            onChange={e => handlePicture(index, "image", e)}
                        />

                        <br />

                        <input
                            type="text" placeholder="enter description"
                            onChange={e => handlePicture(index, "description", e)}
                        />

                        <br />
                    </div>
                )
            })}

            {audio.length > 0 && <h2>Audio:</h2>}
            {audio.map((audioObj, index) => {
                return (
                    <div key={index}>
                        <input
                            type="file" placeholder="select image" accept="audio/*"
                            onChange={e => handleAudio(index, "audio", e)}
                        />

                        <br />

                        <input
                            type="text" placeholder="enter description"
                            onChange={e => handleAudio(index, "description", e)}
                        />

                        <br />
                    </div>
                )
            })}


            {links.length > 0 && <h2>Links:</h2>}
            {links.map((link, index) => {
                return (
                    <div key={index}>
                        <input
                            type="text" placeholder="enter link"
                            onChange={e => handleLink(index, "link", e)}
                        />

                        <br />

                        <input
                            type="text" placeholder="enter description"
                            onChange={e => handleLink(index, "description", e)}
                        />

                        <br />
                    </div>
                )
            })}

        </div>
    )

}

export default LibraryField;


