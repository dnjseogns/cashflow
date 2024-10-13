import { Fragment } from 'react';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';

function GuideSurvey ({completeBtnClickCnt, commonCompleteLogic}){
    useEffectNoMount(()=>{
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return (
        <Fragment>
            <div style={{height:"400px", position:"relative"}}>
                <p className='question'>※ 누적자산 계산 방법</p>
                <span className='guideSubTitleTxt' style={{top:"10%"}}>수입/지출</span>
                <span className='guideTxt' style={{top:"20%"}}>수입<span className='guideDetailTxt'>(현재 연봉 × 연봉상승률)</span></span>
                <span className='guideTxt' style={{top:"30%"}}>지출<span className='guideDetailTxt'>(현재 지출 × 물가상승률)</span></span>
                <span className='guideTxt' style={{top:"40%"}}>이벤트<span className='guideDetailTxt'>(결혼 등...)</span></span>
                <span className='guideSubTitleTxt' style={{top:"50%"}}>자본 이득/손실</span>
                <span className='guideTxt' style={{top:"60%"}}>대출이자<span className='guideDetailTxt'>(대출금 × 대출금리)</span></span>
                <span className='guideTxt' style={{top:"70%"}}>예금수익<span className='guideDetailTxt'>(예금 × 예금금리)</span></span>
                <span className='guideTxt' style={{top:"80%"}}>투자수익<span className='guideDetailTxt'>(투자금 × 투자수익률)</span></span>
                <span className='guideTxt' style={{top:"90%"}}>실거주 주택<span className='guideDetailTxt'>(주택가 × 부동산상승률)</span></span>

                <span className='guideSubTitleTxt' style={{top:"10%",left:"300px"}}>잔액</span>
                <span className='guideTxt' style={{top:"20%",left:"300px"}}>잔액<span className='guideDetailTxt'>(수입 - 지출 - 대출이자 + 이벤트)</span></span>


                <span className='guideSubTitleTxt' style={{top:"10%",left:"620px"}}>누적 자산</span>
                <span className='guideTxt' style={{top:"20%",left:"620px"}}>대출</span>
                <span className='guideTxt' style={{top:"42.5%",left:"620px"}}>예금</span>
                <span className='guideTxt' style={{top:"67.5%",left:"620px"}}>투자</span>
                <span className='guideTxt' style={{top:"90%",left:"620px"}}>실거주 주택</span>

                <span className='ani1 arrow1 arrowOrange1' style={{top:"24%",left:"215px"}}></span>{/*수입 화살표*/}
                <span className='ani1 arrow2 arrowOrange1' style={{top:"24%",left:"215px"}}></span>{/*지출 화살표*/}
                <span className='ani1 arrow2 arrowOrange1' style={{top:"33%",left:"215px"}}></span>{/*이벤트 화살표*/}
                <span className='ani1 arrow3 arrowOrange2' style={{top:"30%",left:"215px", width:"200px", height:"140px"}}></span>{/*대출이자 화살표*/}
                <span className='ani3 arrow2 arrowGreen' style={{top:"48%",left:"204px", width:"313px", height:"108px"}}></span>{/*예금수익률 막대*/}
                <span className='ani3 arrow1 arrowGreen' style={{top:"48%",left:"515px", width:"96px"}}></span>{/*예금수익률 화살표*/}
                <span className='ani4 arrow2 arrowBlue' style={{top:"73%",left:"230px", width:"313px", height:"45px"}}></span>{/*투자수익률 막대*/}
                <span className='ani4 arrow1 arrowBlue' style={{top:"73%",left:"541px"}}></span>{/*투자수익률 화살표*/}
                <span className='ani5 arrow1 arrowYellow' style={{top:"94%",left:"265px", width:"345px"}}></span>{/*수입 화살표*/}
                <span className='ani2 arrow1 arrowOrange1' style={{top:"24%",left:"555px", width:"55px"}}></span>{/*잔액 화살표1*/}
                <span className='ani2 arrow4 arrowOrange1' style={{top:"24.5%",left:"580px", width:"32px", height:"82px"}}></span>{/*잔액 화살표2*/}
                <span className='ani2 arrow4 arrowOrange1' style={{top:"24.5%",left:"580px", width:"32px", height:"183px"}}></span>{/*잔액 화살표3*/}
                {/*잔액 화살표3*/}
            </div>
            <div>
                <p className='question'>※ 잔액은 아래와 같이 계산됩니다.</p>
                <p className='note'>- 잔액이 양수(+)일 경우, 대출 상환을 우선합니다. (대출 &gt; 예금/투자)</p>
                <p className='note'>- 잔액이 음수(-)일 경우, 예금 → 투자 → 대출 순으로 우선 차감됩니다.</p>
            </div>
            <div>
                <p className='question'>※ 참고해주세요!</p>
                <p className='note'>- 모든 소득은 세후로 고려하며, 세금계산은 하지 않습니다.</p>
                <p className='note'>- 입력해주신 데이터는 수집되지 않으며, 계산에만 활용됩니다.</p>
            </div>
        </Fragment>)
}
export default GuideSurvey;