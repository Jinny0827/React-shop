/* eslint-disable*/

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import data from './data.js';
import {useState} from "react";
import {Link, Route, Routes, useNavigate, Outlet} from "react-router-dom";
import Detail from "./routes/Detail";
import NotFound from "./routes/NotFound";
import axios from "axios";


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
    // 더보기 클릭 여부에 대한 state 변수
    let [clicked, setClicked] = useState(false);

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
            <button onClick={() => {
                axios.get('https://codingapple1.github.io/shop/data2.json')
                    .then((response) => {
                        setBowls([...bowls, ...response.data]);
                        setClicked(true);
                    })
                    .catch((e) => {
                        console.error("데이터 로딩 실패 : ", e);
                        alert('데이터를 불러오는데 실패했습니다.')
                    })
                    .finally(() => {
                        setClicked(false);
                    })
            }}>더보기</button>
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
            <Route path="/" element={<Home bowls={bowls} setBowls = {setBowls}/>}/>
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

function Event() {
    return (
        <div>
            <h4>오늘의 이벤트</h4>
            <Outlet></Outlet>
        </div>
    );
}

function One() {
    return (
        <div>
            <p>볼링공 1+1 이벤트</p>
        </div>
    );
}


function Two() {
    return (
        <div>
            <p>볼링화 1+1 이벤트</p>
        </div>
    );
}


export default App;
