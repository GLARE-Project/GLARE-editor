import React from 'react';


// Note: both the props hotspotGraph and changeAnswer have to be drilled down
// as react-tostify seems to cause Context API collisions
const AlertTooClose = ({ hotspots, parentIndex, tooCloseIndices, hotspotGraph, changeAnswer }) => {
    const hotSpotNames = tooCloseIndices.map(closeHotspotIndex => { return hotspots[closeHotspotIndex].name });
    return (
        <div>
            <p style={styles.toastCtn}>Appears that {hotspots[parentIndex].name} is too close to
                {" " + hotSpotNames.reduce( (accumulator, hotspotName, currentIndex) => {
                return accumulator + (currentIndex - 1 === hotSpotNames.length ? ', ' : ' and ') + hotspotName;
            })}. Would you like to combine them?
                <button style={styles.toastBtn} onClick={() => {
                    let old = hotspots;
                    tooCloseIndices.forEach(closeHotspotIndex => {
                        old[closeHotspotIndex].isSubHotspot = true;
                        hotspotGraph.removeVertex(old[closeHotspotIndex].position);
                    });
                    changeAnswer("hotspots", old);
                }}>Yes</button>
            </p>
        </div>
    );
}

const styles = {
    toastCtn: {
        display: "flex",
        alignItems: "center",
		fontWeight: "bold"
	},
	toastBtn: {
		backgroundColor: "white",
        fontWeight: "bold",
        padding: ".75em",
        border: "none"
	}
}

export default AlertTooClose;