import { createReducer, on } from "@ngrx/store";
import { storeCheckoutData } from "./checkout.actions";
import { saveStateToLocalStorage } from "../shared/utils/localStorageUtils";
import { restoreStateFromLocalStorage } from "../app.actions";

const initialState = {
    checkoutData: {
        deliveryAddress: {
            firstName: 'john',
            lastName: 'john',
            phone: 'john',
            address1: 'john',
            address2: 'john',
            useAsBillingAddress: true,
        },
        applianceDelivery: {
            deliveryDate: '12/12/24',
            specialInstructions: 'john',
        },
        paymentMethod: {
            paymentType: 'Credit Card',
            cardNumber: 'john',
            expMonth: '12/12/24',
            expYear: '12/12/24',
            CVV: 'john',
            defaultCreditCard: true,
        }
    },
    // checkoutData: {
    //     deliveryAddress: {
    //         firstName: null,
    //         lastName: null,
    //         phone: null,
    //         address1: null,
    //         address2: null,
    //         useAsBillingAddress: null
    //     },
    //     applianceDelivery: {
    //         deliveryDate: null,
    //         specialInstructions: null
    //     },
    //     paymentMethod: {
    //         paymentType: 'Credit Card',
    //         cardNumber: null,
    //         expMonth: null,
    //         expYear: null,
    //         CVV: null,
    //         defaultCreditCard: null,
    //     }
    // },

    expirationMonths: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],

    expirationYears: [
        "2024",
        "2025",
        "2026",
        "2027",
        "2028",
        "2029",
        "2030",
        "2031",
        "2032",
        "2033",
        "2034",
    ]
}

export const CheckoutReducers = createReducer(
    initialState,

    on(storeCheckoutData, (state, action) => {
        console.log('CheckoutReducers.checkoutData', action.checkoutData)

        state = {
            ...state,    
            checkoutData: action.checkoutData
          };
        
          saveStateToLocalStorage(state);

        return {
        ...state,            
        };
    }),

    on(restoreStateFromLocalStorage, (state, action) => {        
        state.checkoutData = action.hdepot?.checkoutData || {}
    
        return {
          ...state
        }
      }),

  );