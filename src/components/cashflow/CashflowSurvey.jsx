import './Cashflow.css';
import { Fragment, useEffect, useRef, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
//
import BaseAgeSurvey from './survey/BaseAgeSurvey';
import BaseSalarySurvey from './survey/BaseSalarySurvey';
import BaseSavingSurvey from './survey/BaseSavingSurvey';
import GuideSurvey from './survey/GuideSurvey';

/* 입력해주신 자료는 이번 계산에만 활용합니다. 이 사이트는 어떤 개인 정보도 저장하지 않습니다. */

function CashflowSurvey({surveyDiv,setSurveyDiv, surveyTitle}){
    const surveyData = useSelector((store) => store.Survey).data;
    const dispatch = useDispatch();
    const [completeBtnClickCnt,setCompleteBtnClickCnt] = useState(0);
    const commonCompleteLogic = () => {
        //완료
        const isSurveyCompleted = surveyData.isCompleted;
        isSurveyCompleted[surveyDiv] = true;
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
                <div className='survey-title'>{surveyTitle}</div>
                <div className='survey-content'>
                {surveyDiv==="guide"?<GuideSurvey/>
                :surveyDiv==="age"?<BaseAgeSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                :surveyDiv==="salary"?<BaseSalarySurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
                :surveyDiv==="saving"?<BaseSavingSurvey completeBtnClickCnt={completeBtnClickCnt} commonCompleteLogic={commonCompleteLogic}/>
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
                    <button className='complete' onClick={()=>{setCompleteBtnClickCnt(completeBtnClickCnt+1)}}>완료</button>
                </div>
            </article>
            </Fragment>
        }
    </Fragment>
    );
}


// //가정 지표
// function BasicIndexSurvey({completeBtnClickCnt, commonCompleteLogic}){
//     const surveyData = useSelector((store) => store.Survey).data;
//     const dispatch = useDispatch();
    
//     const [indexInflation, setIndexInflation] = useState(surveyData.base?.indexInflation ?? 3.5);
//     const [indexBankInterest, setIndexBankInterest] = useState(surveyData.base?.indexBankInterest ?? 3.0);
//     const [indexLoanInterest, setIndexLoanInterest] = useState(surveyData.base?.indexLoanInterest ?? 6.0);

//     useEffectNoMount(()=>{
//         surveyData.base.indexInflation = indexInflation;
//         surveyData.base.indexBankInterest = indexBankInterest;
//         surveyData.base.indexLoanInterest = indexLoanInterest;

//         dispatch(SvSave(surveyData));
//         commonCompleteLogic();
//     },[completeBtnClickCnt]);

//     const surveyOnChange = (e, div) => {
//         if(div==="indexInflation"){
//             if(isNaN(e.target.value)){return;}
//             setIndexInflation(e.target.value);
//         } else if(div==="indexBankInterest"){
//             if(isNaN(e.target.value)){return;}
//             setIndexBankInterest(e.target.value);
//         } else if(div==="indexLoanInterest"){
//             if(isNaN(e.target.value)){return;}
//             setIndexLoanInterest(e.target.value);
//         } 
//     };

//     return(
//     <Fragment>
//         <div>
//             <p>(1) 물가상승률을 입력해주세요.</p>
//             <p><input value={indexInflation} onChange={(e)=>{surveyOnChange(e,"indexInflation")}}/>%</p>
//             <p className='note'>※ 2000년 ~ 2023년 평균 물가상승률은 약 3.5%입니다.(통계청 소비자물가지수 참고)</p>
//         </div>
//         <div>
//             <p>(2) 은행예금 금리를 입력해주세요.</p>
//             <p><input value={indexBankInterest} onChange={(e)=>{surveyOnChange(e,"indexBankInterest")}}/>%</p>
//             <p className='note'>※ 2000년 ~ 2023년 한국은행 기준금리는 약 2.5%입니다.</p>
//         </div>
//         <div>
//             <p>(3) 대출 금리를 입력해주세요.</p>
//             <p><input value={indexLoanInterest} onChange={(e)=>{surveyOnChange(e,"indexLoanInterest")}}/>%</p>
//             <p className='note'>※ 2000년 ~ 2023년 한국은행 기준금리는 약 2.5%입니다.</p>
//         </div>
//         {/* 이거 옮기는게 좋을 뜻
//         <div>
//             <p>(4) 본인의 예금, 실거주부동산을 제외한 종합적인 투자의 수익률를 입력해주세요.(ex)주식, 금, 실거주 외 부동산)</p>
//             <p><input defaultValue={surveyData.base["investIncome"]} onChange={(e)=>{DataChange("investIncome", e)}}/>%</p>
//             <p>※ 은행예적금/실거주 주택은 별도로 계산하므로 투자수익률에서 제외합니다.</p>
//             <p>※ 세계적인 투자자 워런버핏의 수익률이 20%라고 하죠. 투자수익률은 미래 자산에 큰 영향도를 미치므로, 현실적인 수치를 입력해주시길 바랍니다.</p>
//         </div> */}
//     </Fragment>);
// }

// function BasicHouseSurvey({completeBtnClickCnt, commonCompleteLogic}){
//     // const surveyData = useSelector((store) => store.Survey).data;
//     // const dispatch = useDispatch();
//     // useEffectNoMount(()=>{
//     //     dispatch(SvSave(surveyData));
//     //     commonCompleteLogic();
//     // },[completeBtnClickCnt]);
//     // const DataChange = (div, e) => {
//     //     surveyData.base[div] = e.target.value;
//     // };

//     return(
//     <Fragment>
//         <div>
//             일단 스킵
//         </div>
//     {/* <div>
//         <span>※ 실거주 형태를 먼저 파악하여, 자산과 소비금액을 세부적으로 나누도록 하겠습니다.</span><br/>
//         <span>1. 실거주 형태</span><br/>
//         <input className='d1' type="radio" id="houseType1" name="houseType" value="h1" onChange={(e)=>{DataChange("houseType", e)}} 
//                 checked={surveyData.base["houseType"]==="h1"? true : false}/>
//         <label for="houseType1">본가</label>
//         <input className='d1' type="radio" id="houseType2" name="houseType" value="h2" onChange={(e)=>{DataChange("houseType", e)}} 
//                 checked={surveyData.base["houseType"]==="h2"? true : false}/>
//         <label for="houseType2">월세/반전세</label>
//         <input className='d1' type="radio" id="houseType3" name="houseType" value="h3" onChange={(e)=>{DataChange("houseType", e)}} 
//                 checked={surveyData.base["houseType"]==="h3"? true : false}/>
//         <label for="houseType3">전세</label>
//         <input className='d1' type="radio" id="houseType4" name="houseType" value="h4" onChange={(e)=>{DataChange("houseType", e)}} 
//                 checked={surveyData.base["houseType"]==="h4"? true : false}/>
//         <label for="houseType4">매매</label>
//         <br/>

//         {surveyData.base.houseType==="h1"?
//         <>
//             <span className='d1'>※ 본가 거주 시 주거비 0원, 보증금 0원입니다.</span><br/>
//         </>:
//         surveyData.base.houseType==="h2"?
//         <>
//             <span className='d1'>1) 보증금 : </span>
//             <input className='h20 w60' defaultValue={surveyData.base["houseGuarantee"]} onChange={(e)=>{DataChange("houseGuarantee", e)}}></input>
//             <span> 만원 </span>
//             <br/>
//             <span className='d2'>※ 보증금대출이 있으신가요?</span><br/>
//             <input className='d3' type="radio" id="houseLoanNo" name="houseLoanYN" value="n" onChange={(e)=>{DataChange("houseLoanYN", e)}} 
//                 checked={surveyData.base["houseLoanYN"]==="n"? true : false}/>
//             <label for="houseLoanNo">아니오.</label><br/>
//             <input className='d3' type="radio" id="houseLoanYes" name="houseLoanYN" value="y" onChange={(e)=>{DataChange("houseLoanYN", e)}} 
//                     checked={surveyData.base["houseLoanYN"]==="y"? true : false}/>
//             <label for="houseLoanYes">네. (보증금 {surveyData.base["houseGuarantee"]}만원 중 대출 
//             <input className='h20 w60' defaultValue={surveyData.base["houseLoanAmount"]} onChange={(e)=>{DataChange("houseLoanAmount", e)}}></input>
//             만원, 대출금리
//             <input className='h20 w60' defaultValue={surveyData.base["houseLoanRate"]} onChange={(e)=>{DataChange("houseLoanRate", e)}}></input>
//             %)</label><br/>
//             <span className='d1'>2) 주거비(월세+관리비) : (매월) </span>
//             <input className='h20 w60' defaultValue={surveyData.base["houseCost"]} onChange={(e)=>{DataChange("houseCost", e)}}></input>
//             <span> 만원 </span>
//         </>:
//         surveyData.base.houseType==="h3"?
//         <>
//         </>:
//         surveyData.base.houseType==="h4"?
//         <>h4입니다
//         </>:<></>
//         }
//     </div> */}
//     </Fragment>);

//     // <div>
            
//     //         {hsDiv==="1"?<Fragment><span className='d1'></span>※ 주거비 : 0원</Fragment>
//     //         :hsDiv==="2"?<Fragment>
//     //             <span className='d1'>2) 보증금 : </span>
//     //             <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원<br/>
//     //             <span className='d2'>월세+관리비 : </span>
//     //             <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원<br/>
//     //             <span className='d1'>3) 보증금 대출이 있으신가요? </span><br/>
//     //             <input className='d2' type="radio" id="HouseLoanNo" name="HouseLoanDiv" value="no" onClick={(e)=>{HouseLoanDivition(e)}}/>
//     //             <label for="HouseLoanNo">아니오</label>
//     //             <input type="radio" id="HouseLoanYes" name="HouseLoanDiv" value="yes" onClick={(e)=>{HouseLoanDivition(e)}}/>
//     //             <label for="HouseLoanYes">네(대출금액 : 
//     //                 <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input>
//     //                 만원, 연이자 
//     //                 <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input>
//     //                 %)
//     //             </label>
//     //         </Fragment>
//     //         :hsDiv==="3"?<Fragment>
//     //             <span className='d1'>2) 전세가 : </span>
//     //             <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원<br/>
//     //             <span className='d2'>관리비 : </span>
//     //             <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원<br/>
//     //             <span className='d1'>3) 전세자금 대출이 있으신가요? </span><br/>
//     //             <input className='d2' type="radio" id="HouseLoanNo" name="HouseLoanDiv" value="no" onClick={(e)=>{HouseLoanDivition(e)}}/>
//     //             <label for="HouseLoanNo">아니오</label>
//     //             <input type="radio" id="HouseLoanYes" name="HouseLoanDiv" value="yes" onClick={(e)=>{HouseLoanDivition(e)}}/>
//     //             <label for="HouseLoanYes">네(대출금액 : 
//     //                 <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input>
//     //                 만원, 연이자 
//     //                 <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input>
//     //                 %)
//     //             </label>
//     //         </Fragment>
//     //         :hsDiv==="4"?<Fragment>
//     //             <span className='d1'>2) 매매가 : </span>
//     //             <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원<br/>
//     //             <span className='d2'>관리비 : </span>
//     //             <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원<br/>
//     //             <span className='d1'>3) 주택담보 대출이 있으신가요? </span><br/>
//     //             <input className='d2' type="radio" id="HouseLoanNo" name="HouseLoanDiv" value="no" onClick={(e)=>{HouseLoanDivition(e)}}/>
//     //             <label for="HouseLoanNo">아니오</label><br/>
//     //             <input className='d2' type="radio" id="HouseLoanYes" name="HouseLoanDiv" value="yes" onClick={(e)=>{HouseLoanDivition(e)}}/>
//     //             <label for="HouseLoanYes">네</label>
//     //             <p className='d3'>(대출금액 : <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원,<br/>
//     //                 대출만기 : <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input>년,<br/>
//     //                 상환방법 : <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input>,<br/>
//     //                 거치기간 : 1년,<br/>
//     //                 대출금리 : 5%)
//     //             </p>
//     //         </Fragment>
//     //         :<Fragment></Fragment>}
//     //     </div>
//     // return(<>BasicHouseSurvey</>);
// }

// function BasicSavingSurvey({completeBtnClickCnt, commonCompleteLogic}){
//     const surveyData = useSelector((store) => store.Survey).data;
//     const dispatch = useDispatch();
//     useEffectNoMount(()=>{
//         dispatch(SvSave(surveyData));
//         commonCompleteLogic();
//     },[completeBtnClickCnt]);
//     const DataChange = (div, e) => {
//         surveyData.base[div] = e.target.value;
//     };

//     return(<Fragment>BasicSavingSurvey</Fragment>);
// }

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