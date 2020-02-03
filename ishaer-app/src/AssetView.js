import React, { useState } from 'react';
import { useParams } from "react-router";
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { appSettings } from './configs/config';
import copy from 'clipboard-copy';

import './AssetView.scss';

const fetchAsset = async (code) => {
    const response = await fetch(`${appSettings.apiUrl}/${code}`, {
        method: 'GET'
    })
    const data = await response.json();
    
    return data;
}

const AssetView = () => {
    let { code } = useParams();
    let data = fetchAsset(code);
    const [preview, setPreview] = useState(null);
    const [url, setUrl] = useState('');


    data.then(info => {
        console.log(info);
        setPreview(info.asset.url);
        setUrl(info.asset.public_link);
    }).catch(err => {
        console.log(err);
    });

    return (
        <div className="AssetView">
            <div className="App">
                <div className="DropArea">
                    <div className="ImageProgress">
                        <div className="ImageProgressImage" style={{ backgroundImage: `url(${preview})` }}></div>
                    </div>
                    <InputGroup className="mb-3 PublicUrl Visible">
                        <FormControl
                        disabled="True"
                        value={ url }
                        />
                        <InputGroup.Append>
                            <Button variant="light" onClick={ () => { copy( url ); }}> Copy </Button>
                        </InputGroup.Append>
                        <InputGroup.Append>
                            <Button variant="light"> Download </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </div>
        </div>
    )
}

export default AssetView;