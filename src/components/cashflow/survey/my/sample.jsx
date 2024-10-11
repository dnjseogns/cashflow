import { Fragment, useEffect, useRef, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";
import plusIcon from "@/images/icon_add.png";
import minusIcon from "@/images/icon_del.png";
import Mapping from '@/components/common/Mapping.jsx';
import {expCheckInt, expCheckDouble, toKoreanMoneyUnit} from "@/utils/util.js";


function SurveyMyIncome({completeBtnClickCnt, commonCompleteLogic}){
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;




    const [savingMonthly, setSavingMonthly] = useState(0);//저장하지 않음



    

    const dispatchValue = (div, value) => {
        if(value === null){return;}
        else{ surveyData.??????[div] = value;}
    }
    const surveyOnChange = (e, div) => {
        if(div === "savingMonthly"){
            //여기 할 차례
            // dispatchValue(div, expCheckInt(e.target.value, 0, 10000000000));
        }
        
        dispatch(SvSave(surveyData));
    };




    useEffectNoMount(()=>{

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);






    return(
    <Fragment>
        <div>
            <p className="question">(1) 현재 월 수입 중 얼마나 저축하고 계신가요?</p>
            <p>- 저축 : <input className='btn1' value={savingMonthly.toLocaleString('ko-KR')}  onChange={(e)=>{surveyOnChange(e,"savingMonthly")}}/>원({toKoreanMoneyUnit(savingMonthly)})</p>
        </div>
    </Fragment>);
}
export default SurveyMyIncome;