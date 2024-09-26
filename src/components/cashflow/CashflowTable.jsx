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

    const base = surveyData?.base;
    const prev = surveyData?.prev;

    useCashflowTableData();

    const isSalaryRiseRateStackVisible = false;
    const isSideJobVisible = !!(cashflowData?.timeline ?? [])[0]?.sideJob;

    const isAssetHouseVisible = (prev?.livingType == "rent" &&  prev?.housePriceOwn > 0) 
                                || (prev?.livingType == "own" &&  prev?.housePriceTotal > 0);
    // const isHouseCostVisible = !!(cashflowData?.timeline ?? [])[0]?.houseCost;
    // const isCarCostVisible = !!(cashflowData?.timeline ?? [])[0]?.carCost;

    // const isAssetLoanVisible = !!(cashflowData?.timeline ?? [])[0]?.assetLoan;
    // const isAssetHouseLoanVisible = !!(cashflowData?.timeline ?? [])[0]?.assetLoan;
    // const isAssetSavingVisible = !!(cashflowData?.timeline ?? [])[0]?.assetSaving;
    // const isAssetInvestVisible = !!(cashflowData?.timeline ?? [])[0]?.assetInvest;

    return (
        <Fragment>
            <table>
                <colgroup>
                    <col width="40px"/>

                    {isSalaryRiseRateStackVisible ? <col width="100px"/> : null}
                    <col width="100px"/>
                    {isSideJobVisible ? <col width="100px"/> : null}
                    <col width="100px"/>

                    <col width="100px"/>
                    <col width="100px"/>
                    <col width="100px"/>
                    <col width="100px"/>
                    <col width="100px"/>

                    <col width="100px"/>
                    <col width="100px"/>

                    <col width="100px"/>

                    <col width="20px"/>

                    <col width="100px"/>
                    <col width="100px"/>
                    <col width="100px"/>
                    {isAssetHouseVisible ? <col width="100px"/> : null}
                    <col width="100px"/>
                </colgroup>
                <thead>
                    <tr>
                        <th colSpan="1"></th>
                        <th colSpan={2 + (isSalaryRiseRateStackVisible ? 1 : 0) + (isSideJobVisible ? 1 : 0)}>소득</th>
                        <th colSpan={5}>소비</th>
                        <th colSpan="2">이벤트</th>
                        <th colSpan="1">잔액(소득+소비+이벤트)</th>
                        <th colSpan="1" className='gap'></th>
                        <th colSpan={4 + (isAssetHouseVisible ? 1 : 0)}>누적자산</th>
                    </tr>
                    <tr>
                        <th>나이</th>

                        {isSalaryRiseRateStackVisible ? <th>연봉상승률(누적)</th> : null}
                        <th>연봉</th>
                        {isSideJobVisible ? <th>부업</th> : null}
                        <th>합계</th>

                        <th>물가상승률(누적)</th>
                        <th>주거비</th>
                        <th>차량비</th>
                        <th>소비</th>
                        <th>합계</th>

                        <th>내용</th>
                        <th>합계</th>

                        <th>합계</th>

                        <th className='gap'></th>

                        <th>대출</th>{/* <th>대출({base?.loanInterest}%)</th> */}
                        <th>예금({base?.bankInterest}%)</th>
                        <th>투자({base?.investIncome}%)</th>
                        {isAssetHouseVisible ? <th>주택</th> : null}
                        <th>합계</th>
                    </tr>
                </thead>
                <tbody>
                    {cashflowData?.timeline.map((row, i) => {
                    
                    return(
                        <tr key={i}>
                            <td>{row?.age?.toLocaleString('ko-KR')}</td>

                            {isSalaryRiseRateStackVisible ? <td>{row?.salaryRiseRateStack?.toLocaleString('ko-KR')}</td> : null}
                            <td>{row?.salary?.toLocaleString('ko-KR')}</td>
                            {isSideJobVisible ? <td>{row?.sideJob?.toLocaleString('ko-KR')}</td> : null}
                            <td className='sum'>{row?.salary && (row?.salary + row?.sideJob)?.toLocaleString('ko-KR')}</td>
                            
                            <td>{row?.inflationStack?.toLocaleString('ko-KR')}</td>
                            <td className={`${row?.houseCost < 0 ? 'minus' : ''}`}>{row?.houseCost?.toLocaleString('ko-KR')}</td>
                            <td className={`${row?.carCost < 0 ? 'minus' : ''}`}>{row?.carCost?.toLocaleString('ko-KR')}</td>
                            <td className={`${row?.consumption < 0 ? 'minus' : ''}`}>{row?.consumption?.toLocaleString('ko-KR')}</td>
                            <td  className={`sum ${row?.totalConsumption < 0 ? 'minus' : ''}`}>{row?.totalConsumption?.toLocaleString('ko-KR')}</td>
                            
                            <td>{row?.totalEventNote}</td>
                            <td className={`sum ${row?.totalEvent < 0 ? 'minus' : ''}`}>{row?.totalEvent?.toLocaleString('ko-KR')}</td>

                            <td className={`sum ${row?.totalBalance < 0 ? 'minus' : ''}`}>{row?.totalBalance?.toLocaleString('ko-KR')}</td>

                            <td className='gap'></td>

                            <td className={row?.assetLoanStack < 0 ? 'minus' : ''}>{row?.assetLoanStack?.toLocaleString('ko-KR')}</td>
                            <td>{row?.assetSavingStack?.toLocaleString('ko-KR')}</td>
                            <td>{row?.assetInvestStack?.toLocaleString('ko-KR')}</td>
                            { isAssetHouseVisible && prev?.livingType == "rent" ? <td>{prev?.housePriceOwn?.toLocaleString('ko-KR')}</td> 
                            : isAssetHouseVisible && prev?.livingType == "own" ? <td>{prev?.housePriceTotal?.toLocaleString('ko-KR')}</td> 
                            : null}

                            <td className={`sum ${row?.totalAsset < 0 ? 'minus' : ''}`}>{row?.totalAsset?.toLocaleString('ko-KR')}</td>
                        </tr>
                    ) 
                    })}
                </tbody>
            </table>
        </Fragment>
    );
}
export default CashflowTable;