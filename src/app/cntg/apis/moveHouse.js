
import callApi from '../../../share/utils/SagaUtils/callApi';
import * as fakeData from './data.fake';

export const getList = (payload) => {
    const options = {
        method: 'GET'
    };
    // const url = 'http://vanchuyenantam.xyz/api/cntg/data';
    // return callApi(url, options);
    return {
        response: fakeData.data
    }
};

