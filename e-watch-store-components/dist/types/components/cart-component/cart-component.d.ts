import { EventEmitter } from '../../stencil-public-runtime';
import { IProduct } from '../../interfaces/IProduct';
export declare class CartComponent {
    cartItems: IProduct[];
    isLoading: boolean;
    cartItemCountUpdated: EventEmitter<number>;
    componentWillLoad(): void;
    isUserLoggedIn(): boolean;
    removeFromCart(itemId: string): void;
    updateCartItemCount(): void;
    loadUserCart(): void;
    loadLocalStorageCart(): void;
    loadProductDetails(): void;
    calculateCartTotal(): number;
    handleCheckout(): void;
    render(): any;
}
