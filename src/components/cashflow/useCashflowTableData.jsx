import { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import { numRound } from "@/utils/util";
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { useMenuContext } from "./MenuContext";
import { isValueExist } from "../../utils/util";

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
        let your = surveyData.your;
        let add = surveyData.add;

        if(base?.marryYn === "N"){
            surveyData.your.salaryMonthly = undefined;
            surveyData.your.workYear = undefined;
            surveyData.your.salaryRiseRate1 = undefined;
            surveyData.your.salaryRiseRate25 = undefined;
            surveyData.your.retireAge = undefined;
            surveyData.your.pensionMonthly = undefined;
            surveyData.your.sideJobMonthly = undefined;
        }
        {
            //대출list
            let newLoan = [...my.loan].filter((item)=>{return item.loanId != "carLoan" && item.loanId != "houseLoan"});
            if(my.houseLoanPrice > 0){
                if(my.house[0]?.livingType == "월/전세"){
                    newLoan.unshift({loanId:"houseLoan", loanName:"전·월세 대출(사전입력 : 3-ⓐ)", loanAmount:my?.houseLoanPrice ?? 0, loanInterest:my?.houseLoanRate ?? base.loanInterest, isReadOnly:true});
                }else if(my.house[0]?.livingType == "매매"){
                    newLoan.unshift({loanId:"houseLoan", loanName:"주택담보 대출(사전입력 : 3-ⓐ)", loanAmount:my?.houseLoanPrice ?? 0, loanInterest:my?.houseLoanRate ?? base.loanInterest, isReadOnly:true});
                }
            }
            if(my?.carYn === "Y" && my?.carLoanPrice > 0){
                newLoan.unshift({loanId:"carLoan", loanName:"자동차 대출(사전입력 : 3-ⓓ)", loanAmount:my?.carLoanPrice ?? 0, loanInterest:my?.carLoanRate ?? base.loanInterest, isReadOnly:true});
            }

            my.loan = newLoan;
        }
        if(isCompleted?.[menuEnum.MY_FIXED_ASSET] === true){
            //집list
            let newHouse = [...add.house].filter((item)=>{return item.age != -1});
            if(my.houseYn === "N"){
                newHouse.unshift({ seq:1, age:-1, livingType:"본가", housePriceTotal:0, houseCostMonthly:0, isReadOnly:true });
            }else{
                newHouse.unshift(my.house[0]);
            }
            add.house = newHouse;
        }
        if(isCompleted?.[menuEnum.MY_FIXED_ASSET] === true){
            // //차list
            // let newCar = [...add.car].filter((item)=>{return item.age != -1});
            // if(my?.carYn == "Y"){
            //     newCar.unshift({seq:1, age:-1, sellPrice:0, buyPrice:0, carCostMonthly:(my?.carCostMonthly??0), isReadOnly:true});
            // }
            // add.car = newCar;
        }
        if(isCompleted?.[menuEnum.BASE_INDEX] === true){
            //나 -> 국민연금 관련 40세 연봉
            const powCnt = 0 <= 40 - my.age ? 40 - my.age : 0;
            const over40 = Math.pow(1.045, powCnt); //1.045 수치 : 급여상승률 평균
            const salaryMonthly = my?.salaryMonthly ?? 2000000;
            const workYear = my?.workYear ?? 1;

            const tmpPensionYear = 65 - (my?.age - workYear) - 20;
            const pensionMonthly = Math.round((1.2 * ((salaryMonthly*over40) + 2989237) * (1 + (tmpPensionYear < 0 ? 0 : tmpPensionYear)*0.05))/12);
            my.pensionMonthly = pensionMonthly;
        }
        if(isCompleted?.[menuEnum.BASE_INDEX] === true){
            //배우자 -> 국민연금 관련 40세 연봉
            const powCnt = 0 <= 40 - your.age ? 40 - your.age : 0;
            const over40 = Math.pow(1.045, powCnt); //1.045 수치 : 급여상승률 평균
            const salaryMonthly = your?.salaryMonthly ?? 2000000;
            const workYear = your?.workYear ?? 1;

            const tmpPensionYear = 65 - (your?.age - workYear) - 20;
            const pensionMonthly = Math.round((1.2 * ((salaryMonthly*over40) + 2989237) * (1 + (tmpPensionYear < 0 ? 0 : tmpPensionYear)*0.05))/12);
            your.pensionMonthly = pensionMonthly;
        }
        if(isCompleted?.[menuEnum.BASE_INDEX] === true && isCompleted?.[menuEnum.ADD_MARRY] === true){
            if(add.marryYn === "Y"){
                //나 -> 국민연금 관련 40세 연봉
                const powCnt = 0 <= 40 - my.age ? 40 - my.age : 0;
                const over40 = Math.pow(1.045, powCnt); //1.045 수치 : 급여상승률 평균
                const salaryMonthly = (my?.salaryMonthly ?? 2000000)*(add.partnerIncomePercent/100);
                const workYear = my?.workYear ?? 1;
    
                const tmpPensionYear = 65 - (my?.age - workYear) - 20;
                const pensionMonthly = Math.round((1.2 * ((salaryMonthly*over40) + 2989237) * (1 + (tmpPensionYear < 0 ? 0 : tmpPensionYear)*0.05))/12);
                add.partnerPensionMonthly = pensionMonthly;
            }
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
        let your = surveyData.your;
        let add = surveyData.add;

        //추가 대출(시스템 계산용)
        {
            my.loan = my.loan.filter((item)=>(item.loanId !== "systemLoan"));
            my.loan.push({loanId:"systemLoan", loanName:"추가대출", loanAmount:0, loanInterest: base?.loanInterest ?? 5.0, isReadOnly:true});
            my.loan = my.loan.map((item)=> ({...item, "loanAmountStack":-1*item.loanAmount})) // loanAmountStack 컬럼 추가
                                .sort((a,b)=>(b.loanInterest - a.loanInterest)); // 대출금리 높은 걸 위로
        }

        //결과 변수
        let rows = [];
        // 기본 누적
        let loopCnt = 0;
        let inflationStack = 1.0;
        // 자산 누적
        let salaryRiseRateStack = 1.0;
        let assetSavingStack = my?.currAssetSaving ?? 0;
        let assetInvestStack = my?.currAssetInvest ?? 0;
        let assetHousePriceStack = 0;
        // 배우자
        let yourSalaryRiseRateStack = 1.0;

        for(var i=0; i<=100; i++){
            let row = {};
            //나이 설문 작성 완료 시점부터 table 만들기
            if(!isCompleted?.[menuEnum.BASE_MODE]){ return; }
            //나이보다 적으면 skip
            else if(i < my?.age){ continue; }

            if(isCompleted?.[menuEnum.BASE_MODE] === true){
                //기본 -> 나이
                row.age = Number(my?.age) + loopCnt;
                row.yourAge = Number(your?.age) + loopCnt;
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






            if(isCompleted?.[menuEnum.MY_INCOME] === true){
                //내 수입 -> 연봉상승률(누적)
                const salaryRiseRateGap = (my?.salaryRiseRate1 - my?.salaryRiseRate25) / 25;
                let salaryRiseRate = my?.salaryRiseRate1 - salaryRiseRateGap * (my?.workYear + loopCnt - 3) // 1년차 + loop (1) - 3
                salaryRiseRate = salaryRiseRate < my?.salaryRiseRate25 ? my?.salaryRiseRate25 : salaryRiseRate;
                if(loopCnt == 1){
                    salaryRiseRateStack = 1.0;
                } else {
                    salaryRiseRateStack = numRound(salaryRiseRateStack * (1 + salaryRiseRate/100),3);
                }
                row.salaryRiseRateStack = salaryRiseRateStack;
            }
            if(isCompleted?.[menuEnum.MY_INCOME] === true){
                //내 수입 -> 연봉
                if(row.age > my?.retireAge){ //은퇴 체크
                    row.salary = 0;
                }else{
                    row.salary = Math.round((my?.salaryMonthly * 12) * row.salaryRiseRateStack);
                }
            }
            if(isCompleted?.[menuEnum.ADD_RETIRE] === true){
                //내 수입 -> 재취업
                if(add.reemploymentYn === "Y"){
                    if(my?.retireAge < row.age && row.age <= add.reemploymentAge){ //은퇴 체크
                        row.salary = Math.round((my?.salaryMonthly * 12) * row.salaryRiseRateStack) * 0.6;
                    }
                }
            }
            if(isCompleted?.[menuEnum.MY_INCOME] === true){
                //내 수입 -> 부업
                row.sideJob = Math.round(my?.sideJobMonthly * 12 * row.inflationStack);
            }
            if(isCompleted?.[menuEnum.MY_INCOME] === true){
                //내 국민연금
                row.pension = 0;
                if(row.age >= 65){
                    row.pension = my?.pensionMonthly*12 * Math.pow((1 + base.indexInflation/100), row?.age - 65);
                }
            }
            if(isCompleted?.[menuEnum.YOUR_INCOME] === true){
                //수입 -> 배우자(your) 수입
                const yourSalaryRiseRateGap = (your?.salaryRiseRate1 - your?.salaryRiseRate25) / 25;
                let yourSalaryRiseRate = your?.salaryRiseRate1 - yourSalaryRiseRateGap * (your?.workYear + loopCnt - 3) // 1년차 + loop (1) - 3
                yourSalaryRiseRate = yourSalaryRiseRate < your?.salaryRiseRate25 ? your?.salaryRiseRate25 : yourSalaryRiseRate;
                if(loopCnt == 1){
                    yourSalaryRiseRateStack = 1.0;
                } else {
                    yourSalaryRiseRateStack = numRound(yourSalaryRiseRateStack * (1 + yourSalaryRiseRate/100),3);
                }
                row.yourSalaryRiseRateStack = yourSalaryRiseRateStack;
                
                //배우자(your) 연봉
                if(row.yourAge > your?.retireAge){ //은퇴 체크
                    row.yourSalary = 0;
                }else{
                    row.yourSalary = Math.round((your?.salaryMonthly * 12) * row.yourSalaryRiseRateStack);
                }
                //배우자(your) 연봉 -> 재취업
                if(isCompleted?.[menuEnum.ADD_RETIRE] === true){
                    if(add.reemploymentYn === "Y"){
                        if(your?.retireAge < row.yourAge && row.yourAge <= add.reemploymentAge){ //은퇴 체크
                            row.yourSalary = Math.round((your?.salaryMonthly * 12) * row.yourSalaryRiseRateStack) * 0.6;
                        }
                    }
                }

                //배우자(your) 국민연금
                row.yourPension = 0;
                if(row.yourAge >= 65){
                    row.yourPension = your?.pensionMonthly*12 * Math.pow((1 + base.indexInflation/100), row?.yourAge - 65);
                }

                //배우자(your) 총 수입
                row.yourTotalIncome = (row?.yourSalary??0) + (row?.yourSideJob??0) + (row?.yourPension??0);
            }else if(isCompleted?.[menuEnum.ADD_MARRY] === true){
                // 수입 -> 배우자(partner) 수입
                if(add.marryYn === "Y" && add.marryAge <= row.age){
                    //배우자(partner) 급여
                    const mySalary = Math.round((my?.salaryMonthly * 12) * row.salaryRiseRateStack);
                    const partnerAge = Number(add.partnerAge) + loopCnt - (add.marryAge - my.age) - 1;
                    if(partnerAge <= my?.retireAge){
                        row.partnerSalary = Math.round(mySalary * (add?.partnerIncomePercent ?? 100) / 100);
                    }else{
                        row.partnerSalary = 0;
                    }
                    //배우자(partner) 연봉 -> 재취업
                    if(isCompleted?.[menuEnum.ADD_RETIRE] === true){
                        if(add.reemploymentYn === "Y"){
                            if(my?.retireAge < partnerAge && partnerAge <= add.reemploymentAge){ //은퇴 체크
                                row.partnerSalary = Math.round((my?.salaryMonthly * 12) * row.salaryRiseRateStack * 0.6 * (add?.partnerIncomePercent ?? 100) / 100);
                            }
                        }
                    }

                    //배우자(partner) 국민연금
                    row.partnerPension = 0;
                    if(partnerAge >= 65){
                        row.partnerPension = add?.partnerPensionMonthly*12 * Math.pow((1 + base.indexInflation/100), partnerAge - 65);
                    }

                    //배우자(partner) 총 수입
                    row.partnerTotalIncome = row?.partnerSalary + row?.partnerPension;
                }
            }
            if(isCompleted?.[menuEnum.MY_INCOME] === true){
                //수입 -> 합계
                row.totalIncome = (row?.salary??0) + (row?.sideJob??0) + (row?.pension??0) 
                                    + (row.yourTotalIncome??0) + (row?.partnerTotalIncome??0);
            }


            




            if(isCompleted?.[menuEnum.MY_FIXED_ASSET] === true){
                //지출 -> 주거비
                const tmpCurHouseArr = add.house.filter((houseItem)=>houseItem.age == -1);
                const tmpCurHouse = tmpCurHouseArr[tmpCurHouseArr.length-1];
                row.houseCost = Math.round((tmpCurHouse?.houseCostMonthly ?? 0) * 12 * row.inflationStack) * -1;

                if(isCompleted?.[menuEnum.ADD_HOUSE] === true){
                    const tmpCurHouseArr = add.house.filter((houseItem)=>houseItem.age <= i);
                    const tmpCurHouse = tmpCurHouseArr[tmpCurHouseArr.length-1];
                    row.houseCost = Math.round((tmpCurHouse?.houseCostMonthly ?? 0) * 12 * row.inflationStack) * -1;
                }
            }
            if(isCompleted?.[menuEnum.MY_FIXED_ASSET] === true){
                //지출 -> 차량비
                row.carCost = Math.round((my?.carCostMonthly ?? 0) * 12 * row.inflationStack) * -1;

                //add 쪽있다면, 교체
                if(isCompleted?.[menuEnum.ADD_CAR] === true){
                    const tmpCurCarArr = add.car.filter((carItem)=>carItem.age <= i);
                    if(tmpCurCarArr.length >= 1){
                        const tmpCurCar = tmpCurCarArr[tmpCurCarArr.length-1];
                        row.carCost = Math.round((tmpCurCar?.carCostMonthly ?? 0) * 12 * row.inflationStack) * -1;
                    }
                }
            }
            if(isCompleted?.[menuEnum.MY_ASSET] === true){
                // 지출 -> 대출이자
                let loanCost = 0;
                my.loan.forEach((item)=>{
                    loanCost += item.loanAmountStack*(item.loanInterest/100);
                });
                row.loanCost = Math.round(loanCost/12)*12;
            }
            if(isCompleted?.[menuEnum.MY_SPENDING] === true){
                //지출 -> 기타소비
                if(row.age >= 65){
                    row.etcExpense = Math.round(((my?.etcExpenseMonthly ?? 0) + 150000) * 12 * row.inflationStack) * -1;
                }else{
                    row.etcExpense = Math.round((my?.etcExpenseMonthly ?? 0) * 12 * row.inflationStack) * -1;
                }
            }
            if(isCompleted?.[menuEnum.ADD_MARRY] === true){
                //지출 -> 배우자(partner) 지출
                if(add.marryYn === "Y" && add.marryAge <= row.age){
                    row.partnerTotalSpending = Math.round((row?.etcExpense??0) * (add?.partnerSpendingPercent??100)/100)
                }
            }
            if(isCompleted?.[menuEnum.ADD_BABY] === true 
                //지출 -> 양육비
                && ((add.curBabyYn === "Y" && add.curBabyList.length >= 1) || (add.willBabyYn === "Y" && add.willBabyList.length >= 1))
            ){
                let babyCost = 0;
                add.curBabyList.forEach((curBabyItem)=>{
                    const babyAge = Number(curBabyItem.age) + loopCnt - 1;
                    if(0 <= babyAge && babyAge < 8){
                        babyCost = babyCost - add.preSchool * row.inflationStack;
                    } else if(8 <= babyAge && babyAge < 13){
                        babyCost = babyCost - add.elementarySchool * row.inflationStack;
                    } else if(13 <= babyAge && babyAge < 16){
                        babyCost = babyCost - add.middleSchool * row.inflationStack;
                    } else if(16 <= babyAge && babyAge < 19){
                        babyCost = babyCost - add.highSchool * row.inflationStack;
                    } else if(19 <= babyAge && babyAge < 23){
                        babyCost = babyCost - add.university * row.inflationStack;
                    }
                });
                add.willBabyList.forEach((willBabyItem)=>{
                    const babyAge = loopCnt - 1 - (willBabyItem.age - my.age)
                    if(0 <= babyAge && babyAge < 8){
                        babyCost = babyCost - add.preSchool * row.inflationStack;
                    } else if(8 <= babyAge && babyAge < 13){
                        babyCost = babyCost - add.elementarySchool * row.inflationStack;
                    } else if(13 <= babyAge && babyAge < 16){
                        babyCost = babyCost - add.middleSchool * row.inflationStack;
                    } else if(16 <= babyAge && babyAge < 19){
                        babyCost = babyCost - add.highSchool * row.inflationStack;
                    } else if(19 <= babyAge && babyAge < 23){
                        babyCost = babyCost - add.university * row.inflationStack;
                    }
                });
                row.babyCost = babyCost;
            }
            if(isCompleted?.[menuEnum.ADD_PARENT] === true){
                //지출->부양비
                if(add.parentCareYn === "Y"){
                    let parentCost = 0;
                    const parentAge = Number(add.parentCurrentAge) + loopCnt - 1;
                    if(add.parentNursingHomeAge <= parentAge && parentAge < add.parentNursingHomeAge + add.parentNursingHomePeriod){
                        parentCost = Math.round((add.parentNursingHomePriceMonthly * 12) * row.inflationStack);
                    }
                    // console.log("parentCost", parentAge, parentCost);
                    row.parentCost = parentCost * -1;
                }
            }

            if(isCompleted?.[menuEnum.MY_ASSET] === true){
                //지출 -> 합계
                row.totalConsumption = (row?.houseCost??0) + (row?.carCost??0) + (row?.loanCost??0) + (row?.etcExpense??0)
                                        + (row?.partnerTotalSpending??0) + (row?.babyCost??0) + (row?.parentCost??0);
            }






            if(isCompleted?.[menuEnum.MY_INCOME] === true){
                //이벤트 -> 퇴직금
                if(row.age == my?.retireAge){
                    const totalWorkYear = loopCnt + (my?.workYear ?? 1);
                    row.eventRetirementPay = my?.salaryMonthly * row.salaryRiseRateStack * totalWorkYear;
                    row.eventRetirementMemo = "퇴직금,";
                }
            }
            if(isCompleted?.[menuEnum.YOUR_INCOME] === true){
                //이벤트 -> 배우자 퇴직금(듀오모드)
                if(row.yourAge == your?.retireAge){
                    const totalWorkYear = loopCnt + (your?.workYear ?? 1);
                    row.eventYourRetirementPay = your?.salaryMonthly * row.yourSalaryRiseRateStack * totalWorkYear;
                    row.eventYourRetirementMemo = "배우자 퇴직금,";
                }
            }else if(isCompleted?.[menuEnum.ADD_MARRY] === true){
                //이벤트 -> 퇴직금(추가)
                if(add.marryYn === "Y"){
                    const partnerAge = Number(add.partnerAge) + loopCnt - (add.marryAge - my.age) - 1;
                    if(partnerAge == 55){
                        const totalWorkYear = 30;
                        row.eventYourRetirementPay = Math.round((row?.partnerSalary/12) * totalWorkYear);
                        row.eventYourRetirementMemo = "배우자 퇴직금,";
                    }
                }
            }
            if(isCompleted?.[menuEnum.ADD_MARRY] === true){
                if(add.marryYn === "Y"){
                    //이벤트 -> 결혼비용
                    if(row.age == add.marryAge){
                        row.eventMarryPay = (add.marryPrice + add.marryTripPrice + add.furniturePrice) * -1
                                                + (add.parentSupportPrice);
                        row.eventMarryMemo = "결혼,";
                    }
                    //이벤트 -> 배우자 자산
                    if(row.age == add.marryAge){
                        row.eventPartnerAsset = add.partnerAsset;
                        row.eventPartnerAssetMemo = "배우자자산,";
                    }
                }
            }
            if(isCompleted?.[menuEnum.ADD_HOUSE] === true){
                //이벤트 -> 집
                const newHouse = add.house.find((houseItem)=>(houseItem.age == i));
                if(newHouse){
                    const tmpHouseArr = add.house.filter((houseItem)=>houseItem.age <= i);
                    const tmpBeforeHouse = tmpHouseArr[tmpHouseArr.length-2];
                    const tmpCurHouse = tmpHouseArr[tmpHouseArr.length-1];
                    
                    row.eventHouseMovingAmount = tmpBeforeHouse.housePriceTotal - tmpCurHouse.housePriceTotal;
                    row.eventHouseMovingMemo = "집이사,";
                    // console.log("tmpBeforeHouse",tmpBeforeHouse);
                    // console.log("tmpCurHouse",tmpCurHouse);
                }
            }
            if(isCompleted?.[menuEnum.ADD_CAR] === true){
                //이벤트 -> 차
                const tmpCarBuySell = add.car.find((carItem)=>carItem.age == i);
                if(tmpCarBuySell){
                    row.eventCarBuyAmount = tmpCarBuySell.sellPrice - tmpCarBuySell.buyPrice;
                    row.eventCarBuyMemo = "차구매,";
                }
            }

            if(isCompleted?.[menuEnum.ADD_ETC] === true){
                if(Array.isArray(add.eventList) && add.eventList.length >= 1){
                    row.eventEtcAmount = 0;
                    row.eventEtcMemo = "";
                    add.eventList.forEach((eventItem)=>{
                        if(row.age == eventItem.age){
                            row.eventEtcAmount = row.eventEtcAmount + (eventItem.price * (eventItem.div=="지출"?-1:1));
                            row.eventEtcMemo = row.eventEtcMemo + eventItem.name + ",";
                        }
                    })

                }
            }
            if(isCompleted?.[menuEnum.MY_INCOME] === true)
            {
                //이벤트 합계
                if(row?.eventRetirementPay === undefined 
                    && row?.eventYourRetirementPay === undefined 
                    && row?.eventMarryPay === undefined
                    && row?.eventPartnerAsset === undefined
                    && row?.eventEtcAmount === undefined
                    && row?.eventHouseMovingAmount === undefined
                    && row?.eventCarBuyAmount === undefined){
                    //
                }else{
                    row.totalEventPrice = (row?.eventRetirementPay??0)
                                        +(row?.eventYourRetirementPay??0)
                                        +(row?.eventMarryPay??0)
                                        +(row?.eventPartnerAsset??0)
                                        +(row?.eventEtcAmount??0)
                                        +(row?.eventHouseMovingAmount??0)
                                        +(row?.eventCarBuyAmount??0);
                    row.totalEventMemo = (row?.eventRetirementMemo??"")
                                        +(row?.eventYourRetirementMemo??"")
                                        +(row?.eventMarryMemo??"")
                                        +(row?.eventPartnerAssetMemo??"")
                                        +(row?.eventEtcMemo??"")
                                        +(row?.eventHouseMovingMemo??"")
                                        +(row?.eventCarBuyMemo??"");
                    row.totalEventMemo = row.totalEventMemo.substring(0, row.totalEventMemo.length-1);
                }
            }






            if(isCompleted?.[menuEnum.MY_ASSET] === true){
                //잔액
                row.totalBalance = (row?.totalIncome??0) + (row?.totalConsumption??0) + (row.totalEventPrice??0);
            }








            if(isCompleted?.[menuEnum.MY_ASSET] === true){
                // 예금 / 투자 stack
                let tmpBalance = row.totalBalance ?? 0; //잔액
                if(tmpBalance < 0){ // 잔액이 음수일 경우.
                    if(assetSavingStack + tmpBalance >= 0){ // 1. 예금 충분할 경우(차감)
                        assetSavingStack = assetSavingStack + tmpBalance;
                        tmpBalance = 0;
                    }else{ 
                        tmpBalance = assetSavingStack + tmpBalance; // 1-2. 예금 부족할 경우(부분 차감)
                        assetSavingStack = 0;

                        if(assetInvestStack + tmpBalance >= 0){ // 2. 투자 충분할 경우(차감)
                            assetInvestStack = assetInvestStack + tmpBalance;
                            tmpBalance = 0;
                        }else{
                            tmpBalance = tmpBalance + assetInvestStack;// 2-2. 투자 부족할 경우(부분 차감)
                            assetInvestStack = 0;

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
                        });

                        if(tmpBalance > 0){ //대출 다 갚고 남은 금액
                            assetSavingStack = assetSavingStack + Math.round(tmpBalance * (my?.bankRate??100)/100);
                            assetInvestStack = assetInvestStack + Math.round(tmpBalance * (my?.investRate??0)/100);
                        }
                    }else{ // 잔액이 양수일 경우 + 대출 없을 경우
                        assetSavingStack = assetSavingStack + Math.round(tmpBalance * (my?.bankRate??100)/100);
                        assetInvestStack = assetInvestStack + Math.round(tmpBalance * (my?.investRate??0)/100);
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

            if(isCompleted?.[menuEnum.MY_FIXED_ASSET] === true){
                //누적자산 -> 주택
                if(isCompleted?.[menuEnum.ADD_HOUSE] !== true){
                    if(Array.isArray(add.house) && add.house.length >= 1){
                        if(loopCnt == 1){
                            assetHousePriceStack = add.house?.find((item)=>item.age == -1)?.housePriceTotal ?? 0;
                        }else{
                            const tmpCurHouse = add.house?.find((item)=>item.age == -1);
                            if(tmpCurHouse.livingType === "매매"){
                                assetHousePriceStack = assetHousePriceStack * (1 + base.realEstateGrouthRate/100);
                            }else{
                                // do nothing //assetHousePriceStack = assetHousePriceStack;
                            }
                        }
                    }
                    row.assetHousePriceStack = assetHousePriceStack;
                }else{
                    //누적자산 -> 주택 (추가정보 - 집 완료시)
                    if(Array.isArray(add.house) && add.house.length >= 1){
                        const newHouse = add.house.find((houseItem)=>(houseItem.age == i));
                        if(newHouse){
                            assetHousePriceStack = newHouse.housePriceTotal;
                        }else{
                            if(loopCnt == 1){
                                assetHousePriceStack = add.house?.find((item)=>item.age == -1)?.housePriceTotal ?? 0;
                            }else{
                                const tmpCurHouseArr = add.house.filter((houseItem)=>houseItem.age < i);
                                const tmpCurHouse = tmpCurHouseArr[tmpCurHouseArr.length-1];
                                // console.log("tmpCurHouse",tmpCurHouse);
                                if(tmpCurHouse.livingType === "매매"){
                                    assetHousePriceStack = assetHousePriceStack * (1 + base.realEstateGrouthRate/100);
                                }else{
                                    // do nothing //assetHousePriceStack = assetHousePriceStack;
                                }
                            }
                        }
                    }
                    row.assetHousePriceStack = assetHousePriceStack;
                }
            }

            if(isCompleted?.[menuEnum.MY_ASSET] === true){
                //누적자산 -> 합계
                row.totalAsset = (row.assetLoanStack ?? 0) + (row.assetSavingStack ?? 0) + (row.assetInvestStack ?? 0)  + (row.assetHousePriceStack ?? 0);
                row.noHouseTotalAsset = (row.assetLoanStack ?? 0) + (row.assetSavingStack ?? 0) + (row.assetInvestStack ?? 0);
            }

            //결과 쌓기
            rows.push(row);
        }

        cashflowData.timeline = rows;



        //그래프 데이터 만들기
        const newChart = rows.map((row)=>{
            const totalAssetSaveA = cashflowData.timelineSaveA.find((itemA)=>itemA.age == row.age)?.totalAsset;
            const totalAssetSaveB = cashflowData.timelineSaveB.find((itemB)=>itemB.age == row.age)?.totalAsset;
            const totalAssetSaveC = cashflowData.timelineSaveC.find((itemC)=>itemC.age == row.age)?.totalAsset;
            const totalAssetSaveD = cashflowData.timelineSaveD.find((itemD)=>itemD.age == row.age)?.totalAsset;
            
            const noHouseTotalAssetSaveA = cashflowData.timelineSaveA.find((itemA)=>itemA.age == row.age)?.noHouseTotalAsset;
            const noHouseTotalAssetSaveB = cashflowData.timelineSaveB.find((itemB)=>itemB.age == row.age)?.noHouseTotalAsset;
            const noHouseTotalAssetSaveC = cashflowData.timelineSaveC.find((itemC)=>itemC.age == row.age)?.noHouseTotalAsset;
            const noHouseTotalAssetSaveD = cashflowData.timelineSaveD.find((itemD)=>itemD.age == row.age)?.noHouseTotalAsset;

            return {
                age:row.age,
                inflationStack:row.inflationStack,
                totalAssetCurrent: row.totalAsset? Math.round(row.totalAsset): 0,
                totalAssetSaveA: totalAssetSaveA? Math.round(totalAssetSaveA): 0,
                totalAssetSaveB: totalAssetSaveB? Math.round(totalAssetSaveB): 0,
                totalAssetSaveC: totalAssetSaveC? Math.round(totalAssetSaveC): 0,
                totalAssetSaveD: totalAssetSaveD? Math.round(totalAssetSaveD): 0,
                noHouseTotalAssetCurrent: row.noHouseTotalAsset? Math.round(row.noHouseTotalAsset): 0,
                noHouseTotalAssetSaveA: noHouseTotalAssetSaveA? Math.round(noHouseTotalAssetSaveA): 0,
                noHouseTotalAssetSaveB: noHouseTotalAssetSaveB? Math.round(noHouseTotalAssetSaveB): 0,
                noHouseTotalAssetSaveC: noHouseTotalAssetSaveC? Math.round(noHouseTotalAssetSaveC): 0,
                noHouseTotalAssetSaveD: noHouseTotalAssetSaveD? Math.round(noHouseTotalAssetSaveD): 0
            };
        });
        cashflowData.chart = newChart;


        //결과
        dispatch(CfSave(cashflowData));
    };

    const step3 = () => {
        // 기본 변수
        const surveyData = JSON.parse(JSON.stringify(surveyDataOrgin));
        let isCompleted = surveyData.isCompleted;
        let base = surveyData.base;

        // console.log("surveyData",surveyData);
        // console.log("cashflowData",cashflowData);

        const exchangedTimeline = JSON.parse(JSON.stringify(cashflowData)).timeline.map((row)=>{
            const infla = row.inflationStack;
            let rowResult = {}
            if(isValueExist(row?.age)){rowResult={...rowResult, age:row.age}}
            if(isValueExist(row?.inflationStack)){rowResult={...rowResult, inflationStack:Math.round(row.inflationStack / infla)}}

            if(isValueExist(row?.salaryRiseRateStack)){rowResult={...rowResult, salaryRiseRateStack:Math.round(row.salaryRiseRateStack / infla)}}
            if(isValueExist(row?.salary)){rowResult={...rowResult, salary:Math.round(row.salary / infla)}}
            if(isValueExist(row?.pension)){rowResult={...rowResult, pension:Math.round(row.pension / infla)}}
            if(isValueExist(row?.sideJob)){rowResult={...rowResult, sideJob:Math.round(row.sideJob / infla)}}
            if(isValueExist(row?.yourTotalIncome)){rowResult={...rowResult, yourTotalIncome:Math.round(row.yourTotalIncome / infla)}}

            if(isValueExist(row?.partnerTotalIncome)){rowResult={...rowResult, partnerTotalIncome:Math.round(row.partnerTotalIncome / infla)}}
            if(isValueExist(row?.totalIncome)){rowResult={...rowResult, totalIncome:Math.round(row.totalIncome / infla)}}
            if(isValueExist(row?.houseCost)){rowResult={...rowResult, houseCost:Math.round(row.houseCost / infla)}}
            if(isValueExist(row?.carCost)){rowResult={...rowResult, carCost:Math.round(row.carCost / infla)}}
            if(isValueExist(row?.loanCost)){rowResult={...rowResult, loanCost:Math.round(row.loanCost / infla)}}

            if(isValueExist(row?.etcExpense)){rowResult={...rowResult, etcExpense:Math.round(row.etcExpense / infla)}}
            if(isValueExist(row?.partnerTotalSpending)){rowResult={...rowResult, partnerTotalSpending:Math.round(row.partnerTotalSpending / infla)}}
            if(isValueExist(row?.babyCost)){rowResult={...rowResult, babyCost:Math.round(row.babyCost / infla)}}
            if(isValueExist(row?.parentCost)){rowResult={...rowResult, parentCost:Math.round(row.parentCost / infla)}}
            if(isValueExist(row?.totalConsumption)){rowResult={...rowResult, totalConsumption:Math.round(row.totalConsumption / infla)}}

            if(row?.totalEventMemo){rowResult={...rowResult, totalEventMemo:row.totalEventMemo}}
            if(isValueExist(row?.totalEventPrice)){rowResult={...rowResult, totalEventPrice:Math.round(row.totalEventPrice / infla)}}
            if(isValueExist(row?.totalBalance)){rowResult={...rowResult, totalBalance:Math.round(row.totalBalance / infla)}}
            if(isValueExist(row?.assetLoanStack)){rowResult={...rowResult, assetLoanStack:Math.round(row.assetLoanStack / infla)}}
            if(isValueExist(row?.assetSavingStack)){rowResult={...rowResult, assetSavingStack:Math.round(row.assetSavingStack / infla)}}

            if(isValueExist(row?.assetInvestStack)){rowResult={...rowResult, assetInvestStack:Math.round(row.assetInvestStack / infla)}}
            if(isValueExist(row?.assetHousePriceStack)){rowResult={...rowResult, assetHousePriceStack:Math.round(row.assetHousePriceStack / infla)}}
            if(isValueExist(row?.totalAsset)){rowResult={...rowResult, totalAsset:Math.round(row.totalAsset / infla)}}
            if(isValueExist(row?.noHouseTotalAsset)){rowResult={...rowResult, noHouseTotalAsset:Math.round(row.noHouseTotalAsset / infla)}}
            
            return rowResult;
        });
        cashflowData.exchangedTimeline = exchangedTimeline;



        const exchangedChart = JSON.parse(JSON.stringify(cashflowData)).chart.map((row)=>{
            const infla = row.inflationStack;
            let rowResult = {}
            if(isValueExist(row?.age)){rowResult={...rowResult, age:row.age}}
            if(isValueExist(row?.totalAssetCurrent)){rowResult={...rowResult, totalAssetCurrent:Math.round(row.totalAssetCurrent / infla)}}
            if(isValueExist(row?.totalAssetSaveA)){rowResult={...rowResult, totalAssetSaveA:Math.round(row.totalAssetSaveA / infla)}}
            if(isValueExist(row?.totalAssetSaveB)){rowResult={...rowResult, totalAssetSaveB:Math.round(row.totalAssetSaveB / infla)}}
            if(isValueExist(row?.totalAssetSaveC)){rowResult={...rowResult, totalAssetSaveC:Math.round(row.totalAssetSaveC / infla)}}
            if(isValueExist(row?.totalAssetSaveD)){rowResult={...rowResult, totalAssetSaveD:Math.round(row.totalAssetSaveD / infla)}}
            
            if(isValueExist(row?.noHouseTotalAssetCurrent)){rowResult={...rowResult, noHouseTotalAssetCurrent:Math.round(row.noHouseTotalAssetCurrent / infla)}}
            if(isValueExist(row?.noHouseTotalAssetSaveA)){rowResult={...rowResult, noHouseTotalAssetSaveA:Math.round(row.noHouseTotalAssetSaveA / infla)}}
            if(isValueExist(row?.noHouseTotalAssetSaveB)){rowResult={...rowResult, noHouseTotalAssetSaveB:Math.round(row.noHouseTotalAssetSaveB / infla)}}
            if(isValueExist(row?.noHouseTotalAssetSaveC)){rowResult={...rowResult, noHouseTotalAssetSaveC:Math.round(row.noHouseTotalAssetSaveC / infla)}}
            if(isValueExist(row?.noHouseTotalAssetSaveD)){rowResult={...rowResult, noHouseTotalAssetSaveD:Math.round(row.noHouseTotalAssetSaveD / infla)}}
            
            return rowResult;
        });
        cashflowData.exchangedChart = exchangedChart;





        dispatch(CfSave(cashflowData));

    };

}