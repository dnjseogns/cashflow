import './Cashflow.css';
import { Fragment, useEffect, useRef, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
//
import GuideSurvey from './survey/GuideSurvey';

import { useMenuContext } from '@/components/cashflow/MenuContext.jsx';
import SurveyBaseMode from './survey/base/SurveyBaseMode';
import SurveyBaseIndex from './survey/base/SurveyBaseIndex';
import SurveyMyAsset from './survey/my/SurveyMyAsset';
import SurveyMySpending from './survey/my/SurveyMySpending';
import SurveyMyIncome from './survey/my/SurveyMyIncome';
import SurveyYourIncome from './survey/your/SurveyYourIncome';
import SurveyAddMarry from './survey/add/SurveyAddMarry';
import SurveyAddBaby from './survey/add/SurveyAddBaby';
import SurveyAddHouse from './survey/add/SurveyAddHouse';
import SurveyAddCar from './survey/add/SurveyAddCar';
import SurveyAddParent from './survey/add/SurveyAddParent';
import SurveyAddReemployment from './survey/add/SurveyAddReemployment';
import SurveyAddCustomEvent from './survey/add/SurveyAddCustomEvent';
import SurveySave from './survey/SurveySave';
import SurveyMyFixedAsset from './survey/my/SurveyMyFixedAsset';

/* 입력해주신 자료는 이번 계산에만 활용합니다. 이 사이트는 어떤 개인 정보도 저장하지 않습니다. */

function CashflowSurvey(){
    const {surveyDiv, setSurveyDiv, surveyTitle, setSurveyTitle, 
        menuEnum, setSurveyDivition} = useMenuContext();

    const surveyData = useSelector((store) => store.Survey).data;
    const dispatch = useDispatch();
    const [completeBtnClickCnt,setCompleteBtnClickCnt] = useState(0);

    const [prevNextDiv, setPrevNextDiv] = useState("NEXT");
    
    const editSurveyDivNext = (isSurveyCompleted, nextMenu, showMenu) => {
        isSurveyCompleted[nextMenu] = false;
        setSurveyDivition(showMenu);
    }
    const editSurveyDivPrev = (isSurveyCompleted, curMenu, prevMenu, showMenu) => {
        isSurveyCompleted[curMenu] = undefined;
        isSurveyCompleted[prevMenu] = false;
        setSurveyDivition(showMenu);
    }

    const commonCompleteLogic = () => {
        const isSurveyCompleted = JSON.parse(JSON.stringify(surveyData.isCompleted));
        isSurveyCompleted[surveyDiv] = true;
        
        if(prevNextDiv === "NEXT"){
            if(surveyDiv === menuEnum.GUIDE){editSurveyDivNext(isSurveyCompleted, menuEnum.BASE_MODE,menuEnum.BASE_MODE);}

            else if(surveyDiv === menuEnum.BASE_MODE){editSurveyDivNext(isSurveyCompleted, menuEnum.BASE_INDEX,menuEnum.BASE_INDEX);}
            else if(surveyDiv === menuEnum.BASE_INDEX){editSurveyDivNext(isSurveyCompleted, menuEnum.MY_FIXED_ASSET,menuEnum.MY_FIXED_ASSET);}
            
            else if(surveyDiv === menuEnum.MY_FIXED_ASSET){editSurveyDivNext(isSurveyCompleted, menuEnum.MY_ASSET,menuEnum.MY_ASSET);}
            else if(surveyDiv === menuEnum.MY_ASSET){editSurveyDivNext(isSurveyCompleted, menuEnum.MY_INCOME,menuEnum.MY_INCOME);}
            else if(surveyDiv === menuEnum.MY_INCOME){
                if(surveyData.base.marryYn == "Y"){
                    editSurveyDivNext(isSurveyCompleted, menuEnum.YOUR_INCOME,menuEnum.YOUR_INCOME);
                }else{
                    editSurveyDivNext(isSurveyCompleted, menuEnum.MY_SPENDING,menuEnum.MY_SPENDING);
                }
            }
            else if(surveyDiv === menuEnum.YOUR_INCOME){editSurveyDivNext(isSurveyCompleted, menuEnum.MY_SPENDING,menuEnum.MY_SPENDING);}

            else if(surveyDiv === menuEnum.MY_SPENDING){
                if(surveyData.base.marryYn == "Y"){
                    editSurveyDivNext(isSurveyCompleted, menuEnum.ADD_BABY,menuEnum.ADD_BABY);
                }else{
                    editSurveyDivNext(isSurveyCompleted, menuEnum.ADD_MARRY,menuEnum.ADD_MARRY);
                }
            }
            else if(surveyDiv === menuEnum.ADD_MARRY){editSurveyDivNext(isSurveyCompleted, menuEnum.ADD_BABY,menuEnum.ADD_BABY);}
            else if(surveyDiv === menuEnum.ADD_BABY){editSurveyDivNext(isSurveyCompleted, menuEnum.ADD_HOUSE,menuEnum.ADD_HOUSE);}
            else if(surveyDiv === menuEnum.ADD_HOUSE){editSurveyDivNext(isSurveyCompleted, menuEnum.ADD_CAR,menuEnum.ADD_CAR);}
            else if(surveyDiv === menuEnum.ADD_CAR){editSurveyDivNext(isSurveyCompleted, menuEnum.ADD_PARENT,menuEnum.ADD_PARENT);}
            else if(surveyDiv === menuEnum.ADD_PARENT){editSurveyDivNext(isSurveyCompleted, menuEnum.ADD_RETIRE,menuEnum.ADD_RETIRE);}
            else if(surveyDiv === menuEnum.ADD_RETIRE){editSurveyDivNext(isSurveyCompleted, menuEnum.ADD_ETC,menuEnum.ADD_ETC);}
            else if(surveyDiv === menuEnum.ADD_ETC){setSurveyDivition("");}
        }

        if(prevNextDiv === "PREV"){
            if(surveyDiv === menuEnum.GUIDE){}

            else if(surveyDiv === menuEnum.BASE_MODE){editSurveyDivPrev(isSurveyCompleted, menuEnum.BASE_MODE,menuEnum.GUIDE,menuEnum.GUIDE);}
            else if(surveyDiv === menuEnum.BASE_INDEX){editSurveyDivPrev(isSurveyCompleted, menuEnum.BASE_INDEX,menuEnum.BASE_MODE,menuEnum.BASE_MODE);}
            
            else if(surveyDiv === menuEnum.MY_FIXED_ASSET){editSurveyDivPrev(isSurveyCompleted, menuEnum.MY_FIXED_ASSET,menuEnum.BASE_INDEX,menuEnum.BASE_INDEX);}
            else if(surveyDiv === menuEnum.MY_ASSET){editSurveyDivPrev(isSurveyCompleted, menuEnum.MY_ASSET,menuEnum.MY_FIXED_ASSET,menuEnum.MY_FIXED_ASSET);}
            else if(surveyDiv === menuEnum.MY_INCOME){editSurveyDivPrev(isSurveyCompleted, menuEnum.MY_INCOME,menuEnum.MY_ASSET,menuEnum.MY_ASSET);}
            else if(surveyDiv === menuEnum.YOUR_INCOME){editSurveyDivPrev(isSurveyCompleted, menuEnum.YOUR_INCOME,menuEnum.MY_INCOME,menuEnum.MY_INCOME);}
            else if(surveyDiv === menuEnum.MY_SPENDING){
                if(surveyData.base.marryYn == "Y"){
                    editSurveyDivPrev(isSurveyCompleted, menuEnum.MY_SPENDING,menuEnum.YOUR_INCOME,menuEnum.YOUR_INCOME);
                }else{
                    editSurveyDivPrev(isSurveyCompleted, menuEnum.MY_SPENDING,menuEnum.MY_INCOME,menuEnum.MY_INCOME);
                }
            }else if(surveyDiv === menuEnum.ADD_MARRY){editSurveyDivPrev(isSurveyCompleted, menuEnum.ADD_MARRY,menuEnum.MY_SPENDING,menuEnum.MY_SPENDING);}
            else if(surveyDiv === menuEnum.ADD_BABY){
                if(surveyData.base.marryYn == "Y"){
                    editSurveyDivPrev(isSurveyCompleted, menuEnum.ADD_BABY,menuEnum.MY_SPENDING,menuEnum.MY_SPENDING);
                }else{
                    editSurveyDivPrev(isSurveyCompleted, menuEnum.ADD_BABY,menuEnum.ADD_MARRY,menuEnum.ADD_MARRY);
                }
            }
            else if(surveyDiv === menuEnum.ADD_HOUSE){editSurveyDivPrev(isSurveyCompleted, menuEnum.ADD_HOUSE,menuEnum.ADD_BABY,menuEnum.ADD_BABY);}
            else if(surveyDiv === menuEnum.ADD_CAR){editSurveyDivPrev(isSurveyCompleted, menuEnum.ADD_CAR,menuEnum.ADD_HOUSE,menuEnum.ADD_HOUSE);}
            else if(surveyDiv === menuEnum.ADD_PARENT){editSurveyDivPrev(isSurveyCompleted, menuEnum.ADD_PARENT,menuEnum.ADD_CAR,menuEnum.ADD_CAR);}
            else if(surveyDiv === menuEnum.ADD_RETIRE){editSurveyDivPrev(isSurveyCompleted, menuEnum.ADD_RETIRE,menuEnum.ADD_PARENT,menuEnum.ADD_PARENT);}
            else if(surveyDiv === menuEnum.ADD_ETC){editSurveyDivPrev(isSurveyCompleted, menuEnum.ADD_ETC,menuEnum.ADD_RETIRE,menuEnum.ADD_RETIRE);}
        }

        if(prevNextDiv === "RETRY_RESET_X"){
            Object.keys(isSurveyCompleted).map((key)=>{
                if(key === menuEnum.BASE_MODE){
                    isSurveyCompleted[key] = false;
                    setSurveyDivition(key);
                }else{
                    isSurveyCompleted[key] = undefined;
                }
            });
        }

        surveyData.isCompleted = isSurveyCompleted;

        if(prevNextDiv === "RESET_O"){
            dispatch(CfClean());
            dispatch(SvClean());
        }else{
            dispatch(SvSave(surveyData));
        }
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
                    : surveyDiv===menuEnum.MY_FIXED_ASSET? <SurveyMyFixedAsset completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.MY_ASSET? <SurveyMyAsset completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.MY_INCOME? <SurveyMyIncome completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.YOUR_INCOME? <SurveyYourIncome completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.MY_SPENDING? <SurveyMySpending completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    // 추가 정보
                    : surveyDiv===menuEnum.ADD_MARRY? <SurveyAddMarry completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.ADD_BABY? <SurveyAddBaby completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.ADD_HOUSE? <SurveyAddHouse completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.ADD_CAR? <SurveyAddCar completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.ADD_PARENT? <SurveyAddParent completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.ADD_RETIRE? <SurveyAddReemployment completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.ADD_ETC? <SurveyAddCustomEvent completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : surveyDiv===menuEnum.DONE? <SurveySave completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    : null
                }
                </div>
                <div className='survey-tail'>
                {surveyDiv === menuEnum.GUIDE && Object.keys(surveyData.isCompleted).length < 2
                ?(<Fragment>
                    <button className='complete' style={{visibility:"hidden"}}>감춤</button>
                    <button className='complete' onClick={()=>{setPrevNextDiv("NEXT"); setCompleteBtnClickCnt(completeBtnClickCnt+1);}}>시작하기</button>
                </Fragment>)
                : surveyDiv === menuEnum.GUIDE && Object.keys(surveyData.isCompleted).length >= 2
                ?(<Fragment>
                    <button className='complete' onClick={()=>{setPrevNextDiv("RESET_O"); setCompleteBtnClickCnt(completeBtnClickCnt+1);}}>전체 초기화</button>
                    <button className='complete' onClick={()=>{setPrevNextDiv("RETRY_RESET_X"); setCompleteBtnClickCnt(completeBtnClickCnt+1);}}>다시하기(초기화X)</button>
                </Fragment>)
                :(<Fragment>
                    <button className='complete' onClick={()=>{setPrevNextDiv("PREV"); setCompleteBtnClickCnt(completeBtnClickCnt+1);}}>이전</button>
                    <button className='complete' onClick={()=>{setPrevNextDiv("NEXT"); setCompleteBtnClickCnt(completeBtnClickCnt+1);}}>다음</button>
                </Fragment>)}
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