import React from 'react';
import './home.css';
function Home() {

return (
    <div className="bg">
<div className="flex-container">
    <table className="flex-item">
        <tr>
        <td>
    <img src={"/images/ConfigPhone.png"} alt="logo"/></td>
    <td><h1>GLARE</h1>
    <h2>Configuration Editor</h2>
    <h5> Welcome to the GLARE Configuration Editor! Glare is an Augumented Reality Editor enabling the development of individual experiences regarding humanties and beyond.</h5>
    </td>
    </tr>
    </table>
    </div>
    <footer>
          <h6>FAQ | 2017 &copy; Kent State University | Privacy & Terms of Use </h6>
      </footer>
</div>)
};
export default Home;