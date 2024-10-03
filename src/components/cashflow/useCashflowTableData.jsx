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
        console.log("cashflowData",cashflowData);

        // 기본 변수
        let isCompleted = surveyData.isCompleted;
        let base = surveyData.base;

        //대출
        //집 대출
        if(isCompleted?.age === true && isCompleted?.house === true){
            const idx = surveyData.base.loan.findIndex((item)=>item.loanId === "houseLoan");
            if(idx >= 0){
                surveyData.base.loan.splice(idx, 1);
            }
            if(surveyData.base?.housePriceLoan > 0){
                if(surveyData.base?.livingType == "rent"){
                    surveyData.base.loan.unshift({loanId:"houseLoan", loanName:"전·월세자금대출금(사전입력 : 2-ⓐ)", loanAmount:surveyData.base?.housePriceLoan ?? 0, loanInterest:surveyData.base?.housePriceLoanRate ?? 0, isReadOnly:true});
                }else if(surveyData.base?.livingType == "own"){
                    surveyData.base.loan.unshift({loanId:"houseLoan", loanName:"주택담보대출(사전입력 : 2-ⓐ)", loanAmount:surveyData.base?.housePriceLoan ?? 0, loanInterest:surveyData.base?.housePriceLoanRate ?? 0, isReadOnly:true});
                }
            }
        }

        //차 대출
        if(isCompleted?.age === true && isCompleted?.car === true){
            const idx = surveyData.base.loan.findIndex((item)=>item.loanId === "carLoan");
            if(idx >= 0){
                surveyData.base.loan.splice(idx, 1);
            }
            if(surveyData.base?.carLoan > 0){
                surveyData.base.loan.unshift({loanId:"carLoan", loanName:"자동차 대출(사전입력 : 1-ⓐ)", loanAmount:surveyData.base?.carLoan ?? 0, loanInterest:surveyData.base?.carLoanRate ?? 0, isReadOnly:true});
            }
        }

        //추가 대출(시스템)
        base.loan.push({loanId:"systemLoan", loanName:"추가대출", loanAmount:0, loanInterest: base?.loanInterest ?? 6.0, isReadOnly:true});
        base.loan = base.loan.map((item)=> ({...item, "loanAmountStack":-1*item.loanAmount})) // loanAmountStack 컬럼 추가
                             .sort((a,b)=>(b.loanInterest - a.loanInterest)); // 대출금리 높은 걸 위로

        //결과 변수
        let rows = [];
        //과정 누적 변수
        let loopCnt = 0;
        let salaryRiseRateStack = 1.0;
        let inflationStack = 1.0;
        let assetSavingStack = base?.currAssetSaving ?? 0;
        let assetInvestStack = base?.currAssetInvest ?? 0;

        for(var i=0; i<=100; i++){
            let row = {};

            //나이 설문 작성 완료 시점부터 table 만들기
            if(!isCompleted?.age){ return; }
            //나이보다 적으면 skip
            else if(i < base?.age){ continue; }

            if(isCompleted?.age === true){
                //나이(age)
                row.age = i;
                loopCnt++;
                
                //물가상승률
                if(loopCnt <= 1){
                    inflationStack = 1.0;
                }else{
                    inflationStack = inflationStack * (1 + base.indexInflation/100);
                    inflationStack = numRound(inflationStack, 3);
                }
                row.inflationStack = inflationStack;
            }


            if(isCompleted?.age === true && isCompleted?.house === true){
                //집 소비
                row.houseCost = Math.round((base?.houseCostMonthly ?? 0) * 12 * row.inflationStack) * -1;
                row.consumption -= row.houseCost;

                //주택가격
                const housePrice = base?.livingType == "rent" ? base?.housePriceOwn
                                    : base?.livingType == "own" ? base?.housePriceTotal
                                    : 0;
                row.housePrice = housePrice;
            }

            if(isCompleted?.age === true && isCompleted?.house === true && isCompleted?.car === true){
                //차 소비
                row.carCost = Math.round((base?.carCostMonthly ?? 0) * 12 * row.inflationStack) * -1;
                row.consumption -= row.carCost;
            }

            if(isCompleted?.age === true && isCompleted?.house === true){
                // 대출이자
                let loanCost = 0;
                base.loan.forEach((item)=>{
                    loanCost += Math.round(item.loanAmountStack*(item.loanInterest/100));
                });
                row.loanCost = loanCost;
            }



            if(isCompleted?.age === true && isCompleted?.house === true && isCompleted?.car === true && isCompleted?.asset === true
                && isCompleted?.salary === true){
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

                //연봉
                row.salary = Math.round((base?.salaryMonthly * 12) * row.salaryRiseRateStack);

                //부업
                row.sideJob = Math.round(base?.sideJobMonthly * 12 * row.inflationStack);

                //은퇴 체크
                if(row.age > base?.retireAge){
                    row.salary = 0;
                }

                //전체소득
                row.totalIncome = row.salary + row.sideJob;
            }


            if(isCompleted?.age === true && isCompleted?.house === true && isCompleted?.car === true && isCompleted?.asset === true
                && isCompleted?.salary === true && isCompleted?.consumption === true){
                // 소비
                row.consumption = Math.round((base?.consumptionMonthly ?? 0) * 12 * row.inflationStack) * -1;

                //전체소비
                row.totalConsumption = row.consumption;
                
                //잔액
                row.totalBalance = row.totalIncome + row.totalConsumption + (row.totalEvent ?? 0);
            }



            //이벤트
            if(isCompleted?.age === true && isCompleted?.house === true && isCompleted?.car === true && isCompleted?.asset === true
                && isCompleted?.salary === true && isCompleted?.consumption === true){
                //퇴직금
                if(row.age == base?.retireAge){
                    const totalWorkYear = loopCnt + (base?.workYear ?? 1);
                    row.eventRetirementPay = base?.salaryMonthly * row.salaryRiseRateStack * totalWorkYear;
                    row.totalEventNote = (row?.totalEventNote ?? "") + "퇴직금(4-ⓑ)"
                }else{
                    row.eventRetirementPay = row.eventRetirementPay;
                }

                row.totalEvent = row.eventRetirementPay;
            }

            //누적자산
            if(isCompleted?.age === true && isCompleted?.house === true){
                let tmpBalance = row.totalBalance ?? 0; //잔액

                if(tmpBalance < 0){ // 잔액이 음수일 경우.
                    if(assetSavingStack + tmpBalance >= 0){ // 1. 예금 충분할 경우(차감)
                        assetSavingStack = assetSavingStack + tmpBalance;
                        tmpBalance = 0;
                    }else{ 
                        assetSavingStack = 0;
                        tmpBalance = assetSavingStack + tmpBalance; // 1-2. 예금 부족할 경우(부분 차감)

                        if(assetInvestStack + tmpBalance >= 0){ // 2. 투자 충분할 경우(차감)
                            assetInvestStack = assetInvestStack + tmpBalance;
                            tmpBalance = 0;
                        }else{
                            assetInvestStack = 0;
                            tmpBalance = tmpBalance + assetInvestStack;// 2-2. 투자 부족할 경우(부분 차감)

                            // 3. 최총(대출)
                            base.loan = base.loan.map((item)=>{
                                if(item.loanId=="systemLoan"){
                                    return {...item, loanAmountStack : item.loanAmountStack + tmpBalance}
                                }else{
                                    return item;
                                }
                            });
                        }
                    }
                }else{
                    let assetLoanTotalAmount = 0; //전체 대출 금액
                    base.loan.forEach(item => {
                        assetLoanTotalAmount += item?.loanAmountStack ?? 0;
                    });

                    if(assetLoanTotalAmount < 0){ // 잔액이 양수일 경우 + 대출이 있을 경우(음수)

                        base.loan = base.loan.map((loanItem)=>{
                            if(loanItem.loanAmountStack + tmpBalance <= 0){ //대출이 더 많을 때
                                const retVal = {...loanItem, loanAmountStack : loanItem.loanAmountStack + tmpBalance};
                                tmpBalance = 0;
                                return retVal;
                            }else{ //대출이 더 적을 때
                                tmpBalance = tmpBalance + loanItem.loanAmountStack;
                                return {...loanItem, loanAmountStack : 0}
                            }
                        })
                    }else{ // 잔액이 양수일 경우 + 대출 없을 경우
                        assetSavingStack = assetSavingStack + Math.round(tmpBalance * base.bankRate/100);
                        assetInvestStack = assetInvestStack + Math.round(tmpBalance * base.investRate/100);
                    }
                }

                // 예금
                assetSavingStack = Math.round(assetSavingStack * (1 + base.bankInterest/100));
                row.assetSavingStack = assetSavingStack;
                // 투자
                assetInvestStack = Math.round(assetInvestStack * (1 + base.investIncome/100));
                row.assetInvestStack = assetInvestStack;
                // 대출
                // base.loan = base.loan.map((item)=>({...item, loanAmountStack : Math.round(item.loanAmountStack*(1 + item.loanInterest/100))}));
                let assetLoanStack = 0;
                base.loan.forEach(item => {
                    assetLoanStack += item?.loanAmountStack ?? 0;
                });
                row.assetLoanStack = assetLoanStack;

                //전체 자산
                row.totalAsset = row.assetSavingStack + row.assetInvestStack + row.assetLoanStack;

            }

            //결과 넣기
            rows.push(row);
        }
        cashflowData.timeline = rows;
        dispatch(CfSave(cashflowData));

    },[surveyDataOrgin]);

    // //예외처리
    // useEffect(()=>{
    //     let isCompleted = surveyData.isCompleted;
    //     let base = surveyData.base;
    //     savingMonthly
    //     : 
    //     100
    //     sideJobMonthly
    //     : 
    //     0
    //     console.log("base",base);
    // },[surveyDataOrgin])
}