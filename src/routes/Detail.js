/* eslint-disable*/

// 상세페이지 컴포넌트화 - URL 파라미터와 데이터 사용
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Nav} from "react-bootstrap";

// 숙제용 컴포넌트
function SecondTimeOut() {
    return (
        <div className="alert alert-warning">
            2초이내 구매시 할인
        </div>
    );
}

// 상세 탭에 관한 컴포넌트
function CommonTabs({tabs, activeTab, onTabChange}) {

    let [isAnimating, setIsAnimating] = useState(false);

    // activeTab props 에 따라
    // isAnimating 변수의 boolean 값 조절을 통해 className end를 붙였다 뗏다 처리
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(true);
        }, 50);

        return () => {
            setIsAnimating(false);
            clearTimeout(timer);
        }
    }, [activeTab]);

    return (
        <>
            <Nav defaultActiveKey={`link${activeTab}`} variant="tabs">
                {tabs.map((tab,index) => (
                    <Nav.Item key={index}>
                        <Nav.Link
                            eventKey={`link${index}`}
                            onClick={() => { onTabChange(index) }}>
                            {tab.label}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>

            {/*<div className="tab-content mt-3 start ">*/}
            <div className={`tab-content mt-3 start ${isAnimating ? 'end' : ''}`}>
                {
                    tabs[activeTab]?.content
                }
            </div>
        </>
    );
}


function Detail({bowls}) {
    // 파라미터 값 state
    let {id} = useParams();
    let findItem = bowls.find(item => item.id == id);

    // 할인 표시 state
    let [showDisCount, setShowDiscount] = useState(true);

    // input 칸 state와 유효성 체크용 state
    let [inputValue, setInputValue] = useState('');
    let [showWarning, setShowWarning] = useState(false);

    // 내용 탭을 위한 state -> 3가지 종류의 상태를 위해 0으로 미리 지정
    let [tab, setTab] = useState(0);
    const tabs = [
        { label: "상품정보", content: <div>상품 상세 정보입니다.</div> },
        { label: "리뷰", content: <div>리뷰 내용입니다.</div> },
        { label: "Q&A", content: <div>Q&A 내용입니다.</div> }
    ];

    
    //할인 알람 useEffect
    useEffect(() => {
        // 2초 후 할인 알림 숨기기
        let timer = setTimeout( () => {
            setShowDiscount(false);
        }, 2000)

        return () => {
            clearTimeout(timer);
        }
    }, []);
    
    // input 칸에 숫자가 아닌 단어를 적었을때 안내문 표출
    useEffect(() => {
        // 숫자가 아닌 문자가 들어온 경우
        const isNotNumber = /[^0-9]/.test(inputValue);

        if (isNotNumber) {
            // 숫자가 아닌 경우 경고문 표시
            setShowWarning(true);
        } else {
            setShowWarning(false);
        }
    }, [inputValue]);
    

    if(!findItem && !id) {
        return (
            <div className="container">
                <div className="alert alert-danger">
                    상품을 찾을 수 없습니다.
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            {/*조건부 렌더링*/}
            { showDisCount ? <SecondTimeOut/> : null }

            <div className="row">
                <div className="col-md-6">
                    <img src={findItem.image} width="100%" alt={findItem.title} />
                </div>
                <div className="col-md-6">
                    {/*숫자 입력용 필드*/}
                    <div className="mb-3">
                        <label htmlFor="quantityInput" className="form-label">수량 입력 : </label>
                        <input type="text" id="quantityInput"
                               value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                               placeholder="숫자만 입력하세요" />
                    </div>

                    {/*숫자 입력 안하면 보여줄 안내 문구*/}
                    {
                        showWarning && (
                            <div className="alert alert-danger">
                                ⚠️ 숫자만 입력해주세요!
                            </div>
                        )
                    }

                    <h4 className="pt-5">{findItem.title}</h4>
                    <p>{findItem.content}</p>
                    <p>{findItem.price}원</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>

            <CommonTabs tabs={tabs} activeTab={tab} onTabChange={setTab} />

        </div>

    );
}

export default Detail;