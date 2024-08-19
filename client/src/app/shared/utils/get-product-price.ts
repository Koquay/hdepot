import { CanDeactivateFn } from "@angular/router";
import { Observable } from "rxjs";

export const getItemPrice = (item, ingredients) => {
    let price = 0;

// console.log('item.size', item.size);

    switch(item.size) {
      case 'Small':
        price = item.prices.small;
      break

      case 'Medium':
        price = item.prices.medium;
      break;

      case 'Large':
        price = item.prices.large;
      break

      case 'X-Large':
        price = item.prices.xLarge;
      break
    }

    const itemTotal = price * item.quantity;

    return itemTotal  + getIngredientsPrice(ingredients);
  }

  const getIngredientsPrice = (ingredients) => {
      let ingredientsPrice = 0;

      for(let ingredient of ingredients) {     
        ingredientsPrice += ingredient.price * ingredient.quantity;
      }

      return ingredientsPrice;
  }

//   export const hasUnsavedChangesGuard: CanDeactivateFn<T> = (component:T): Observable<boolean> => {
//     if (component.canDeactivate && component.canDeactivate()) {
//        return true;
//      }
//     if (!component.confirm()) {
//        return confirm('Are you sure you want to leave this page? If you do, any unsaved changes will be lost.');
//      }
//  }

//  export function authenticationGuard(): CanActivateFn {
//   return () => {
//     const oauthService: AuthService = inject(AuthService);
    
//     if (oauthService.hasAccess() ) {
//       return true;
//     }
//     oauthService.login();
//     return false;
//   };
// }


 