import { Fragment, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';

function BaseSavingSurvey({completeBtnClickCnt, commonCompleteLogic}){
    const surveyData = useSelector((store) => store.Survey).data;
    const dispatch = useDispatch();

    const [saving, setSaving] = useState(surveyData.base?.age ?? 50);
    return(
        <Fragment>
            <div>
                <p>(1) 현재 월급의 몇%를 저축하고 있나요?</p>
                <p><input value={saving} onChange={(e)=>{surveyOnChange(e,"saving")}}/> %</p>
            </div>
        </Fragment>);
}
export default BaseSavingSurvey;