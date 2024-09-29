import './Cashflow.css';
import { Fragment, useEffect, useRef, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
//
import GuideSurvey from './survey/GuideSurvey';
//
import BaseCarSurvey from './survey/BaseCarSurvey';
import BaseHouseSurvey from './survey/BaseHouseSurvey';
//
import BaseAgeSurvey from './survey/BaseAgeSurvey';
import BaseSalarySurvey from './survey/BaseSalarySurvey';
import BaseConsumptionSurvey from './survey/BaseConsumptionSurvey';
import BaseBalanceSurvey from './survey/BaseBalanceSurvey';
import BaseAssetSurvey from './survey/BaseAssetSurvey';
import { useMenuContext } from '@/components/cashflow/MenuContext.jsx';

/* 입력해주신 자료는 이번 계산에만 활용합니다. 이 사이트는 어떤 개인 정보도 저장하지 않습니다. */

function CashflowSurvey(){
    const {surveyDiv, setSurveyDiv, surveyTitle, setSurveyTitle, 
        menuEnum, setSurveyDivition} = useMenuContext();

    const surveyData = useSelector((store) => store.Survey).data;
    const dispatch = useDispatch();
    const [completeBtnClickCnt,setCompleteBtnClickCnt] = useState(0);
    
    const commonCompleteLogic = () => {
        //완료
        const isSurveyCompleted = surveyData.isCompleted;
        isSurveyCompleted[surveyDiv] = true;
        if(surveyDiv === "guide"){
            if(isSurveyCompleted.age === null) {isSurveyCompleted.age = false;}
            setSurveyDivition("age");
        }
        if(surveyDiv === "age"){
            if(isSurveyCompleted.salary === null) isSurveyCompleted.salary = false;
            setSurveyDivition("salary");
        }
        if(surveyDiv === "salary"){
            if(isSurveyCompleted.consumption === null) isSurveyCompleted.consumption = false;
            setSurveyDivition("consumption");
        }
        if(surveyDiv === "consumption"){
            if(isSurveyCompleted.balance === null) isSurveyCompleted.balance = false;
            setSurveyDivition("balance");
        }
        if(surveyDiv === "balance"){
            if(isSurveyCompleted.house === null) isSurveyCompleted.house = false;
            setSurveyDivition("house");
        }
        if(surveyDiv === "house"){
            if(isSurveyCompleted.car === null) isSurveyCompleted.car = false;
            setSurveyDivition("car");
        }
        if(surveyDiv === "car"){
            if(isSurveyCompleted.asset === null) isSurveyCompleted.asset = false;
            setSurveyDivition("asset");
        }
        if(surveyDiv === "asset"){
            setSurveyDivition("");
            if(isSurveyCompleted.marry === null) isSurveyCompleted.marry = false;
            if(isSurveyCompleted.baby === null) isSurveyCompleted.baby = false;
            if(isSurveyCompleted.house2 === null) isSurveyCompleted.house2 = false;
            if(isSurveyCompleted.car2 === null) isSurveyCompleted.car2 = false;
            if(isSurveyCompleted.retire === null) isSurveyCompleted.retire = false;
            if(isSurveyCompleted.parent === null) isSurveyCompleted.parent = false;
            if(isSurveyCompleted.lotto === null) isSurveyCompleted.lotto = false;
        }
        surveyData.isCompleted = isSurveyCompleted;
        dispatch(SvSave(surveyData));
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
                :surveyDiv==="car"?<BaseCarSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                :surveyDiv==="house"?<BaseHouseSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
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
                    <button className='complete' onClick={()=>{setCompleteBtnClickCnt(completeBtnClickCnt+1)}}>
                        {surveyDiv === "guide" ? "시작하기" 
                        : surveyDiv === "age" || surveyDiv === "salary" || surveyDiv === "consumption" || surveyDiv === "balance" 
                        ||surveyDiv === "house" || surveyDiv === "car"? "다음"
                        :"완료"}</button>
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