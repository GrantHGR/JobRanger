// *****************************************************
// <!-- Section 1 : Import Dependencies -->
// *****************************************************

const express = require('express'); // To build an application server or API
const app = express();
const pgp = require('pg-promise')(); // To connect to the Postgres DB from the node server
const bodyParser = require('body-parser');
const session = require('express-session'); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require('bcrypt'); //  To hash passwords
const axios = require('axios'); // To make HTTP requests from our server. We'll learn more about it in Part B.

// *****************************************************
// <!-- Section 2 : Connect to DB -->
// *****************************************************

// database configuration
const dbConfig = {
  host: 'db', // the database server
  port: 5432, // the database port
  database: process.env.POSTGRES_DB, // the database name
  user: process.env.POSTGRES_USER, // the user account to connect with
  password: process.env.POSTGRES_PASSWORD, // the password of the user account
};

const db = pgp(dbConfig);

// test your database
db.connect()
  .then(obj => {
    console.log('Database connection successful'); // you can view this message in the docker compose logs
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });

// *****************************************************
// <!-- Section 3 : App Settings -->
// *****************************************************

app.set('view engine', 'ejs'); // set the view engine to EJS
app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.

// initialize session variables
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const user = {
  username: undefined,
  password: undefined
}

// *****************************************************
// <!-- Section 4 : API Routes -->
// *****************************************************

app.get('/', (req, res) => {
    res.redirect('/login');
});
  
app.get('/login', (req, res) => {
    res.render("pages/login");
});

app.post('/login', async (req, res) => {
    const access = `SELECT * FROM users WHERE username = '${req.body.username}';`;

    db.task('get-everything', async task => {
      return task.any(access);
    })
      .then(async data => {
        if (await bcrypt.compare(req.body.password, data[0].password)) {
          user.username = data[0].username;
          user.password = data[0].password;
          req.session.user = user;
          req.session.save();

          res.redirect(200, '/discover');
        } else {
          // res.locals.message = 'Incorrect username or password.';
          res.status(200).render("pages/login");
        }
      })
      .catch(err => {
        res.redirect(200,'/register');
      });
});

app.get('/register', (req, res) => {
    res.render('pages/register');
});

app.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);
    const insert = `INSERT INTO users (username, password) VALUES ('${username}', '${password}');`;

    db.task('get-everything', task => {
        return task.any(insert);
    })
        .then(data => {
          res.redirect('/login');
        })
        .catch(err => {
          res.redirect('/register');
        });
});

const auth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

app.get('/logout', (req, res) => {
  user.username = undefined;
  user.password = undefined;
  req.session.user = user;
  req.session.save();
  res.locals.message = 'Logged out successfully';
  res.render("pages/login");
});

app.get('/info', (req, res) => {
  res.render('pages/info');
});

app.post('/info/addGeneral', (req, res) => {
  const add = `INSERT INTO general (firstname, lastname, dob, email, linkedin, github, username) VALUES ('${req.body.firstname}', '${req.body.lastname}', '${req.body.dob}', '${req.body.email}', '${req.body.linkedin}', '${req.body.github}' ,'${user.username}') WHERE NOT EXISTS (SELECT * FROM general WHERE username = '${user.username}')`;

  db.task('get-everything', task => {
    return task.any(add);
  })
    .then(data => {
      res.render("pages/info", {
        message: "Succeeded to add general information",
      });
    })
    .catch(err => {
      res.render("pages/info", {
        message: "Failed to add general information",
      });
    });
});

app.post('/info/addEducation', (req, res) => {
  const add = `INSERT INTO educations (school, degree, focus, startdate, endDate, username) VALUES ('${req.body.school}', '${req.body.degree}', '${req.body.focus}', '${req.body.startdate}', '${req.body.endDate}','${user.username}')`;

  db.task('get-everything', task => {
    return task.any(add);
  })
    .then(data => {
      res.render("pages/info", {
        message: "Succeeded to add education",
      });
    })
    .catch(err => {
      res.render("pages/info", {
        message: "Failed to add education",
      });
    });
});

app.delete('/info/rmEducation', (req, res) => {
  
});

