import React, {
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { getEarthquakeDetailsById } from '../../fake-api';
import Loader from '../shared/Loader';
import styles from './EarthquakeDetailsContainer.scss';

const EarthquakeDetailsContainer = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [earthquakeData, setEarthquakeData] = useState({});

    const loadData = useCallback(async () => {
        setIsLoading(true);

        const response = await getEarthquakeDetailsById(id);

        setEarthquakeData(response);
        setIsLoading(false);
    }, [id]);

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
                        {earthquakeData.properties?.title}
                    </h2>
                    <div className={styles.dataTable}>
                        <div className={styles.header}>Title</div>
                        <div>{earthquakeData.properties?.title}</div>
                        <div className={styles.header}>Magnitude</div>
                        <div>{earthquakeData.properties?.mag}</div>
                        <div className={styles.header}>Time</div>
                        <div>{earthquakeData.properties?.time}</div>
                        <div className={styles.header}>Status</div>
                        <div>{earthquakeData.properties?.status}</div>
                        <div className={styles.header}>Tsunami</div>
                        <div>{earthquakeData.properties?.tsunami}</div>
                        <div className={styles.header}>Type</div>
                        <div>{earthquakeData.properties?.type}</div>
                    </div>
                </>
            )}
        </div>
    );
};

export default EarthquakeDetailsContainer;
