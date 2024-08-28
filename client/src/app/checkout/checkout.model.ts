export class CheckoutModel {
    deliveryAddress: {
        firstName: '',
        lastName: '',
        phone: '',
        address1: '',
        address2: '',
        useAsBillingAddress: null,
    };

    applianceDelivery: {
        deliveryDate: null,
        specialInstructions: '',
    };

    paymentMethod: {
        paymentType: 'Credit Card',
        cardNumber: '',
        expMonth: null,
        expYear: null,
        CVV: '',
        defaultCreditCard: null,
    };

    items: any
}