app.post('/info/addEducationDescription', (req, res) => {
  
});

app.delete('/info/rmEducationDescription', (req, res) => {
  
});

app.post('/info/addExperience', (req, res) => {
  const add = `INSERT INTO experiences (organization, title, startdate, endDate, username) VALUES ('${req.body.organization}', '${req.body.title}', '${req.body.startdate}', '${req.body.endDate}','${user.username}')`;

  db.task('get-everything', task => {
    return task.any(add);
  })
    .then(data => {
      res.render("pages/info", {
        message: "Succeeded to add experience",
      });
    })
    .catch(err => {
      res.render("pages/info", {
        message: "Failed to add experience",
      });
    });
  
});

app.delete('/info/rmExperience', (req, res) => {
  
});

app.post('/info/addExperienceDescription', (req, res) => {
  
});

app.delete('/info/rmExperienceDescription', (req, res) => {
  
});

app.post('/info/addSkill', (req, res) => {
  const add = `INSERT INTO skills (skill, username) VALUES ('${req.body.skill}', '${req.body.username}')`;

  db.task('get-everything', task => {
    return task.any(add);
  })
    .then(data => {
      res.status(200).render("pages/info", {
        message: "Succeeded to add skill",
      });
    })
    .catch(err => {
      res.status(400).render("pages/info", {
        message: "Failed to add skill",
      });
    });
});

app.delete('/info/rmSkill', (req, res) => {
  const rm = `DELETE FROM skills WHERE skill = '${req.body.skill}' AND username = '${user.username}'`;

  db.task('get-everything', task => {
    return task.any(add);
  })
    .then(data => {
      res.render("pages/info", {
        message: "Succeeded to delete skill",
      });
    })
    .catch(err => {
      res.render("pages/info", {
        message: "Failed to delete skill",
      });
    });
});

app.post('/info/addLanguage', (req, res) => {
  const add = `INSERT INTO languages (language, proficiency, username) VALUES ('${req.body.language}', '${req.body.proficiency}', '${user.username}') WHERE NOT EXISTS (SELECT * FROM languages WHERE language = '${req.body.language}')`;

  db.task('get-everything', task => {
    return task.any(add);
  })
    .then(data => {
      res.render("pages/info", {
        message: "Succeeded to add language",
      });
    })
    .catch(err => {
      res.render("pages/info", {
        message: "Failed to add language",
      });
    });
});

app.delete('/info/rmLanguage', (req, res) => {
  const rm = `DELETE FROM languages WHERE language = '${req.body.language}' AND username = '${user.username}'`;

  db.task('get-everything', task => {
    return task.any(add);
  })
    .then(data => {
      res.render("pages/info", {
        message: "Succeeded to delete language",
      });
    })
    .catch(err => {
      res.render("pages/info", {
        message: "Failed to delete language",
      });
    });  
});

app.post('/info/addLocation', (req, res) => {
  const add = `INSERT INTO locations (country, city, username) VALUES ('${req.body.country}', '${req.body.city}', '${user.username}') WHERE NOT EXISTS (SELECT * FROM locations WHERE country = '${req.body.country}' AND '${req.body.city}')`;

  db.task('get-everything', task => {
    return task.any(add);
  })
    .then(data => {
      res.render("pages/info", {
        message: "Succeeded to add location",
      });
    })
    .catch(err => {
      res.render("pages/info", {
        message: "Failed to add location",
      });
    });
});

app.delete('/info/rmLocation', (req, res) => {
  const rm = `DELETE FROM locations WHERE country = '${req.body.country}' AND city = '${req.body.city}' AND username = '${user.username}'`;

  db.task('get-everything', task => {
    return task.any(add);
  })
    .then(data => {
      res.render("pages/info", {
        message: "Succeeded to delete location",
      });
    })
    .catch(err => {
      res.render("pages/info", {
        message: "Failed to delete location",
      });
    });
});

// *****************************************************
// <!-- Section 5 : Start Server-->
// *****************************************************
// starting the server and keeping the connection open to listen for more requests
// module.exports = app.listen(3000);
module.exports = app.listen(3000);
console.log('Server is listening on port 3000');
