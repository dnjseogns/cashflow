import { Fragment } from "react"

const CaseStudySide = ({menuEnum, clickedMenu, setClickedMenu}) => {

    return (
    <Fragment>
        <div className='left-title'>
            <span>Case Study</span>
            
            <ul className={'guide '+ (clickedMenu == menuEnum["세팅"]?"on":null)} onClick={()=>{setClickedMenu(menuEnum["세팅"])}}>세팅값(참고) {clickedMenu == menuEnum["세팅"]?<span>〉</span>:null} </ul>
            
            <ul className={'base '}>사회 이슈
                <li className={clickedMenu == menuEnum["노인"]?"on":null} onClick={()=>{setClickedMenu(menuEnum["노인"])}}><span>1. 노인빈곤율 OECD 1위</span> {clickedMenu == menuEnum["노인"]?<span>〉</span>:null} </li>
                <li className={clickedMenu == menuEnum["욜로"]?"on":null} onClick={()=>{setClickedMenu(menuEnum["욜로"])}}><span>2. YOLO로 살면?</span> {clickedMenu == menuEnum["욜로"]?<span>〉</span>:null} </li>
                {/*  비트코인, 부동산 극단적 */}
                <li className={clickedMenu == menuEnum["파이"]?"on":null} onClick={()=>{setClickedMenu(menuEnum["파이"])}}><span>3. 파이어족이 되려면?</span> {clickedMenu == menuEnum["파이"]?<span>〉</span>:null} </li>
                <li className={clickedMenu == menuEnum["결혼"]?"on":null} onClick={()=>{setClickedMenu(menuEnum["결혼"])}}><span>4. 결혼을 하면?</span> {clickedMenu == menuEnum["결혼"]?<span>〉</span>:null} </li>
                <li className={clickedMenu == menuEnum["아기"]?"on":null} onClick={()=>{setClickedMenu(menuEnum["아기"])}}><span>5. 아기를 낳으면?</span> {clickedMenu == menuEnum["아기"]?<span>〉</span>:null} </li>
                <li className={clickedMenu == menuEnum["부모"]?"on":null} onClick={()=>{setClickedMenu(menuEnum["부모"])}}><span>6. 부모님 부양하면?</span> {clickedMenu == menuEnum["부모"]?<span>〉</span>:null} </li>
            </ul>

            <ul className={'base '} onClick={()=>{}}>투자에 관하여
                <li className={clickedMenu == menuEnum["예금"]?"on":null} onClick={()=>{setClickedMenu(menuEnum["예금"])}}><span>7. 예금만 하면?</span> {clickedMenu == menuEnum["예금"]?<span>〉</span>:null} </li>
            </ul>

            <ul className={'base '} onClick={()=>{}}>수입에 관하여
                <li className={clickedMenu == menuEnum["기업"]?"on":null} onClick={()=>{setClickedMenu(menuEnum["기업"])}}><span>8. 대기업 vs 중소기업</span> {clickedMenu == menuEnum["기업"]?<span>〉</span>:null} </li>
            </ul>

            <ul className={'base '} onClick={()=>{}}>지출에 관하여
                <li className={clickedMenu == menuEnum["십만"]?"on":null} onClick={()=>{setClickedMenu(menuEnum["십만"])}}><span>9. 10만원 더 아끼면?</span> {clickedMenu == menuEnum["십만"]?<span>〉</span>:null} </li>
                <li className={clickedMenu == menuEnum["집사"]?"on":null} onClick={()=>{setClickedMenu(menuEnum["집사"])}}><span>10. 집 사면?</span> {clickedMenu == menuEnum["집사"]?<span>〉</span>:null} </li>
                <li className={clickedMenu == menuEnum["차사"]?"on":null} onClick={()=>{setClickedMenu(menuEnum["차사"])}}><span>11. 차 사면?</span> {clickedMenu == menuEnum["차사"]?<span>〉</span>:null} </li>
            </ul>
            

            


        </div>
    </Fragment>
    )
}
export default CaseStudySide;
