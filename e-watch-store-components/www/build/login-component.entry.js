import { r as registerInstance, h } from './index-48480441.js';
import { u as users_endpoint } from './endpoints-9013fb32.js';

const loginComponentCss = ":host{display:block}.form-container{display:flex;justify-content:center;align-items:center;margin-top:8%}.heading{font-size:30px;font-weight:600;margin-bottom:20px;margin-top:2px;margin-left:10px;margin-right:10px;color:white;text-align:center;background-color:#000000;padding:10px 10px;border-radius:10px}.login-container,.signup-container{border:2px solid #000000;padding:13px 13px;margin-top:5%;width:300px;border-radius:2%}button :disabled{background-color:grey;color:black;cursor:not-allowed}.login-btn{border:none;background-color:black;color:white;padding:10px 20px;text-align:center;font-weight:bold;border-radius:5px;width:50%;margin-left:30%}.login-btn:hover{background-color:rgb(80, 80, 80);color:white}.inputfield{width:100%;margin-top:10px;margin-bottom:15px;height:30px}.dt{font-weight:bolder;align-items:center}dd{margin-top:10px}.userexists{color:red;font-weight:bolder;font-size:20px;margin-top:10px;margin-bottom:10px;display:flex;justify-content:center;display:none}.login-title{font-size:30px;font-weight:600;margin-bottom:20px;margin-top:2px;margin-left:10px;margin-right:10px;text-align:center;padding:10px 10px;border-radius:10px}form p{margin-top:10px;margin-bottom:10px;display:flex;justify-content:center}";

const LoginComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.email = '';
        this.password = '';
    }
    handleEmailChange(event) {
        const target = event.target;
        this.email = target.value;
    }
    handlePasswordChange(event) {
        const target = event.target;
        this.password = target.value;
    }
    signupClick(event) {
        event.preventDefault();
        console.log('Signup Clicked');
        location.href = '/signup';
    }
    adminClick(event) {
        event.preventDefault();
        console.log('Admin Login Clicked');
        location.href = '/admin-login';
    }
    async login(event) {
        event.preventDefault();
        const response = await fetch(`${users_endpoint}`);
        const users = await response.json();
        // console.log(users[0]);
        const user = users.find(u => {
            console.log(this.email);
            return u.email === this.email && u.password === this.password;
        });
        if (user.email !== 'admin@gmail.com') {
            console.log('Login successful');
            localStorage.setItem('useremail', user.email);
            location.href = '/home';
        }
        else if (user.email === 'admin@gmail.com') {
            alert("You are trying to login as Admin");
        }
        else {
            // Display error message
            console.log('Invalid email or password');
            alert('Invalid email or password');
        }
    }
    render() {
        let loginDiv = '';
        loginDiv = (h("div", { key: '58e1ec22bbe00e9deeda5f8f86c71be2b765e6d0' }, h("header-component", { key: '38229c69c64f8da38effac759b91362b5f10d549' }), h("div", { key: 'c4d7d9efc398c104c123b2c2e1aa10339a1fa52a', class: "form-container" }, h("form", { key: 'ebd2d0c00e893a66d3e12a5a3b4011d210251295', class: "login-container", onSubmit: this.login.bind(this) }, h("h3", { key: 'a7519b2623e20d30dfb9b79898dbe0f5f1ee87db', class: "login-title" }, "User Login"), h("dl", { key: 'ade22d1e18bab4a58295c782eb4f41261aeae5c6' }, h("dt", { key: 'ffd53cda41c7448c0fd849f2805d5c16fc8c99d4', class: "dt" }, "Email"), h("input", { key: '61950ac0ff9bd42c69ef6dd322f59756b32631dd', type: "email", required: true, class: "inputfield", id: "email", value: this.email, onInput: this.handleEmailChange.bind(this) }), h("dt", { key: '0a58096df25f09f25672ccc4c2f08d3e3a1fa6b8', class: "dt" }, "Password"), h("input", { key: '9de608aa5a03a808a4f6ce9fae57ebe591830df3', type: "password", required: true, class: "inputfield", id: "password", minlength: "8", value: this.password, onInput: this.handlePasswordChange.bind(this) })), h("button", { key: 'cdff1d15342aa70c48dc2b54337f049e2bb5d2e8', class: "login-btn", type: 'submit' }, "Login"), h("p", { key: '6b45423a30830785b69bdf54adb8db973b39e724' }, "Don't have an account? \u00A0 ", h("a", { key: '792e6248f085ab0cf20027ca30e6f7d4e2b28e5d', href: '', onClick: this.signupClick.bind(this) }, "Signup")), h("p", { key: '89b81b011f1453b05f17b8f3d2dc83ac8d845506' }, "Login as Seller Account \u00A0 ", h("a", { key: 'ce5e53915a95da5d4c614a81add67fe3ad920124', href: '', onClick: this.adminClick.bind(this) }, "Admin Login"))))));
        return loginDiv;
    }
};
LoginComponent.style = loginComponentCss;

export { LoginComponent as login_component };

//# sourceMappingURL=login-component.entry.js.map