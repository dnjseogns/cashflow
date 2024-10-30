import '@/components/caseStudy/caseStudy.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import newCashflowData from "@/components/caseStudy/chartData/Bank.json";

const Bank = ({children}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(CfSave(newCashflowData));
    });

    return (
        <Fragment>
        <div className="case-study-conten-top">
            <h4 className='title'>Case7. 수익률 1%의 차이</h4>
            <p>예금(3%), 배당(5%) 둘의 수익률은 크지 않아 보입니다. 복리로 굴릴 때 미래에 어느정도 영향을 미칠까요?</p>
        </div>
        <div className="case-study-conten-top">
            <h4 className='title'>시뮬레이션</h4>
        </div>
        {children}
        
        <div className="case-study-conten-bottom">
            <h4 className='title'>시나리오</h4>
            <p>
                A : 28~55세(초봉2900만, 저축 월90만원 이상, 전체 유동자산 수익률 3.0%) → 34세(매매3억, 아반떼구매) → 56~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)
                <br/>B : 28~55세(초봉2900만, 저축 월90만원 이상, 전체 유동자산 수익률 4.0%) → 34세(매매3억, 아반떼구매) → 56~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)
                <br/>C : 28~55세(초봉2900만, 저축 월90만원 이상, 전체 유동자산 수익률 5.0%) → 34세(매매3억, 아반떼구매) → 56~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)
            </p>
        
            <h4 className='title'>사견</h4>
            <p>
                A vs B vs C : 55세 이전에는 부동산 대출금을 갚느라 비슷한 모습을 보이다가, 55세 은퇴자금을 받은 이후 이 돈을 어떻게 굴리느냐에 따라 노후가 확연히 달라지는 모습을 보여줍니다. 
                <br/>확정적인 투자수익률 1% 상승은 굉장한 힘이 있다는 것을 보여줍니다. 투자공부를 하다보면 연 8% 이상의 마법과 같은 전략이 소개되어 있곤 합니다.
                <br/>그러한 전략들을 소액으로 실천해보고 검증해보며 나만의 전략으로 만들어서, 은퇴 후 행복한 노후를 맞이하셨으면 좋겠습니다.
            </p>
        </div>
        </Fragment>
    )
}
export default Bank;