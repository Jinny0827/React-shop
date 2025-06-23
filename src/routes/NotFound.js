/* eslint-disable*/


// 없는 페이지 접속 시 보여줄 컴포넌트
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <div className="container text-center mt-5">
            <h1>404</h1>
            <h2>페이지를 찾을 수 없습니다</h2>
            <p>요청하신 페이지가 존재하지 않습니다.</p>
            <Link to="/" className="btn btn-primary">
                홈으로 돌아가기
            </Link>
        </div>
    );
}

export default NotFound;