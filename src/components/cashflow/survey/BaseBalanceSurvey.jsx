import { Fragment, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";

const BaseBalanceSurvey = ({completeBtnClickCnt, commonCompleteLogic}) => {
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;
    const base = surveyData.base;

    const [bankRate, setBankRate] = useState(base?.bankRate ?? 70);
    const [investRate, setInvestRate] = useState(base?.investRate ?? 30);

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
        }
    };

    useEffectNoMount(()=>{
        base.bankRate = bankRate;
        base.investRate = investRate;

        surveyData.base = base;

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return (
        <div>
            <p>(1) 잔액 중 예금 / 투자 비율을 입력해주세요.</p>
            <p>예금 : <input value={bankRate} onChange={(e)=>{surveyOnChange(e,"bankRate")}}/> %</p>
            <p>투자 : <input value={investRate} readOnly={true}/> %</p>
            <p className='note'>※ 단, 대출이 있을 경우 대출 상환을 우선합니다.</p>
            <p className='note'>※ 잔액이 마이너스(-)일 경우, 예금 → 투자 → 대출 순으로 우선 차감됩니다.</p>
        </div>
    )
}
export default BaseBalanceSurvey;