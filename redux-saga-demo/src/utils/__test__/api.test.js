import { getUser, getDepartureInfo, getFlightInfo, getForecast } from '../api';

describe('fetch travel information', async () => {
    it('should return the user Peter Jackson', () => {
        expect.assertions(1);
        return getUser()
            .then(user => {
                expect(user).toMatchObject({
                    email: 'peter@gmail.com',
                    username: 'Peter Jackson'
                });
            });
    });

    const user = await getUser();

    it('should return departure info', () => {
        expect.assertions(2);
        return getDepartureInfo(user)
            .then(info => {
                expect(info.userID).toBe(user.email);
                expect(info.flightID).toBe('KL999');
            });
    });

    const departInfo = await getDepartureInfo(user);

    it('should get fligt info', () => {
        expect.assertions(2);
        return getFlightInfo(departInfo.flightID)
            .then(info => {
                expect(info.id).toBe(departInfo.flightID)
                expect(info.status).toBe('on time');
            });
    })

    it('should return weather', () => {
        expect.assertions(1);
        return getForecast(departInfo.date)
            .then(data => {
                expect(data).toMatchObject({
                    date: departInfo.date,
                    temperature: 16,
                    weather: 'rain'
                });
            });
    })
});