import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import './Cashflow.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { useCashflowTableData } from './useCashflowTableData.jsx';
import Mapping from '@/components/common/Mapping.jsx';
import { toKoreanMoneySimpleUnit } from "@/utils/util.js";
import { useMenuContext } from './MenuContext.jsx';

const CashflowGraph = () => {
    const cashflowData = useSelector((store) => store.Cashflow).data;
    // const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},
    //     {name: 'Page b', uv: 300, pv: 1300, amt: 1400}
    // ];
    const data = cashflowData?.timeline?.map((row)=>{
        return {age:row.age, totalAsset:row.totalAsset}
    });
    console.log("data",data);


    return (
        <LineChart width={1580} height={750} data={data}>
            <XAxis dataKey="age" />
            <YAxis />
            <Line type="monotone" dataKey="totalAsset" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
        </LineChart>
    )
}
export default CashflowGraph;