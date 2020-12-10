import React, { useState, useEffect } from 'react';
import createFileList from "../../../utils/utils";

// TODO: clean up saving system
// remove any place where we SetPictures due to dependency exhaust - but it's ugly
const LibraryField = ({ handleLibrary, libraryPages }) => {

    const contentTypes = ["Pictures", "Audio", "Links"];

    const [selectedContent, setContent] = useState(0);

    const [pictures, SetPictures] = useState([]);
    const [audio, SetAudio] = useState([]);
    const [links, SetLinks] = useState([]);


    useEffect(() => {
        // if data exists then properly set it up
        if (libraryPages) {
            const picturesMedia = destructorObject(libraryPages.filter(({title}) => title === "Pictures").pop());
            // cheap way of checking if two arrays are different - to prevent dependency exhaust
            if (JSON.stringify(pictures) === JSON.stringify(picturesMedia))
                pictures.forEach((pictureObj, index) => {
                    document.querySelector(`#content-image-${index}`).files = createFileList(pictureObj.item);
                });
            else SetPictures(picturesMedia)

            const audioMedia = destructorObject(libraryPages.filter(({title}) => title === "Audio").pop());
            SetAudio(audioMedia);

            const linksMedia = destructorObject(libraryPages.filter(({title}) => title === "Links").pop());
            SetLinks(linksMedia);
        }
    }, [libraryPages, pictures]); // picture isn't added to dependency since adding a new item will result cause a reload


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

        // building using the new data
        const customBuildObj = contentTypes.map((contentName, index) => {
            const items = index === 1 ? audio : (index === 2 ? links : old);
            return (
                {
                    "title": contentName,
                    "content_type": index,
                    "content_items": items
                }
            )
        });

        handleLibrary(customBuildObj);
    };

    const handleAudio = (index, type, e) => {
        let old = audio;

        if (type === "audio") {
            old[index].item = e.target.value;
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

    const destructorObject = mediaObj => {
        if (mediaObj && mediaObj.hasOwnProperty("content_items"))
            return mediaObj.content_items.map(media => {
                return {
                    item: media.item,
                    item_description: media.item_description
                }
            })
        else return []
    };


    // save all the data as a predefined structure
    const handleSaveAll = () => {
        handleLibrary(buildObject);
    };

    const createContent = () => {

        const content = {
            "item": "",
            "item_description": ""
        };

        const customBuildObj = contentTypes.map((contentName, index) => {
            let items = index === 1 ? audio : (index === 2 ? links : pictures);
            // we add the new object to the selected item
            if (parseInt(selectedContent) === index) items = [...items, content]
            return (
                {
                    "title": contentName,
                    "content_type": index,
                    "content_items": items
                }
            )
        });

        handleLibrary(customBuildObj);

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

                        <div className="pure-control-group required">
                            <label htmlFor={`content-image-${index}`}>Image file</label>
                            <input
                                type="file" id={`content-image-${index}`} placeholder="select image" accept="image/*"
                                onChange={e => handlePicture(index, "image", e)}
                            />
                        </div>

                        <div className="pure-control-group required">
                            <label htmlFor={`picture-descript-${index}`}>Picture Caption</label>
                            <input
                                type="text" id={`picture-descript-${index}`} placeholder="enter caption"
                                value={picture.item_description}
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

                        <div className="pure-control-group required">
                            <label htmlFor={`content-audio-${index}`}>Audio Link</label>
                            <input
                                type="text" id={`content-audio-${index}`} placeholder="Audio Link"
                                value={audioObj.item}
                                onChange={e => handleAudio(index, "audio", e)}
                            />
                        </div>

                        <div className="pure-control-group required">
                            <label htmlFor={`audio-descript-${index}`}>Audio Description</label>
                            <input
                                type="text" id={`audio-descript-${index}`} placeholder="enter description"
                                value={audioObj.item_description}
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

                        <div className="pure-control-group required">
                            <label htmlFor={`content-link-${index}`}>Link URL</label>
                            <input
                                type="text" id={`content-link-${index}`} placeholder="enter link"
                                value={link.item}
                                onChange={e => handleLink(index, "link", e)}
                            />
                        </div>


                        <div className="pure-control-group required">
                            <label htmlFor={`link-descript-${index}`}>Content Description</label>
                            <input
                                type="text" id={`link-descript-${index}`} placeholder="enter description"
                                value={link.item_description}
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


