import {CF_SAVE, CF_CLEAN} from "@/redux/action/CashflowAction";

const initialize = {
    isSaved : false,
    data : 
    {
        timeline:[],
        exchangedTimeline:[],
        chart:{CUR:[],A:[],B:[],C:[],D:[],E:[]},
        exchangedChart:{CUR:[],A:[],B:[],C:[],D:[],E:[]}
    }
};

function CashflowReducer(state = initialize, action){
    switch(action.type) {
        case CF_SAVE:
            return {
                isSaved : true,
                data : {...action.payload}
            };
        case CF_CLEAN:
            return initialize;
        default:
            return state;
    }
}
export default CashflowReducer;