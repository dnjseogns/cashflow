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

    useCashflowTableData();

    const isSideJobVisible = !!(cashflowData?.timeline ?? [])[0]?.sideJob;

    const isHouseCostVisible = !!(cashflowData?.timeline ?? [])[0]?.houseCost;
    const isCarCostVisible = !!(cashflowData?.timeline ?? [])[0]?.carCost;

    const isAssetLoanVisible = !!(cashflowData?.timeline ?? [])[0]?.assetLoan;
    // const isAssetHouseLoanVisible = !!(cashflowData?.timeline ?? [])[0]?.assetLoan;
    // const isAssetSavingVisible = !!(cashflowData?.timeline ?? [])[0]?.assetSaving;
    // const isAssetInvestVisible = !!(cashflowData?.timeline ?? [])[0]?.assetInvest;

    return (
        <Fragment>
            <table>
                <colgroup>
                    <col width="40px"/>

                    <col width="80px"/>
                    <col width="80px"/>
                    {isSideJobVisible ? <col width="80px"/> : null}
                    <col width="100px"/>

                    <col width="80px"/>
                    <col width="80px"/>
                    {isHouseCostVisible ? <col width="80px"/> : null}
                    {isCarCostVisible ? <col width="80px"/> : null}
                    <col width="100px"/>

                    <col width="100px"/>

                    <col width="20px"/>

                    <col width="100px"/>
                    <col width="100px"/>
                    <col width="100px"/>
                    <col width="100px"/>
                </colgroup>
                <thead>
                    <tr>
                        <th colSpan="1"></th>
                        <th colSpan={3 + (isSideJobVisible ? 1 : 0)}>소득</th>
                        <th colSpan={3 + (isHouseCostVisible ? 1 : 0) + (isCarCostVisible ? 1 : 0)}>소비</th>
                        <th colSpan="1">저축(소득 - 소비)</th>
                        <th colSpan="1" className='gap'></th>
                        <th colSpan={4}>누적자산</th>
                    </tr>
                    <tr>
                        <th>나이</th>

                        <th>연봉상승률(누적)</th>
                        <th>연봉</th>
                        {isSideJobVisible ? <th>부업</th> : null}
                        <th>합계</th>

                        <th>물가상승률(누적)</th>
                        <th>소비</th>
                        {isHouseCostVisible ? <th>주거비</th> : null}
                        {isCarCostVisible ? <th>차량비</th> : null}
                        <th>합계</th>

                        <th>합계</th>

                        <th className='gap'></th>

                        <th>대출({base?.loanInterest}%)</th>
                        <th>예금({base?.bankInterest}%)</th>
                        <th>투자({base?.investIncome}%)</th>
                        <th>합계</th>
                    </tr>
                </thead>
                <tbody>
                    {cashflowData?.timeline.map((row, i) => {
                    return(
                        <tr key={i}>
                            <td>{row?.age?.toLocaleString('ko-KR')}</td>

                            <td>{row?.salaryRiseRateStack?.toLocaleString('ko-KR')}</td>
                            <td>{row?.salary?.toLocaleString('ko-KR')}</td>
                            {isSideJobVisible ? <td>{row?.sideJob?.toLocaleString('ko-KR')}</td> : null}
                            <td className='sum'>{row?.salary && (row?.salary + row?.sideJob)?.toLocaleString('ko-KR')}</td>
                            
                            <td>{row?.inflationStack?.toLocaleString('ko-KR')}</td>
                            <td>{row?.consumption?.toLocaleString('ko-KR')}</td>
                            {isHouseCostVisible ? <td>{row?.houseCost?.toLocaleString('ko-KR')}</td> : null}
                            {isCarCostVisible ? <td>{row?.carCost?.toLocaleString('ko-KR')}</td> : null}
                            <td className='sum'>{row?.totalConsumption?.toLocaleString('ko-KR')}</td>

                            <td className='sum'>{row?.totalSaving?.toLocaleString('ko-KR')}</td>

                            <td className='gap'></td>

                            <td>{row?.assetLoanStack?.toLocaleString('ko-KR')}</td>
                            <td>{row?.assetSavingStack?.toLocaleString('ko-KR')}</td>
                            <td>{row?.assetInvestStack?.toLocaleString('ko-KR')}</td>
                            {/* <td>{row?.houseGuarantee?.toLocaleString('ko-KR')}</td> */}
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