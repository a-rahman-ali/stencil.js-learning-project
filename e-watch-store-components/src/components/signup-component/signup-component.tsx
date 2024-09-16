import { Component, State, h } from "@stencil/core";
import { users_endpoint } from "../../interfaces/endpoints";

@Component({
    tag: 'signup-component',
    styleUrl: 'signup-component.css',
    shadow: true
})
export class SignupComponent {

    @State() username: string = '';
    @State() email: string = '';
    @State() password: string = '';
    @State() userExists: boolean = false;
    @State() cart: any[] = [];

    handleUsernameChange(event: Event) {
        const target = event.target as HTMLInputElement;
        this.username = target.value;
    }

    handleEmailChange(event: Event) {
        const target = event.target as HTMLInputElement;
        this.email = target.value;
    }

    handlePasswordChange(event: Event) {
        const target = event.target as HTMLInputElement;
        this.password = target.value;
    }

    loginClick(event: Event) {
        event.preventDefault();
        console.log('loginClicked');
        location.href = '/login';
    }

    async signup(event: Event) {
        event.preventDefault();
        try {
            const response = await fetch(`${users_endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const users = await response.json();
            console.log('Fetched users:', users);

            const userExists = users.some((u: { email: string }) => u.email === this.email);

            if (userExists) {
                console.log('User already exists');
                this.userExists = true;
                setTimeout(() => {
                    this.userExists = false;
                }, 3000)
            } else {
                const newUserId = users.length > 0 ? (users[users.length - 1].id) + 1 : 1;
                const newUser = {
                    id: newUserId,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    cart: this.cart
                };

                const postResponse = await fetch(`${users_endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                });

                if (!postResponse.ok) {
                    throw new Error(`HTTP error! status: ${postResponse.status}`);
                }
                alert("Registered successfully");
                console.log('User successfully created');
                location.href = '/login';
            }
        } catch (error) {
            console.error('An error occurred during signup:', error);
        }
    }

    render() {
        let signupDiv = '';
        signupDiv = (
            <div class="login-form">
                <header-component></header-component>
                <h4 class={`userexists ${this.userExists ? 'userexists-true' : 'userexists'}`} id="existsmessage">User Already Exists</h4>
                <div class="form-container">
                    <form class="signup-container" onSubmit={this.signup.bind(this)}>
                        <h3 class="login-title">User Signup</h3>
                        <dl>
                            <dt class="dt">User Name</dt>
                            <input type="text" required class="inputfield" id="username" value={this.username} onInput={this.handleUsernameChange.bind(this)} />
                            <span id="usernamemsg"></span>
                            <dt class="dt">Email</dt>
                            <input type="email" required class="inputfield" id="email" value={this.email} onInput={this.handleEmailChange.bind(this)} />
                            <span id="emailmsg"></span>
                            <dt class="dt">Password</dt>
                            <input type="password" required class="inputfield" id="password" value={this.password} onInput={this.handlePasswordChange.bind(this)} />
                            <span id="pwdmsg"></span>
                        </dl>
                        <button class="login-btn" type="submit">Sign up</button>
                        <p>Already have an account? &nbsp; <a href='' onClick={this.loginClick.bind(this)}>Login</a></p>
                    </form>
                </div>
            </div>

        );
        return signupDiv;
    }
}