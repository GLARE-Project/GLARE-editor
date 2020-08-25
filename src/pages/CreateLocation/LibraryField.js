import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Context } from "./../../App";
import createFileList from "./../../utils/utils";

const LibraryField = ({ hotspotID }) => {

    const { Answers, changeAnswer } = useContext(Context);

    const contentTypes = ["Pictures", "Audio", "Links"];

    const [selectedContent, setContent] = useState(0);

    const [pictures, SetPictures] = useState([]);
    const [audio, SetAudio] = useState([]);
    const [links, SetLinks] = useState([]);

    // it gets complicated with setting the file list this way, rewrite due
    const handleFileUpdates = useCallback(() => {

        pictures.map((pictureObj, index) => {
            document.querySelector(`#content-image-${index}`).files = createFileList(pictureObj.item);
            document.querySelector(`#picture-descript-${index}`).value = pictureObj.item_description;
            return null;
        });

        audio.map((audioObj, index) => {
            document.querySelector(`#content-audio-${index}`).files = createFileList(audioObj.item);
            document.querySelector(`#audio-descript-${index}`).value = audioObj.item_description;
            return null;
        });

        links.map((linkObj, index) => {
            document.querySelector(`#content-link-${index}`).value = linkObj.item;
            document.querySelector(`#link-descript-${index}`).value = linkObj.item_description;
            return null;
        });

    }, [pictures, audio, links]);


    useEffect(() => {
        if (hotspotID !== "new" && Answers.hotspots.length > hotspotID) {
            const hotspotData = Answers.hotspots[hotspotID];

            const picturesMedia = destructorObject(hotspotData.media_pages.filter(media => media.title === "Pictures").pop());
            SetPictures(picturesMedia);

            const audioMedia = destructorObject(hotspotData.media_pages.filter(media => media.title === "Audio").pop());
            SetAudio(audioMedia);

            const linksMedia = destructorObject(hotspotData.media_pages.filter(media => media.title === "Links").pop());
            SetLinks(linksMedia);

            handleFileUpdates();
        }
    }, [Answers, hotspotID, handleFileUpdates])


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
        const hotspotData = Answers.hotspots[hotspotID];
        const newAnswer = {
            ...hotspotData,
            media_pages: buildObject
        };
        // TODO: this causes a crash - but is needed to save
        //changeAnswer("hotspots", newAnswer);
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
                            <label htmlFor={`content-image-${index}`}>Content Image</label>
                            <input
                                type="file" id={`content-image-${index}`} placeholder="select image" accept="image/*"
                                onChange={e => handlePicture(index, "image", e)}
                            />
                        </div>

                        <div className="pure-control-group">
                            <label htmlFor={`picture-descript-${index}`}>Content Description</label>
                            <input
                                type="text" id={`picture-descript-${index}`} placeholder="enter description"
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
                            <label htmlFor={`content-audio-${index}`}>Content Audio</label>
                            <input
                                type="file" id={`content-audio-${index}`} placeholder="select image" accept="audio/*"
                                onChange={e => handleAudio(index, "audio", e)}
                            />
                        </div>

                        <div className="pure-control-group">
                            <label htmlFor={`audio-descript-${index}`}>Content Description</label>
                            <input
                                type="text" id={`audio-descript-${index}`} placeholder="enter description"
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
                            <label htmlFor={`content-link-${index}`}>Content Link</label>
                            <input
                                type="text" id={`content-link-${index}`} placeholder="enter link"
                                onChange={e => handleLink(index, "link", e)}
                            />
                        </div>


                        <div className="pure-control-group">
                            <label htmlFor={`link-descript-${index}`}>Content Description</label>
                            <input
                                type="text" id={`link-descript-${index}`} placeholder="enter description"
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


