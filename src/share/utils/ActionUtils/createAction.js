
function createAction(APP_ID, type, payload = {}) {
    return {APP_ID, type, payload, timestamp: Date.now()};
}

export default createAction;
