import { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import { numRound } from "@/utils/util";
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { useMenuContext } from "./MenuContext";

export const useCashflowTableData = () => {
    //redux
    const dispatch = useDispatch();
    const surveyDataOrgin = useSelector((store) => store.Survey).data;
    const cashflowData = useSelector((store) => store.Cashflow).data;

    const {surveyDiv, setSurveyDiv, surveyTitle, setSurveyTitle, 
        menuEnum, setSurveyDivition} = useMenuContext();
    const [isCompleteStep1, setIsCompleteStep1] = useState(false);
    const [isCompleteStep2, setIsCompleteStep2] = useState(false);
    const [isCompleteStep3, setIsCompleteStep3] = useState(false);

    useEffectNoMount(()=>{
        if(isCompleteStep1 === false){
            try{
                step1();//함수 : survey 값 다시 한 번 세팅
                setIsCompleteStep1(true);
            }catch(err){
                resetComplete();
                throw err;
            }
        }
    },[surveyDataOrgin]);

    useEffectNoMount(()=>{
        if(isCompleteStep1 === true){
            try{
                step2();//다음 함수 : table 데이터 계산
                setIsCompleteStep2(true);
            }catch(err){
                resetComplete();
                throw err;
            }
        }
    },[isCompleteStep1]);

    useEffectNoMount(()=>{
        if(isCompleteStep2 === true){
            try{
                step3();//다음 함수 : table 데이터 계산
                setIsCompleteStep3(true);
            }catch(err){
                resetComplete();
                throw err;
            }
        }
    },[isCompleteStep2]);

    useEffectNoMount(()=>{
        if(isCompleteStep3 === true){
            resetComplete();
        }
    },[isCompleteStep3]);

    const resetComplete = () => {
        setIsCompleteStep1(false);
        setIsCompleteStep2(false);
        setIsCompleteStep3(false);
    }

    //survey 값 다시 한 번 세팅
    const step1 = () => {
        // 기본 변수
        const surveyData = JSON.parse(JSON.stringify(surveyDataOrgin));
        let isCompleted = surveyData.isCompleted;
        let base = surveyData.base;
        let my = surveyData.my;
        let add = surveyData.add;

        {
            my.housePriceOwn = my?.housePriceTotal - my?.housePriceLoan;
        }
        {
            let newLoan = [...my.loan].filter((item)=>{return item.loanId != "carLoan" && item.loanId != "houseLoan"});
            if(my?.housePriceLoan > 0){
                if(my?.livingType == "rent"){
                    newLoan.unshift({loanId:"houseLoan", loanName:"전·월세자금대출금(사전입력 : 2-ⓐ)", loanAmount:my?.housePriceLoan ?? 0, loanInterest:my?.housePriceLoanRate ?? base.loanInterest, isReadOnly:true});
                }else if(my?.livingType == "own"){
                    newLoan.unshift({loanId:"houseLoan", loanName:"주택담보대출(사전입력 : 2-ⓐ)", loanAmount:my?.housePriceLoan ?? 0, loanInterest:my?.housePriceLoanRate ?? base.loanInterest, isReadOnly:true});
                }
            }
            if(my?.carLoan > 0){
                newLoan.unshift({loanId:"carLoan", loanName:"자동차 대출(사전입력 : 3-ⓐ)", loanAmount:my?.carLoan ?? 0, loanInterest:my?.carLoanRate ?? base.loanInterest, isReadOnly:true});
            }

            my.loan = newLoan;
        }
        {
            let newHouse = [...add.house].filter((item)=>{return item.age != -1});
            if(my?.livingType == "rent"){
                newHouse.push({age:-1, price:my?.housePriceOwn, rate:0});
            }else if(my?.livingType == "own"){
                newHouse.push({age:-1, price:my?.housePriceTotal, rate:base?.realEstateGrouthRate});
            }
            add.house = newHouse;
        }
        {
            let newCar = [...add.car].filter((item)=>{return item.age != -1});
            if(my?.carYn == "Y"){
                newCar.push({age:-1, price:my?.housePrice, rate:base?.carDepreciationRate});
            }
            add.car = newCar;
        }

        dispatch(SvSave(surveyData));
    };
    
    //cfRedux 값 다시 한 번 세팅
    const step2 = () => {
        // 기본 변수
        const surveyData = JSON.parse(JSON.stringify(surveyDataOrgin));
        let isCompleted = surveyData.isCompleted;
        let base = surveyData.base;
        let my = surveyData.my;
        let add = surveyData.add;

        //추가 대출(시스템 계산용)
        {
            my.loan = my.loan.filter((item)=>(item.loanId !== "systemLoan"));
            my.loan.push({loanId:"systemLoan", loanName:"추가대출", loanAmount:0, loanInterest: my?.loanInterest ?? 6.0, isReadOnly:true});
            my.loan = my.loan.map((item)=> ({...item, "loanAmountStack":-1*item.loanAmount})) // loanAmountStack 컬럼 추가
                                .sort((a,b)=>(b.loanInterest - a.loanInterest)); // 대출금리 높은 걸 위로
        }

        //결과 변수
        let rows = [];
        // 기본 누적
        let loopCnt = 0;
        let inflationStack = 1.0;
        // 자산 누적
        let assetSavingStack = my?.currAssetSaving ?? 0;
        let assetInvestStack = my?.currAssetInvest ?? 0;
        let assetHousePriceStack = add.house?.find((item)=>item.age === -1)?.price ?? 0;

        console.log("assetHousePriceStack",assetHousePriceStack);

        // let salaryRiseRateStack = 1.0;

        for(var i=0; i<=100; i++){
            let row = {};
            //나이 설문 작성 완료 시점부터 table 만들기
            if(!isCompleted?.[menuEnum.BASE_MODE]){ return; }
            //나이보다 적으면 skip
            else if(i < base?.myAge){ continue; }

            if(isCompleted?.[menuEnum.BASE_MODE] === true){
                //기본 -> 나이
                row.myAge = i;
                loopCnt++;
            }

            if(isCompleted?.[menuEnum.BASE_INDEX] === true){
                //기본 -> 물가상승률
                if(loopCnt <= 1){
                    inflationStack = 1.0;
                }else{
                    inflationStack = inflationStack * (1 + base.indexInflation/100);
                    inflationStack = numRound(inflationStack, 3);
                }
                row.inflationStack = inflationStack;
            }




            if(isCompleted?.[menuEnum.MY_ASSET] === true){
                //수입 -> 연봉
                //
            }
            if(isCompleted?.[menuEnum.MY_ASSET] === true){
                //수입 -> 국민연금
                //
            }
            if(isCompleted?.[menuEnum.MY_ASSET] === true){
                //수입 -> 합계
                row.totalIncome = (row?.salary??0) + (row?.sideJob??0) + (row?.pension??0);
            }




            if(isCompleted?.[menuEnum.MY_ASSET] === true){
                //지출 -> 주거비
                row.houseCost = Math.round((my?.houseCostMonthly ?? 0) * 12 * row.inflationStack) * -1;
            }
            if(isCompleted?.[menuEnum.MY_ASSET] === true){
                //지출 -> 차량비
                row.carCost = Math.round((my?.carCostMonthly ?? 0) * 12 * row.inflationStack) * -1;
            }
            if(isCompleted?.[menuEnum.MY_ASSET] === true){
                // 지출 -> 대출이자
                let loanCost = 0;
                my.loan.forEach((item)=>{
                    loanCost += item.loanAmountStack*(item.loanInterest/100);
                });
                row.loanCost = Math.round(loanCost/12)*12;
            }
            if(isCompleted?.[menuEnum.MY_ASSET] === true){
                //지출 -> 기타소비
                //
            }
            if(isCompleted?.[menuEnum.MY_ASSET] === true){
                //지출 -> 합계
                row.totalConsumption = (row?.houseCost??0) + (row?.carCost??0) + (row?.loanCost??0) + (row?.etcExpense??0);
            }





            if(isCompleted?.[menuEnum.MY_ASSET] === true){
                //잔액
                row.totalBalance = row.totalIncome + row.totalConsumption;
            }






            if(isCompleted?.[menuEnum.MY_ASSET] === true){
                // 예금 / 투자 stack
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
                            my.loan = my.loan.map((item)=>{
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
                    my.loan.forEach(item => {
                        assetLoanTotalAmount += item?.loanAmountStack ?? 0;
                    });

                    if(assetLoanTotalAmount < 0){ // 잔액이 양수일 경우 + 대출이 있을 경우(음수)

                        my.loan = my.loan.map((loanItem)=>{
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
                        assetSavingStack = assetSavingStack + Math.round(tmpBalance * my.bankRate/100);
                        assetInvestStack = assetInvestStack + Math.round(tmpBalance * my.investRate/100);
                    }
                }

                // 예금
                assetSavingStack = Math.round(assetSavingStack * (1 + base.bankInterest/100));
                row.assetSavingStack = assetSavingStack;
                // 투자
                assetInvestStack = Math.round(assetInvestStack * (1 + base.investIncomeRate/100));
                row.assetInvestStack = assetInvestStack;
                // 대출
                let assetLoanStack = 0;
                my.loan.forEach(item => {
                    assetLoanStack += item?.loanAmountStack ?? 0;
                });
                row.assetLoanStack = assetLoanStack;

            }

            if(isCompleted?.[menuEnum.MY_ASSET] === true){
                //누적자산 -> 주택
                if(Array.isArray(add.house) && add.house.length >= 1){
                    const newHouse = add.house.find((houseItem)=>(houseItem.age === i));
                    if(newHouse){
                        assetHousePriceStack = newHouse.price;
                    }else{
                        const tmpCurHouseArr = add.house.filter((houseItem)=>houseItem.age < i);
                        const tmpGrouthRate = tmpCurHouseArr[tmpCurHouseArr.length-1].rate;
                        assetHousePriceStack = assetHousePriceStack * (1 + tmpGrouthRate/100);
                    }
                }
                row.assetHousePriceStack = assetHousePriceStack;
            }

            if(isCompleted?.[menuEnum.MY_ASSET] === true){
                //누적자산 -> 합계
                row.totalAsset = (row.assetLoanStack ?? 0) + (row.assetSavingStack ?? 0) + (row.assetInvestStack ?? 0)  + (row.assetHousePriceStack ?? 0);
            }

            //결과 쌓기
            rows.push(row);
        }

        cashflowData.timeline = rows;
        dispatch(CfSave(cashflowData));
    };

    const step3 = () => {
        // 기본 변수
        const surveyData = JSON.parse(JSON.stringify(surveyDataOrgin));
        let isCompleted = surveyData.isCompleted;
        let base = surveyData.base;

        console.log("surveyData",surveyData);
        console.log("cashflowData",cashflowData);
    };

}