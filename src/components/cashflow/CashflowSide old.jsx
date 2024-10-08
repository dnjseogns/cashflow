import './Cashflow.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import { useMenuContext } from '@/components/cashflow/MenuContext.jsx';

/* 입력해주신 자료는 이번 계산에만 활용합니다. 이 사이트는 어떤 개인 정보도 저장하지 않습니다. */

function CashflowSide(){
    const {surveyDiv, setSurveyDiv, surveyTitle, setSurveyTitle, 
        menuEnum, setSurveyDivition} = useMenuContext();
    
    const surveyData = useSelector((store) => store.Survey).data;
    const isSurveyCompleted = surveyData.isCompleted;

    return (
    <Fragment>
        <div className='left-title'><span>정보입력하기</span></div>
        <ul className={'guide ' + (surveyDiv==="guide"?"on":"")} onClick={()=>{setSurveyDivition("guide")}}>{menuEnum.GUIDE} {surveyDiv==="guide"?<span>〉</span>:null}</ul>
        
        <ul className='base '>{menuEnum.BASE}
            {isSurveyCompleted.age !== null 
            ? <li className={(surveyDiv==="age"?"on ":"") + (isSurveyCompleted.age?"ok ":"")} onClick={()=>{setSurveyDivition("age")}}><span>{menuEnum.BASE_AGE}</span> {surveyDiv==="age"?<span>〉</span>:null}</li>
            : <li className='disable'><span>{menuEnum.BASE_AGE}</span></li>}
        </ul>
        <ul className='base '>{menuEnum.BASE2}
            {isSurveyCompleted.house !== null 
            ? <li className={(surveyDiv==="house"?"on":"") + (isSurveyCompleted.house?" ok":"")} onClick={()=>{setSurveyDivition("house")}}><span>{menuEnum.BASE_HOUSE}</span> {surveyDiv==="house"?<span>〉</span>:null}</li>
            : <li className='disable'><span>{menuEnum.BASE_HOUSE}</span></li>}

            {isSurveyCompleted.car !== null 
            ? <li className={(surveyDiv==="car"?"on":"") + (isSurveyCompleted.car?" ok":"")} onClick={()=>{setSurveyDivition("car")}}><span>{menuEnum.BASE_CAR}</span> {surveyDiv==="car"?<span>〉</span>:null}</li>
            : <li className='disable'><span>{menuEnum.BASE_CAR}</span></li>}

            {isSurveyCompleted.asset !== null 
            ? <li className={(surveyDiv==="asset"?"on":"") + (isSurveyCompleted.asset?" ok":"")} onClick={()=>{setSurveyDivition("asset")}}><span>{menuEnum.BASE_ASSET}</span> {surveyDiv==="asset"?<span>〉</span>:null}</li>
            : <li className='disable'><span>{menuEnum.BASE_ASSET}</span></li>}
        </ul>
        <ul className='base '>{menuEnum.BASE3}
            {isSurveyCompleted.salary !== null 
            ? <li className={(surveyDiv==="salary"?"on":"") + (isSurveyCompleted.salary?" ok":"")} onClick={()=>{setSurveyDivition("salary")}}><span>{menuEnum.BASE_SALARY}</span> {surveyDiv==="salary"?<span>〉</span>:null}</li>
            : <li className='disable'><span>{menuEnum.BASE_SALARY}</span></li>}

            {isSurveyCompleted.consumption !== null 
            ? <li className={(surveyDiv==="consumption"?"on":"") + (isSurveyCompleted.consumption?" ok":"")} onClick={()=>{setSurveyDivition("consumption")}}><span>{menuEnum.BASE_CONSUMPTION}</span> {surveyDiv==="consumption"?<span>〉</span>:null}</li>
            : <li className='disable'><span>{menuEnum.BASE_CONSUMPTION}</span></li>}

            {surveyData.base.marryYn === "Y"
            ? isSurveyCompleted.marry !== null 
                ? <li className={(surveyDiv==="marry"?"on":"") + (isSurveyCompleted.marry?" ok":"")} onClick={()=>{setSurveyDivition("marry")}}><span>{menuEnum.BASE_SPOUSE}</span> {surveyDiv==="marry"?<span>〉</span>:null}</li>
                : <li className='disable'><span>{menuEnum.BASE_SPOUSE}</span></li>
            :null}
        </ul>
        <ul className='add'>{menuEnum.ADD}
            {surveyData.base.marryYn !== "N" ? null
            : isSurveyCompleted.marry !== null ? <li className={(surveyDiv==="marry"?"on":"") + (isSurveyCompleted.marry?" ok":"")} onClick={()=>{setSurveyDivition("marry")}}>{menuEnum.ADD_MARRY} {surveyDiv==="marry"?<span>〉</span>:null}</li>
            : <li className='disable'><span>{menuEnum.ADD_MARRY}</span></li>}
            
            {isSurveyCompleted.baby !== null 
            ? <li className={(surveyDiv==="baby"?"on":"") + (isSurveyCompleted.baby?" ok":"")} onClick={()=>{setSurveyDivition("baby")}}>{menuEnum.ADD_BABY} {surveyDiv==="baby"?<span>〉</span>:null}</li>
            : <li className='disable'><span>{menuEnum.ADD_BABY}</span></li>}
            
            
            {isSurveyCompleted.house2 !== null 
            ? <li className={(surveyDiv==="house2"?"on":"") + (isSurveyCompleted.house2?" ok":"")} onClick={()=>{setSurveyDivition("house2")}}><span>{menuEnum.ADD_HOUSE}</span> {surveyDiv==="house2"?<span>〉</span>:null}</li>
            : <li className='disable'><span>{menuEnum.ADD_HOUSE}</span></li>}
            
            {isSurveyCompleted.car2 !== null 
            ? <li className={(surveyDiv==="car2"?"on":"") + (isSurveyCompleted.car2?" ok":"")} onClick={()=>{setSurveyDivition("car2")}}><span>{menuEnum.ADD_CAR}</span> {surveyDiv==="car2"?<span>〉</span>:null}</li>
            : <li className='disable'><span>{menuEnum.ADD_CAR}</span></li>}

            {isSurveyCompleted.retire !== null 
            ? <li className={(surveyDiv==="retire"?"on":"") + (isSurveyCompleted.retire?" ok":"")} onClick={()=>{setSurveyDivition("retire")}}>{menuEnum.ADD_RETIRE} {surveyDiv==="retire"?<span>〉</span>:null}</li>
            : <li className='disable'><span>{menuEnum.ADD_RETIRE}</span></li>}
            
            {isSurveyCompleted.parent !== null 
            ? <li className={(surveyDiv==="parent"?"on":"") + (isSurveyCompleted.parent?" ok":"")} onClick={()=>{setSurveyDivition("parent")}}>{menuEnum.ADD_PARENT} {surveyDiv==="parent"?<span>〉</span>:null}</li>
            : <li className='disable'><span>{menuEnum.ADD_PARENT}</span></li>}
            
            {isSurveyCompleted.lotto !== null 
            ? <li className={(surveyDiv==="lotto"?"on":"") + (isSurveyCompleted.lotto?" ok":"")} onClick={()=>{setSurveyDivition("lotto")}}>{menuEnum.ADD_LOTTO} {surveyDiv==="lotto"?<span>〉</span>:null}</li>
            : <li className='disable'><span>{menuEnum.ADD_LOTTO}</span></li>}

        </ul>
    </Fragment>
    );
}
export default CashflowSide;