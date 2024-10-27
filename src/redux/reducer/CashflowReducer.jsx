import {CF_SAVE, CF_CLEAN} from "@/redux/action/CashflowAction";

const initialize = {
    isSaved : false,
    data : 
    {
        //표
        timeline:[],
        //표(현재가치)
        exchangedTimeline:[],
        //저장된 표
        timelineSaveA:[],
        timelineSaveB:[],
        timelineSaveC:[],
        timelineSaveD:[],
        //차트
        chart:[],
        //차트범례
        chartLegent:{nameA:"Case1", nameB:"Case2", nameC:"Case3", nameD:"Case4"},
        //차트(현재가치)
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