import React, { useContext } from 'react';
import './UpdateProject.css';
import { Context } from "../../App"

const UpdateProject = ({ history }) => {
    const { setAnswers } = useContext(Context);

    const handleChosenFile = (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsText(files[0]);
        reader.onload = () => {
            setAnswers(JSON.parse(reader.result));
            history.push({
                pathname: '/project'
            })
        }
    }
    return (
        <form>
            <div >
                <h1>Project</h1>
                <h2>Configuration Editor</h2>
                <input type='file' id='file' className='input-file'
                    accept='.json' onChange={handleChosenFile} />
            </div>
        </form>
    )
}
export default UpdateProject;