
import {SagaUtils} from '../../../share';
import * as fakeData from './data.fake';
const {callApi} = SagaUtils;

export const getList = (payload) => {
    const options = {
        method: 'GET',
        mode: 'cors',
    };
    // const url = 'http://vanchuyenantam.xyz/api/cntg/data';
    // return callApi(url, options);
    return {
        response: fakeData.data
    }
};

