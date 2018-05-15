import {FETCH_CURRICULUMS } from '../actions';

export default function (state = {}, action) {
    switch(action.type) {
        case FETCH_CURRICULUMS:
            return action.payload.data;
        default:
            return state;
    }
}

