import {createSlice} from "@reduxjs/toolkit";

let cartStock = createSlice({
    name: 'cartStock',
    initialState: [
        {id : 0, name : 'Hater Pearl', count : 2},
        {id : 2, name : 'RHINO PRO IBORY', count : 1}
    ],
    reducers: {
        increasementCount : (state, action) => {
            let item = state.find(item => item.id === action.payload)
            if (item) {
                item.count += 1;
            }
        },
        decreasementCount : (state, action) => {
            let item = state.find(item => item.id === action.payload)
            if (item && item.count > 1) {
                item.count -= 1;
            }
        },
        // 장바구니 추가용
        addToCart: (state, action) => {
            // action.payload = { id, name, count }
            let { id, name, count } = action.payload;

            // 이미 장바구니에 있는 상품인지 확인 절차
            let existingItem = state.find(item => item.id === id);

            if (existingItem) {
                // 이미 있으면 수량만 증가
                existingItem.count += count;
            } else {
                // 없는 상품이라면 tr 증가
                state.push({ id, name, count });
            }
        }

    }
})

export const {
    increasementCount,
    decreasementCount,
    addToCart} = cartStock.actions;

export default cartStock;
