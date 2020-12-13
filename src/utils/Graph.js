const distance = (lat1, lon1, lat2, lon2) => {
    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        return dist;
    }
}


class Vertex {
    
    constructor(index) {
        this.index = index;
        this.neighbors = [];
    }

    isTooClose(hotspotData, lat, long) {
        const HOTSPOT_RADIUS = 0.0076; // 0.0075 miles == 40 feet
        const {latitude, longitude } = hotspotData[this.index];
        return distance(latitude, longitude, lat, long) <= HOTSPOT_RADIUS;
    }

}

class Graph {
    constructor() {
        this.adjancyList = new Map();
    }

    // input: hotspot data and index pointing to the vertex's data
    addVertex(hotspotData, index) {

        // destruct the data for the vertex
        const { latitude, longitude, position } = hotspotData[index];

        // add the new vertex to the graph
        this.adjancyList.set(position, new Vertex(index))

        // see if any of the exists points are its neighbors
        this.adjancyList.forEach(( adjancyValue, adjancyKey) => {
            // if so, create a edge to these two vertices
            if (adjancyValue.isTooClose(hotspotData, latitude, longitude) && adjancyKey !== position) {
                this.addEdge(position, adjancyKey);
            }
            
        });
    }

    removeVertex(v) {
        // remove all the references of vertex v from neighbors
        this.adjancyList.get(v).neighbors.forEach(neighbor => {
            const index = this.adjancyList.get(neighbor).neighbors.indexOf(v);
            if (index !== -1) // make sure the neighbor exists
                this.adjancyList.get(neighbor).neighbors.splice(index, 1);
        });
        // finally, remove the vertex from the adjancy list 
        this.adjancyList.delete(v);
    }

    addEdge(v, w) {
        // since ithe graph is undirected we need to add the neighbor to both lists
        this.adjancyList.get(v).neighbors.push( w );
        this.adjancyList.get(w).neighbors.push( v );
    }

}


export default Graph;