import React, {
    useCallback,
    useEffect,
    useState,
} from 'react';
import { getProfile } from '../../fake-api';
import Loader from '../shared/Loader';
import styles from './ProfileContainer.scss';

const ProfileContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [profileData, setProfileData] = useState({});

    const loadData = useCallback(async () => {
        setIsLoading(true);

        const response = await getProfile();

        setProfileData(response);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <div className={styles.container}>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <h2 className={styles.title}>
                        Profile
                    </h2>
                    <div className={styles.dataContainer}>
                        <img
                            alt="profile"
                            className={styles.profilePicture}
                            src={profileData.avatarImage}
                        />
                        <div className={styles.dataTable}>
                            <div className={styles.header}>First Name</div>
                            <div>{profileData.firstName}</div>
                            <div className={styles.header}>Last Name</div>
                            <div>{profileData.lastName}</div>
                            <div className={styles.header}>Phone</div>
                            <div>{profileData.phone}</div>
                            <div className={styles.header}>Email</div>
                            <div>{profileData.email}</div>
                            <div className={styles.header}>Bio</div>
                            <div>{profileData.bio}</div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileContainer;
