const { greet, calculateHeavyMetric, prepareData } = require('./index');
const moment = require('moment');

describe('Función greet()', () => {

    beforeEach(() => {
        process.env.APP_COLOR = "Mundo";
    });

    test('Debe saludar correctamente', () => {

        expect(greet("Desarrollador"))
            .toBe("Hola Desarrollador, bienvenido a TechMarket Orders (Mundo)");

    });

    test('Debe devolver el saludo por defecto', () => {

        expect(greet())
            .toBe("TechMarket Orders - Mundo");

    });

});

describe('Preparación de datos', () => {

    const users = [

        { id:101,name:"Charlie",status:"inactive",created:"2023-01-15"},
        { id:102,name:"Alice",status:"active",created:"2024-03-20"},
        { id:103,name:"Bob",status:"active",created:"2023-11-01"},
        { id:104,name:"Diana",status:"active",created:"2024-05-10"},
        { id:105,name:"Eve",status:"active",created:"2024-01-01"},
        { id:106,name:"Frank",status:"active",created:"2024-06-01"}

    ];

    test('Debe preparar correctamente los datos', () => {

        const result = prepareData(users);

        expect(result.length).toBe(5);
        expect(result[0].name).toBe("Alice");
        expect(result[1].name).toBe("Bob");

    });

    test('Debe encontrar el usuario más reciente', () => {

        const recent = users
            .filter(u => u.status === "active")
            .sort((a,b)=>moment(b.created)-moment(a.created))[0];

        expect(recent.name).toBe("Frank");

    });

});

describe('Carga pesada', () => {

    test('Debe ejecutar cálculo pesado', () => {

        const result = calculateHeavyMetric(10000);

        expect(result).toBeGreaterThan(0);

    });

});
