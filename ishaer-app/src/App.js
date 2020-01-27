import React, { useState } from 'react';
import { Navbar, InputGroup, FormControl, Button} from 'react-bootstrap';
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
  const [percentage, setPercentage] = useState(0);
  const [url, setUrl] = useState('');

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

      reader.onload = (e) => {
        setPreview(e.target.result);
      }

      reader.readAsDataURL(event.dataTransfer.files[0]);

      /* New Form Data object */
      const formData = new FormData();
      formData.append('asset', event.dataTransfer.files[0]);

      /* XHR - New XHR Request - Using this for the progress upload event. */
      const xhr = new XMLHttpRequest();
      
      /* Addint response type */
      xhr.responseType = 'json';

      /* Checking the upload progress */
      xhr.upload.onprogress = (e) => {
        const done = e.position || e.loaded
        const total = e.totalSize || e.total;
        const perc = (Math.floor(done / total*1000) / 10);

        if (perc >= 100) {
            setStatus('Done');
        } else {
            setStatus(`${perc}%`);
        }
        setPercentage(perc); 
      };

      /* XHR - Make Request */
      xhr.open('POST', `${appSettings.apiUrl}/upload`);
      xhr.send(formData);
      
      if (xhr.DONE) {
        xhr.onload = () => {
          let jsonResponse = xhr.response;
          setUrl(jsonResponse.asset.public_link);
          console.log(jsonResponse);
        };
      }
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
              <div className="ImageProgressUploaded" style={{ backgroundImage: `url(${preview})`, clipPath: `inset(${100 - Number(percentage)}% 0 0 0);` }}></div>
          </div>
          <InputGroup className={`mb-3 PublicUrl ${url !== '' ? 'Visible' : ''}`}>
            <FormControl
              disabled="True"
              value={ url }
            />
            <InputGroup.Append>
              <Button variant="light">Copy</Button>
            </InputGroup.Append>
          </InputGroup>
          <div className={`Status ${status === 'Done' ? 'Done' : ''}`}>
            { status }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
