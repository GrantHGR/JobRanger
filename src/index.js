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

          res.redirect(200, '/home');
        } else {
          res.locals.message = 'Incorrect username or password.';
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

app.use(auth);

app.get('/logout', (req, res) => {
  user.username = undefined;
  user.password = undefined;
  req.session.user = user;
  req.session.save();
  res.locals.message = 'Logged out successfully';
  res.render("pages/login");
});

const getData = async () => {
  const getGeneral = `SELECT * FROM general WHERE username = '${user.username}'`;
  const getEducations = `SELECT * FROM educations WHERE username = '${user.username}'`;
  const getExperiences = `SELECT * FROM experiences WHERE username = '${user.username}'`;
  const getSkills = `SELECT * FROM skills WHERE username = '${user.username}'`;
  const getLanguages = `SELECT * FROM languages WHERE username = '${user.username}'`;
  const getLocations = `SELECT * FROM locations WHERE username = '${user.username}'`;

  try {
    const data = await db.task('get-everything', task => {
      return task.batch([task.any(getGeneral), task.any(getEducations), task.any(getExperiences), task.any(getSkills), task.any(getLanguages), task.any(getLocations)]);
    });
    return data;
  } 
  catch (error) {
    return [];
  }
};

app.get('/info', async (req, res) => {
  return res.render("pages/info", {
    data: await getData(),
  });
});

app.post('/info/addGeneral', async (req, res) => {
  const add = `INSERT INTO general (firstname, lastname, dob, email, linkedin, github, username) SELECT '${req.body.firstname}', '${req.body.lastname}', '${req.body.dob}', '${req.body.email}', '${req.body.linkedin}', '${req.body.github}', '${user.username}' WHERE NOT EXISTS (SELECT * FROM general WHERE username = '${user.username}');`;
  db.task('get-everything', task => {
    return task.one(add);
  })
    .then(async data => {
      res.render("pages/info", {
        data: await getData(),
        message: "Succeeded to add general information",
      });
    })
    .catch(async err => {
      res.render("pages/info", {
        data: await getData(),
        message: "Failed to add general information",
      });
    });
});

app.post('/info/addEducation', async (req, res) => {
  const add = `INSERT INTO educations (school, degree, focus, startdate, endDate, description, username) SELECT '${req.body.school}', '${req.body.degree}', '${req.body.focus}', '${req.body.startdate}', '${req.body.endDate}', '${req.body.description}', '${user.username}' WHERE NOT EXISTS (SELECT * FROM educations WHERE school = '${req.body.school}' AND degree = '${req.body.degree}' AND focus = '${req.body.focus}' AND username = '${user.username}');`;
  console.log(req.body.endDate);
  db.task('get-everything', task => {
    return task.one(add);
  })
    .then(async data => {
      console.log(req.body.endDate);
      res.render("pages/info", {
        data: await getData(),
        message: "Succeeded to add education",
      });
    })
    .catch(async err => {
      res.render("pages/info", {
        data: await getData(),
        message: "Failed to add education",
      });
    });
});

app.post('/info/rmEducation', (req, res) => {
  const rm = `DELETE FROM educations WHERE id = '${req.body.id}';`;

  db.task('get-everything', task => {
    return task.any(rm);
  })
    .then(async data => {
      res.render("pages/info", {
        data: await getData(),
        message: "Succeeded to delete education",
      });
    })
    .catch(async err => {
      res.render("pages/info", {
        data: await getData(),
        message: "Failed to delete education",
      });
    });
});

app.post('/info/addExperience', async (req, res) => {
  const add = `INSERT INTO experiences (organization, title, startdate, endDate, description, username) SELECT '${req.body.organization}', '${req.body.title}', '${req.body.startdate}', '${req.body.endDate}', '${req.body.description}','${user.username}' WHERE NOT EXISTS (SELECT * FROM experiences WHERE organization = '${req.body.organization}' AND title = '${req.body.title}' AND username = '${user.username}');`;

  db.task('get-everything', task => {
    return task.one(add);
  })
    .then(async data => {
      res.render("pages/info", {
        data: await getData(),
        message: "Succeeded to add experience",
      });
    })
    .catch(async err => {
      res.render("pages/info", {
        data: await getData(),
        message: "Failed to add experience",
      });
    });
  
});

app.post('/info/rmExperience', (req, res) => {
  const rm = `DELETE FROM experiences WHERE id = '${req.body.id}';`;

  db.task('get-everything', task => {
    return task.any(rm);
  })
    .then(async data => {
      res.render("pages/info", {
        data: await getData(),
        message: "Succeeded to delete experience",
      });
    })
    .catch(async err => {
      res.render("pages/info", {
        data: await getData(),
        message: "Failed to delete experience",
      });
    });
});

app.post('/info/addSkill', async (req, res) => {
  const add = `INSERT INTO skills (skill, username) SELECT '${req.body.skill}', '${user.username}' WHERE NOT EXISTS (SELECT * FROM skills WHERE skill = '${req.body.skill}' AND username = '${user.username}');`;

  db.task('get-everything', task => {
    return task.any(add);
  })
    .then(async data => {
      res.render("pages/info", {
        data: await getData(),
        message: "Succeeded to add skill",
      });
    })
    .catch(async err => {
      res.render("pages/info", {
        data: await getData(),
        message: "Failed to add skill",
      });
    });
});

app.post('/info/rmSkill', async (req, res) => {
  const rm = `DELETE FROM skills WHERE id = '${req.body.id}';`;

  db.task('get-everything', task => {
    return task.any(rm);
  })
    .then(async data => {
      res.render("pages/info", {
        data: await getData(),
        message: "Succeeded to delete skill",
      });
    })
    .catch(async err => {
      res.render("pages/info", {
        data: await getData(),
        message: "Failed to delete skill",
      });
    });
});

app.post('/info/addLanguage', async (req, res) => {
  const add = `INSERT INTO languages (language, proficiency, username) SELECT '${req.body.language}', '${req.body.proficiency}', '${user.username}' WHERE NOT EXISTS (SELECT * FROM languages WHERE language = '${req.body.language}' AND username = '${user.username}');`;

  db.task('get-everything', task => {
    return task.any(add);
  })
    .then(async data => {
      res.render("pages/info", {
        data: await getData(),
        message: "Succeeded to add language",
      });
    })
    .catch(async err => {
      res.render("pages/info", {
        data: await getData(),
        message: "Failed to add language",
      });
    });
});

app.post('/info/rmLanguage', async (req, res) => {
  const rm = `DELETE FROM languages WHERE id = '${req.body.id}';`;

  db.task('get-everything', task => {
    return task.any(rm);
  })
    .then(async data => {
      res.render("pages/info", {
        data: await getData(),
        message: "Succeeded to delete language",
      });
    })
    .catch(async err => {
      res.render("pages/info", {
        data: await getData(),
        message: "Failed to delete language",
      });
    });  
});

app.post('/info/addLocation', async (req, res) => {
  const add = `INSERT INTO locations (country, city, username) SELECT '${req.body.country}', '${req.body.city}', '${user.username}' WHERE NOT EXISTS (SELECT * FROM locations WHERE country = '${req.body.country}' AND city = '${req.body.city}' AND username = '${user.username}');`;

  db.task('get-everything', task => {
    return task.any(add);
  })
    .then(async data => {
      res.render("pages/info", {
        data: await getData(),
        message: "Succeeded to add location",
      });
    })
    .catch(async err => {
      res.render("pages/info", {
        data: await getData(),
        message: "Failed to add location",
      });
    });
});

app.post('/info/rmLocation', async (req, res) => {
  const rm = `DELETE FROM locations WHERE id = '${req.body.id}';`;

  db.task('get-everything', task => {
    return task.any(rm);
  })
    .then(async data => {
      res.render("pages/info", {
        data: await getData(),
        message: "Succeeded to delete location",
      });
    })
    .catch(async err => {
      res.render("pages/info", {
        data: await getData(),
        message: "Failed to delete location",
      });
    });
});

// *****************************************************
// <!-- Section 5 : Start Server-->
// *****************************************************
// starting the server and keeping the connection open to listen for more requests
module.exports = app.listen(3000);
console.log('Server is listening on port 3000');
