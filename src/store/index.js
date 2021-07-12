// STORE------PAKE REDUX not REACT-REDUX---------------------------------------------------
import { createStore } from 'redux';
import counterReducer from './reducer';


// CREATE STORE
let store = createStore(counterReducer)

export default store