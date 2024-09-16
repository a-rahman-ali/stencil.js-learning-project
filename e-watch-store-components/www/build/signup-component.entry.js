import { r as registerInstance, h } from './index-48480441.js';
import { u as users_endpoint } from './endpoints-9013fb32.js';

const signupComponentCss = ":host{display:block}.heading{font-size:30px;font-weight:600;margin-bottom:20px;margin-top:2px;margin-left:10px;margin-right:10px;color:white;text-align:center;background-color:#000000;padding:10px 10px;border-radius:10px}.form-container{display:flex;justify-content:center;align-items:center;margin-top:15%}.login-container,.signup-container{border:2px solid #000000;padding:13px 13px;width:400px;border-radius:2%}button :disabled{background-color:grey;color:black;cursor:not-allowed}.login-btn{border:none;background-color:black;color:white;padding:10px 20px;text-align:center;font-weight:bold;border-radius:5px;width:50%;margin-left:30%}.login-btn:hover{background-color:rgb(80, 80, 80);color:white}.inputfield{width:100%;margin-top:10px;margin-bottom:15px;height:30px}.dt{font-weight:bolder;align-items:center}dd{margin-top:10px}.userexists{color:red;font-weight:bolder;font-size:20px;margin-top:10px;margin-bottom:10px;justify-content:center;display:none}.userexists-true{display:flex}.login-title{font-size:30px;font-weight:600;margin-bottom:20px;margin-top:2px;margin-left:10px;margin-right:10px;text-align:center;padding:10px 10px;border-radius:10px}form p{margin-top:10px;margin-bottom:10px;display:flex;justify-content:center}";

const SignupComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.username = '';
        this.email = '';
        this.password = '';
        this.userExists = false;
        this.cart = [];
    }
    handleUsernameChange(event) {
        const target = event.target;
        this.username = target.value;
    }
    handleEmailChange(event) {
        const target = event.target;
        this.email = target.value;
    }
    handlePasswordChange(event) {
        const target = event.target;
        this.password = target.value;
    }
    loginClick(event) {
        event.preventDefault();
        console.log('loginClicked');
        location.href = '/login';
    }
    async signup(event) {
        event.preventDefault();
        try {
            const response = await fetch(`${users_endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const users = await response.json();
            console.log('Fetched users:', users);
            const userExists = users.some((u) => u.email === this.email);
            if (userExists) {
                console.log('User already exists');
                this.userExists = true;
                setTimeout(() => {
                    this.userExists = false;
                }, 3000);
            }
            else {
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
        }
        catch (error) {
            console.error('An error occurred during signup:', error);
        }
    }
    render() {
        let signupDiv = '';
        signupDiv = (h("div", { key: 'a3c27f95c8167f6e739fc63f0d1c3540a5655cd6', class: "login-form" }, h("header-component", { key: '08daf26c3df93c8fbad6f06789f8adf5ff7731f2' }), h("h4", { key: '16aaaf0d0ff3039d3403e8d0f2fea0407b95fd36', class: `userexists ${this.userExists ? 'userexists-true' : 'userexists'}`, id: "existsmessage" }, "User Already Exists"), h("div", { key: '918d0a110d9f305b6612c3a78eb0630cf5f7a7cf', class: "form-container" }, h("form", { key: '23f66d5f728d32fb5aa5cf25f9859edf904368cf', class: "signup-container", onSubmit: this.signup.bind(this) }, h("h3", { key: '765eb1274b6fe6658eaaca2138e7cb955e74b295', class: "login-title" }, "User Signup"), h("dl", { key: '369af3f991077516360c76ecc60d9a831b307cb0' }, h("dt", { key: '946e9ce0abc4f60e31af0cfa0800fce0f4cabce6', class: "dt" }, "User Name"), h("input", { key: 'da3ce2af62bf1404b7c6fab0b8bd5b045c944c29', type: "text", required: true, class: "inputfield", id: "username", value: this.username, onInput: this.handleUsernameChange.bind(this) }), h("span", { key: 'cc57c72255e076d26de52187f53f435535ee14de', id: "usernamemsg" }), h("dt", { key: '19a73c9e39c2adcf813e03acf85637f3481305cd', class: "dt" }, "Email"), h("input", { key: 'ff5324c29937b561935b78b7a4ae2cf6ecd80b63', type: "email", required: true, class: "inputfield", id: "email", value: this.email, onInput: this.handleEmailChange.bind(this) }), h("span", { key: 'c653b18db951e23d636f144f3f7e7ba10cfb17ca', id: "emailmsg" }), h("dt", { key: '31aa89093689ed7da36857d3295a50a0007a3619', class: "dt" }, "Password"), h("input", { key: 'b06693b2940b41a909a394d3c0de6b6299d6ec2b', type: "password", required: true, class: "inputfield", id: "password", value: this.password, onInput: this.handlePasswordChange.bind(this) }), h("span", { key: '0b94d675bd93970cd72c969063c5d34debd2fc63', id: "pwdmsg" })), h("button", { key: '1253762c26f8253b4c4197c283e34e99080ab713', class: "login-btn", type: "submit" }, "Sign up"), h("p", { key: '5e4e1f26d8267bff37d40962b122fc9e240fe158' }, "Already have an account? \u00A0 ", h("a", { key: '4cae10d8080ddd26963e25fdda631f8b3fbecd71', href: '', onClick: this.loginClick.bind(this) }, "Login"))))));
        return signupDiv;
    }
};
SignupComponent.style = signupComponentCss;

export { SignupComponent as signup_component };

//# sourceMappingURL=signup-component.entry.js.map