import './Cashflow.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import CashflowSide from './CashflowSide';
import CashflowSurvey from './CashflowSurvey';
import CashflowTable from './CashflowTable';
import CashflowBtn from './CashflowBtn';
import CashflowGraph from './CashflowGraph';
import { useCashflowTableData } from './useCashflowTableData.jsx';

function Cashflow(){
    useCashflowTableData();

    const [isGraph, setIsGraph] = useState(true);
    const [isExchanged, setIsExchanged] = useState(true);
    const [isRealEstate, setIsRealEstate] = useState(false);

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
                    {isGraph === false
                    ? <CashflowTable isExchanged={isExchanged} />
                    : <CashflowGraph isExchanged={isExchanged} isRealEstate={isRealEstate}/>}
                </article>

                <div className='cf-btn-area'>
                    <CashflowBtn isGraph={isGraph} setIsGraph={setIsGraph} isExchanged={isExchanged} setIsExchanged={setIsExchanged} isRealEstate={isRealEstate} setIsRealEstate={setIsRealEstate}/>
                </div>
            </div>
        </section>
    </div>
    <footer className='footer'></footer>
    </Fragment>);
}

export default Cashflow;