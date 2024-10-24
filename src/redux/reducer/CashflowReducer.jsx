import {CF_SAVE, CF_CLEAN} from "@/redux/action/CashflowAction";

const initialize = {
    isSaved : false,
    data : 
    {
        timeline:[],
        exchangedTimeline:[],
        
        timelineSaveA:[],
        timelineSaveB:[],
        timelineSaveC:[],
        legendChartA:"Case1",
        legendChartB:"Case2",
        legendChartC:"Case3",

        chart:[],
        exchangedChart:[]
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