/**
 * Created by namvh on 15/10/2017
 */

import {SagaUtils} from '../../../share';
import * as fakeData from './data.fake';
const {callApi} = SagaUtils;

export const getList = (payload) => {
    const options = {
        method: 'GET',
        mode: 'cors',
    };
    const url = 'http://vanchuyenantam.xyz/api/member';
    return callApi(url, options);
    // return {
    //     response: fakeData.member
    // }
};

export const post = (payload) => {
    debugger;
    const member = {
        name: payload.getIn(['data', 'name']),
        avatar: payload.getIn(['data', 'avatar']),
        phone: payload.getIn(['data', 'phone']),
        address: payload.getIn(['data', 'address']),
        pictureId: payload.getIn(['data', 'pictureId']),
        level: payload.getIn(['data', 'level']),
        totalApply: payload.getIn(['data', 'totalApply']),
        yearBirth: payload.getIn(['data', 'yearBirth'])
    };
    const url = payload.get('href');
    const options = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        mode: 'cors',
        body: JSON.stringify(member)
    };
    return callApi(url, options);
};

export const update = (payload) => {
    debugger;
    const {member} = payload;
    const memberPut = {
        name: member.getIn(['data', 'name']),
        avatar: member.getIn(['data', 'avatar']),
        phone: member.getIn(['data', 'phone']),
        address: member.getIn(['data', 'address']),
        pictureId: member.getIn(['data', 'pictureId']),
        level: member.getIn(['data', 'level']),
        totalApply: member.getIn(['data', 'totalApply']),
        yearBirth: member.getIn(['data', 'yearBirth'])
    };
    const url = member.get('href');
    const options = {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        mode: 'cors',
        body: JSON.stringify(memberPut)
    };
    return callApi(url, options);
};

export const deleteMember = (payload) => {
    debugger;
    const {member} = payload;
    const url = member.get('href');
    const options = {
        method: 'DELETE',
        mode: 'cors',
    };
    return callApi(url, options);
};
