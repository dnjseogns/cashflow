import './Cashflow.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { useCashflowTableData } from './useCashflowTableData.jsx';

/* 입력해주신 자료는 이번 계산에만 활용합니다. 이 사이트는 어떤 개인 정보도 저장하지 않습니다. */

function CashflowTable(){
    //redux
    const dispatch = useDispatch(); 
    const surveyData = useSelector((store) => store.Survey).data;
    const cashflowData = useSelector((store) => store.Cashflow).data;

    useCashflowTableData();

    return (
        <Fragment>
            <table>
                <colgroup>
                    <col width="40px"/>

                    <col width="80px"/>
                    <col width="80px"/>
                    <col width="80px"/>
                    <col width="100px"/>

                    <col width="80px"/>
                    <col width="80px"/>
                    <col width="80px"/>
                    <col width="80px"/>
                    <col width="100px"/>

                    <col width="100px"/>

                    <col width="20px"/>

                    <col width="100px"/>
                    <col width="100px"/>
                    <col width="100px"/>
                    <col width="100px"/>
                    <col width="100px"/>
                </colgroup>
                <thead>
                    <tr>
                        <th colSpan="1"></th>
                        <th colSpan="4">소득</th>
                        <th colSpan="5">소비</th>
                        <th colSpan="1">저축<br/>(소득 - 소비)</th>
                        <th colSpan="1" className='gap'></th>
                        <th colSpan="5">누적자산(저축 + 자본소득)</th>
                    </tr>
                    <tr>
                        <th>나이</th>

                        <th>연봉상승률(누적)</th>
                        <th>연봉<br/></th>
                        <th>부업<br/></th>
                        <th>합계</th>

                        <th>물가상승(누적)</th>
                        <th>소비</th>
                        <th>주거비</th>
                        <th>차량비</th>
                        <th>합계</th>

                        <th>합계</th>

                        <th className='gap'></th>

                        <th>부채(2.1%)</th>
                        {/* <th>부채(5.0%)</th> */}
                        <th>저축({surveyData.base.indexBankInterest}%)</th>
                        <th>투자({surveyData.base.investIncome}%)</th>
                        <th>보증금(0%)</th>
                        <th>합계</th>
                    </tr>
                </thead>
                <tbody>
                    {cashflowData?.timeline.map((row, i) => {
                    return(
                        <tr key={i}>
                            <td>{row?.age}</td>

                            <td>{row?.salaryRiseRateStack}</td>
                            <td>{row?.salaryYearly?.toLocaleString('ko-KR')}</td>
                            <td>{row?.sideJobYearly?.toLocaleString('ko-KR')}</td>
                            <td className='sum'>{row?.salaryYearly && (row?.salaryYearly + (row?.sideJobYearly??0))}</td>
                            {/* <td className='sum'>합계</td> */}
                            
                            <td>{row?.inflationStack}</td>
                            <td>{row?.consumAmountYearly}</td>
                            <td>{row?.houseCostYearly}</td>
                            <td>{row?.carCostYearly}</td>
                            {/* <td className='sum'>{row?.consumAmountYearly + row?.houseCostYearly + row?.carCostYearly}</td> */}
                            <td className='sum'>합계</td>

                            {/* <td className='sum'>{Math.round( ((row?.workIncomeTotSum - row?.consumTotSum)) * 1)}</td> */}
                            <td className='sum'>합계</td>

                            <td className='gap'></td>

                            <td></td>
                            <td>{row?.assetSaving}</td>
                            <td>{row?.assetInvest}</td>
                            <td>{row?.houseGuarantee}</td>
                            <td className='sum'>합계</td>
                        </tr>
                    ) 
                    })}
                </tbody>
            </table>
        </Fragment>
    );
}
export default CashflowTable;