/**
 * Export des fonctions utils hal
 */

var connection = require('./db');

/**
 * Retourne un Link Object
 * @param {*} url 
 * @param {*} type 
 * @param {*} name 
 * @param {*} templated 
 * @param {*} deprecation 
 * @returns 
 */
function halLinkObject(url, type = '', name = '', templated = false, deprecation = false) {

    return {
        "href": url,
        "templated": templated,
        ...(type && { "type": type }),
        ...(name && { "name": name }),
        ...(deprecation && { "deprecation": deprecation })
    }
}

/**
 * Retourne une représentation Ressource Object (HAL) d'un concert
 * @param {*} concertData Données brutes d'un concert
 * @returns un Ressource Object Concert (spec HAL)
 */
function mapConcertoResourceObject(concertData, baseURL) {

    /**
     * A faire: requêter le nombre de reservations pour calculer le nombre de places disponibles
     * Attention a l'async
     */
    const reservations = 0

    const resourceObject = {
        "_links": [{
            "self": halLinkObject(baseURL + '/concerts' + '/' + concertData.id, 'string', 'Les informations d\'un concert'),
            "reservation": halLinkObject(baseURL + '/concerts' + '/' + concertData.id + '/reservation', 'string')
        }],
        "_embedded": {
            "id": concertData.id,
            "date": concertData.date_debut,
            "nb_places": concertData.nb_places,
            "nb_places_disponibles": concertData.nb_places - reservations.length,
            "lieu": concertData.lieu,
            "description": concertData.description
        }
    }

    return resourceObject
}

/**
 * Retourne un Resource Object d'un utilisateur
 * @param {*} utilisateurData 
 * @param {*} baseURL 
 * @returns 
 */
function mapUtilisateurtoResourceObject(utilisateurData, baseURL) {

    return {
        "_links": [{
            "self": halLinkObject(baseURL + '/utilisateurs' + '/' + utilisateurData.pseudo, 'string'),
        }],
        "_embedded": {
            "pseudo": utilisateurData.pseudo
        }
    }
}