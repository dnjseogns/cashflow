import './Cashflow.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import CashflowSide from './CashflowSide';
import CashflowSurvey from './CashflowSurvey';
import CashflowTable from './CashflowTable';

/* 입력해주신 자료는 이번 계산에만 활용합니다. 이 사이트는 어떤 개인 정보도 저장하지 않습니다. */

function Cashflow(){
    //surveyDiv
    const [surveyDiv,setSurveyDiv] = useState("");
    const [surveyTitle,setSurveyTitle] = useState("");

    return (
    <Fragment>
    <header className='header'></header>
    <div className='cf-wrap'>
        <aside className='cf-left'>
            <CashflowSide surveyDiv={surveyDiv} setSurveyDiv={setSurveyDiv} setSurveyTitle={setSurveyTitle}/>
        </aside>
        <section className='cf-right'>
            <div className='cf-header'></div>
            <div className='cf-content'>
                {/* <article */}
                <CashflowSurvey surveyDiv={surveyDiv} surveyTitle={surveyTitle}/>
                {/* <article */}

                <article className='data-area'>
                    <CashflowTable />
                </article>
            </div>
        </section>
    </div>
    <footer className='footer'></footer>
    </Fragment>);
}

export default Cashflow;