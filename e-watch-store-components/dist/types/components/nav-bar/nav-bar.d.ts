export declare class NavBar {
    isLoggedIn: boolean;
    userName: string;
    isAdmin: boolean;
    cartItemCount: number;
    componentWillLoad(): void;
    cartItemCountUpdatedHandler(event: CustomEvent<number>): void;
    fetchUserName(): Promise<void>;
    updateCartItemCount(): Promise<void>;
    logoutClick(event: Event): void;
    homeClick(event: Event): void;
    cartClick(event: Event): void;
    adminPanel(event: Event): void;
    render(): any;
}
