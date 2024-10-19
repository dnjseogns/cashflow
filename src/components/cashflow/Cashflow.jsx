import './Cashflow.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import CashflowSide from './CashflowSide';
import CashflowSurvey from './CashflowSurvey';
import CashflowTable from './CashflowTable';

function Cashflow(){
    return (
    <Fragment>
    <header className='header'></header>
    <div className='cf-wrap'>
        <aside className='cf-left'>
            <CashflowSide />
        </aside>
        <section className='cf-right'>
            <div className='cf-header'></div>
            <div className='cf-content'>
                <CashflowSurvey />
                
                <article className='data-area'>
                    <CashflowTable />
                </article>
            </div>
        </section>
        <section className='cf-btn'>
            <div className='cf-btn-wrap'>
                <button>aaa</button>
                <button>bbb</button>
            </div>
        </section>
    </div>
    <footer className='footer'></footer>
    </Fragment>);
}

export default Cashflow;