import axios from 'axios';

export const FETCH_CURRICULUMS = 'fetch_curriculums';
const ROOT_URL = 'http://localhost/api/curriculums';

export function fetchCurriculums() {
    const request = axios.get(ROOT_URL);

    return {
        type: FETCH_CURRICULUMS,
        payload: request
    };
}

