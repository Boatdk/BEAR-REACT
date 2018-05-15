import {FETCH_BEARS } from '../actions';

export default function (state = {}, action) {
    switch(action.type) {
        case FETCH_BEARS:
            return action.payload.data;
        default:
            return state;
    }
}

