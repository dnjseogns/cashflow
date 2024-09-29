import {SV_SAVE, SV_CLEAN} from "@/redux/action/SurveyAction";

const initialize = {
    isSaved : false,
    data : 
    {
        isCompleted:{
            guide:true,

            age:null,
            salary:null,
            consumption:null,
            balance:null,
            house:null,
            car:null,
            asset:null,

            marry:null,
            baby:null,
            house2:null,
            car2:null,
            retire:null,
            parent:null,
            lotto:null
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