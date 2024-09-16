import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import { numRound } from "@/utils/util";

export const useCashflowTableData = () => {
    //redux
    const dispatch = useDispatch();
    const surveyDataOrgin = useSelector((store) => store.Survey).data;
    const cashflowData = useSelector((store) => store.Cashflow).data;

    const surveyData = JSON.parse(JSON.stringify(surveyDataOrgin));
    //
    //cfRedux 값 세팅
    useEffect(()=>{
        console.log("surveyData",surveyData);
        // console.log("cashflowData",cashflowData);

        let isCompleted = surveyData.isCompleted;
        let base = surveyData.base;
        let rows = [];
        //누적 변수
        let loopCnt = 0;
        let salaryRiseRateStack = 1.0;
        let inflationStack = 1.0;
        let assetLoanStack = 0;
        let assetSavingStack = 0;
        let assetInvestStack = 0;
        
        for(var i=0; i<=100; i++){
            let row = {};

            //나이(age)
            if(!surveyData.base?.age){
                return;
            }
            else if(i < base?.age){
                continue;
            }

            //나이(age)
            if(isCompleted?.age === true){
                row.age = i;   
                loopCnt++;
            }

            //소득
            if(isCompleted?.age === true && isCompleted?.salary === true){
                //연봉상승률(누적)
                const salaryRiseRateGap = (base?.salaryRiseRate1 - base?.salaryRiseRate25) / 25;
                let salaryRiseRate = base?.salaryRiseRate1 - salaryRiseRateGap * (base?.workYear + loopCnt - 3) // 1년차 + loop (1) - 3
                salaryRiseRate = salaryRiseRate < base?.salaryRiseRate25 ? base?.salaryRiseRate25 : salaryRiseRate;
                if(loopCnt === 1){
                    salaryRiseRateStack = 1.0;
                } else {
                    salaryRiseRateStack = numRound(salaryRiseRateStack * (1 + salaryRiseRate/100),3);
                }
                row.salaryRiseRateStack = salaryRiseRateStack;

                //은퇴 체크
                if(i > base?.retireAge){
                    row.salaryRiseRateStack = 0;
                }

                //연봉
                row.salary = Math.round((base?.salaryMonthly * 12) * row.salaryRiseRateStack);

                //부업
                row.sideJob = Math.round(base?.sideJobMonthly * 12);

                //전체소득
                row.totalIncome = row.salary + row.sideJob;
            }


            //소비
            if(isCompleted?.age === true && isCompleted?.salary === true && isCompleted?.saving === true){
                //물가상승률
                if(loopCnt <= 1){
                    inflationStack = 1.0;
                }else{
                    inflationStack = inflationStack * (1 + base.indexInflation/100);
                    inflationStack = numRound(inflationStack, 3);
                }
                row.inflationStack = inflationStack;

                //소비
                row.consumption = Math.round(base?.consumptionMonthly * 12 * row.inflationStack);

                //전체소비
                row.totalConsumption = row.consumption;
            }

            //저축
            if(isCompleted?.age === true && isCompleted?.salary === true && isCompleted?.saving === true){
                row.totalSaving = row.totalIncome - row.totalConsumption;
            }

            //누적자산
            if(isCompleted?.age === true && isCompleted?.salary === true && isCompleted?.saving === true && isCompleted?.asset === true){
                console.log("bankRate",row.totalSaving * base.bankRate);
                console.log("investRate",row.totalSaving * base.investRate);
                assetSavingStack = assetSavingStack + Math.round(row.totalSaving * base.bankRate/100);
                assetInvestStack = assetInvestStack + Math.round(row.totalSaving * base.investRate/100);

                row.assetLoanStack = Math.round(assetLoanStack * (1 + base.loanInterest/100));
                row.assetSavingStack = Math.round(assetSavingStack * (1 + base.loanInterest/100));
                row.assetInvestStack = Math.round(assetInvestStack * (1 + base.loanInterest/100));
            }

            //결과 넣기
            rows.push(row);
        }
        cashflowData.timeline = rows;
        dispatch(CfSave(cashflowData));


        
        // // 누적 변수
        // let loopCnt = 0;
        // let inflationStack = 1.0;
        // let incomeRiseRateStack = 1;
        // // 이전 변수
        // let assetSavingPrev = 0;
        // let assetInvestPrev = 0;
        // for(var i=0; i<=100; i++){
            // //기초(나이)
            // if(i < svBasic.age){
            //     continue;
            // }
            // loopCnt++;
            // //기초(인플레이션)
            // if(loopCnt <= 1){
            //     inflationStack = 1.0;
            // }else{
            //     inflationStack = inflationStack * (1 + svBasic.indexInflation/100);
            //     inflationStack = Math.round(inflationStack * 10000) / 10000;
            // }

            // //근로소득(연봉상승률)
            // let incomeRiseRate = 0;
            // let incomeRiseRate_M = 0;
            // if(loopCnt <= 1){
            //     incomeRiseRate_M = -1 * svBasic.incomeRiseRate1;
            // }else if(loopCnt <= 26) {
            //     incomeRiseRate_M = (svBasic.incomeRiseRate25 - svBasic.incomeRiseRate1) / 25
            //                         * (svBasic.workingExperienceYear - 1 + loopCnt - 2);
            // }else{
            //     incomeRiseRate_M = (svBasic.incomeRiseRate25 - svBasic.incomeRiseRate1);
            // }
            // incomeRiseRate = svBasic.incomeRiseRate1 + incomeRiseRate_M;
            // incomeRiseRate = (incomeRiseRate + 100) / 100;
            // incomeRiseRate = Math.round(incomeRiseRate * 10000) / 10000;
            // incomeRiseRateStack = incomeRiseRateStack * incomeRiseRate;
            // incomeRiseRateStack = Math.round(incomeRiseRateStack * 10000) / 10000;
            // //근로소득(세후연봉)
            // let incomeAfterTaxYearly = Math.round(svBasic.incomeAfterTaxMonthly * 12 * incomeRiseRateStack);
            // if(i>50){
            //     incomeAfterTaxYearly = 0;//50세 은퇴
            // }
            // //근로소득(부업)
            // let additionalIncomeYearly = svBasic.additionalIncomeMonthly * 12;
            // //근로소득(합계)
            // let workIncomeTotSum = incomeAfterTaxYearly + additionalIncomeYearly;
            

            // //실거주(주거비)
            // let houseCostYearly = svBasic.houseCost * 12;
            // houseCostYearly = Math.round(houseCostYearly * inflationStack);
            // //실거주(보증금)
            // let houseGuarantee = svBasic.houseGuarantee;
            // //차량비
            // let carCostYearly = svBasic.carCost * 12;
            // carCostYearly = Math.round(carCostYearly * inflationStack);
            // //소비금액(소비)
            // let consumAmountYearly = svBasic.consumAmountMonthly * 12;
            // consumAmountYearly = Math.round(consumAmountYearly * inflationStack);
            // consumAmountYearly = consumAmountYearly - houseCostYearly - carCostYearly;
            // //소비금액(합계)
            // let consumTotSum = consumAmountYearly + houseCostYearly + carCostYearly;


            // //저축+투자
            // let saveAmountYealy = Math.round((workIncomeTotSum - consumTotSum) * svBasic.savingRate);
            // let investAmountYealy = Math.round((workIncomeTotSum - consumTotSum) * (1 - svBasic.savingRate));


            // // 누적자산(저축)
            // let assetSaving = svBasic.curAsset.saving;
            // if(loopCnt <= 1){
            //     assetSaving = Math.round(assetSaving * (1+svBasic.indexBankInterest/100));//+자본수익
            //     assetSaving = assetSaving + saveAmountYealy;//+저축
            //     assetSavingPrev = assetSaving;
            // }else{
            //     assetSaving = assetSavingPrev;
            //     assetSaving = Math.round(assetSaving * (1+svBasic.indexBankInterest/100));//+자본수익
            //     assetSaving = assetSaving + saveAmountYealy;//+저축
            //     assetSavingPrev = assetSaving;
            // }
            // // 누적자산(투자)
            // let assetInvest = svBasic.curAsset.invest;
            // if(loopCnt <= 1){
            //     assetInvest = Math.round(assetInvest * (1+svBasic.investIncome/100));//+자본수익
            //     assetInvest = assetInvest + investAmountYealy;//+저축
            //     assetInvestPrev = assetInvest;
            // }else{
            //     assetInvest = assetInvestPrev;
            //     assetInvest = Math.round(assetInvest * (1+svBasic.investIncome/100));//+자본수익
            //     assetInvest = assetInvest + investAmountYealy;//+저축
            //     assetInvestPrev = assetInvest;
            // }
            
            // //result
            // let result = {
            //             //기초
            //             age : i, 
            //             inflationStack : inflationStack,
            //             //근로소득
            //             incomeRiseRate : incomeRiseRate,
            //             incomeRiseRateStack : incomeRiseRateStack,
            //             incomeAfterTaxYearly : incomeAfterTaxYearly,
            //             additionalIncomeYearly : additionalIncomeYearly,
            //             workIncomeTotSum : workIncomeTotSum,

            //             //부동산
            //             houseCostYearly:houseCostYearly,
            //             houseGuarantee:houseGuarantee,
            //             //자동차
            //             carCostYearly:carCostYearly,
            //             //소비금액
            //             consumAmountYearly : consumAmountYearly,
            //             consumTotSum : consumTotSum,

            //             //저축금액
            //             saveAmountYealy : saveAmountYealy,
            //             investAmountYealy : investAmountYealy,

            //             //자산
            //             assetSaving : assetSaving,
            //             assetInvest : assetInvest,
            //             };
            // initTimeLine.push(result);
        // }
    },[surveyDataOrgin]);

}