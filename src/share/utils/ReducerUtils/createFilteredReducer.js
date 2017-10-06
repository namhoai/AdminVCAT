/**
 * http://redux.js.org/docs/recipes/reducers/ReusingReducerLogic.html
 *
 * @param reducerFunction
 * @param reducerPredicate
 * @returns {function(*=, *=)}
 */
function createFilteredReducer(reducerFunction, reducerPredicate) {
    return (state, action) => {
        const isInitializationCall = state === undefined;
        const shouldRunWrappedReducer = reducerPredicate(action) || isInitializationCall;
        return shouldRunWrappedReducer ? reducerFunction(state, action) : state;
    };
}

export default createFilteredReducer;
