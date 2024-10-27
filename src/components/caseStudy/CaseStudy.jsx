import { Fragment, useState } from "react";
import CaseStudySide from "./CaseStudySide";
import CaseStudyGraph from "./CaseStudyGraph";
import "@/components/cashflow/Cashflow.css";
import Setting from "./content/Setting";
import Old from "./content/Old";
import Yolo from "./content/Yolo";
import Fire from "./content/Fire";
import Marry from "./content/Marry";

import Baby from "./content/Baby";
import Parent from "./content/Parent";
import Bank from "./content/Bank";
import Company from "./content/Company";
import Saving from "./content/Saving";

import House from "./content/House";
import Car from "./content/Car";

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
                    {clickedMenu == menuEnum.세팅 ? <Setting><CaseStudyGraph /></Setting> : null}
                    {clickedMenu == menuEnum.노인 ? <Old><CaseStudyGraph /></Old> : null}
                    {clickedMenu == menuEnum.욜로 ? <Yolo><CaseStudyGraph /></Yolo> : null}
                    {clickedMenu == menuEnum.파이 ? <Fire><CaseStudyGraph /></Fire> : null}
                    {clickedMenu == menuEnum.결혼 ? <Marry><CaseStudyGraph /></Marry> : null}
                    
                    {clickedMenu == menuEnum.아기 ? <Baby><CaseStudyGraph /></Baby> : null}
                    {clickedMenu == menuEnum.부모 ? <Parent><CaseStudyGraph /></Parent> : null}
                    {clickedMenu == menuEnum.예금 ? <Bank><CaseStudyGraph /></Bank> : null}
                    {clickedMenu == menuEnum.기업 ? <Company><CaseStudyGraph /></Company> : null}
                    {clickedMenu == menuEnum.십만 ? <Saving><CaseStudyGraph /></Saving> : null}
                    
                    {clickedMenu == menuEnum.집사 ? <House><CaseStudyGraph /></House> : null}
                    {clickedMenu == menuEnum.차사 ? <Car><CaseStudyGraph /></Car> : null}
                    </article>

                </div>
            </section>
        </div>
        <footer className='footer'></footer>
        </Fragment>
    )
}
export default CaseStudy;