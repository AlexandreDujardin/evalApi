var express = require('express');
var router = express.Router();
var connection = require('../db');
var hal = require('../hal');


/* GET /concerts */
router.get('/concerts', function (req, res, next) {
    connection.query('SELECT * FROM concert;',  (error, rows, fields) => {
        const concerts = rows.map(element => {
          return {
            description: element.description
          }
        });
        res.send(concerts);
      })
})

/* GET /concerts/{id} */
router.get('/concerts/:id', function (req, res, next) {
    //:id : identifiant primaire en base. Ici, on devra rajouter sur la regex 'que des caractères numériques'
    console.log(req.params.id)
    res.status(200).set('Content-Type', 'text/html').send('GET /concerts/{id}')
})

router.post('/foobar', function (req, res, next) {

    /*  #swagger.parameters['obj'] = {
                  in: 'body',
                  description: 'Some description...',
                  schema: {
                      $name: 'John Doe',
                      $age: 29,
                      about: ''
                  }
          } */

    console.log(req.body)
    res.status(200).set('Content-Type', 'text/html').send('POST /concerts/{id}')
})

/**
 * Créer une reservation pour le concert
 * POST /concerts/:name/reservation
 */
router.post('/concerts/:id/reservation', function (req, res, next) {

        /* #swagger.parameters['pseudo'] = {
        in: 'formData',
        description: 'Le pseudo de l\'utilisateur qui effectue la réservation',
        required: 'true',
        type: 'string',
        format: 'application/x-www-form-urlencoded',
        } */

    if (error) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    if(!req.body.pseudo){
        res.status(400).set('Content-Type', 'application/hal+json').send('{"reponse":"Requête invalide, veuiller fournir le pseudo de l\'utilisateur}')
    }

    connection.query('SELECT pseudo FROM user WHERE pseudo = ?;', [req.body.pseudo], (error, rows, fields) => {
        if(error){
            console.error('Error connecting: ' + error.stack);
            return;
        }

        if(rows.length === 0) {
            res.status(400).set('Content-type', 'application/hal+json').send('{ "response": "Requête invalide, l\'utilisateur n\'existe pas"}')
            return
        }

        res.status(200).send('On continue')
    })

    console.log(req.body)
    res.status(201).set('Content-Type', 'text/html').send('POST /concerts/{id}/reservation')

})


/**
 * Modifier une reservation pour le concert: confirmer ou annuler
 * PUT /concerts/:name/reservation
 */
router.put('/concerts/:id/reservation', function (req, res, next) {

    if (error) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    res.status(201).set('Content-Type', 'text/html').send('PUT /concerts/{id}/reservation')

})

module.exports = router;
