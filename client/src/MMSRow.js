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
                {/* <b>Status update:</b> The app has recently been experiencing failure to send messages.<br/>
                This has been resolved and it should now function as expected. */}
            </div>
        </div>
    </>
);

export default MMSRow;