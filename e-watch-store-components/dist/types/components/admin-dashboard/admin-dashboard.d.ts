import { IProduct } from '../../interfaces/IProduct';
export declare class AdminDashboard {
    products: IProduct[];
    newProduct: IProduct;
    editIndex: number | null;
    showCard: boolean;
    apiUrl: string;
    componentWillLoad(): void;
    fetchProducts(): Promise<void>;
    getNextProductId(): string;
    handleInputChange: (field: string, event: Event) => void;
    addProduct(): Promise<void>;
    updateProduct(): Promise<void>;
    deleteProduct(index: number): Promise<void>;
    editProduct(index: number): void;
    toggleCard: (show: boolean) => void;
    handleFormSubmit: () => void;
    resetForm(): void;
    render(): any;
}
