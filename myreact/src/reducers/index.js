import { combineReducers } from 'redux';
import CurriculumsReducer from './reducer_curriculums';

const rootReducer = combineReducers({
    curriculums: CurriculumsReducer
});

export default rootReducer;
