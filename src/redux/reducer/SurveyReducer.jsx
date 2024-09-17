import {SV_SAVE, SV_CLEAN} from "@/redux/action/SurveyAction";

const initialize = {
    isSaved : false,
    data : 
    {
        isCompleted:{
            guide:false,
            age:false,
            salary:false,
            consumption:false,
            balance:false,
            asset:false,

            index:false,
            house:false,
            marry:false,
            baby:false,
            retire:false,
            parent:false,
            lotto:false
        },
        base:{
            // // 지수
            // indexInflation : "3.5",
            // indexBankInterest : "3.0",
            // indexLoanInterest : "6.0",
            // investIncome : "5.0",
            // //나이
            // age:"27",
            // // 부동산
            // houseType:"h1", //h1:본가,h2:월세/반전세,h3:전세,h4:매매
            // houseGuarantee:16600,
            // houseLoanYN:"n",
            // houseLoanAmount:0,
            // houseLoanRate:0,
            // houseCost:33,
            // // 자동차
            // carCost:300000,
            // // 근로소득
            // incomeAfterTaxMonthly:2200000,
            // incomeRiseRate1:6,
            // incomeRiseRate25:2,
            // workingExperienceYear:1,
            // additionalIncomeMonthly:100000,
            // // 소비금액
            // consumAmountMonthly:1700000,
            // // 저축투자비중
            // savingRate:0.7,
            // // 현재 
            // curAsset:{
            //     loan:[{loanName:"학자금",
            //             loanAmount:10000000,
            //             loanInterest:2.1,
            //             },
            //             {loanName:"비상금",
            //             loanAmount:5000000,
            //             loanInterest:0,
            //             }],
            //     saving:10000000,
            //     invest:10000000
            // },
            // // 미래 부채

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