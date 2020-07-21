import React from 'react';
import './updateold.css';
class Updateold extends React.Component {
    constructor(props) 
    {
        super (props);
        this.state={
            fileSelected: '',
            jsonDataToPass: ''
        }
    }
    handleChosenFile(e) 
    {
        let files=e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e)=>{
            console.warn("json data",e.target.result);
            var jsonData=reader.result;
            console.log(jsonData);
            const obj=JSON.stringify(jsonData);
            console.log(obj);
            const objJSON= JSON.parse(obj);
            console.log(objJSON);
            this.setState({jsonDataToPass: objJSON});
            this.props.history.push({pathname : '/createnew', stateExisting: objJSON
        })
        }
    }
render() 
{
    return (
        <form>
        <div >
            <input type='file' id='file' className='input-file' 
            accept='.json' onChange={(e)=> this.handleChosenFile(e)}/>
        </div>
        </form>
    )
}
}
export default Updateold;