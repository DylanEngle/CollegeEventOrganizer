import React from 'react';
import ViewCommentsNavBar from '../components/ViewCommentsNavBar.js';
import ViewCommentsBody from '../components/ViewCommentsBody.js';

const ViewCommentsPage = () =>
{
    return(
        <div>
            <ViewCommentsNavBar />
            <ViewCommentsBody />
        </div>
    );
};
export default ViewCommentsPage;