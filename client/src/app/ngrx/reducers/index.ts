import { ActionReducerMap } from "@ngrx/store";
import { HomeReducers } from "../../home/home.reducers";
import { ProductReducers } from "../../product/product.reducers";

export interface State {};

export const reducers: ActionReducerMap <State> = {
    homeReducers:HomeReducers,
    productReducers:ProductReducers,
}