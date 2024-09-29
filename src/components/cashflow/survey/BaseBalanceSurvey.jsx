import { Fragment, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";
import Mapping from '@/components/common/Mapping.jsx';

const BaseBalanceSurvey = ({completeBtnClickCnt, commonCompleteLogic}) => {
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    const bankRate = surveyData.base?.bankRate ?? 70;
    const investRate = surveyData.base?.investRate ?? 30;

    const surveyOnChange = (e, div) => {
        if(div==="bankRate"){
            const ret = expCheckInt(e.target.value, 0, 100);
            if(ret === null){return;}
            else{ surveyData.base.bankRate = ret; }
        }
        
        dispatch(SvSave(surveyData));
    };

    useEffectNoMount(()=>{
        surveyData.base.bankRate = bankRate;
        surveyData.base.investRate = investRate;

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return (
        <div>
            <p className="question">(1) 잔액(소득 - 소비)이 남을 경우 예금 / 투자 비율을 입력해주세요.</p>
            <p>- 예금 : <input className='btn1' value={bankRate} onChange={(e)=>{surveyOnChange(e,"bankRate")}}/> %</p>
            <p>- 투자(자동계산) : <input className='btn1 readonly' value={investRate} readOnly={true}/> %</p>
            <p className='note'>※ 단, 대출이 있을 경우 대출 상환을 우선합니다.(대출 내에선 금리 높은 대출 우선 상환)</p>
            <p className='note'>※ 잔액이 마이너스(-)일 경우, 예금 → 투자 → 대출 순으로 우선 차감됩니다.</p>
        </div>
    )
}
export default BaseBalanceSurvey;