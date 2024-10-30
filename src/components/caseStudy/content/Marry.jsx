import '@/components/caseStudy/caseStudy.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import newCashflowData from "@/components/caseStudy/chartData/Marry.json";

const Marry = ({children}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(CfSave(newCashflowData));
    });

    return (
        <Fragment>
        <div className="case-study-conten-top">
            <h4 className='title'>Case4. 결혼을 하면?</h4>
            <p>
                결혼을 하면 돈모으기 좋다고 하던데, 정말일까?
                <br/>노후 적정 생활비는 부부기준 268만원(1인134만원), 개인기준 165만원으로 개인기준 31만원 더 많습니다.
                <span className='note'> (참고 - https://www.nhis.or.kr/static/alim/paper/oldpaper/202306/sub/section3_3.html)</span>
            </p>
        </div>
        <div className="case-study-conten-top">
            <h4 className='title'>시뮬레이션</h4>
        </div>
        {children}
        
        <div className="case-study-conten-bottom">
            <h4 className='title'>시나리오</h4>
            <p>
                A : 28~55세(초봉2900만, 저축 월90만원 이상) → 34세(매매3억, 아반떼구매) → 56~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)
                <br/>B : 28~55세(초봉2900만, 저축 월90만원 이상) → 34세(결혼 맞벌이, 전세3억, 아반떼구매, 부모님지원X) → 40세(집매매6억) → 56~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)
                <br/>C : 28~55세(초봉2900만, 저축 월90만원 이상) → 34세(결혼 맞벌이, 매매6억, 아반떼구매, 부모님지원3억) → 56~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)
            </p>

            <h4 className='title'>사견</h4>
            <p>
                결혼을 하여 주거비 및 차량유지비를 반으로 아끼게 되면 어느정도의 차이가 있는지 시뮬레이션하고자 하였습니다.
                <br/>A vs B : A는 100세까지 집 한 채 남겨두고 유동자산을 모두 사용하였고, B의 1/2자산은 100세에 유동자산 2억정도로 A에 비해 상대적으로 여유있어보입니다.
                <br/>B vs C : 부모님께 3억원을 지원받아 주택 매매하여 결혼생활을 시작하였지만, 투자수익률이 4%로 가정할 때 그 복리효과가 크지는 않아보입니다.
            </p>
        </div>
        </Fragment>
    )
}
export default Marry;