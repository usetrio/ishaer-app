import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { osName } from 'react-device-detect';
import './App.scss';

// import BgImage from './test.jpg';

function App() {
  /* Function to show the correct instructions regarding the OS of the user. */
  const renderContent = () => {
    if (osName === 'Windows') {
      return (
        <ol type="1">
          <li>Copy (Ctrl + PrtScn) </li>
          <li> Paste (Ctrl + V) or Drag here </li>
        </ol>
      )
    }
  
    return (
        <ol type="1">
          <li> Copy (Shift + Ctrl + Cmd + 3) </li>
          <li> Paste (Shift + V) or Drag here </li>
        </ol>
      )
  }

  const [status, setStatus] = useState(renderContent());

  const onDragOn = (event) => {
    console.log(event);
    setStatus('Asset Detected');
    event.preventDefault();
  }

  const onDragOff = (event) => {
    setStatus(renderContent());
    event.preventDefault();
}

  return (
    <div>
      {/* Navbar with the iShaer title on the left */}
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          iShaer
        </Navbar.Brand>
      </Navbar>

      <div className="App" onDragEnter={onDragOn} onDragLeave={onDragOff}>
        <div className="DropArea">
          {/* <div className="ImageProgress">
              <div className="ImageProgressImage" style={{ backgroundImage: `url(${BgImage})` }}></div>
              <div className="ImageProgressUploaded" style={{ backgroundImage: `url(${BgImage})` }}></div>
          </div>  */}
          <div className="Status">
            { status }
            {/* { renderContent() } */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
