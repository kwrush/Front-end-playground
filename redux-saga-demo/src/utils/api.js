/**
 * Mock async api call
 */
export const getUser = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve(Object.assign({}, {
            email: 'peter@gmail.com',
            username: 'Peter Jackson'
        }));
    }, 3000);
});

export const getDepartureInfo = user => new Promise((resolve) => {
    setTimeout(() => {
        resolve(Object.assign({}, {
            userID: user.email,
            name: user.username,
            flightID: 'KL999',
            date: '5/9/2017 13:00',
            from: 'Amsterdam',
            to: 'Beijing'
        }));
    }, 2500);
});

export const getFlightInfo = flightId => new Promise((resolve) => {
    setTimeout(() => {
        resolve(Object.assign({}, {
            id: flightID,
            airline: 'KLM',
            plane: {
                make: 'Boeing 747',
                model: '001'
            },
            status: 'on time'
        }))
    }, 4500);
});

export const getForecast = date => new Promise((resolve) => {
    setTimeout(() => {
        resolve(Object.assign({}, {
            date: date,
            temperature: 16,
            weather: 'rain'
        }))
    }, 2000)
});