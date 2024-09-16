export declare class LoginComponent {
    email: string;
    password: string;
    handleEmailChange(event: Event): void;
    handlePasswordChange(event: Event): void;
    signupClick(event: Event): void;
    adminClick(event: Event): void;
    login(event: Event): Promise<void>;
    render(): string;
}
