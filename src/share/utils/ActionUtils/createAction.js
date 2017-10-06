
function createAction(APP_ID, type, payload = {}) {
    debugger;
    return {APP_ID, type, payload, timestamp: Date.now()};
}

export default createAction;
