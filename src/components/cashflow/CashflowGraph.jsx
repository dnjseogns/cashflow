import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
// import './Cashflow.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { toKoreanMoneySimpleUnit } from "@/utils/util.js";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';

const CashflowGraph = ({isExchanged}) => {
    const surveyData = useSelector((store) => store.Survey).data;
    const cashflowData = useSelector((store) => store.Cashflow).data;
    const data = isExchanged ? cashflowData?.exchangedChart : cashflowData.chart;
    const dispatch = useDispatch();


    console.log("JSON.stringify(cashflowData)");
    console.log(JSON.stringify(cashflowData));
    

    const legendA = cashflowData.chartLegent.nameA;
    const legendB = cashflowData.chartLegent.nameB;
    const legendC = cashflowData.chartLegent.nameC;
    const legendD = cashflowData.chartLegent.nameD;

    const [isChartCurVisible, setIsChartCurVisible] = useState(true);
    const isChartAVisible = cashflowData.timelineSaveA.length <= 0 ? false : true;
    const isChartBVisible = cashflowData.timelineSaveB.length <= 0 ? false : true;
    const isChartCVisible = cashflowData.timelineSaveC.length <= 0 ? false : true;
    const isChartDVisible = cashflowData.timelineSaveD.length <= 0 ? false : true;

    const saveChartData = (div) => {
        if(div === "A"){
            cashflowData.timelineSaveA = cashflowData.timeline;
        }else if(div === "B"){
            cashflowData.timelineSaveB = cashflowData.timeline;
        }else if(div === "C"){
            cashflowData.timelineSaveC = cashflowData.timeline;
        }else if(div === "D"){
            cashflowData.timelineSaveD = cashflowData.timeline;
        }
        dispatch(CfSave(cashflowData));

        //재조회용
        dispatch(SvSave(JSON.parse(JSON.stringify(surveyData))));
    }
    
    const deleteChartData = (div) => {
        if(div === "A"){
            cashflowData.timelineSaveA = [];
        }else if(div === "B"){
            cashflowData.timelineSaveB = [];
        }else if(div === "C"){
            cashflowData.timelineSaveC = [];
        }else if(div === "D"){
            cashflowData.timelineSaveD = [];
        }
        dispatch(CfSave(cashflowData));

        //재조회용
        dispatch(SvSave(JSON.parse(JSON.stringify(surveyData))));

    }

    const saveLegend = (e, div) => {
        if(div === "A"){
            cashflowData.chartLegent.nameA = e.target.value;
        }else if(div === "B"){
            cashflowData.chartLegent.nameB = e.target.value;
        }else if(div === "C"){
            cashflowData.chartLegent.nameC = e.target.value;
        }else if(div === "D"){
            cashflowData.chartLegent.nameD = e.target.value;
        }
        dispatch(CfSave(cashflowData));

        //재조회용
        dispatch(SvSave(JSON.parse(JSON.stringify(surveyData))));
    }

    // 숫자에 콤마를 추가하는 함수
    const numberWithCommas = (number) => {
        return new Intl.NumberFormat().format(number);
    };

    return (
        <Fragment>
        <LineChart width={1580} height={750} 
            margin={{ top: 50, right: 10, left: 70, bottom: 5 }}
            data={data}>
            <XAxis dataKey="age" />
            {/* <YAxis label={{ value: '단위(원)', angle: 0, position: {x:80,y:-20}}} tickFormatter={toKoreanMoneySimpleUnit}/> */}
            <YAxis tickFormatter={toKoreanMoneySimpleUnit}/>
            {isChartCurVisible ? <Line type="monotone" dataKey="totalAssetCurrent" stroke="#8884d8" /> : null}
            {isChartAVisible ? <Line type="monotone" dataKey="totalAssetSaveA" stroke="#FFC658" /> : null}
            {isChartBVisible ? <Line type="monotone" dataKey="totalAssetSaveB" stroke="#8DD1E1" /> : null}
            {isChartCVisible ? <Line type="monotone" dataKey="totalAssetSaveC" stroke="#D0ED57" /> : null}
            {isChartDVisible ? <Line type="monotone" dataKey="totalAssetSaveD" stroke="#8884d8" /> : null}
            <Legend 
                payload={[{ value: '현재', type: 'line', id: 'v1',color:"#8884d8" },
                    { value: legendA, type: 'line', id: 'v2',color:"#FFC658" },
                    { value: legendB, type: 'line', id: 'v3',color:"#8DD1E1" },
                    { value: legendC, type: 'line', id: 'v4',color:"#D0ED57" },
                    { value: legendD, type: 'line', id: 'v5',color:"#8884d8" }
                ]}
            />
            <Tooltip 
                labelFormatter={(label) => `나이: ${label}`}
                formatter={(value, name) => {
                    if (name === "totalAssetSaveA") return [toKoreanMoneySimpleUnit(value), "A:"+legendA];
                    if (name === "totalAssetSaveB") return [toKoreanMoneySimpleUnit(value), "B:"+legendB];
                    if (name === "totalAssetSaveC") return [toKoreanMoneySimpleUnit(value), "C:"+legendC];
                    if (name === "totalAssetSaveD") return [toKoreanMoneySimpleUnit(value), "D:"+legendD];
                    return [toKoreanMoneySimpleUnit(value), "현재"];
                }}
            />
            <CartesianGrid stroke="#ccc" />
        </LineChart>
        <div className='chart-btn'>
            <div>
                <span>현재</span>
                <br/>
                <button onClick={()=>{setIsChartCurVisible(!isChartCurVisible)}}>{isChartCurVisible ? "현재데이터 감추기" : "현재데이터 보이기"}</button>
            </div>
            <div>
                <label>범례A : </label><input value={legendA} onChange={(e)=>saveLegend(e, "A")}/>
                <br/>
                <button onClick={()=>{saveChartData("A")}}>현재 데이터 → A에 저장하기</button>
                <br/>
                <button onClick={()=>{deleteChartData("A")}}>A데이터 삭제</button>
            </div>
            <div>
                <label>범례B : </label><input value={legendB} onChange={(e)=>saveLegend(e, "B")}/>
                <br/>
                <button onClick={()=>{saveChartData("B")}}>현재 데이터 → B에 저장하기</button>
                <br/>
                <button onClick={()=>{deleteChartData("B")}}>B데이터 삭제</button>
            </div>
            <div>
                <label>범례C : </label><input value={legendC} onChange={(e)=>saveLegend(e, "C")}/>
                <br/>
                <button onClick={()=>{saveChartData("C")}}>현재 데이터 → C에 저장하기</button>
                <br/>
                <button onClick={()=>{deleteChartData("C")}}>C데이터 삭제</button>
            </div>
            <div>
                <label>범례D : </label><input value={legendD} onChange={(e)=>saveLegend(e, "D")}/>
                <br/>
                <button onClick={()=>{saveChartData("D")}}>현재 데이터 → D에 저장하기</button>
                <br/>
                <button onClick={()=>{deleteChartData("D")}}>D데이터 삭제</button>
            </div>
        </div>
        </Fragment>
    )
}
export default CashflowGraph;