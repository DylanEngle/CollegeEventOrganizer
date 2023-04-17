import React from 'react';
import '../css/Profile.css'

function PageTitle()
{
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var name = ud.name;
    var level = ud.level;
    var email = ud.email;

   return(
        <center className='HomePageBox'>
                <h1 id="HomePageWords">
                    {name}
                </h1>
                <br></br>
                <h2>
                    Email: {email}
                </h2>

                <h2>
                    Level: {level}
                </h2>

        </center>
   );
};
export default PageTitle;