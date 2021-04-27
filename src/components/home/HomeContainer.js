import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Link } from 'react-router-dom';
import sortby from 'lodash.sortby';
import { DateTime } from 'luxon';
import { getEarthquakeData } from '../../fake-api';
import * as routes from '../../constants/routes';
import { fillRouteParamters } from '../../utils/routes';
import Loader from '../shared/Loader';
import styles from './HomeContainer.scss';

const COLUMNS = {
    title: {
        field: 'title',
        label: 'Title',
    },
    magnitude: {
        field: 'mag',
        label: 'Magnitude',
    },
    time: {
        field: 'time',
        label: 'Time',
    },
};

const HomeContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [sortColumnField, setSortColumnField] = useState(COLUMNS.magnitude.field);
    const [sortDescending, setSortDescending] = useState(true);
    const [earthquakeData, setEarthquakeData] = useState({});

    const loadData = useCallback(async () => {
        setIsLoading(true);

        const response = await getEarthquakeData();

        setEarthquakeData(response);
        setIsLoading(false);
    }, []);

    const onClickHeader = (fieldName) => {
        setSortDescending((currentValue) => (
            fieldName === sortColumnField ? !currentValue : true
        ));

        setSortColumnField(fieldName);
    };

    useEffect(() => {
        loadData();
    }, [loadData]);

    const sortedFeatures = useMemo(() => {
        const sorted = sortby(earthquakeData.features || [], `properties.${sortColumnField}`);
        return sortDescending ? sorted.reverse() : sorted;
    }, [earthquakeData, sortColumnField, sortDescending]);

    return (
        <div className={styles.container}>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <h2 className={styles.title}>
                        {earthquakeData.metadata?.title}
                    </h2>
                    <table className={styles.dataTable}>
                        <thead>
                            <tr>
                                {Object.values(COLUMNS).map((currentColumn) => (
                                    <th
                                        key={currentColumn.field}
                                        onClick={() => onClickHeader(currentColumn.field)}
                                    >
                                        {currentColumn.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedFeatures.map((currentFeature) => {
                                const detailRoute = fillRouteParamters(
                                    routes.EARTHQUAKE_DETAILS,
                                    { id: currentFeature.id }
                                );

                                const formattedTime = DateTime.fromMillis(currentFeature.properties.time)
                                    .toLocaleString(DateTime.DATETIME_MED);

                                return (
                                    <tr key={currentFeature.id}>
                                        <td className={styles.nameCell}>
                                            <Link to={detailRoute}>
                                                {currentFeature.properties.place}
                                            </Link>
                                        </td>
                                        <td>
                                            {currentFeature.properties.mag}
                                        </td>
                                        <td>
                                            {formattedTime}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default HomeContainer;
