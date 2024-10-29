import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './caseStudy.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { toKoreanMoneySimpleUnit } from "@/utils/util.js";
import CaseStudyBtn from "./CaseStudyBtn";

const CaseStudyGraph = () => {
    const [isGraph, setIsGraph] = useState(true);
    const [isExchanged, setIsExchanged] = useState(true);
    const [isRealEstate, setIsRealEstate] = useState(false);

    const cashflowData = useSelector((store) => store.Cashflow).data;
    // const data = isExchanged ? cashflowData?.exchangedChart : cashflowData.chart;
    let data = isExchanged ? cashflowData?.exchangedChart : cashflowData.chart;
    if(isRealEstate){
        let newData = JSON.parse(JSON.stringify(data));
        data = newData.map((item)=>{
            return {...item, totalAssetCurrent:item.noHouseTotalAssetCurrent
                , totalAssetSaveA:item.noHouseTotalAssetSaveA
                , totalAssetSaveB:item.noHouseTotalAssetSaveB
                , totalAssetSaveC:item.noHouseTotalAssetSaveC
                , totalAssetSaveD:item.noHouseTotalAssetSaveD
            }
        })
    }

    const legendA = cashflowData.chartLegent.nameA;
    const legendB = cashflowData.chartLegent.nameB;
    const legendC = cashflowData.chartLegent.nameC;
    const legendD = cashflowData.chartLegent.nameD;

    const isChartAVisible = cashflowData.timelineSaveA.length <= 0 ? false : true;
    const isChartBVisible = cashflowData.timelineSaveB.length <= 0 ? false : true;
    const isChartCVisible = cashflowData.timelineSaveC.length <= 0 ? false : true;
    const isChartDVisible = cashflowData.timelineSaveD.length <= 0 ? false : true;


    const legentPayload = [];
    if(isChartAVisible){legentPayload.push({ value: "A:"+legendA, type: 'line', id: 'v2',color:"#FFC658" });}
    if(isChartBVisible){legentPayload.push({ value: "B:"+legendB, type: 'line', id: 'v3',color:"#8DD1E1" });}
    if(isChartCVisible){legentPayload.push({ value: "C:"+legendC, type: 'line', id: 'v4',color:"#D0ED57" });}
    if(isChartDVisible){legentPayload.push({ value: "D:"+legendD, type: 'line', id: 'v5',color:"#8884d8" });}

    return (
        <Fragment>
        {/* top */}
        
        <div style={{position:"relative"}}>
            <div className='case-btn-area'>
                <CaseStudyBtn isGraph={isGraph} setIsGraph={setIsGraph} isExchanged={isExchanged} setIsExchanged={setIsExchanged} 
                                isRealEstate={isRealEstate} setIsRealEstate={setIsRealEstate}/>
            </div>

            <LineChart width={1580} height={750} 
            margin={{ top: 50, right: 10, left: 70, bottom: 5 }}
            data={data}>
            <XAxis dataKey="age" />
            {/* <YAxis label={{ value: '단위(원)', angle: 0, position: {x:80,y:-20}}} tickFormatter={toKoreanMoneySimpleUnit}/> */}
            <YAxis tickFormatter={toKoreanMoneySimpleUnit}/>
            {isChartAVisible ? <Line type="monotone" dataKey="totalAssetSaveA" stroke="#FFC658" /> : null}
            {isChartBVisible ? <Line type="monotone" dataKey="totalAssetSaveB" stroke="#8DD1E1" /> : null}
            {isChartCVisible ? <Line type="monotone" dataKey="totalAssetSaveC" stroke="#D0ED57" /> : null}
            {isChartDVisible ? <Line type="monotone" dataKey="totalAssetSaveD" stroke="#8884d8" /> : null}
            <Legend 
                payload={legentPayload}
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
        </div>
        {/* bottom */}
        </Fragment>
    )
}
export default CaseStudyGraph;