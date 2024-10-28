import '@/components/caseStudy/caseStudy.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import newCashflowData from "@/components/caseStudy/chartData/Old.json";

const Old = ({children}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(CfSave(newCashflowData));
    });

    return (
        <Fragment>
        <div className="case-study-conten-top">
            <h4 className='title'>Case1. 노인빈곤율 OECD 1위</h4>
            <p>
                OECD의 '한눈에 보는 연금 2023' (Pension at a glance 2023) 자료를 보면 2020년 기준으로 한국의 66세 이상 노인 인구의 소득 빈곤율은 40.4%로, OECD 회원국 평균(14.2%)보다 3배 가까이 높았다.
                <span className='note'> (참고 - https://www.yna.co.kr/view/AKR20240308073800530)</span>
            </p>
        </div>
        <div className="case-study-conten-top">
            <h4 className='title'>시뮬레이션</h4>
            <p>A : 28세(초봉2900만,저축40%) → 34세(결혼, 전세3억, 차량구매) → 36세(아이 1명 출산) → 45세(집매매6억) → 55세(은퇴 후 재취업하여 65세까지 근무) → 65세(국민연금수령)</p>
        </div>
        {children}
        
        <div className="case-study-conten-bottom">
            <h4 className='title'>사견</h4>
            <p>
                <span>대한민국 평균에 가까운 회사원을 시뮬레이션하고자 하였습니다.</span>
                <br/><span>위 그래프에선 사회초년생이 무난히 저축했지만, 노후에 충분한 여유자금이 없는 상황을 보여줍니다.</span>
                <br/><span>만약 추가적인 지출 이벤트가 발생하게 된다면, 노년에 빈곤을 피하기는 어려울 것으로 예상됩니다.</span>
            </p>
        </div>
        </Fragment>
    )
}
export default Old;