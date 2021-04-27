import React from 'react';
// import classNames from 'classnames';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import Logo from '../../assets/images/logo.png';
import styles from './AppBar.scss';

const AppBar = () => (
    <div className={styles.container}>
        <Link to={routes.HOME}>
            <img alt="logo" className={styles.logo} src={Logo} />
        </Link>
        <div className={styles.title}>Earthquake Zen Garden</div>
        <Link className={styles.profileLink} to={routes.PROFILE}>
            Welcome Sally
        </Link>
    </div>
);

export default AppBar;
