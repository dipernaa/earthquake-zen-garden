const fillRouteParamters = (route = '', parameters = {}) => (
    Object.keys(parameters).reduce((builtRoute, currentKey) => (
        builtRoute.replace(`:${currentKey}`, parameters[currentKey])
    ), route)
);

export {
    fillRouteParamters,
};
