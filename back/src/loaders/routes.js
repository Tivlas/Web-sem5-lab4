import userModule from '../components/user/user.module.js';
import countryModule from '../components/country/country.module.js';
import authModule from '../components/auth/auth.module.js';
import tripModule from '../components/trip/trip.module.js';
//import newsModule from '../components/news/news.module.js';
//import reviewModule from '../components/review/review.module.js'

export default (app) => {
    app.use('/users', userModule.router);
    app.use('/trip', tripModule.router);
    //app.use('/news', newsModule.router);
    app.use('/country', countryModule.router);
    //app.use('/review', reviewModule.router);
    app.use('/auth', authModule.router);
};