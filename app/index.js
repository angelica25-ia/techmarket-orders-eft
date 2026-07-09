const express = require('express');
const _ = require('lodash');

const app = express();
const port = 3000;

/**
 * Simula una operación pesada para pruebas.
 */
function calculateHeavyMetric(iterations) {
    let sum = 0;

    for (let i = 0; i < iterations; i++) {
        let subResult = 1;

        for (let j = 0; j < 5000; j++) {
            subResult = (subResult * 1.0000001) + 1;
        }

        sum += subResult;
    }

    return sum;
}

/**
 * Procesa usuarios utilizando Lodash.
 */
function prepareData(users) {

    const activeUsers = _.filter(users, { status: 'active' });

    const sortedUsers = _.sortBy(activeUsers, 'name');

    return _.take(sortedUsers, 5);

}

/**
 * Mensaje principal de la aplicación.
 */
function greet(name) {

    const appColor = process.env.APP_COLOR || "Mundo";

    if (!name) {
        return `TechMarket Orders - ${appColor}`;
    }

    return `Hola ${name}, bienvenido a TechMarket Orders (${appColor})`;

}

module.exports = {
    greet,
    calculateHeavyMetric,
    prepareData
};

/* Página principal */
app.get('/', (req, res) => {

    res.send(greet(req.query.name));

});

/* Health Check */
app.get('/health', (req, res) => {

    res.status(200).json({
        status: "UP",
        application: "TechMarket Orders"
    });

});

if (require.main === module) {

    app.listen(port, () => {

        console.log(`TechMarket Orders ejecutándose en puerto ${port}`);

    });

}
