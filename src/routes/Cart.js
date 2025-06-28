/* eslint-disable*/

import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {decreasementCount, increasementCount} from "../store/cartSlice";

function Cart() {
    let cartStock = useSelector((state) =>  state.cartStock);
    let dispatch = useDispatch();


    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
                </thead>
                <tbody>
                {
                    cartStock.map((item,index) => {
                        return <tr key={item.id}>
                            <td>{index + 1 }</td>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                            <td>
                                <button className="btn btn-primary"
                                onClick={ () => {
                                    dispatch(increasementCount(item.id));
                                }}>
                                    증가
                                </button>
                                &nbsp;
                                <button className="btn btn-danger"
                                        onClick={ () => {
                                            dispatch(decreasementCount(item.id));
                                        }}>
                                    감소
                                </button>
                            </td>
                        </tr>
                    })
                }
                </tbody>
            </Table>
        </div>
    );
}

export default Cart;