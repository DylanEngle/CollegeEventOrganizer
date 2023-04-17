require('express');
const db = require('./database/index');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require('express');

exports.setApp = function ( app, client )
{

  app.post("/api/login",async(req,res,next) => {

    console.log("in login...");

    const email = req.body.email;
    const password = req.body.password;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );

    var sql = "Select * from event_users where email = '"  + email + "' and password = '" + password + "'";

    db.query(sql, (error, response) => {
      if (error) return error;
      if (response.length > 0) {
          res.json(response[0]);
          res.status(200);
          console.log("after query of event_users, response length = " + response.length);
          console.log("the res name after query is: "+response[0].name);
          console.log("after successful query status is: "+response.status);
      }
    })
});

app.post("/api/register", async(req, res,next) => {
    
  console.log("in register ... ");

  const userId = req.body.userId;
  const theName = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const level = "Student";

  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );

  var rsoSql = "Insert into event_users (user_id, name, password, email, level) " + 
  " values ('" + userId + "', '" + theName + "','"+ password + "','" + email + "','" + level + "')";
  
  console.log("rsoSql = " + rsoSql);

  db.query(rsoSql, (error, response) => {
      if (error) return error;
      console.log("query succeeded, id = "+ response.insertId);
      res.json(response);
      res.status(200);
  })

});

app.post("/api/userevents",(req,res,next) => {

  console.log("in userevents...");

  var userid = req.body.userid;
  var email = req.body.email;
  var emaildomain = email.substring(email.indexOf("@"));

  console.log("user id = " + userid + ", email = " + email + ", emaildomain = " + emaildomain);

  var sql = "Select * from events where event_type = 'Public' or " + 
    " (event_type = 'Private' and events.contact_email like '%" + emaildomain + "') or " + 
    " (events.RSO_ID in " + 
    "  (select rso_id from rso_members rm where rm.rso_user_id = '" + userid + "'))"; 

  console.log ("sql = " + sql);
  
  db.query(sql, (error, response) => {
      if (error) return error;
      if (response.length > 0) {
          res.json(response);
          res.status(200);
          console.log("after query of user events, response length = " + response.length);
      }
    })

});

app.post("/api/eventusers",async(req,res,next) => {

  console.log("in users, process.env.db_host = "+process.env.db_host);

  //Form Valdiation
  //const {errors, isValid} = validateLoginInput(req.body);
 /*
  if (!isValid) {
      console.log("not valid after calling validateLoginInput.");

      return res.status(400).json(errors);
  }*/

  var email = req.body.email;
  var emaildomain = email.substring(email.indexOf("@"));

  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );

  var sql = "Select * from event_users where email like '%" + emaildomain + "' "; 
   
  
  db.query(sql, (error, response) => {
      if (error) return error;
      if (response.length > 0) {
          res.json(response);
          res.status(200);
          console.log("after query of EventUsers, response length = " + response.length);
      }
    })

});

app.post("/api/rso",async(req,res,next) => {

  console.log("in create rso ... ");

  const name = req.body.name;
  const description = req.body.description;
  const emaildomain = req.body.emaildomain;
  const users = req.body.users;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );

  const baseMembersSql = "Insert into rso_members(rso_user_id, rso_id, isAdmin) values ('" ;

  var rsoSql = "Insert into rso (RSO_name, RSO_description,RSO_emailDomain) " + 
  " values ( '" + name + "','"+ description + "','" + emaildomain + "')";
  
  console.log("rsoSql = " + rsoSql);

  db.query(rsoSql, (error, response) => {
      if (error) return error;
      console.log("query succeeded, id = "+ response.insertId);
      var rsoId = response.insertId;
      var isAdmin = 0;

      for (let i in users) {
          isAdmin = 0;
          // first entry is the admin
          if (i == 0)
            isAdmin = 1;

          var membersSql = baseMembersSql + users[i] + "', " +
             rsoId + "," + isAdmin + ")";

          console.log("membersSql = " + membersSql);

          db.query(membersSql, (error, response) => {
              if (error) return error;
              console.log("member " + i + " insert succeeded!");
          })

        }

          res.json(response);
          res.status(200);
        
    })

});

app.post("/api/displayrso",async(req,res,next) => {

  console.log("in users, process.env.db_host = "+process.env.db_host);

  var email = req.body.email;
  var emaildomain = email.substring(email.indexOf("@"));

  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );

  var sql = "Select * from rso where RSO_emailDomain like '%" + emaildomain + "' "; 
   
  
  db.query(sql, (error, response) => {
      if (error) return error;
      if (response.length > 0) {
          res.json(response);
          res.status(200);
          console.log("after query of RSOs, response length = " + response.length);
      }
    })

});

app.post("/api/joinrso",async(req,res,next) => {

  console.log("in join rso ... ");

  const user_id = req.body.user_id;
  const rso_id = req.body.rso_id;
  const isAdmin = 0;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );

  const baseMembersSql = "Insert into rso_members(rso_user_id, rso_id, isAdmin) values ('"+user_id+"','"+rso_id+"','"+isAdmin +"')" ;


  db.query(baseMembersSql, (error, response) => {
      if (error){
        console.log(error);
        return error;
      }
      console.log("query succeeded, id = "+ response.insertId);
      res.json(response);
      res.status(200);
    })

});

app.post("/api/event",async(req,res,next) => {

  console.log("in create event  ... ");

  const rsoId = req.body.rsoId;
  const eventTitle = req.body.title;
  const subTitle = req.body.subTitle;
  const description = req.body.description;
  const location_name = req.body.locationName;
  const location_lat = req.body.locationLat;
  const location_long = req.body.locationLong;
  const eventDate = req.body.date;
  const eventTime = req.body.time;
  const eventType = req.body.type;
  const category = req.body.category;
  const contact_name = req.body.contactName;
  const contact_phone = req.body.contactPhone;
  const contact_email = req.body.contactEmail;
  
  const baseSql = "insert into events (rso_id, event_title,subtitle,description,location_name,location_latitude,location_longitude,"
      + " event_date,event_time,event_type,category,contact_name,contact_phone,contact_email)	values "
      +  " ( ";

  var eventSql = baseSql + rsoId + ",'" + eventTitle + "','" + subTitle + "','" + 
  description + "','" + location_name + "','" +
     + location_lat + "','" +  location_long + "','" 
    + eventDate + "','" + eventTime + "','" +  eventType + "','" +  category + "','" 
    +  contact_name + "','" + contact_phone + "','" +  contact_email + "' )";
      
  console.log("eventSql = " + eventSql);

  db.query(eventSql, (error, response) => {
      if (error) return error;

      console.log("event insert succeeded, event id = "+ response.insertId);
      res.json(response);
      res.status(200);
  });
});

app.post("/api/selectrso",async(req,res,next) => {

  console.log("in users, process.env.db_host = "+process.env.db_host);

  var user_id = req.body.user_id;

  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );

  var sql = "SELECT * FROM rso INNER JOIN rso_members ON rso_members.rso_id = rso.RSO_ID"
  + " WHERE rso_members.rso_user_id = '"+user_id+"'"
  +" AND rso_members.isAdmin = 1";
  
   
  
  db.query(sql, (error, response) => {
      if (error) {
        console.log(error);
        return error;
      }
      if (response.length > 0) {
          res.json(response);
          res.status(200);
          console.log("after query of RSOs, response length = " + response.length);
      }
    })

});
}