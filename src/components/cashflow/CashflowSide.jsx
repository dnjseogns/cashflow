import './Cashflow.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';

/* 입력해주신 자료는 이번 계산에만 활용합니다. 이 사이트는 어떤 개인 정보도 저장하지 않습니다. */

function CashflowSide({surveyDiv,setSurveyDiv, setSurveyTitle}){
    const GUIDE = "0. 가이드";
    const PREV = "1. 사전입력";
    const PREV_CAR = "1) 자동차";
    const PREV_HOUSE = "2) 집";
    const BASE = "2. 기본정보";
    const BASE_AGE = "1) 나이";
    const BASE_SALARY = "2) 소득";
    const BASE_CONSUMPTION = "3) 소비";
    const BASE_BALANCE = "4) 잔액";
    const BASE_ASSET = "5) 누적자산";
    // const BASE_INDEX = "BASE_INDEX";
    // const BASE_HOUSE = "BASE_HOUSE";
    const ADD = "3. 추가정보";
    const ADD_MARRY = "1) 결혼";
    const ADD_BABY = "2) 아기";
    const ADD_RETIRE = "3) 은퇴/재취업";
    const ADD_PARENT = "4) 부모님 부양";
    const ADD_LOTTO = "5) 복권";
    
    const surveyData = useSelector((store) => store.Survey).data;
    const isSurveyCompleted = surveyData.isCompleted;

    function setSurveyDivition(div){
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
        :div==="car"?PREV + " 〉 " + PREV_CAR
        :div==="house"?PREV + " 〉 " + PREV_HOUSE
        :div==="age"?BASE + " 〉 " + BASE_AGE
        :div==="salary"?BASE + " 〉 " + BASE_SALARY
        :div==="consumption"?BASE + " 〉 " + BASE_CONSUMPTION
        :div==="balance"?BASE + " 〉 " + BASE_BALANCE
        :div==="asset"?BASE + " 〉 " + BASE_ASSET
        // :div==="index"?BASE + " 〉 " + BASE_INDEX
        // :div==="house"?BASE + " 〉 " + BASE_HOUSE
        :div==="marry"?ADD + " 〉 " + ADD_MARRY
        :div==="baby"?ADD + " 〉 " + ADD_BABY
        :div==="retire"?ADD + " 〉 " + ADD_RETIRE
        :div==="parent"?ADD + " 〉 " + ADD_PARENT
        :div==="lotto"?ADD + " 〉 " + ADD_LOTTO
        :"";
        setSurveyTitle(surveyTitle);
    }

    return (
    <Fragment>
        <div className='left-title'><span>정보입력하기</span></div>
        <ul className={'guide ' + (surveyDiv==="guide"?"on":"")} onClick={()=>{setSurveyDivition("guide")}}>{GUIDE} {surveyDiv==="guide"?<span>〉</span>:null}</ul>
        <ul className='prev '>{PREV}
            <li className={(surveyDiv==="car"?"on ":"") + (isSurveyCompleted.car?"ok ":"")} onClick={()=>{setSurveyDivition("car")}}><span>{PREV_CAR}</span> {surveyDiv==="car"?<span>〉</span>:null}</li>
            <li className={(surveyDiv==="house"?"on ":"") + (isSurveyCompleted.house?"ok ":"")} onClick={()=>{setSurveyDivition("house")}}><span>{PREV_HOUSE}</span> {surveyDiv==="house"?<span>〉</span>:null}</li>
        </ul>
        <ul className='base '>{BASE}
            <li className={(surveyDiv==="age"?"on ":"") + (isSurveyCompleted.age?"ok ":"")} onClick={()=>{setSurveyDivition("age")}}><span>{BASE_AGE}</span> {surveyDiv==="age"?<span>〉</span>:null}</li>
            <li className={(surveyDiv==="salary"?"on":"") + (isSurveyCompleted.salary?" ok":"")} onClick={()=>{setSurveyDivition("salary")}}><span>{BASE_SALARY}</span> {surveyDiv==="salary"?<span>〉</span>:null}</li>
            <li className={(surveyDiv==="consumption"?"on":"") + (isSurveyCompleted.consumption?" ok":"")} onClick={()=>{setSurveyDivition("consumption")}}><span>{BASE_CONSUMPTION}</span> {surveyDiv==="consumption"?<span>〉</span>:null}</li>
            <li className={(surveyDiv==="balance"?"on":"") + (isSurveyCompleted.balance?" ok":"")} onClick={()=>{setSurveyDivition("balance")}}><span>{BASE_BALANCE}</span> {surveyDiv==="balance"?<span>〉</span>:null}</li>
            <li className={(surveyDiv==="asset"?"on":"") + (isSurveyCompleted.asset?" ok":"")} onClick={()=>{setSurveyDivition("asset")}}><span>{BASE_ASSET}</span> {surveyDiv==="asset"?<span>〉</span>:null}</li>
            {/* <li className={(surveyDiv==="index"?"on":"") + (isSurveyCompleted.index?" ok":"")} onClick={()=>{setSurveyDivition("index")}}><span>{BASE_INDEX}</span> {surveyDiv==="index"?<span>〉</span>:null}</li>
            <li className={(surveyDiv==="house"?"on":"") + (isSurveyCompleted.house?" ok":"")} onClick={()=>{setSurveyDivition("house")}}><span>{BASE_HOUSE}</span> {surveyDiv==="house"?<span>〉</span>:null}</li> */}
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