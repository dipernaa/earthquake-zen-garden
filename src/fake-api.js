import staticData from './static-data.json';

const fakeApiCall = (wasSuccessful, data) => (
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!wasSuccessful) {
                return reject(data);
            }

            return resolve(data);
        }, 1500);
    })
);

const getProfile = () => (
    fakeApiCall(true, staticData.profile)
);

const getEarthquakeData = () => (
    fakeApiCall(true, staticData.data)
);

const getEarthquakeDetailsById = (id) => {
    const earthquakesById = staticData.data.features.reduce((accumulatedData, currentItem) => ({
        ...accumulatedData,
        [currentItem.id]: currentItem,
    }), {});

    const foundEarthquake = earthquakesById[id];
    return fakeApiCall(Boolean(foundEarthquake), foundEarthquake);
};

export {
    getProfile,
    getEarthquakeData,
    getEarthquakeDetailsById,
};
