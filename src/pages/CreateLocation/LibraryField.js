

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
            <form class="pure-form">
                <fieldset>
                    <div class="pure-control-group">
                        <label for="content-type">Content Type</label>
                        <select name="content" id="content-type" onChange={handleSelect} value={selectedContent}>
                            {contentTypes.map((contentName, index) => {
                                return (<option key={index} value={index}>{contentName}</option>)
                            })}
                        </select>
                    </div>
                    <div class="pure-controls">
                        <button type="button" class="pure-button" onClick={createContent}>Create Content</button>
                    </div>
                </fieldset>
            </form>


            <form class="pure-form">
                <fieldset>
                    {pictures.length > 0 && <legend>Pictures</legend>}
                    {pictures.map((picture, index) => {
                        return (
                            <div key={index}>

                                <div class="pure-control-group">
                                    <label for="content-image">Content Image</label>
                                    <input
                                        type="file" id="content-image" placeholder="select image" accept="image/*"
                                        onChange={e => handlePicture(index, "image", e)}
                                    />
                                </div>

                                <div class="pure-control-group">
                                    <label for="content-descript">Content Description</label>
                                    <input
                                        type="text" id="picture-descript" placeholder="enter description"
                                        onChange={e => handlePicture(index, "description", e)}
                                    />

                                </div>
                            </div>
                        )
                    })}
                </fieldset>
            </form>


            <form class="pure-form">
                <fieldset>
                    {audio.length > 0 && <legend>Audio</legend>}
                    {audio.map((audioObj, index) => {
                        return (
                            <div key={index}>

                                <div class="pure-control-group">
                                    <label for="content-audio">Content Audio</label>
                                    <input
                                        type="file" id="content-audio" placeholder="select image" accept="audio/*"
                                        onChange={e => handleAudio(index, "audio", e)}
                                    />
                                </div>

                                <div class="pure-control-group">
                                    <label for="audio-descript">Content Description</label>
                                    <input
                                        type="text" id="audio-descript" placeholder="enter description"
                                        onChange={e => handleAudio(index, "description", e)}
                                    />
                                </div>

                            </div>
                        )
                    })}
                </fieldset>
            </form>


            <form class="pure-form">
                <fieldset>
                    {links.length > 0 && <legend>Links</legend>}
                    {links.map((link, index) => {
                        return (
                            <div key={index}>

                                <div class="pure-control-group">
                                    <label for="content-link">Content Link</label>
                                    <input
                                        type="text" id="content-link" placeholder="enter link"
                                        onChange={e => handleLink(index, "link", e)}
                                    />
                                </div>


                                <div class="pure-control-group">
                                    <label for="link-descript">Content Description</label>
                                    <input
                                        type="text" id="link-descript" placeholder="enter description"
                                        onChange={e => handleLink(index, "description", e)}
                                    />
                                </div>

                            </div>
                        )
                    })}
                </fieldset>
            </form>

        </div>
    )

}

export default LibraryField;


