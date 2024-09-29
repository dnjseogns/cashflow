import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";
import Mapping from '@/components/common/Mapping.jsx';
import { isValueExist, expCheckInt, expCheckDouble } from '@/utils/util.js';

//나이
function BaseAgeSurvey({completeBtnClickCnt, commonCompleteLogic}){
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    const age = surveyData.base?.age ?? 22;
    const indexInflation = surveyData.base?.indexInflation ?? 3.5;

    const surveyOnChange = (e, div) => {
        if(div==="age"){
            const ret = expCheckInt(e.target.value, 0, 100);
            if(ret === null){return;}
            else{ surveyData.base.age = ret; }
        } else if(div==="indexInflation"){
            const ret = expCheckDouble(e.target.value, 0, 100, 5);
            if(ret === null){return;}
            else{surveyData.base.indexInflation = ret;}
        }
        
        dispatch(SvSave(surveyData));
    };

    useEffectNoMount(()=>{
        surveyData.base.age = age;
        surveyData.base.indexInflation = indexInflation;

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return(
    <Fragment>
        <div>
            <p className="question">(1) 만 나이를 입력해주세요.</p>
            <p>- <Mapping txt="ⓐ"/> : <input className='btn1' value={age} onChange={(e)=>{surveyOnChange(e,"age")}}/> 세</p>
        </div>
        <div>
            <p className="question">(2) 시뮬레이션 물가상승률을 입력해주세요.</p>
            <p>- <Mapping txt="ⓑ"/> : <input className='btn1' value={indexInflation} onChange={(e)=>{surveyOnChange(e,"indexInflation")}}/>%</p>
            <p className='note'>※ 2000년 ~ 2023년 평균 물가상승률은 약 3.5%입니다.(통계청 소비자물가지수 참고)</p>
        </div>
    </Fragment>);
}
export default BaseAgeSurvey;