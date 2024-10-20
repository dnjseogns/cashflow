import './Cashflow.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import CashflowSide from './CashflowSide';
import CashflowSurvey from './CashflowSurvey';
import CashflowTable from './CashflowTable';
import CashflowBtn from './CashflowBtn';

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

                <div className='cf-btn-area'>
                    <CashflowBtn />
                </div>
            </div>
        </section>
    </div>
    <footer className='footer'></footer>
    </Fragment>);
}

export default Cashflow;