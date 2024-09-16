import { EventEmitter } from '../../stencil-public-runtime';
import { ISmartwatch } from '../../interfaces/ISmartWatch';
export declare class HomeComponent {
    smartwatches: ISmartwatch[];
    filteredProducts: ISmartwatch[];
    cartItemCountUpdated: EventEmitter<number>;
    componentWillLoad(): void;
    fetchProducts(): Promise<void>;
    addToCart(watch: ISmartwatch): Promise<void>;
    isUserLoggedIn(): boolean;
    addToUserCart(watch: ISmartwatch): Promise<void>;
    addToLocalStorageCart(watch: ISmartwatch): void;
    reduceProductCount(productId: string): void;
    updateSmartwatchesState(): void;
    calculateCartItemCount(): Promise<number>;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    handleSearchEvent: (event: CustomEvent<string>) => void;
    render(): any;
}
