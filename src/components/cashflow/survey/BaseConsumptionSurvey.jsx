import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import {expCheckInt, toKoreanMoneyUnit} from "@/utils/util.js";
import Mapping from '@/components/common/Mapping.jsx';

function BaseConsumptionSurvey({completeBtnClickCnt, commonCompleteLogic}){
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;
    
    const totIncomeMonthly = (surveyData.base?.salaryMonthly??0) + (surveyData.base?.sideJobMonthly??0);
    const houseCostMonthly = surveyData.base?.houseCostMonthly ?? 0;
    const carCostMonthly = surveyData.base?.carCostMonthly ?? 0;
    const [loanCostMonthly, setLoanCostMonthly] = useState(0);//저장하지 않음

    const [savingMonthly, setSavingMonthly] = useState(0);//저장하지 않음
    const etcExpenseMonthly = surveyData.base?.etcExpenseMonthly
        ?? totIncomeMonthly - savingMonthly - houseCostMonthly - carCostMonthly - loanCostMonthly;
    
    const bankRate = surveyData.base?.bankRate ?? 80;
    const investRate = surveyData.base?.investRate ?? 20;

    useEffect(()=>{
        let newLoanCostMonthly = 0;
        surveyData.base.loan.forEach((item)=>{
            newLoanCostMonthly += item.loanAmount * (item.loanInterest/100) / 12;
        })
        newLoanCostMonthly = Math.round(newLoanCostMonthly);
        setLoanCostMonthly(newLoanCostMonthly);
        setSavingMonthly(
            surveyData.base?.etcExpenseMonthly
            ? totIncomeMonthly - houseCostMonthly - carCostMonthly - newLoanCostMonthly - surveyData.base?.etcExpenseMonthly
            : 0);
        
    })

    const surveyOnChange = (e, div) => {
        if(div==="savingMonthly"){
            const ret = expCheckInt(e.target.value, 0, totIncomeMonthly - houseCostMonthly - carCostMonthly - loanCostMonthly);
            if(ret === null){return;}
            else{
                setSavingMonthly(ret);
                surveyData.base.etcExpenseMonthly = totIncomeMonthly - ret - houseCostMonthly - carCostMonthly - loanCostMonthly;
            }
        }else if(div==="bankRate"){
            const ret = expCheckInt(e.target.value, 0, 100);
            if(ret === null){return;}
            else{ 
                surveyData.base.bankRate = ret; 
                surveyData.base.investRate = 100 - ret; 
            }
        }

        dispatch(SvSave(surveyData));
    };
        
    useEffectNoMount(()=>{
        surveyData.base.etcExpenseMonthly = etcExpenseMonthly;
        surveyData.base.bankRate = bankRate;
        surveyData.base.investRate = investRate;

        if(surveyData.base.etcExpenseMonthly < 0){
            alert("기타소비는 마이너스(-) 일 수 없습니다.");
            return;
        }
        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return(
        <Fragment>
            <div>
                <p className="question">(1) 현재 월 수입(<i>{toKoreanMoneyUnit(totIncomeMonthly)}</i>) 중 얼마나 저축하고 있나요?</p>
                <p>- 저축 : <input className='btn1' value={savingMonthly.toLocaleString('ko-KR')}  onChange={(e)=>{surveyOnChange(e,"savingMonthly")}}/>원({toKoreanMoneyUnit(savingMonthly)})</p>
            </div>
            <div>
                <p className="question">(2) 총 지출금액(수입 - 저축) {toKoreanMoneyUnit(totIncomeMonthly - savingMonthly)}이 자동계산됩니다.</p>
                {/* <p>- 총 소비금액 : <input className='btn1 readonly' value={(totIncomeMonthly - savingMonthly).toLocaleString('ko-KR')} readOnly={true}/>원()</p> */}
                <p>- <Mapping txt="ⓐ"/>주거비<Mapping txt="(사전입력:2-ⓒ)"/> : <input className='btn1 readonly' value={houseCostMonthly.toLocaleString('ko-KR')} readOnly={true}/>원({toKoreanMoneyUnit(houseCostMonthly)})</p>
                <p>- <Mapping txt="ⓑ"/>차량비<Mapping txt="(사전입력:3-ⓑ)"/> : <input className='btn1 readonly' value={carCostMonthly.toLocaleString('ko-KR')} readOnly={true}/>원({toKoreanMoneyUnit(carCostMonthly)})</p>
                <p>- <Mapping txt="ⓒ"/>대출이자<Mapping txt="(사전입력:4-ⓐ)"/> : <input className='btn1 readonly' value={loanCostMonthly.toLocaleString('ko-KR')} readOnly={true}/>원({toKoreanMoneyUnit(loanCostMonthly)})</p>
                <p>- <Mapping txt="ⓓ"/>기타소비(자동계산) : <input className='btn1 readonly' value={etcExpenseMonthly.toLocaleString('ko-KR')} readOnly={true}/>원({toKoreanMoneyUnit(etcExpenseMonthly)})</p>
                <p className='note'>※ 소비 계산방법 = 물가상승률<Mapping txt="(1-ⓐ)"/> x <i>총 소비금액({toKoreanMoneyUnit(totIncomeMonthly - savingMonthly)})</i></p>
            </div>
            <div>
                <p className="question">(3) 저축(잔액)의 예금 / 투자 비율을 입력해주세요.</p>
                <p>- 예금 : <input className='btn1' value={bankRate} onChange={(e)=>{surveyOnChange(e,"bankRate")}}/> %</p>
                <p>- 투자(자동계산) : <input className='btn1 readonly' value={investRate} readOnly={true}/> %</p>
            </div>
        </Fragment>);
}
export default BaseConsumptionSurvey;