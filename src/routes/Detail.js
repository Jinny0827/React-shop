/* eslint-disable*/

// 상세페이지 컴포넌트화 - URL 파라미터와 데이터 사용
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {clear} from "@testing-library/user-event/dist/clear";

// 숙제용 컴포넌트
function SecondTimeOut() {
    return (
        <div className="alert alert-warning">
            2초이내 구매시 할인
        </div>
    );
}

function Detail({bowls}) {
    let {id} = useParams();
    let findItem = bowls.find(item => item.id == id);

    let [showDisCount, setShowDiscount] = useState(true);
    let [inputValue, setInputValue] = useState('');
    let [showWarning, setShowWarning] = useState(false);

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
        </div>
    );
}

export default Detail;