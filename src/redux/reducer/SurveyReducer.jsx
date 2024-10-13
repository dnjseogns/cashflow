import {SV_SAVE, SV_CLEAN} from "@/redux/action/SurveyAction";

const initialize = {
    isSaved : false,
    data : 
    {
        isCompleted:{
            "시작하기":true
        },
        base:{
        },
        my:{
            loan:[]
        },
        your:{
            loan:[]
            // car:[],
            // house:[]
        },
        add:{
            house:[],
            car:[]
        }
    }
};

function SurveyReducer(state = initialize, action){
    switch(action.type) {
        case SV_SAVE:
            return {
                isSaved : true,
                data : {...action.payload}
            };
        case SV_CLEAN:
            return {
                isSaved : false,
                data : initialize
            };
        default:
            return state;
    }
}
export default SurveyReducer;