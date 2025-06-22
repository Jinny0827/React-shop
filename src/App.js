/* eslint-disable*/

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import data from './data.js';
import {useState} from "react";
import {Routes, Route, Link, useParams} from "react-router-dom";



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
function Home({bowls}) {
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
        </>
    );
}

// 상세페이지 컴포넌트화 - URL 파라미터와 데이터 사용
function Detail({bowls}) {
    let {id} = useParams();
    let findItem = bowls.find(item => item.id == id);

    console.log(id);

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
            <div className="row">
                <div className="col-md-6">
                    <img src={findItem.image} width="100%" alt={findItem.title} />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{findItem.title}</h4>
                    <p>{findItem.content}</p>
                    <p>{findItem.price}원</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    );
}


function App() {

    let [bowls] = useState(data);

  return (
    <div className="App">
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Bowling-shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/detail">Cart</Nav.Link>
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
            <Route path="/" element={<Home bowls={bowls}/>}>
            </Route>
            <Route path="/detail/:id?" element={<Detail bowls={bowls}/>}/>
        </Routes>
    </div>
  );
}


export default App;
