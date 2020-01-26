import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { osName } from 'react-device-detect';
import './App.scss';

import BgImage from './test.jpg';

function App() {
  let renderContent = () => {
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

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          iShaer
        </Navbar.Brand>
      </Navbar>

      <div className="App">
        <div className="ImagePreview">
          <div style={{ backgroundImage: `url(${BgImage})` }} />
        </div>
        <div className="DropArea">
          <div className="Status">
              { renderContent() }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
