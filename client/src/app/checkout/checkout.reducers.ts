import { createReducer, on } from "@ngrx/store";
import { storeCheckoutData } from "./checkout.actions";

const initialState = {
    checkoutData: {
        deliveryAddress: {
            firstName: 'john',
            lastName: 'john',
            phone: 'john',
            address1: 'john',
            address2: 'john',
            useAsBillingAddress: null
        },
        applianceDelivery: {
            deliveryDate: null,
            specialInstructions: 'john '
        },
        paymentMethod: {
            paymentType: 'Credit Card',
            cardNumber: 'john',
            expMonth: null,
            expYear: null,
            CVV: 'john',
            defaultCreditCard: null,
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
        
        return {
        ...state,    
        checkoutData: action.checkoutData
        };
    }),

  
  );