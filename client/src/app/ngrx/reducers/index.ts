import { ActionReducerMap } from "@ngrx/store";
import { HomeReducers } from "../../home/home.reducers";
import { ProductReducers } from "../../product/product.reducers";
import { CartReducers } from "../../cart/cart.reducers";
import { CheckoutReducers } from "../../checkout/checkout.reducers";
import { UserReducers } from "../../user/user.reducers";

export interface State {};

export const reducers: ActionReducerMap <State> = {
    homeReducers:HomeReducers,
    productReducers:ProductReducers,
    cartReducers:CartReducers,
    checkoutReducers:CheckoutReducers,
    userReducers:UserReducers
    
}