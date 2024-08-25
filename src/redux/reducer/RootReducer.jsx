import {combineReducers} from 'redux';
import SurveyReducer from "@/redux/reducer/SurveyReducer";
import CashflowReducer from "@/redux/reducer/CashflowReducer";

const RootReducer = combineReducers({
    Survey : SurveyReducer,
    Cashflow : CashflowReducer
});

export default RootReducer;