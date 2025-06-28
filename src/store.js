/* eslint-disable*/

import {configureStore} from "@reduxjs/toolkit";
import cartStock from './store/cartSlice.js';

// 기본 생성자
export default configureStore ({
    reducer: {
        cartStock: cartStock.reducer
    }
})