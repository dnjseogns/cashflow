import { Fragment, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import {expCheckInt, toKoreanMoneyUnit} from "@/utils/util.js";
import Mapping from '@/components/common/Mapping.jsx';

function BaseConsumptionSurvey({completeBtnClickCnt, commonCompleteLogic}){
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;
    const base = surveyData.base;
    
    const savingMonthly = base?.savingMonthly ?? 0;
    const totIncomeMonthly = (base?.salaryMonthly??0) + (base?.sideJobMonthly??0);

    const surveyOnChange = (e, div) => {
        if(div==="savingMonthly"){
            const ret = expCheckInt(e.target.value, 0, 1000000000);
            if(ret === null){return;}
            else{surveyData.base.savingMonthly = ret;}
        }

        dispatch(SvSave(surveyData));
    };
        
    useEffectNoMount(()=>{
        base.savingMonthly = savingMonthly;
        base.consumptionMonthly = totIncomeMonthly - savingMonthly;
        surveyData.base = base;

        if(base.consumptionMonthly < 0){
            alert("소비는 마이너스(-) 일 수 없습니다.");
            return;
        }
        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return(
        <Fragment>
            <div>
                <p className="question">(1) 현재 월 소득(<i>{toKoreanMoneyUnit(totIncomeMonthly)}</i>) 중 얼마나 저축하고 있나요?</p>
                <p>- 저축 : <input className='btn1' value={savingMonthly.toLocaleString('ko-KR')}  onChange={(e)=>{surveyOnChange(e,"savingMonthly")}}/>원({toKoreanMoneyUnit(savingMonthly)})</p>
                <p>- <Mapping txt="ⓑ"/>소비(자동계산) : <input className='btn1 readonly' value={(totIncomeMonthly - savingMonthly).toLocaleString('ko-KR')} readOnly={true}/>원({toKoreanMoneyUnit(totIncomeMonthly - savingMonthly)})</p>
                <p className='note'>※ 미래 소비 계산방법 = 물가상승률<Mapping txt="(5-ⓐ)"/> x <i>소비금액({toKoreanMoneyUnit(totIncomeMonthly - savingMonthly)})</i></p>
            </div>
        </Fragment>);
}
export default BaseConsumptionSurvey;