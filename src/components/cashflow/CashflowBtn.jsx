import './Cashflow.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import { useMenuContext } from '@/components/cashflow/MenuContext.jsx';
import graphImg from "@/images/graph.png";
import exchangeImg from "@/images/exchange.png";

function CashflowBtn({isGraph, setIsGraph, isExchanged, setIsExchanged}){
    const {surveyDiv, setSurveyDiv, surveyTitle, setSurveyTitle, 
        menuEnum, setSurveyDivition} = useMenuContext();
    const dispatch = useDispatch();
    
    const surveyData = useSelector((store) => store.Survey).data;
    const isSurveyCompleted = surveyData.isCompleted;

    return (
    <Fragment>
        <div className="graph-btn" data-hover="그래프 보기">
            <img className={isGraph?" on":""} src={graphImg} alt="그래프" style={{width:"50px"}} 
                onClick={()=>{
                    setIsGraph(!isGraph);
                }}/>
        </div>

        <div className="exchange-btn" data-hover="현재가치 환산">
            <img className={isExchanged?"on":""} src={exchangeImg} alt="현재가치로" style={{width:"50px"}}
                onClick={()=>{
                    setIsExchanged(!isExchanged);
                    // surveyData.btn.isExchanged = !isExchanged;
                    // dispatch(SvSave(surveyData));
                }}/>
        </div>
    </Fragment>
    );
}
export default CashflowBtn;