import '@/components/caseStudy/caseStudy.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import newCashflowData from "@/components/caseStudy/chartData/Company.json";

const Company = ({children}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(CfSave(newCashflowData));
    });

    return (
        <Fragment>
        <div className="case-study-conten-top">
            <h4 className='title'>Case8. 대기업 vs 중소기업</h4>
            <p>내 몸값을 올리는 것도 훌륭한 재태크라고 하죠. 월급 100만원 더 받으면, 미래가 달라질까요?</p>
        </div>
        <div className="case-study-conten-top">
            <h4 className='title'>시뮬레이션</h4>
        </div>
        {children}
        
        <div className="case-study-conten-bottom">
            <h4 className='title'>시나리오</h4>
            <p>
                A : 28~55세(초봉2900만, 저축 월90만원 이상) → 34세(집매매3억, 아반떼구매) → 56~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)
                <br/>B : 28~50세(초봉4500만, 저축 월190만원 이상) → 34세(집매매3억, 아반떼구매) → 51~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)
            </p>
            <h4 className='title'>사견</h4>
            <p>
                A vs B : 중소기업 정년 55세, 대기업 정년을 50세로 대기업의 정년을 5년 짧게 잡았음에도 저축액이 2배정도 차이가 납니다.
                <br/>표면적으로 보았을 때 A와 B의 연봉차이는 1.5배이지만, 자산누적의 관점에서는 2배 정도의 차이가 나는 것을 볼 수 있습니다.
            </p>
        </div>
        </Fragment>
    )
}
export default Company;