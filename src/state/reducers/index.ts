import { combineReducers } from "redux";
import cellsReducer from './CellsReducer';
import bundlesReducer from './BundlesReducer'

const reducers = combineReducers({
    cells: cellsReducer,
    bundles: bundlesReducer
});


export default reducers;


export type RootState = ReturnType<typeof reducers>