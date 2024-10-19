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
    
    const editSurveyDiv = (isSurveyCompleted, validMenu, showMenu) => {
        isSurveyCompleted[validMenu] = false;
        setSurveyDivition(showMenu);
    }
    const openAllAddSurvey = (isSurveyCompleted) => {
        if(surveyData.base.marryYn != "Y"){
            isSurveyCompleted[menuEnum.ADD_MARRY] = false;
        }
        isSurveyCompleted[menuEnum.ADD_BABY] = false;
        isSurveyCompleted[menuEnum.ADD_HOUSE] = false;
        isSurveyCompleted[menuEnum.ADD_CAR] = false;
        isSurveyCompleted[menuEnum.ADD_PARENT] = false;
        isSurveyCompleted[menuEnum.ADD_RETIRE] = false;
        isSurveyCompleted[menuEnum.ADD_ETC] = false;
    }
    const commonCompleteLogic = () => {
        const isSurveyCompleted = JSON.parse(JSON.stringify(surveyData.isCompleted));
        isSurveyCompleted[surveyDiv] = true;

        console.log("surveyDiv",surveyDiv);
        
        if(prevNextDiv === "COMPLETE"){
            setSurveyDivition("");
        }
        if(prevNextDiv === "NEXT"){
            if(surveyDiv === menuEnum.GUIDE){editSurveyDiv(isSurveyCompleted, menuEnum.BASE_MODE,menuEnum.BASE_MODE);}

            else if(surveyDiv === menuEnum.BASE_MODE){editSurveyDiv(isSurveyCompleted, menuEnum.BASE_INDEX,menuEnum.BASE_INDEX);}
            else if(surveyDiv === menuEnum.BASE_INDEX){editSurveyDiv(isSurveyCompleted, menuEnum.MY_FIXED_ASSET,menuEnum.MY_FIXED_ASSET);}
            
            else if(surveyDiv === menuEnum.MY_FIXED_ASSET){editSurveyDiv(isSurveyCompleted, menuEnum.MY_ASSET,menuEnum.MY_ASSET);}
            else if(surveyDiv === menuEnum.MY_ASSET){editSurveyDiv(isSurveyCompleted, menuEnum.MY_INCOME,menuEnum.MY_INCOME);}
            else if(surveyDiv === menuEnum.MY_INCOME){
                if(surveyData.base.marryYn == "Y"){
                    editSurveyDiv(isSurveyCompleted, menuEnum.YOUR_INCOME,menuEnum.YOUR_INCOME);
                }else{
                    editSurveyDiv(isSurveyCompleted, menuEnum.MY_SPENDING,menuEnum.MY_SPENDING);
                }
            }
            else if(surveyDiv === menuEnum.YOUR_INCOME){editSurveyDiv(isSurveyCompleted, menuEnum.MY_SPENDING,menuEnum.MY_SPENDING);}
            else if(surveyDiv === menuEnum.MY_SPENDING){openAllAddSurvey(isSurveyCompleted); setSurveyDivition("");}
            else{setSurveyDivition("");}
        }

        if(prevNextDiv === "PREV"){
            if(surveyDiv === menuEnum.GUIDE){}

            else if(surveyDiv === menuEnum.BASE_MODE){editSurveyDiv(isSurveyCompleted, menuEnum.GUIDE,menuEnum.GUIDE);}
            else if(surveyDiv === menuEnum.BASE_INDEX){editSurveyDiv(isSurveyCompleted, menuEnum.BASE_MODE,menuEnum.BASE_MODE);}
            
            else if(surveyDiv === menuEnum.MY_FIXED_ASSET){editSurveyDiv(isSurveyCompleted, menuEnum.BASE_INDEX,menuEnum.BASE_INDEX);}
            else if(surveyDiv === menuEnum.MY_ASSET){editSurveyDiv(isSurveyCompleted, menuEnum.MY_FIXED_ASSET,menuEnum.MY_FIXED_ASSET);}
            else if(surveyDiv === menuEnum.MY_INCOME){
                editSurveyDiv(isSurveyCompleted, menuEnum.MY_ASSET,menuEnum.MY_ASSET);
            }
            else if(surveyDiv === menuEnum.YOUR_INCOME){editSurveyDiv(isSurveyCompleted, menuEnum.MY_INCOME,menuEnum.MY_INCOME);}
            else if(surveyDiv === menuEnum.MY_SPENDING){
                if(surveyData.base.marryYn == "Y"){
                    editSurveyDiv(isSurveyCompleted, menuEnum.YOUR_INCOME,menuEnum.YOUR_INCOME);
                }else{
                    editSurveyDiv(isSurveyCompleted, menuEnum.MY_INCOME,menuEnum.MY_INCOME);
                }
            }else if(surveyDiv === menuEnum.ADD_MARRY){editSurveyDiv(isSurveyCompleted, menuEnum.MY_SPENDING,menuEnum.MY_SPENDING);}
            else{setSurveyDivition("");}
        }


        // const menuEnumKeyArr = Object.keys(menuEnum);
        // let menuEnumValueArr = [];
        // menuEnumKeyArr.forEach((item)=>{
        //     if(menuEnum[item].includes('.') || menuEnum[item].includes('가이드') || menuEnum[item].includes('다시하기')){
        //         menuEnumValueArr.push(menuEnum[item]);
        //     }
        // });

        // const indexOfValue = menuEnumValueArr.indexOf(surveyDiv);

        // if(prevNextDiv === "NEXT"){
        //     if(indexOfValue === 0 && Object.keys(isSurveyCompleted).filter((key)=>isSurveyCompleted[key] !== undefined).length >= 2){ //처음
        //         Object.keys(isSurveyCompleted).map((key)=>{
        //             if(key === menuEnum.BASE_MODE){
        //                 isSurveyCompleted[key] = false;
        //                 setSurveyDivition(key);
        //             }else{
        //                 isSurveyCompleted[key] = undefined;
        //             }
        //         });
        //     }
        //     else if(indexOfValue === menuEnumValueArr.length -1){ //마지막
        //         alert("저장 클릭 시 저장 그래프에 반영 예정");
        //         // Object.keys(isSurveyCompleted).map((key)=>{
        //         //     if(key === menuEnum.BASE_MODE){
        //         //         isSurveyCompleted[key] = false;
        //         //         setSurveyDivition(key);
        //         //     }else{
        //         //         isSurveyCompleted[key] = undefined;
        //         //     }
        //         // });
        //     } else if(surveyData.base.marryYn == "Y" && menuEnumValueArr[indexOfValue + 1] == menuEnum.ADD_MARRY){
        //         const curValue = menuEnumValueArr[indexOfValue];
        //         isSurveyCompleted[curValue] = true;
        //         const nextValue = menuEnumValueArr[indexOfValue + 2];
        //         isSurveyCompleted[nextValue] = false;
        //         setSurveyDivition(nextValue);
        //     }
        //     else{
        //         const curValue = menuEnumValueArr[indexOfValue];
        //         isSurveyCompleted[curValue] = true;
        //         const nextValue = menuEnumValueArr[indexOfValue + 1];
        //         isSurveyCompleted[nextValue] = false;
        //         setSurveyDivition(nextValue);
        //     }
        // }else if(prevNextDiv === "PREV"){
        //     if(indexOfValue === 0){
        //         setSurveyDivition(""); //처음이라면
        //     }
        //     else if(surveyData.base.marryYn == "Y" && menuEnumValueArr[indexOfValue - 1] == menuEnum.ADD_MARRY){
        //         const curValue = menuEnumValueArr[indexOfValue];
        //         isSurveyCompleted[curValue] = undefined;
        //         const nextValue = menuEnumValueArr[indexOfValue - 2];
        //         isSurveyCompleted[nextValue] = false;
        //         setSurveyDivition(nextValue);
        //     }
        //     else{
        //         const curValue = menuEnumValueArr[indexOfValue];
        //         isSurveyCompleted[curValue] = undefined;
        //         const nextValue = menuEnumValueArr[indexOfValue - 1];
        //         isSurveyCompleted[nextValue] = false;
        //         setSurveyDivition(nextValue);
        //     }
        // }

        surveyData.isCompleted = isSurveyCompleted;
        dispatch(SvSave(surveyData));
    }


    const tmpSurveyTitle = 
    Object.keys(surveyData.isCompleted).length >= 2 && surveyDiv===menuEnum.GUIDE
    ? "다시하기"
    : surveyTitle;

    return (
    <Fragment>
        {surveyDiv===""
        ? null
        : <Fragment>
            <article className={'survey-area '+surveyDiv}>
                <div className='survey-title'><span>{tmpSurveyTitle}</span><a onClick={()=>{setSurveyDiv("");}}>⨉</a></div>
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
                    // // 배우자 정보
                    // : surveyDiv===menuEnum.YOUR_ASSET? <GuideSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                    // : surveyDiv===menuEnum.YOUR_SPENDING? <GuideSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
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
                {surveyDiv === menuEnum.GUIDE
                ?(<Fragment>
                    <button className='complete' style={{visibility:"hidden"}}>감춤</button>
                    <button className='complete' onClick={()=>{setPrevNextDiv("NEXT"); setCompleteBtnClickCnt(completeBtnClickCnt+1);}}>다음</button>
                </Fragment>)
                :surveyDiv === menuEnum.BASE_MODE
                ?(<Fragment>
                    <button className='complete' style={{visibility:"hidden"}}>감춤</button>
                    <button className='complete' onClick={()=>{setPrevNextDiv("NEXT"); setCompleteBtnClickCnt(completeBtnClickCnt+1);}}>다음</button>
                </Fragment>)
                :(surveyDiv === menuEnum.ADD_MARRY || surveyDiv === menuEnum.ADD_BABY || surveyDiv === menuEnum.ADD_HOUSE || 
                surveyDiv === menuEnum.ADD_CAR || surveyDiv === menuEnum.ADD_PARENT || surveyDiv === menuEnum.ADD_RETIRE || 
                surveyDiv === menuEnum.ADD_ETC)
                ?(<Fragment>
                    <button className='complete' onClick={()=>{setPrevNextDiv("PREV"); setCompleteBtnClickCnt(completeBtnClickCnt+1);}}>이전</button>
                    <button className='complete' onClick={()=>{setPrevNextDiv("COMPLETE"); setCompleteBtnClickCnt(completeBtnClickCnt+1);}}>완료</button>
                </Fragment>)
                :(<Fragment>
                    <button className='complete' onClick={()=>{setPrevNextDiv("PREV"); setCompleteBtnClickCnt(completeBtnClickCnt+1);}}>이전</button>
                    <button className='complete' onClick={()=>{setPrevNextDiv("NEXT"); setCompleteBtnClickCnt(completeBtnClickCnt+1);}}>다음</button>
                </Fragment>)}
                {/* {surveyDiv === menuEnum.GUIDE || surveyDiv === menuEnum.BASE_MODE
                ? <button className='complete' style={{visibility:"hidden"}}>이전</button>
                : <button className='complete' onClick={()=>{setPrevNextDiv("PREV"); setCompleteBtnClickCnt(completeBtnClickCnt+1);}}>
                    이전
                </button>}
                    <button className='complete' onClick={()=>{setPrevNextDiv("NEXT"); setCompleteBtnClickCnt(completeBtnClickCnt+1); }}>
                        {surveyDiv === menuEnum.GUIDE && Object.keys(surveyData.isCompleted).length <= 1 ? "시작하기" 
                        : surveyDiv === menuEnum.GUIDE && Object.keys(surveyData.isCompleted).length > 1 ? "다시하기"
                        : "다음"}
                    </button> */}
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