import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { osName } from 'react-device-detect';
import { appSettings } from './configs/config';
import './App.scss';

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
  const [preview, setPreview] = useState(null);

  const doNothing = (event) => event.preventDefault();

  /* When the asset enter in the app, we fire this event. */
  const onDragOn = (event) => {
    setStatus('Asset Detected');
    event.preventDefault();
  }

  /* When the asset is gone, the main message appears */
  const onDragOff = (event) => {
    setStatus(renderContent());
    event.preventDefault();
  }

  /* Messa to the user to drop the asset in the Drop Zone */
  const onDragOver = event => {
    setStatus('Drop');
    event.preventDefault();
  }
  
  const onDrop = event => {
    const supportedFilesTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const { type } = event.dataTransfer.files[0];

    /* Check if the file have a supported file type. */
    if (supportedFilesTypes.indexOf(type) > -1) {
          const reader = new FileReader();
          console.log(reader);

          reader.onload = (e) => {
            console.log(e);
            setPreview(e.target.result);
          }

          reader.readAsDataURL(event.dataTransfer.files[0]);

          /* New Form Data object */
          const formData = new FormData();
          formData.append('asset', event.dataTransfer.files[0]);

          /* XHR - New XHR Request - Using this for the progress upload event. */
          const xhr = new XMLHttpRequest();

          /* XHR - Make Request */
          xhr.open('POST', `${appSettings.apiUrl}/upload`);
          xhr.send(formData);
          
    }

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

      <div className="App" onDragEnter={onDragOn} onDragLeave={onDragOff} onDragOver={doNothing} onDrop={onDragOff}>
        <div className={`DropArea ${status === 'Drop' ? 'Over' : ''}`} onDragOver={onDragOver} onDrop={onDrop} onDragLeave={onDragOn}>
          <div className={`ImageProgress ${preview ? 'Show' : ''}`}>
              <div className="ImageProgressImage" style={{ backgroundImage: `url(${preview})` }}></div>
              <div className="ImageProgressUploaded" style={{ backgroundImage: `url(${preview})` }}></div>
          </div> 
          <div className="Status">
            { status }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
