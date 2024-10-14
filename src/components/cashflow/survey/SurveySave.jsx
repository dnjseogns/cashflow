import { Fragment } from 'react';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';

function SurveySave ({completeBtnClickCnt, commonCompleteLogic}){
    useEffectNoMount(()=>{
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return (
        <Fragment>
            {/* <div>
                <p className='question'></p>
                <p className='note'>- 모든 소득은 세후로 고려하며, 세금계산은 하지 않습니다.</p>
                <p className='note'>- 입력해주신 데이터는 수집되지 않으며, 계산에만 활용됩니다.</p>
            </div> */}
        </Fragment>)
}
export default SurveySave;