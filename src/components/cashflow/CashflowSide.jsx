import './Cashflow.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';

/* 입력해주신 자료는 이번 계산에만 활용합니다. 이 사이트는 어떤 개인 정보도 저장하지 않습니다. */

function CashflowSide({surveyDiv,setSurveyDiv, setSurveyTitle}){
    function setSurveyDivition(div){

        console.log("div",div)
        
        if(surveyDiv === div){
            setSurveyDiv("");
            setSurveyTitle("");
        }
        else{
            setSurveyDiv(div);
            changeSurveyTitle(div);
        }
    };
    function changeSurveyTitle(div){
        const surveyTitle
        = div==="guide"?GUIDE
        :div==="index"?BASIC + " 〉 " + BASIC_INDEX
        :div==="age"?BASIC + " 〉 " + BASIC_AGE
        :div==="house"?BASIC + " 〉 " + BASIC_HOUSE
        :div==="salary"?BASIC + " 〉 " + BASIC_SALARY
        :div==="saving"?BASIC + " 〉 " + BASIC_SAVING
        :div==="asset"?BASIC + " 〉 " + BASIC_ASSET
        :div==="marry"?ADD + " 〉 " + ADD_MARRY
        :div==="baby"?ADD + " 〉 " + ADD_BABY
        :div==="retire"?ADD + " 〉 " + ADD_RETIRE
        :div==="parent"?ADD + " 〉 " + ADD_PARENT
        :div==="lotto"?ADD + " 〉 " + ADD_LOTTO
        :"";
        setSurveyTitle(surveyTitle);
    }
    
    const GUIDE = "1. 가이드";
    const BASIC = "2. 기본정보";
    const BASIC_AGE = "1) 나이";
    const BASIC_SALARY = "2) 소득";
    const BASIC_SAVING = "3) 소비/저축";
    const BASIC_INDEX = "4) 미래지표(가정)";
    const BASIC_HOUSE = "5) 실거주";
    const BASIC_ASSET = "6) 자산/자본소득";
    const ADD = "3. 추가정보";
    const ADD_MARRY = "1) 결혼";
    const ADD_BABY = "2) 아기";
    const ADD_RETIRE = "3) 은퇴/재취업";
    const ADD_PARENT = "4) 부모님 부양";
    const ADD_LOTTO = "5) 복권";
    
    const surveyData = useSelector((store) => store.Survey).data;
    const isSurveyCompleted = surveyData.isCompleted;

    return (
    <Fragment>
        <div className='left-title'><span>정보입력하기</span></div>
        <ul className={'guide ' + (surveyDiv==="guide"?"on":"")} onClick={()=>{setSurveyDivition("guide")}}>{GUIDE} {surveyDiv==="guide"?<span>〉</span>:null}</ul>
        <ul className='basic '>{BASIC}
        <li className={(surveyDiv==="age"?"on ":"") + (isSurveyCompleted.age?"ok ":"")} onClick={()=>{setSurveyDivition("age")}}><span>{BASIC_AGE}</span> {surveyDiv==="age"?<span>〉</span>:null}</li>
        <li className={(surveyDiv==="salary"?"on":"") + (isSurveyCompleted.salary?" ok":"")} onClick={()=>{setSurveyDivition("salary")}}><span>{BASIC_SALARY}</span> {surveyDiv==="salary"?<span>〉</span>:null}</li>
        <li className={(surveyDiv==="saving"?"on":"") + (isSurveyCompleted.saving?" ok":"")} onClick={()=>{setSurveyDivition("saving")}}><span>{BASIC_SAVING}</span> {surveyDiv==="saving"?<span>〉</span>:null}</li>
            <li className={(surveyDiv==="index"?"on":"") + (isSurveyCompleted.index?" ok":"")} onClick={()=>{setSurveyDivition("index")}}><span>{BASIC_INDEX}</span> {surveyDiv==="index"?<span>〉</span>:null}</li>
            <li className={(surveyDiv==="house"?"on":"") + (isSurveyCompleted.house?" ok":"")} onClick={()=>{setSurveyDivition("house")}}><span>{BASIC_HOUSE}</span> {surveyDiv==="house"?<span>〉</span>:null}</li>
            <li className={(surveyDiv==="asset"?"on":"") + (isSurveyCompleted.asset?" ok":"")} onClick={()=>{setSurveyDivition("asset")}}><span>{BASIC_ASSET}</span> {surveyDiv==="asset"?<span>〉</span>:null}</li>
        </ul>
        <ul className='add'>{ADD}
            <li className={(surveyDiv==="marry"?"on":"") + (isSurveyCompleted.marry?" ok":"")} onClick={()=>{setSurveyDivition("marry")}}>{ADD_MARRY} {surveyDiv==="marry"?<span>〉</span>:null}</li>
            <li className={(surveyDiv==="baby"?"on":"") + (isSurveyCompleted.baby?" ok":"")} onClick={()=>{setSurveyDivition("baby")}}>{ADD_BABY} {surveyDiv==="baby"?<span>〉</span>:null}</li>
            <li className={(surveyDiv==="retire"?"on":"") + (isSurveyCompleted.retire?" ok":"")} onClick={()=>{setSurveyDivition("retire")}}>{ADD_RETIRE} {surveyDiv==="retire"?<span>〉</span>:null}</li>
            <li className={(surveyDiv==="parent"?"on":"") + (isSurveyCompleted.parent?" ok":"")} onClick={()=>{setSurveyDivition("parent")}}>{ADD_PARENT} {surveyDiv==="parent"?<span>〉</span>:null}</li>
            <li className={(surveyDiv==="lotto"?"on":"") + (isSurveyCompleted.lotto?" ok":"")} onClick={()=>{setSurveyDivition("lotto")}}>{ADD_LOTTO} {surveyDiv==="lotto"?<span>〉</span>:null}</li>
        </ul>
    </Fragment>
    );
}
export default CashflowSide;