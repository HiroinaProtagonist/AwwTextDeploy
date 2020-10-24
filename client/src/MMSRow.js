import React from 'react';
import './MMSRow.css'
import MMSForm from './MMSForm';

const MMSRow = () => (
    <>
        <div>
            <div id="mmsForm">
                <span></span>
                <span>
                    <MMSForm />
                </span>
                <span></span>
            </div>
            <div id="aboutText">
                Send /r/aww's top picture of the day to your chosen number.<br/><br/>
                <b>Status update:</b> The app is currently experiencing unknown carrier errors and is inconsistent.<br/>
                We are troubleshooting and will provide an update soon.
            </div>
        </div>
    </>
);

export default MMSRow;