import { Fragment, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';

//나이
function BaseAgeSurvey({completeBtnClickCnt, commonCompleteLogic}){
    const surveyData = useSelector((store) => store.Survey).data;
    const dispatch = useDispatch();

    const [age, setAge] = useState(surveyData.base?.age ?? 20);

    useEffectNoMount(()=>{
        surveyData.base.age = age;

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    const surveyOnChange = (e, div) => {
        if(div==="age"){
            if(isNaN(e.target.value)){return;} //문자 체크
            const ageInt = Math.floor(e.target.value); //정수변환
            if(0 <= ageInt && ageInt <= 100){
                setAge(ageInt);
            }else if(100 < ageInt){
                return;
            }else{
                setAge(0);
                return;
            }
            setAge(ageInt);
        }
    };

    return(
    <Fragment>
        <div>
            <p>(1) 나이를 입력해주세요.</p>
            <p><input value={age} onChange={(e)=>{surveyOnChange(e,"age")}}/> 세</p>
        </div>
    </Fragment>);
}
export default BaseAgeSurvey;