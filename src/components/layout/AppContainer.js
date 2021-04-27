import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as routes from '../../constants/routes';
import Loader from '../shared/Loader';
import AppBar from './AppBar';
import styles from './AppContainer.scss';

const HomeContainer = React.lazy(() => import('../home/HomeContainer'));
const EarthquakeDetailsContainer = React.lazy(() => import('../earthquake-details/EarthquakeDetailsContainer'));
const ProfileContainer = React.lazy(() => import('../profile/ProfileContainer'));

const AppContainer = () => (
    <div>
        <AppBar />
        <React.Suspense fallback={<Loader />}>
            <div className={styles.contentContainer}>
                <Switch>
                    <Route path={routes.HOME}>
                        <HomeContainer />
                    </Route>
                    <Route path={routes.EARTHQUAKE_DETAILS}>
                        <EarthquakeDetailsContainer />
                    </Route>
                    <Route path={routes.PROFILE}>
                        <ProfileContainer />
                    </Route>
                    <Route path="*">
                        <Redirect to={routes.HOME} />
                    </Route>
                </Switch>
            </div>
        </React.Suspense>
    </div>
);

export default AppContainer;
