import { createStore } from "redux";
import reducer from './reducer'
const store = createStore(reducer, { loading: false })
export default store;