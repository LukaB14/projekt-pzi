const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(cors());
// Parser za JSON podatke
app.use(bodyParser.json());

// Parser za podatke iz formi
app.use(bodyParser.urlencoded({ extended: true }));


const connection = mysql.createConnection({
    host: 'student.veleri.hr',
    user: 'lbrenko',
    password: '11',
    database: 'lbrenko'
  });
 
app.use(express.urlencoded({ extended: true }));
 
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


app.get("/api/odjeca", (request, response) => {
    
    connection.query("SELECT * FROM PziOdjeca", (error, results) => {
      if (error) throw error;
      response.send(results);
    });
});

app.get("/api/odjeca/:id", (request, response) => {
    const id = request.params.id;
    connection.query("SELECT * FROM PziOdjeca WHERE id = ?", id, (error, results) => {
        if (error) throw error;
        response.send(results);
      });
});

app.post("/api/rezerv_odjece", (request, response) => {
    const data = request.body;
    rezervacija = [[data.datum, data.id_odjece, data.korisnik]]

    connection.query("INSERT INTO PziRezervacija (DatumRezervacije, IdOdjece, korisnik) VALUES ?", [rezervacija], (error, results) => {
      if (error) throw error;
      response.send(results);
    });
  });

  app.post("/api/unos_odjece", (request, response) => {
    const data = request.body;
    odjeca = [[data.VelicinaOdjece, data.Cijena, data.MarkaOdjece, data.VrstaOdjece]]

    connection.query("INSERT INTO PziOdjeca (VelicinaOdjece, Cijena, MarkaOdjece, VrstaOdjece) VALUES ?", [odjeca], (error, results) => {
      if (error) throw error;
      response.send(results);
    });
  });

  app.listen(port, () => {
    console.log("Server running at port: " + port);
});
