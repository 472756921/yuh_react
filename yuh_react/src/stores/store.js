/**
 * Created by Benson on 2017/3/11.
 */

import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { AritcleTODO} from '../reducers/ListReducers';

const ArticleReducer = combineReducers({AritcleTODO});
//initialState 初始state
const store = createStore(ArticleReducer);
export default store;
