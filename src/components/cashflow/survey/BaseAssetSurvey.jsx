import { Fragment, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";

//나이
function BaseAssetSurvey({completeBtnClickCnt, commonCompleteLogic}){
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;
    const base = surveyData.base;

    const [bankRate, setBankRate] = useState(base?.bankRate ?? 70);
    const [investRate, setInvestRate] = useState(base?.investRate ?? 30);
    const [loanInterest, setLoanInterest] = useState(base?.loanInterest ?? "6.0");
    const [bankInterest, setBankInterest] = useState(base?.bankInterest ?? "3.0");
    const [investIncome, setInvestIncome] = useState(base?.investIncome ?? "5.0");

    const surveyOnChange = (e, div) => {
        if(div==="bankRate"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            const valInt = Math.round(number); //정수변환

            if(0 <= valInt && valInt <= 100){
                setBankRate(valInt);
                setInvestRate(100 - valInt);
            }else if(100 < valInt){
                return;
            }else{
                setBankRate(0);
                setInvestRate(100);
                return;
            }
        }else if(div==="loanInterest"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            if(number.toString().length >= 5){return;}//길이체크

            if(0 <= number && number <= 100){
                setLoanInterest(number);
            }else if(100 < number){
                return;
            }else{
                setLoanInterest(0);
                return;
            }
        }else if(div==="bankInterest"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            if(number.toString().length >= 5){return;}//길이체크

            if(0 <= number && number <= 100){
                setBankInterest(number);
            }else if(100 < number){
                return;
            }else{
                setBankInterest(0);
                return;
            }
        }else if(div==="investIncome"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            if(number.toString().length >= 5){return;}//길이체크

            if(0 <= number && number <= 100){
                setInvestIncome(number);
            }else if(100 < number){
                return;
            }else{
                setInvestIncome(0);
                return;
            }
        }
    };

    useEffectNoMount(()=>{
        base.bankRate = bankRate;
        base.investRate = investRate;
        
        base.loanInterest = loanInterest;
        base.bankInterest = bankInterest;
        base.investIncome = investIncome;

        surveyData.base = base;

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return(
    <Fragment>
        <div>
            <p>(1) 저축 금액 중 예금 / 투자 비율을 입력해주세요.</p>
            <p>예금 : <input value={bankRate} onChange={(e)=>{surveyOnChange(e,"bankRate")}}/> %</p>
            <p>투자 : <input value={investRate} readOnly={true}/> %</p>
        </div>
        <div>
            <p>(2) 대출금리를 입력해주세요.</p>
            <p><input value={loanInterest} onChange={(e)=>{surveyOnChange(e,"loanInterest")}}/> %</p>
            <p className='note'>※ 2000년 ~ 2023년 1금융권 평균 대출금리는 약 6.0%입니다.</p>
        </div>
        <div>
            <p>(3) 예금금리를 입력해주세요.</p>
            <p><input value={bankInterest} onChange={(e)=>{surveyOnChange(e,"bankInterest")}}/> %</p>
            <p className='note'>※ 2000년 ~ 2023년 1금융권 평균 대출금리는 약 3.0%입니다.</p>
        </div>
        <div>
            <p>(4) 투자수익률을 입력해주세요.</p>
            <p><input value={investIncome} onChange={(e)=>{surveyOnChange(e,"investIncome")}}/> %</p>
            {/* <p>※ 은행예적금/실거주 주택은 별도로 계산하므로 투자수익률에서 제외합니다.</p> */}
            <p>※ 세계적인 투자자 워런버핏의 수익률이 20%라고 하죠. 투자수익률은 미래 자산에 큰 영향도를 미치므로, 현실적인 수치를 입력해주시길 바랍니다.</p>
        </div>
    </Fragment>);
}
export default BaseAssetSurvey;