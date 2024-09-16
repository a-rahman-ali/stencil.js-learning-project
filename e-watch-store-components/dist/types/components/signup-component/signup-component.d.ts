export declare class SignupComponent {
    username: string;
    email: string;
    password: string;
    userExists: boolean;
    cart: any[];
    handleUsernameChange(event: Event): void;
    handleEmailChange(event: Event): void;
    handlePasswordChange(event: Event): void;
    loginClick(event: Event): void;
    signup(event: Event): Promise<void>;
    render(): string;
}
