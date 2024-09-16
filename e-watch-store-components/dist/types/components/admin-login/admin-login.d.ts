export declare class AdminLogin {
    email: string;
    password: string;
    handleEmailChange(event: Event): void;
    handlePasswordChange(event: Event): void;
    loginAdmin(event: Event): Promise<void>;
    loginClick(event: Event): void;
    render(): any;
}
