import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './Cashflow.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { useCashflowTableData } from './useCashflowTableData.jsx';
import Mapping from '@/components/common/Mapping.jsx';
import { toKoreanMoneySimpleUnit } from "@/utils/util.js";
import { useMenuContext } from './MenuContext.jsx';
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';

const CashflowGraph = ({isExchanged}) => {
    const surveyData = useSelector((store) => store.Survey).data;
    const cashflowData = useSelector((store) => store.Cashflow).data;
    const data = isExchanged ? cashflowData?.exchangedChart : cashflowData.chart;
    const dispatch = useDispatch();

    const legendChartA = cashflowData.legendChartA;
    const legendChartB = cashflowData.legendChartB;
    const legendChartC = cashflowData.legendChartC;

    const saveChartData = (div) => {
        if(div === "A"){
            cashflowData.timelineSaveA = cashflowData.timeline;
        }else if(div === "B"){
            cashflowData.timelineSaveB = cashflowData.timeline;
        }else if(div === "C"){
            cashflowData.timelineSaveC = cashflowData.timeline;
        }
        dispatch(CfSave(cashflowData));

        //재조회용
        dispatch(SvSave(JSON.parse(JSON.stringify(surveyData))));
    }

    const saveLegendChart = (e, div) => {
        if(div === "A"){
            cashflowData.legendChartA = e.target.value;
        }else if(div === "B"){
            cashflowData.legendChartB = e.target.value;
        }else if(div === "C"){
            cashflowData.legendChartC = e.target.value;
        }
        dispatch(CfSave(cashflowData));

        //재조회용
        dispatch(SvSave(JSON.parse(JSON.stringify(surveyData))));
    }

    
    return (
        <Fragment>
        <LineChart width={1580} height={750} 
            margin={{ top: 5, right: 10, left: 30, bottom: 5 }}
            data={data}>
            <XAxis dataKey="age" />
            <YAxis />
            <Tooltip />
            <Legend 
                payload={[{ value: '현재', type: 'line', id: 'v1',color:"#8884d8" },
                    { value: legendChartA, type: 'line', id: 'v2',color:"#FFC658" },
                    { value: legendChartB, type: 'line', id: 'v3',color:"#8DD1E1" },
                    { value: legendChartC, type: 'line', id: 'v4',color:"#D0ED57" }
                ]}
            />
            <Line type="monotone" dataKey="totalAssetCurrent" stroke="#8884d8" />
            <Line type="monotone" dataKey="totalAssetSaveC" stroke="#FFC658" />
            <Line type="monotone" dataKey="totalAssetSaveA" stroke="#8DD1E1" />
            <Line type="monotone" dataKey="totalAssetSaveB" stroke="#D0ED57" />
            {/* // y축 단위 추가 필요 */}
            {/* <Line type="monotone" dataKey="totalAssetSaveA" stroke="#82ca9d" />
            <Line type="monotone" dataKey="totalAssetSaveB" stroke="#413ea0" />
            <Line type="monotone" dataKey="totalAssetSaveC" stroke="#ff7300" /> */}
            <CartesianGrid stroke="#ccc" />
        </LineChart>
        <div className='chart-btn'>
            <div>
                <label>범례A : </label><input value={legendChartA} onChange={(e)=>saveLegendChart(e, "A")}/>
                <br/>
                <button onClick={()=>{saveChartData("A")}}>현재 데이터 → A에 저장하기</button>
            </div>
            <div>
                <label>범례B : </label><input value={legendChartB} onChange={(e)=>saveLegendChart(e, "B")}/>
                <br/>
                <button onClick={()=>{saveChartData("B")}}>현재 데이터 → B에 저장하기</button>
            </div>
            <div>
                <label>범례C : </label><input value={legendChartC} onChange={(e)=>saveLegendChart(e, "C")}/>
                <br/>
                <button onClick={()=>{saveChartData("C")}}>현재 데이터 → C에 저장하기</button>
            </div>
        </div>
        </Fragment>
    )
}
export default CashflowGraph;