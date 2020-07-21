import React from 'react';
import './updateold.css';
class Updateold extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileSelected: ''
        }
    }
    handleChosenFile(e) {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsText(files[0]);
        reader.onload = (e) => {
            this.props.history.push({
                pathname: '/createnew', fileContents: reader.result
            })
        }
    }
    render() {
        return (
            <form>
                <div >
                    <input type='file' id='file' className='input-file'
                        accept='.json' onChange={(e) => this.handleChosenFile(e)} />
                </div>
            </form>
        )
    }
}
export default Updateold;