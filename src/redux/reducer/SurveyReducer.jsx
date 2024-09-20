import {SV_SAVE, SV_CLEAN} from "@/redux/action/SurveyAction";

const initialize = {
    isSaved : false,
    data : 
    {
        isCompleted:{
            guide:false,

            car:false,
            house:false,

            age:false,
            salary:false,
            consumption:false,
            balance:false,
            asset:false,

            index:false,
            // house:false,
            marry:false,
            baby:false,
            retire:false,
            parent:false,
            lotto:false
        },
        prev:{
        },
        base:{
            loan:[]
        },
        add:{

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