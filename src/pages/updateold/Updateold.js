import React from 'react';
import './updateold.css';
export default class Updateold extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
          }
      };
onChangeHandler=event=>{
    var file = event.target.files[0];
    console.log(file);
     this.setState({
      selectedFile: file
      });
    };
fileReaderHandler = () => {
    var reader = new FileReader();
    console.log(this.state.selectedFile);
        var jsonData = reader.result;
        console.log(jsonData);
        const object1=JSON.parse(jsonData);
        console.log(object1);
        }
render() {
    return (
    <form action="">
        <div>
        <label>Upload Your File </label>
              <div>
                <input type="file" name="file" accept= '.json' onChange={this.onChangeHandler}/>
              </div>
              <div className="col-md-6 pull-right">
              <button width="100%" type="button" onClick={this.fileReaderHandler}>Upload File</button>
              </div>
        </div>
    </form>
           );
        }
    };
