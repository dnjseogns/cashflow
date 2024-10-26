import { Fragment, useState } from "react";
import CaseStudySide from "./CaseStudySide";
import CaseStudyGraph from "./CaseStudyGraph";
import "@/components/cashflow/Cashflow.css";

const CaseStudy = () => {
    const menuEnum = {
        "세팅":0,
        "노인":1,
        "욜로":2,
        "파이":3,
        "결혼":4,
        "아기":5,
        "부모":6,
        "예금":7,
        "기업":8,
        "십만":9,
        "집사":10,
        "차사":11,
    };
    const [clickedMenu, setClickedMenu] = useState(0);

    return (
        <Fragment>
        <header className='header'></header>
        <div className='cf-wrap'>
            <aside className='cf-left'>
                <CaseStudySide menuEnum={menuEnum} clickedMenu={clickedMenu} setClickedMenu={setClickedMenu}/>
            </aside>
            
            <section className='cf-right'>
                <div className='cf-header'></div>
                <div className='cf-content'>
                    <article className='data-area'>
                        <CaseStudyGraph />
                    </article>
                </div>
            </section>
        </div>
        <footer className='footer'></footer>
        </Fragment>
    )
}
export default CaseStudy;