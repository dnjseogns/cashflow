import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";
import Mapping from '@/components/common/Mapping.jsx';
import { isValueExist, expCheckInt, expCheckDouble } from '@/utils/util.js';

//나이
function SurveyBaseMode({completeBtnClickCnt, commonCompleteLogic}){
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    const marryYn = surveyData?.base?.marryYn ?? "N";

    const surveyOnChange = (e, div) => {
        if(div==="marryYn"){
            surveyData.base.marryYn = e.target.value;
        }
        
        dispatch(SvSave(surveyData));
    };

    useEffectNoMount(()=>{
        surveyData.base.marryYn = marryYn;
        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return(
    <Fragment>
        <div>
            <p className="question">(1) 기혼자이신가요?</p>
            <p className="radio-wrap">
                <input type="radio" name="marryYn" id="marryYn_N" value="N" checked={marryYn==="N"?true:false} onChange={(e)=>{surveyOnChange(e,"marryYn")}}/><label htmlFor="marryYn_N">아니오(싱글모드)</label>
                <input type="radio" name="marryYn" id="marryYn_Y" value="Y" checked={marryYn==="Y"?true:false} onChange={(e)=>{surveyOnChange(e,"marryYn")}}/><label htmlFor="marryYn_Y">예(듀오모드)</label>
            </p>
        </div>
    </Fragment>);
}
export default SurveyBaseMode;