import { Fragment, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";

function BaseSavingSurvey({completeBtnClickCnt, commonCompleteLogic}){
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;
    const base = surveyData.base;
    
    const [indexInflation, setIndexInflation] = useState(base?.indexInflation ?? 3.5);
    const [savingMonthly, setSavingMonthly] = useState(base?.savingMonthly ?? 0);

    const totIncomeMonthly = base?.salaryMonthly??0 + base?.sideJobMonthly??0;
    const surveyOnChange = (e, div) => {
        if(div==="indexInflation"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            if(number.toString().length >= 5){return;}//길이체크

            if(0 <= number && number <= 100){
                setIndexInflation(number);
            }else if(100 < number){
                return;
            }else{
                setIndexInflation(0);
                return;
            }
        }else if(div==="savingMonthly"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            const valInt = Math.round(number); //정수변환

            if(0 <= valInt && valInt <= 100){
                setSavingMonthly(valInt);
            }else if(100 < valInt){
                return;
            }else{
                setSavingMonthly(0);
                return;
            }
        }
    };
        
    useEffectNoMount(()=>{
        base.indexInflation = indexInflation;
        base.savingMonthly = savingMonthly; 
        base.consumptionMonthly = totIncomeMonthly - savingMonthly;
        surveyData.base = base;

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);
    return(
        <Fragment>
            <div>
                <p>(1) 물가상승률을 입력해주세요.</p>
                <p><input value={indexInflation} onChange={(e)=>{surveyOnChange(e,"indexInflation")}}/>%</p>
                <p className='note'>※ 2000년 ~ 2023년 평균 물가상승률은 약 3.5%입니다.(통계청 소비자물가지수 참고)</p>
            </div>
            <div>
                <p>(2) 현재 월 소득({totIncomeMonthly}만원) 중 얼마나 저축하고 있나요?</p>
                <p>저축 : <input value={savingMonthly}  onChange={(e)=>{surveyOnChange(e,"savingMonthly")}}/> 만원</p>
                <p>소비 : <input value={totIncomeMonthly - savingMonthly} readOnly={true}/> 만원</p>
            </div>
        </Fragment>);
}
export default BaseSavingSurvey;