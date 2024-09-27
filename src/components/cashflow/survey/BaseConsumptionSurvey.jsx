import { Fragment, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";
import Mapping from '@/components/common/Mapping.jsx';

function BaseConsumptionSurvey({completeBtnClickCnt, commonCompleteLogic}){
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;
    const base = surveyData.base;
    
    const [indexInflation, setIndexInflation] = useState(base?.indexInflation ?? 3.5);
    const [savingMonthly, setSavingMonthly] = useState(base?.savingMonthly ?? 0);

    const totIncomeMonthly = (base?.salaryMonthly??0) + (base?.sideJobMonthly??0);

    const surveyOnChange = (e, div) => {
        if(div==="indexInflation"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            if(number.toString().length >= 5){return;}//길이체크

            if(number === 0 || number === ""){
                setIndexInflation(0);
                return;
            }
            else if(0 <= number && number <= 100){
                if(/^0\d/.test(number)){
                    setIndexInflation(Number(number).toString());
                }else{
                    setIndexInflation(number);
                }
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

            if(0 <= valInt && valInt <= totIncomeMonthly){
                setSavingMonthly(valInt);
            }else if(totIncomeMonthly < valInt){
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
        base.consumptionMonthly = totIncomeMonthly - (surveyData.prev?.carCostMonthly ?? 0) - (surveyData.prev?.houseCostMonthly ?? 0) - savingMonthly;
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
                <p className="question">(1) 시뮬레이션 물가상승률을 입력해주세요.</p>
                <p>- <Mapping txt="ⓐ"/> : <input className='btn1' value={indexInflation} onChange={(e)=>{surveyOnChange(e,"indexInflation")}}/>%</p>
                <p className='note'>※ 2000년 ~ 2023년 평균 물가상승률은 약 3.5%입니다.(통계청 소비자물가지수 참고)</p>
            </div>
            <div>
                <p className="question">(2) 현재 월 소득(<i>{totIncomeMonthly}만원</i>) 중 얼마나 저축하고 있나요?</p>
                <p>- <Mapping txt="ⓑ"/> : 저축 : <input className='btn1' value={savingMonthly}  onChange={(e)=>{surveyOnChange(e,"savingMonthly")}}/> 만원</p>
                <p>- <Mapping txt="ⓒ"/> : 차량 유지비(사전입력) : <input className='btn1 readonly' value={surveyData.prev?.carCostMonthly ?? 0} readOnly={true}/> 만원</p>
                <p>- <Mapping txt="ⓓ"/> : 주거비(사전입력) : <input className='btn1 readonly' value={surveyData.prev?.houseCostMonthly ?? 0} readOnly={true}/> 만원</p>
                <p>- <Mapping txt="ⓔ"/> : 기타 소비(자동계산) : <input className='btn1 readonly' value={totIncomeMonthly - (surveyData.prev?.carCostMonthly ?? 0) - (surveyData.prev?.houseCostMonthly ?? 0) 
                    - savingMonthly} readOnly={true}/> 만원</p>
                <p className='note'>※ 미래 소비 계산방법 = 물가상승률(누적) x <i>현재소비({totIncomeMonthly - savingMonthly}만원)</i></p>
            </div>
        </Fragment>);
}
export default BaseConsumptionSurvey;