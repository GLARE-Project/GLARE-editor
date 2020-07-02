

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
        <React.Fragment>
            <div className="pure-control-group">
                <label htmlFor="content-type">Content Type</label>
                <select name="content" id="content-type" onChange={handleSelect} value={selectedContent}>
                    {contentTypes.map((contentName, index) => {
                        return (<option key={index} value={index}>{contentName}</option>)
                    })}
                </select>
            </div>
            <div className="pure-controls">
                <button type="button" className="pure-button" onClick={createContent}>Create Content</button>
            </div>


            {pictures.length > 0 && <legend>Pictures</legend>}
            {pictures.map((picture, index) => {
                return (
                    <React.Fragment key={index}>

                        <div className="pure-control-group">
                            <label htmlFor="content-image">Content Image</label>
                            <input
                                type="file" id="content-image" placeholder="select image" accept="image/*"
                                onChange={e => handlePicture(index, "image", e)}
                            />
                        </div>

                        <div className="pure-control-group">
                            <label htmlFor="content-descript">Content Description</label>
                            <input
                                type="text" id="picture-descript" placeholder="enter description"
                                onChange={e => handlePicture(index, "description", e)}
                            />

                        </div>
                    </React.Fragment>
                )
            })}

            {audio.length > 0 && <legend>Audio</legend>}
            {audio.map((audioObj, index) => {
                return (
                    <React.Fragment key={index}>

                        <div className="pure-control-group">
                            <label htmlFor="content-audio">Content Audio</label>
                            <input
                                type="file" id="content-audio" placeholder="select image" accept="audio/*"
                                onChange={e => handleAudio(index, "audio", e)}
                            />
                        </div>

                        <div className="pure-control-group">
                            <label htmlFor="audio-descript">Content Description</label>
                            <input
                                type="text" id="audio-descript" placeholder="enter description"
                                onChange={e => handleAudio(index, "description", e)}
                            />
                        </div>

                    </React.Fragment>
                )
            })}

            {links.length > 0 && <legend>Links</legend>}
            {links.map((link, index) => {
                return (
                    <React.Fragment key={index}>

                        <div className="pure-control-group">
                            <label htmlFor="content-link">Content Link</label>
                            <input
                                type="text" id="content-link" placeholder="enter link"
                                onChange={e => handleLink(index, "link", e)}
                            />
                        </div>


                        <div className="pure-control-group">
                            <label htmlFor="link-descript">Content Description</label>
                            <input
                                type="text" id="link-descript" placeholder="enter description"
                                onChange={e => handleLink(index, "description", e)}
                            />
                        </div>

                    </React.Fragment>
                )
            })}

        </React.Fragment>
    )

}

export default LibraryField;


