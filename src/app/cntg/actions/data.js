import { GET_DATA_CNTG } from './actionstype';

export const getDataCNTG = (data) => {
    return {
        type: GET_DATA_CNTG,
        payload: data
    };
};
