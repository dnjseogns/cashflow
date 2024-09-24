import {SV_SAVE, SV_CLEAN} from "@/redux/action/SurveyAction";

const initialize = {
    isSaved : false,
    data : 
    {
        isCompleted:{
            guide:true,

            car:null,
            house:null,

            age:null,
            salary:null,
            consumption:null,
            balance:null,
            asset:null,

            // index:null,
            // car
            // house:false,
            marry:null,
            baby:null,
            retire:null,
            parent:null,
            lotto:null
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