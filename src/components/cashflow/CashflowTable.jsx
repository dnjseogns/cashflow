import './Cashflow.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { useCashflowTableData } from './useCashflowTableData.jsx';
import Mapping from '@/components/common/Mapping.jsx';
import { toKoreanMoneySimpleUnit } from "@/utils/util.js";

/* 입력해주신 자료는 이번 계산에만 활용합니다. 이 사이트는 어떤 개인 정보도 저장하지 않습니다. */

function CashflowTable(){
    //redux
    const dispatch = useDispatch(); 
    const surveyData = useSelector((store) => store.Survey).data;
    const cashflowData = useSelector((store) => store.Cashflow).data;

    const base = surveyData?.base;

    useCashflowTableData();

    const isSalaryRiseRateStackVisible = false;
    const isSideJobVisible = !!(cashflowData?.timeline ?? [])[0]?.sideJob;

    const isAssetHouseVisible = (base?.livingType == "rent" &&  base?.housePriceOwn > 0) 
                                || (base?.livingType == "own" &&  base?.housePriceTotal > 0);
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
                    {/* 나이물가 */}
                    <col width="100px"/>
                    <col width="100px"/>
                    {/* 수입 */}
                    {isSalaryRiseRateStackVisible ? <col width="100px"/> : null}
                    <col width="100px"/>
                    {isSideJobVisible ? <col width="100px"/> : null}
                    <col width="100px"/>
                    {/* 지출 */}
                    <col width="100px"/>
                    <col width="100px"/>
                    <col width="100px"/>
                    <col width="100px"/>
                    <col width="100px"/>
                    {/* 이벤트 */}
                    <col width="100px"/>
                    <col width="100px"/>
                    {/* 잔액 */}
                    <col width="100px"/>
                    {/* 공백 */}
                    <col width="20px"/>
                    {/* 누적자산 */}
                    <col width="100px"/>
                    <col width="100px"/>
                    <col width="100px"/>
                    {isAssetHouseVisible ? <col width="100px"/> : null}
                    <col width="100px"/>
                </colgroup>
                <thead>
                    <tr>
                        <th colSpan={2}></th>
                        <th colSpan={2 + (isSalaryRiseRateStackVisible ? 1 : 0) + (isSideJobVisible ? 1 : 0)}>수입</th>
                        <th colSpan={5}>지출</th>
                        <th colSpan={2}>이벤트</th>
                        <th colSpan={1}>잔액(수입+지출+이벤트)</th>
                        <th colSpan={1} className='gap'></th>
                        <th colSpan={4 + (isAssetHouseVisible ? 1 : 0)}>누적자산</th>
                    </tr>
                    <tr>
                        <th>나이<br/><Mapping txt="(1-ⓐ)"/></th>
                        <th>누적 물가상승률<br/><Mapping txt="(1-ⓑ)"/></th>

                        {isSalaryRiseRateStackVisible ? <th>연봉상승률(누적)</th> : null}
                        <th>연봉<br/><Mapping txt="(5-ⓐ)"/></th>
                        {isSideJobVisible ? <th>부업<br/><Mapping txt="(5-ⓓ)"/></th> : null}
                        <th>합계</th>

                        <th>주거비<br/><Mapping txt="(6-ⓐ)"/></th>
                        <th>차량비<br/><Mapping txt="(6-ⓑ)"/></th>
                        <th>대출이자<br/><Mapping txt="(6-ⓒ)"/></th>
                        <th>기타소비<br/><Mapping txt="(6-ⓓ)"/></th>
                        <th>합계</th>

                        <th>내용</th>
                        <th>합계</th>

                        <th>합계</th>

                        <th className='gap'></th>

                        <th>대출<br/><Mapping txt="(4-ⓐ)"/></th>
                        <th>예금({base?.bankInterest}%)<br/><Mapping txt="(4-ⓑ)"/></th>
                        <th>투자({base?.investIncome}%)<br/><Mapping txt="(4-ⓒ)"/></th>
                        {isAssetHouseVisible ? <th>주택({base?.realEstateGrouthRate}%)<br/><Mapping txt="(4-ⓓ)"/></th> : null}
                        <th>합계</th>
                    </tr>
                </thead>
                <tbody>
                    {cashflowData?.timeline.map((row, i) => {
                    return(
                        <tr key={i}>
                            <td>{row?.age}</td>
                            <td>{row?.inflationStack}</td>

                            {isSalaryRiseRateStackVisible ? <td>{row?.salaryRiseRateStack}</td> : null}
                            <td>{toKoreanMoneySimpleUnit(row?.salary)}</td>
                            {isSideJobVisible ? <td>{toKoreanMoneySimpleUnit(row?.sideJob)}</td> : null}
                            <td className='sum'>{toKoreanMoneySimpleUnit((row?.salary) + (row?.sideJob??0))}</td>
                            
                            <td className={`${row?.houseCost < 0 ? 'minus' : ''}`}>{toKoreanMoneySimpleUnit(row?.houseCost)}</td>
                            <td className={`${row?.carCost < 0 ? 'minus' : ''}`}>{toKoreanMoneySimpleUnit(row?.carCost)}</td>
                            <td className={`${row?.loanCost < 0 ? 'minus' : ''}`}>{toKoreanMoneySimpleUnit(row?.loanCost)}</td>
                            <td className={`${row?.etcExpense < 0 ? 'minus' : ''}`}>{toKoreanMoneySimpleUnit(row?.etcExpense)}</td>
                            <td className={`sum ${row?.totalConsumption < 0 ? 'minus' : ''}`}>{toKoreanMoneySimpleUnit(row?.totalConsumption)}</td>
                            
                            {row?.totalEventNote ? <td><Mapping txt={row?.totalEventNote}/></td> : <td></td>}
                            <td className={`sum ${row?.totalEvent < 0 ? 'minus' : ''}`}>{toKoreanMoneySimpleUnit(row?.totalEvent)}</td>

                            <td className={`sum ${row?.totalBalance < 0 ? 'minus' : ''}`}>{toKoreanMoneySimpleUnit(row?.totalBalance)}</td>

                            <td className='gap'></td>

                            <td className={row?.assetLoanStack < 0 ? 'minus' : ''}>{toKoreanMoneySimpleUnit(row?.assetLoanStack)}</td>
                            <td>{toKoreanMoneySimpleUnit(row?.assetSavingStack)}</td>
                            <td>{toKoreanMoneySimpleUnit(row?.assetInvestStack)}</td>
                            { isAssetHouseVisible ? <td>{toKoreanMoneySimpleUnit(row?.assetHousePriceStack)}</td>
                            : null}

                            <td className={`sum ${row?.totalAsset < 0 ? 'minus' : ''}`}>{toKoreanMoneySimpleUnit(row?.totalAsset)}</td>
                        </tr>
                    ) 
                    })}
                </tbody>
            </table>
        </Fragment>
    );
}
export default CashflowTable;