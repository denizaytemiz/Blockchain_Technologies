//Database connection method

// Held constructor for the use in the file
const { Connection, Request } = require("tedious");


// These are the parameters that will be set for the request
const params = {
  authentication: {
    options: {
      userName: "Public Key", 
      password: "Private Key" 
    },
    type: "default"
  },
  server: "Private_Medical_Server.net",
  options: {
    database: "Specific_Database",
    encrypt: true
  }
};




//the constrstor that will create the connection call
const newConnect = new Connection(request);

//the connection process takes place
newConnect.on("connect", error => { if(error) {
    console.error(err.message);}
    else {
        //if there is an error report to the 
        queryDatabase();
    }
});


//move on to actulally querring the database
function queryData() {
    //create the request script            //selecting the data from the username or patient
    const request = new Request( 'SELECT pub_key, enc_data, hash_patient FROM [UserName]', 
    (error, rowCount) => {
        if (error) {
            console.log(err.message);
        }
        else {
            console.log('${rowCount} patien records returned');
        }
    });

    newConnect.execSql(request);
}
