import { Fragment } from "react";
import CaseStudySide from "./CaseStudySide";

const CaseStudy = () => {
    return (
        <Fragment>
        <header className='header'></header>
        <div className='cf-wrap'>
            <aside className='cf-left'>
                <CaseStudySide />
            </aside>
            {/* 
            <section className='cf-right'>
                <div className='cf-header'></div>
                <div className='cf-content'>
                    <CashflowSurvey />
                    
                    <article className='data-area'>
                        {isGraph === false
                        ? <CashflowTable isExchanged={isExchanged}/>
                        : <CashflowGraph isExchanged={isExchanged}/>}
                    </article>
    
                    <div className='cf-btn-area'>
                        <CashflowBtn isGraph={isGraph} setIsGraph={setIsGraph} isExchanged={isExchanged} setIsExchanged={setIsExchanged}/>
                    </div>
                </div>
            </section> */}
        </div>
        <footer className='footer'></footer>
        </Fragment>
    )
}
export default CaseStudy;