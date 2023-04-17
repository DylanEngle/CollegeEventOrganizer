import React from 'react';
import ViewEventsNavBar from '../components/ViewEventsNavBar.js';
import ViewEventsBody from '../components/ViewEventsBody.js';

const ViewEvents = () =>
{
    return(
        <div>
            <ViewEventsNavBar />
            <ViewEventsBody/>
        </div>
    );
};
export default ViewEvents;