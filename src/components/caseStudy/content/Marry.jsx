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
            <p>결혼을 하면 돈모으기 좋다고 하던데, 정말일까?</p>
        </div>
        <div className="case-study-conten-top">
            <h4 className='title'>시뮬레이션</h4>
            <p>
                A : 28세(초봉2900만,저축40%) → 34세(전세3억, 차량구매) → 45세(집매매6억) → 55세(은퇴 후 재취업하여 65세까지 근무) → 65세(국민연금수령)
                <br/>B : 28세(초봉2900만,저축40%) → 34세(결혼, 전세3억, 차량구매, 부모님지원X) → 45세(집매매6억) → 55세(은퇴 후 재취업하여 65세까지 근무) → 65세(국민연금수령)
                <br/>C : 28세(초봉2900만,저축40%) → 34세(결혼, 집매매6억, 차량구매, 부모님지원 2억) → 55세(은퇴 후 재취업하여 65세까지 근무) → 65세(국민연금수령)
            </p>
        </div>
        {children}
        
        <div className="case-study-conten-bottom">
            <h4 className='title'>사견</h4>
            <p>
                결혼을 하여 주거비를 아끼게 되면 어느정도의 차이가 있는지 시뮬레이션하고자 하였습니다.
                <br/>결혼의 경우 소득과 지출이 비슷한 남녀가 만나 맞벌이로 일하고 딩크족으로 아이를 안낳는 상황으로 가정하였습니다.
                <br/>A vs B : A자산과 B의 1/2자산를 비교하였을 때, B자산이 약간 많은 정도이며 큰 격차가 벌어질 정도는 아닌 것 같습니다.
                <br/>B vs C : 부모님께 2억원을 지원받아 주택 매매하여 결혼생활을 시작하였지만, 그 복리효과가 크지는 않아보입니다.
            </p>
        </div>
        </Fragment>
    )
}
export default Marry;