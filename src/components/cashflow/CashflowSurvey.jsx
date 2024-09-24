import './Cashflow.css';
import { Fragment, useEffect, useRef, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
//
import GuideSurvey from './survey/GuideSurvey';
//
import PrevCarSurvey from './survey/PrevCarSurvey';
import PrevHouseSurvey from './survey/PrevHouseSurvey';
//
import BaseAgeSurvey from './survey/BaseAgeSurvey';
import BaseSalarySurvey from './survey/BaseSalarySurvey';
import BaseConsumptionSurvey from './survey/BaseConsumptionSurvey';
import BaseBalanceSurvey from './survey/BaseBalanceSurvey';
import BaseAssetSurvey from './survey/BaseAssetSurvey';

/* 입력해주신 자료는 이번 계산에만 활용합니다. 이 사이트는 어떤 개인 정보도 저장하지 않습니다. */

function CashflowSurvey({surveyDiv,setSurveyDiv, surveyTitle}){
    const surveyData = useSelector((store) => store.Survey).data;
    const dispatch = useDispatch();
    const [completeBtnClickCnt,setCompleteBtnClickCnt] = useState(0);
    const commonCompleteLogic = () => {
        //완료
        const isSurveyCompleted = surveyData.isCompleted;
        isSurveyCompleted[surveyDiv] = true;
        if(surveyDiv === "guide"){
            if(isSurveyCompleted.car === null) isSurveyCompleted.car = false;
        }
        if(surveyDiv === "car"){
            if(isSurveyCompleted.house === null) isSurveyCompleted.house = false;
            if(isSurveyCompleted.consumption === true) {isSurveyCompleted.consumption = false;}
            if(isSurveyCompleted.asset === true) {isSurveyCompleted.asset = false;}
        }
        if(surveyDiv === "house"){
            if(isSurveyCompleted.age === null) isSurveyCompleted.age = false;
            if(isSurveyCompleted.consumption === true) {isSurveyCompleted.consumption = false;}
            if(isSurveyCompleted.asset === true) {isSurveyCompleted.asset = false;}
        }
        if(surveyDiv === "age"){
            if(isSurveyCompleted.salary === null) isSurveyCompleted.salary = false;
        }
        if(surveyDiv === "salary"){
            if(isSurveyCompleted.consumption === null) isSurveyCompleted.consumption = false;
            if(isSurveyCompleted.consumption === true) isSurveyCompleted.consumption = false;
        }
        if(surveyDiv === "consumption"){
            if(isSurveyCompleted.balance === null) isSurveyCompleted.balance = false;
        }
        if(surveyDiv === "balance"){
            if(isSurveyCompleted.asset === null) isSurveyCompleted.asset = false;
        }
        if(surveyDiv === "asset"){
            if(isSurveyCompleted.marry === null) isSurveyCompleted.marry = false;
            if(isSurveyCompleted.baby === null) isSurveyCompleted.baby = false;
            if(isSurveyCompleted.retire === null) isSurveyCompleted.retire = false;
            if(isSurveyCompleted.parent === null) isSurveyCompleted.parent = false;
            if(isSurveyCompleted.lotto === null) isSurveyCompleted.lotto = false;
        }
        surveyData.isCompleted = isSurveyCompleted;
        dispatch(SvSave(surveyData));
        //survey창닫기
        setSurveyDiv("");
    }
    return (
    <Fragment>
        {surveyDiv===""
        ? null
        : <Fragment>
            <article className={'survey-area '+surveyDiv}>
                <div className='survey-title'><span>{surveyTitle}</span><a onClick={()=>{setSurveyDiv("");}}>⨉</a></div>
                <div className='survey-content'>
                {surveyDiv==="guide"?<GuideSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                //
                :surveyDiv==="car"?<PrevCarSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                :surveyDiv==="house"?<PrevHouseSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                //
                :surveyDiv==="age"?<BaseAgeSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                :surveyDiv==="salary"?<BaseSalarySurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                :surveyDiv==="consumption"?<BaseConsumptionSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                :surveyDiv==="balance"?<BaseBalanceSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                :surveyDiv==="asset"?<BaseAssetSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                //
                // :surveyDiv==="index"?<BaseIndexSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                // :surveyDiv==="house"?<BasicHouseSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                // :surveyDiv==="asset"?<BasicAssetSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                // :surveyDiv==="marry"?<AddMarry completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                // :surveyDiv==="baby"?<AddBaby completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                // :surveyDiv==="retire"?<AddRetire completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                // :surveyDiv==="parent"?<AddParent completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                // :surveyDiv==="lotto"?<AddLotto completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                :null}
                </div>
                <div className='survey-tail'>
                    <button className='complete' onClick={()=>{setCompleteBtnClickCnt(completeBtnClickCnt+1)}}>{surveyDiv === "guide" ? "시작하기" : "저장하기"}</button>
                </div>
            </article>
            </Fragment>
        }
    </Fragment>
    );
}

// function BasicAssetSurvey({completeBtnClickCnt, commonCompleteLogic}){
//     const surveyData = useSelector((store) => store.Survey).data;
//     const dispatch = useDispatch();
//     useEffectNoMount(()=>{
//         dispatch(SvSave(surveyData));
//         commonCompleteLogic();
//     },[completeBtnClickCnt]);
//     const DataChange = (div, e) => {
//         surveyData.base[div] = e.target.value;
//     };

//     return(<Fragment>BasicAssetSurvey</Fragment>);
// }

// function AddMarry({completeBtnClickCnt, commonCompleteLogic}){
//     const surveyData = useSelector((store) => store.Survey).data;
//     const dispatch = useDispatch();
//     useEffectNoMount(()=>{
//         dispatch(SvSave(surveyData));
//         commonCompleteLogic();
//     },[completeBtnClickCnt]);
//     const DataChange = (div, e) => {
//         surveyData.base[div] = e.target.value;
//     };

//     return(<Fragment>AddMarry</Fragment>);
// }

// function AddBaby({completeBtnClickCnt, commonCompleteLogic}){
//     const surveyData = useSelector((store) => store.Survey).data;
//     const dispatch = useDispatch();
//     useEffectNoMount(()=>{
//         dispatch(SvSave(surveyData));
//         commonCompleteLogic();
//     },[completeBtnClickCnt]);
//     const DataChange = (div, e) => {
//         surveyData.base[div] = e.target.value;
//     };

//     return(<Fragment>AddBaby</Fragment>);
// }

// function AddRetire({completeBtnClickCnt, commonCompleteLogic}){
//     const surveyData = useSelector((store) => store.Survey).data;
//     const dispatch = useDispatch();
//     useEffectNoMount(()=>{
//         dispatch(SvSave(surveyData));
//         commonCompleteLogic();
//     },[completeBtnClickCnt]);
//     const DataChange = (div, e) => {
//         surveyData.base[div] = e.target.value;
//     };

//     return(<Fragment>AddRetire</Fragment>);
// }

// function AddParent({completeBtnClickCnt, commonCompleteLogic}){
//     const surveyData = useSelector((store) => store.Survey).data;
//     const dispatch = useDispatch();
//     useEffectNoMount(()=>{
//         dispatch(SvSave(surveyData));
//         commonCompleteLogic();
//     },[completeBtnClickCnt]);
//     const DataChange = (div, e) => {
//         surveyData.base[div] = e.target.value;
//     };

//     return(<Fragment>AddParent</Fragment>);
// }

// function AddLotto({completeBtnClickCnt, commonCompleteLogic}){
//     const surveyData = useSelector((store) => store.Survey).data;
//     const dispatch = useDispatch();
//     useEffectNoMount(()=>{
//         dispatch(SvSave(surveyData));
//         commonCompleteLogic();
//     },[completeBtnClickCnt]);
//     const DataChange = (div, e) => {
//         surveyData.base[div] = e.target.value;
//     };

//     return(<Fragment>AddLotto</Fragment>);
// }

export default CashflowSurvey;