import { Fragment } from 'react';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';

function GuideSurvey ({completeBtnClickCnt, commonCompleteLogic}){
    useEffectNoMount(()=>{
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return (
        <Fragment>
        <div>
            <p className='note'>※ 입력해주신 자료는 수집되지 않으며, 계산에만 활용됩니다.</p>
        {/* <p>※ 모든 소득은 세후로 고려하여 세금계산은 하지 않습니다.</p> */}
        </div>
        <div>
            <p className='note'>※ 모든 소득은 세후로 고려하며, 세금계산은 하지 않습니다.</p>
        </div>
        {/* <div>
            1. 입력해주신 자료는 이번 계산에만 활용합니다. 이 사이트는 어떤 정보도 저장하지 않습니다.
        </div>
        <div>
            ※ 모든 소득은 세후로 계산됩니다.
        </div> */}
        </Fragment>)
}
export default GuideSurvey;