
function createActionNoAppID(type, payload = {}) {
    return {type, payload, timestamp: Date.now()};
}

export default createActionNoAppID;
