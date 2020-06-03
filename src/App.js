import React from 'react';

function App() {

  // example data
  var exampleData = {
    'hotspots': [{
      'name': 'Victory Bell',
      'latitude': 41.150186857592914,
      'longitude': -81.34437203407289
    }]
  };

  // we turn that json into a single string
  var jsonData = JSON.stringify(exampleData);
  // turn it into a blob object
  var blob = new Blob([jsonData], {type: "application/json"})
  // create blob url for the browser to download
  var url  = URL.createObjectURL(blob);

  return (
    <div className="App">
      <a href={url} download={'markers.json'}>
        Download File
      </a>
    </div>
  );
}

export default App;
