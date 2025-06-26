/* eslint-disable*/

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import data from './data.js';
import {useState} from "react";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import Detail from "./routes/Detail";
import NotFound from "./routes/NotFound";
import axios from "axios";
import Event, {One, Two} from "./routes/Event";


// 상품 목록에 대한 컴포넌트화
function Card({item}) {
    return (
        <div className="col-md-4" key={item.id}>
            <Link to={'/detail/' + item.id}>
                <img src={item.image} width="80%" alt={item.title}/>
                <h4>{item.title}</h4>
                <p>{item.content}</p>
            </Link>
        </div>
    );
}

// 홈페이지의 내용 컴포넌트화
function Home({bowls, setBowls}) {
    // 버튼 누른 횟수 저장 state 변수
    let [clickCount, setClickCount] = useState(0);
    // 로딩 상태 관리 state 변수
    let [loading, setLoading] = useState(false);
    

    // 호출해올 API 주소들
    let urls= [
        'https://codingapple1.github.io/shop/data2.json',
        'https://codingapple1.github.io/shop/data3.json'
    ]

    return (
        <>
            {/* 대문 사진*/}
            <div className="main-bg"></div>

            {/* 상품 목록*/}
            <div className="container">
                <div className="row">
                    {
                        bowls.map((item) => (
                            <Card key = {item.id} item = {item}/>
                        ))
                    }
                </div>
            </div>

            {/*로딩 UI*/}
            {loading && <p> 로딩중입니다... </p>}

            {/*더보기 버튼*/}
            {clickCount < urls.length ? (
                    <button onClick={() => {
                        // 로딩 시작
                        setLoading(true);

                        // 다중 url 요청 시 변수로 저장
                        axios.get(urls[clickCount])
                            .then(response => {
                                setBowls([...bowls, ...response.data]);
                                setClickCount(clickCount + 1);
                            })
                            .catch(e => {
                                console.log("에러 발생 : ", e);
                                alert('데이터를 불러오는데 실패했습니다.');
                            })
                            .finally(() => 
                                // 로딩 종료
                                setLoading(false)
                            );
                    }}>더보기</button>
                )
                :
                (<p>더 이상 상품이 없습니다.</p>)
            }
        </>
    );
}

function App() {

    let [bowls, setBowls] = useState(data);
    let navigate = useNavigate();


  return (
    <div className="App">
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand onClick={() => {navigate('/')}}>Bowling-shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={ () => { navigate('/') }}>Home</Nav.Link>
                        <Nav.Link onClick={ () => { navigate('/detail') }}>Cart</Nav.Link>
                        {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
                        {/*    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Item href="#action/3.2">*/}
                        {/*        Another action*/}
                        {/*    </NavDropdown.Item>*/}
                        {/*    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Divider />*/}
                        {/*    <NavDropdown.Item href="#action/3.4">*/}
                        {/*        Separated link*/}
                        {/*    </NavDropdown.Item>*/}
                        {/*</NavDropdown>*/}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        {/*이동된 URL에 대한 라우팅 설정*/}
        <Routes>
            {/*Route의 컴포넌트화*/}
            <Route path="/" element={<Home bowls = {bowls} setBowls = {setBowls}/>}/>
            <Route path="/detail/:id?" element={<Detail bowls={bowls}/>}/>
            <Route path="*" element={<NotFound/>}/>

            {/*Nested Route 테스트*/}
            <Route path="/event" element={<Event/>}>
                <Route path="one" element={<One/>}></Route>
                <Route path="two" element={<Two/>}></Route>
            </Route>
        </Routes>
    </div>
  );
}




export default App;
