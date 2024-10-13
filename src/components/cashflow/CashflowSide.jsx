import './Cashflow.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import { useMenuContext } from '@/components/cashflow/MenuContext.jsx';

function CashflowSide(){
    const {surveyDiv, setSurveyDiv, surveyTitle, setSurveyTitle, 
        menuEnum, setSurveyDivition} = useMenuContext();
    
    const surveyData = useSelector((store) => store.Survey).data;
    const isSurveyCompleted = surveyData.isCompleted;

    return (
    <Fragment>
        <div className='left-title'><span>정보입력하기</span></div>
        {
            Object.keys(surveyData.isCompleted).length <= 1
            ? <ul className={'guide ' + (surveyDiv===menuEnum.GUIDE?"on":"")} onClick={()=>{setSurveyDivition(menuEnum.GUIDE)}}>{menuEnum.GUIDE} {surveyDiv===menuEnum.GUIDE?<span>〉</span>:null}</ul>
            : <ul className={'guide ' + (surveyDiv===menuEnum.GUIDE?"on":"")} onClick={()=>{setSurveyDivition(menuEnum.GUIDE)}}>다시하기 {surveyDiv===menuEnum.GUIDE?<span>〉</span>:null}</ul>
        }
        
        <ul className='base '>{menuEnum.BASE}
            {/*  */}
            {isSurveyCompleted?.[menuEnum.BASE_MODE] === false
            ? <li className={(surveyDiv===menuEnum.BASE_MODE?"on ":"") + (isSurveyCompleted?.[menuEnum.BASE_MODE]===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.BASE_MODE)}}>
                <span>{menuEnum.BASE_MODE}</span> {surveyDiv===menuEnum.BASE_MODE?<span>〉</span>:null}
            </li>
            : <li className={'disable '+(isSurveyCompleted?.[menuEnum.BASE_MODE]===true?"ok ":"")}>
                <span>{menuEnum.BASE_MODE}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.[menuEnum.BASE_INDEX] === false
            ? <li className={(surveyDiv===menuEnum.BASE_INDEX?"on ":"") + (isSurveyCompleted?.[menuEnum.BASE_INDEX]===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.BASE_INDEX)}}>
                <span>{menuEnum.BASE_INDEX}</span> {surveyDiv===menuEnum.BASE_INDEX?<span>〉</span>:null}
            </li>
            : <li className={'disable '+(isSurveyCompleted?.[menuEnum.BASE_INDEX]===true?"ok ":"")}>
                <span>{menuEnum.BASE_INDEX}</span>
            </li>}
        </ul>

        <ul className='base '>{menuEnum.MY}
            {/*  */}
            {isSurveyCompleted?.[menuEnum.MY_ASSET] === false
            ? <li className={(surveyDiv===menuEnum.MY_ASSET?"on ":"") + (isSurveyCompleted?.[menuEnum.MY_ASSET]===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.MY_ASSET)}}>
                <span>{menuEnum.MY_ASSET}</span> {surveyDiv===menuEnum.MY_ASSET?<span>〉</span>:null}
            </li>
            : <li className={'disable '+(isSurveyCompleted?.[menuEnum.MY_ASSET]===true?"ok ":"")}>
                <span>{menuEnum.MY_ASSET}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.[menuEnum.MY_INCOME] === false
            ? <li className={(surveyDiv===menuEnum.MY_INCOME?"on ":"") + (isSurveyCompleted?.[menuEnum.MY_INCOME]===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.MY_INCOME)}}>
                <span>{menuEnum.MY_INCOME}</span> {surveyDiv===menuEnum.MY_INCOME?<span>〉</span>:null}
            </li>
            : <li className={'disable '+(isSurveyCompleted?.[menuEnum.MY_INCOME]===true?"ok ":"")}>
                <span>{menuEnum.MY_INCOME}</span>
            </li>}
            {/*  */}
            {surveyData.base.marryYn === "Y"
            ? (isSurveyCompleted?.[menuEnum.YOUR_INCOME] === false
                ? <li className={(surveyDiv===menuEnum.YOUR_INCOME?"on ":"") + (isSurveyCompleted?.[menuEnum.YOUR_INCOME]===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.YOUR_INCOME)}}>
                    <span>{menuEnum.YOUR_INCOME}</span> {surveyDiv===menuEnum.YOUR_INCOME?<span>〉</span>:null}
                </li>
                : <li className={'disable '+(isSurveyCompleted?.[menuEnum.YOUR_INCOME]===true?"ok ":"")}>
                    <span>{menuEnum.YOUR_INCOME}</span>
                </li>)
            : null}
            {/*  */}
            {isSurveyCompleted?.[menuEnum.MY_SPENDING] === false
            ? <li className={(surveyDiv===menuEnum.MY_SPENDING?"on ":"") + (isSurveyCompleted?.[menuEnum.MY_SPENDING]===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.MY_SPENDING)}}>
                <span>{menuEnum.MY_SPENDING}</span> {surveyDiv===menuEnum.MY_SPENDING?<span>〉</span>:null}
            </li>
            : <li className={'disable '+(isSurveyCompleted?.[menuEnum.MY_SPENDING]===true?"ok ":"")}>
                <span>{menuEnum.MY_SPENDING}</span>
            </li>}
        </ul>

        <ul className='add'>{menuEnum.ADD}
            {/*  */}
            {isSurveyCompleted?.[menuEnum.ADD_MARRY] === false
            ? <li className={(surveyDiv===menuEnum.ADD_MARRY?"on ":"") + (isSurveyCompleted?.[menuEnum.ADD_MARRY]===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.ADD_MARRY)}}>
                <span>{menuEnum.ADD_MARRY}</span> {surveyDiv===menuEnum.ADD_MARRY?<span>〉</span>:null}
            </li>
            : <li className={'disable '+(isSurveyCompleted?.[menuEnum.ADD_MARRY]===true?"ok ":"")}>
                <span>{menuEnum.ADD_MARRY}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.[menuEnum.ADD_BABY] === false
            ? <li className={(surveyDiv===menuEnum.ADD_BABY?"on ":"") + (isSurveyCompleted?.[menuEnum.ADD_BABY]===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.ADD_BABY)}}>
                <span>{menuEnum.ADD_BABY}</span> {surveyDiv===menuEnum.ADD_BABY?<span>〉</span>:null}
            </li>
            : <li className={'disable '+(isSurveyCompleted?.[menuEnum.ADD_BABY]===true?"ok ":"")}>
                <span>{menuEnum.ADD_BABY}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.[menuEnum.ADD_HOUSE] === false
            ? <li className={(surveyDiv===menuEnum.ADD_HOUSE?"on ":"") + (isSurveyCompleted?.[menuEnum.ADD_HOUSE]===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.ADD_HOUSE)}}>
                <span>{menuEnum.ADD_HOUSE}</span> {surveyDiv===menuEnum.ADD_HOUSE?<span>〉</span>:null}
            </li>
            : <li className={'disable '+(isSurveyCompleted?.[menuEnum.ADD_HOUSE]===true?"ok ":"")}>
                <span>{menuEnum.ADD_HOUSE}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.[menuEnum.ADD_CAR] === false
            ? <li className={(surveyDiv===menuEnum.ADD_CAR?"on ":"") + (isSurveyCompleted?.[menuEnum.ADD_CAR]===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.ADD_CAR)}}>
                <span>{menuEnum.ADD_CAR}</span> {surveyDiv===menuEnum.ADD_CAR?<span>〉</span>:null}
            </li>
            : <li className={'disable '+(isSurveyCompleted?.[menuEnum.ADD_CAR]===true?"ok ":"")}>
                <span>{menuEnum.ADD_CAR}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.[menuEnum.ADD_PARENT] === false
            ? <li className={(surveyDiv===menuEnum.ADD_PARENT?"on ":"") + (isSurveyCompleted?.[menuEnum.ADD_PARENT]===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.ADD_PARENT)}}>
                <span>{menuEnum.ADD_PARENT}</span> {surveyDiv===menuEnum.ADD_PARENT?<span>〉</span>:null}
            </li>
            : <li className={'disable '+(isSurveyCompleted?.[menuEnum.ADD_PARENT]===true?"ok ":"")}>
                <span>{menuEnum.ADD_PARENT}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.[menuEnum.ADD_RETIRE] === false
            ? <li className={(surveyDiv===menuEnum.ADD_RETIRE?"on ":"") + (isSurveyCompleted?.[menuEnum.ADD_RETIRE]===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.ADD_RETIRE)}}>
                <span>{menuEnum.ADD_RETIRE}</span> {surveyDiv===menuEnum.ADD_RETIRE?<span>〉</span>:null}
            </li>
            : <li className={'disable '+(isSurveyCompleted?.[menuEnum.ADD_RETIRE]===true?"ok ":"")}>
                <span>{menuEnum.ADD_RETIRE}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.[menuEnum.ADD_ETC] === false
            ? <li className={(surveyDiv===menuEnum.ADD_ETC?"on ":"") + (isSurveyCompleted?.[menuEnum.ADD_ETC]===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.ADD_ETC)}}>
                <span>{menuEnum.ADD_ETC}</span> {surveyDiv===menuEnum.ADD_ETC?<span>〉</span>:null}
            </li>
            : <li className={'disable '+(isSurveyCompleted?.[menuEnum.ADD_ETC]===true?"ok ":"")}>
                <span>{menuEnum.ADD_ETC}</span>
            </li>}
        </ul>
        <ul className={'guide ' + (surveyDiv===menuEnum.DONE?"on":"")} onClick={()=>{setSurveyDivition(menuEnum.DONE)}}>{menuEnum.DONE} {surveyDiv===menuEnum.DONE?<span>〉</span>:null}</ul>
    </Fragment>
    );
}
export default CashflowSide;