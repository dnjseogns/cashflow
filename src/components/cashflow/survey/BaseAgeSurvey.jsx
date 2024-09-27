import { Fragment, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";
import Mapping from '@/components/common/Mapping.jsx';

//나이
function BaseAgeSurvey({completeBtnClickCnt, commonCompleteLogic}){
    const surveyData = useSelector((store) => store.Survey).data;
    const dispatch = useDispatch();

    const [age, setAge] = useState(surveyData.base?.age ?? 22);

    const surveyOnChange = (e, div) => {
        if(div==="age"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            const valInt = numRound(number, 0); //정수변환

            if(0 <= valInt && valInt <= 100){
                setAge(valInt);
            }else if(100 < valInt){
                return;
            }else{
                setAge(0);
                return;
            }
        }
    };

    useEffectNoMount(()=>{
        surveyData.base.age = age;

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return(
    <Fragment>
        <div>
            <p className="question">(1) 만 나이를 입력해주세요.</p>
            <p>- <Mapping txt="ⓐ"/> : <input className='btn1' value={age} onChange={(e)=>{surveyOnChange(e,"age")}}/> 세</p>
        </div>
    </Fragment>);
}
export default BaseAgeSurvey;