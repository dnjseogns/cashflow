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
import BaseSalarySurvey from './survey/BaseSalarySurvey';
import BaseConsumptionSurvey from './survey/BaseConsumptionSurvey';
import BaseAssetSurvey from './survey/BaseAssetSurvey';
import { useMenuContext } from '@/components/cashflow/MenuContext.jsx';
import SurveyBaseMode from './survey/base/SurveyBaseMode';
import SurveyBaseIndex from './survey/base/SurveyBaseIndex';

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
        if(surveyDiv === menuEnum.GUIDE){
            if(isSurveyCompleted.BASE_MODE === undefined) {isSurveyCompleted.BASE_MODE = false;}
            setSurveyDivition(menuEnum.BASE_MODE);
        }

        if(surveyDiv === menuEnum.BASE_MODE){
            if(isSurveyCompleted.BASE_INDEX === undefined) {isSurveyCompleted.BASE_INDEX = false;}
            setSurveyDivition("");
        }
        if(surveyDiv === menuEnum.BASE_INDEX){
            if(isSurveyCompleted.MY_ASSET === undefined) {isSurveyCompleted.MY_ASSET = false;}
            setSurveyDivition("");
        }
        
        if(surveyDiv === menuEnum.MY_ASSET){
            if(isSurveyCompleted.MY_INCOME === undefined) {isSurveyCompleted.MY_INCOME = false;}
            setSurveyDivition("");
        }
        if(surveyDiv === menuEnum.MY_INCOME){
            if(isSurveyCompleted.MY_SPENDING === undefined) {isSurveyCompleted.MY_SPENDING = false;}
            setSurveyDivition("");
        }
        if(surveyDiv === menuEnum.MY_SPENDING){
            if(isSurveyCompleted.YOUR_ASSET === undefined) {isSurveyCompleted.YOUR_ASSET = false;}
            setSurveyDivition("");
        }
        
        if(surveyDiv === menuEnum.YOUR_ASSET){
            if(isSurveyCompleted.YOUR_INCOME === undefined) {isSurveyCompleted.YOUR_INCOME = false;}
            setSurveyDivition("");
        }
        if(surveyDiv === menuEnum.YOUR_INCOME){
            if(isSurveyCompleted.YOUR_SPENDING === undefined) {isSurveyCompleted.YOUR_SPENDING = false;}
            setSurveyDivition("");
        }
        if(surveyDiv === menuEnum.YOUR_SPENDING){
            if(isSurveyCompleted.ADD_MARRY === undefined) {isSurveyCompleted.ADD_MARRY = false;}
            setSurveyDivition("");
        }
        
        if(surveyDiv === menuEnum.ADD_MARRY){
            if(isSurveyCompleted.ADD_BABY === undefined) {isSurveyCompleted.ADD_BABY = false;}
            setSurveyDivition("");
        }
        if(surveyDiv === menuEnum.ADD_BABY){
            if(isSurveyCompleted.ADD_HOUSE === undefined) {isSurveyCompleted.ADD_HOUSE = false;}
            setSurveyDivition("");
        }
        if(surveyDiv === menuEnum.ADD_HOUSE){
            if(isSurveyCompleted.ADD_CAR === undefined) {isSurveyCompleted.ADD_CAR = false;}
            setSurveyDivition("");
        }
        if(surveyDiv === menuEnum.ADD_CAR){
            if(isSurveyCompleted.ADD_PARENT === undefined) {isSurveyCompleted.ADD_PARENT = false;}
            setSurveyDivition("");
        }
        if(surveyDiv === menuEnum.ADD_PARENT){
            if(isSurveyCompleted.ADD_RETIRE === undefined) {isSurveyCompleted.ADD_RETIRE = false;}
            setSurveyDivition("");
        }
        if(surveyDiv === menuEnum.ADD_RETIRE){
            if(isSurveyCompleted.ADD_ETC === undefined) {isSurveyCompleted.ADD_ETC = false;}
            setSurveyDivition("");
        }
        if(surveyDiv === menuEnum.ADD_ETC){
            setSurveyDivition("");
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
                {
                    // 가이드
                    surveyDiv===menuEnum.GUIDE? <GuideSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    // 기본 정보
                    : surveyDiv===menuEnum.BASE_MODE? <SurveyBaseMode completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.BASE_INDEX? <SurveyBaseIndex completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    // 내 정보
                    : surveyDiv===menuEnum.MY_ASSET? <GuideSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.MY_INCOME? <GuideSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.MY_SPENDING? <GuideSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    // 배우자 정보
                    : surveyDiv===menuEnum.YOUR_ASSET? <GuideSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.YOUR_INCOME? <GuideSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.YOUR_SPENDING? <GuideSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    // 추가 정보
                    : surveyDiv===menuEnum.ADD_MARRY? <GuideSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.ADD_BABY? <GuideSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.ADD_HOUSE? <GuideSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.ADD_CAR? <GuideSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.ADD_PARENT? <GuideSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.ADD_RETIRE? <GuideSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.ADD_ETC? <GuideSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : null
                }
                </div>
                <div className='survey-tail'>
                    <button className='complete' onClick={()=>{setCompleteBtnClickCnt(completeBtnClickCnt+1)}}>
                        {surveyDiv === menuEnum.GUIDE ? "시작하기" : "완료"}
                    </button>
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