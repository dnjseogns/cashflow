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
        <ul className={'guide ' + (surveyDiv===menuEnum.GUIDE?"on":"")} onClick={()=>{setSurveyDivition(menuEnum.GUIDE)}}>{menuEnum.GUIDE} {surveyDiv===menuEnum.GUIDE?<span>〉</span>:null}</ul>
        
        <ul className='base '>{menuEnum.BASE}
            {/*  */}
            {isSurveyCompleted?.BASE_MODE !== undefined
            ? <li className={(surveyDiv===menuEnum.BASE_MODE?"on ":"") + (isSurveyCompleted?.BASE_MODE===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.BASE_MODE)}}>
                <span>{menuEnum.BASE_MODE}</span> {surveyDiv===menuEnum.BASE_MODE?<span>〉</span>:null}
            </li>
            : <li className='disable'>
                <span>{menuEnum.BASE_MODE}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.BASE_INDEX !== undefined
            ? <li className={(surveyDiv===menuEnum.BASE_INDEX?"on ":"") + (isSurveyCompleted?.BASE_INDEX===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.BASE_INDEX)}}>
                <span>{menuEnum.BASE_INDEX}</span> {surveyDiv===menuEnum.BASE_INDEX?<span>〉</span>:null}
            </li>
            : <li className='disable'>
                <span>{menuEnum.BASE_INDEX}</span>
            </li>}
        </ul>

        <ul className='base '>{menuEnum.MY}
            {/*  */}
            {isSurveyCompleted?.MY_AGE !== undefined
            ? <li className={(surveyDiv===menuEnum.MY_AGE?"on ":"") + (isSurveyCompleted?.MY_AGE===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.MY_AGE)}}>
                <span>{menuEnum.MY_AGE}</span> {surveyDiv===menuEnum.MY_AGE?<span>〉</span>:null}
            </li>
            : <li className='disable'>
                <span>{menuEnum.MY_AGE}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.MY_ASSET !== undefined
            ? <li className={(surveyDiv===menuEnum.MY_ASSET?"on ":"") + (isSurveyCompleted?.MY_ASSET===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.MY_ASSET)}}>
                <span>{menuEnum.MY_ASSET}</span> {surveyDiv===menuEnum.MY_ASSET?<span>〉</span>:null}
            </li>
            : <li className='disable'>
                <span>{menuEnum.MY_ASSET}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.MY_INCOME !== undefined
            ? <li className={(surveyDiv===menuEnum.MY_INCOME?"on ":"") + (isSurveyCompleted?.MY_INCOME===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.MY_INCOME)}}>
                <span>{menuEnum.MY_INCOME}</span> {surveyDiv===menuEnum.MY_INCOME?<span>〉</span>:null}
            </li>
            : <li className='disable'>
                <span>{menuEnum.MY_INCOME}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.MY_SPENDING !== undefined
            ? <li className={(surveyDiv===menuEnum.MY_SPENDING?"on ":"") + (isSurveyCompleted?.MY_SPENDING===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.MY_SPENDING)}}>
                <span>{menuEnum.MY_SPENDING}</span> {surveyDiv===menuEnum.MY_SPENDING?<span>〉</span>:null}
            </li>
            : <li className='disable'>
                <span>{menuEnum.MY_SPENDING}</span>
            </li>}
        </ul>

        {surveyData.base.marryYn === "Y"
        ? <ul className='base '>{menuEnum.YOUR}
            {/*  */}
            {isSurveyCompleted?.YOUR_AGE !== undefined
            ? <li className={(surveyDiv===menuEnum.YOUR_AGE?"on ":"") + (isSurveyCompleted?.YOUR_AGE===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.YOUR_AGE)}}>
                <span>{menuEnum.YOUR_AGE}</span> {surveyDiv===menuEnum.YOUR_AGE?<span>〉</span>:null}
            </li>
            : <li className='disable'>
                <span>{menuEnum.YOUR_AGE}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.YOUR_ASSET !== undefined
            ? <li className={(surveyDiv===menuEnum.YOUR_ASSET?"on ":"") + (isSurveyCompleted?.YOUR_ASSET===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.YOUR_ASSET)}}>
                <span>{menuEnum.YOUR_ASSET}</span> {surveyDiv===menuEnum.YOUR_ASSET?<span>〉</span>:null}
            </li>
            : <li className='disable'>
                <span>{menuEnum.YOUR_ASSET}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.YOUR_INCOME !== undefined
            ? <li className={(surveyDiv===menuEnum.YOUR_INCOME?"on ":"") + (isSurveyCompleted?.YOUR_INCOME===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.YOUR_INCOME)}}>
                <span>{menuEnum.YOUR_INCOME}</span> {surveyDiv===menuEnum.YOUR_INCOME?<span>〉</span>:null}
            </li>
            : <li className='disable'>
                <span>{menuEnum.YOUR_INCOME}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.YOUR_SPENDING !== undefined
            ? <li className={(surveyDiv===menuEnum.YOUR_SPENDING?"on ":"") + (isSurveyCompleted?.YOUR_SPENDING===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.YOUR_SPENDING)}}>
                <span>{menuEnum.YOUR_SPENDING}</span> {surveyDiv===menuEnum.YOUR_SPENDING?<span>〉</span>:null}
            </li>
            : <li className='disable'>
                <span>{menuEnum.YOUR_SPENDING}</span>
            </li>}
        </ul>
        : null}

        <ul className='add'>{menuEnum.ADD}
            {/*  */}
            {isSurveyCompleted?.ADD_MARRY !== undefined
            ? <li className={(surveyDiv===menuEnum.ADD_MARRY?"on ":"") + (isSurveyCompleted?.ADD_MARRY===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.ADD_MARRY)}}>
                <span>{menuEnum.ADD_MARRY}</span> {surveyDiv===menuEnum.ADD_MARRY?<span>〉</span>:null}
            </li>
            : <li className='disable'>
                <span>{menuEnum.ADD_MARRY}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.ADD_BABY !== undefined
            ? <li className={(surveyDiv===menuEnum.ADD_BABY?"on ":"") + (isSurveyCompleted?.ADD_BABY===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.ADD_BABY)}}>
                <span>{menuEnum.ADD_BABY}</span> {surveyDiv===menuEnum.ADD_BABY?<span>〉</span>:null}
            </li>
            : <li className='disable'>
                <span>{menuEnum.ADD_BABY}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.ADD_HOUSE !== undefined
            ? <li className={(surveyDiv===menuEnum.ADD_HOUSE?"on ":"") + (isSurveyCompleted?.ADD_HOUSE===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.ADD_HOUSE)}}>
                <span>{menuEnum.ADD_HOUSE}</span> {surveyDiv===menuEnum.ADD_HOUSE?<span>〉</span>:null}
            </li>
            : <li className='disable'>
                <span>{menuEnum.ADD_HOUSE}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.ADD_CAR !== undefined
            ? <li className={(surveyDiv===menuEnum.ADD_CAR?"on ":"") + (isSurveyCompleted?.ADD_CAR===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.ADD_CAR)}}>
                <span>{menuEnum.ADD_CAR}</span> {surveyDiv===menuEnum.ADD_CAR?<span>〉</span>:null}
            </li>
            : <li className='disable'>
                <span>{menuEnum.ADD_CAR}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.ADD_PARENT !== undefined
            ? <li className={(surveyDiv===menuEnum.ADD_PARENT?"on ":"") + (isSurveyCompleted?.ADD_PARENT===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.ADD_PARENT)}}>
                <span>{menuEnum.ADD_PARENT}</span> {surveyDiv===menuEnum.ADD_PARENT?<span>〉</span>:null}
            </li>
            : <li className='disable'>
                <span>{menuEnum.ADD_PARENT}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.ADD_RETIRE !== undefined
            ? <li className={(surveyDiv===menuEnum.ADD_RETIRE?"on ":"") + (isSurveyCompleted?.ADD_RETIRE===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.ADD_RETIRE)}}>
                <span>{menuEnum.ADD_RETIRE}</span> {surveyDiv===menuEnum.ADD_RETIRE?<span>〉</span>:null}
            </li>
            : <li className='disable'>
                <span>{menuEnum.ADD_RETIRE}</span>
            </li>}
            {/*  */}
            {isSurveyCompleted?.ADD_ETC !== undefined
            ? <li className={(surveyDiv===menuEnum.ADD_ETC?"on ":"") + (isSurveyCompleted?.ADD_ETC===true?"ok ":"")} onClick={()=>{setSurveyDivition(menuEnum.ADD_ETC)}}>
                <span>{menuEnum.ADD_ETC}</span> {surveyDiv===menuEnum.ADD_ETC?<span>〉</span>:null}
            </li>
            : <li className='disable'>
                <span>{menuEnum.ADD_ETC}</span>
            </li>}

        </ul>
    </Fragment>
    );
}
export default CashflowSide;