import { r as registerInstance, h } from './index-48480441.js';
import { u as users_endpoint } from './endpoints-9013fb32.js';

const adminLoginCss = ":host{display:block}.heading{font-size:30px;font-weight:600;margin-bottom:20px;margin-top:2px;margin-left:10px;margin-right:10px;color:white;text-align:center;background-color:#000000;padding:10px 10px;border-radius:10px}.form-container{display:flex;justify-content:center;align-items:center;margin-top:12%}.login-container,.signup-container{border:2px solid #000000;padding:13px 13px;width:300px;border-radius:2%}button :disabled{background-color:grey;color:black;cursor:not-allowed}.login-btn{border:none;background-color:black;color:white;padding:10px 20px;text-align:center;font-weight:bold;border-radius:5px;width:50%;margin-left:30%}.login-btn:hover{background-color:rgb(80, 80, 80);color:white}.inputfield{width:100%;margin-top:10px;margin-bottom:15px;height:30px}.dt{font-weight:bolder;align-items:center}dd{margin-top:10px}.userexists{color:red;font-weight:bolder;font-size:20px;margin-top:10px;margin-bottom:10px;display:flex;justify-content:center;display:none}.login-title{font-size:30px;font-weight:600;margin-bottom:20px;margin-top:2px;margin-left:10px;margin-right:10px;text-align:center;padding:10px 10px;border-radius:10px}form p{margin-top:10px;margin-bottom:10px;display:flex;justify-content:center}";

const AdminLogin = class {
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
    async loginAdmin(event) {
        event.preventDefault();
        try {
            const response = await fetch(`${users_endpoint}`);
            const users = await response.json();
            const admin = users[0];
            if (admin.email === this.email && admin.password === this.password) {
                console.log('Admin login successful');
                localStorage.setItem('adminemail', admin.email);
                localStorage.setItem('adminusername', admin.username);
                location.href = '/admin-dashboard';
            }
            else {
                console.log('Invalid email or password');
                alert("Invalid email or password");
            }
        }
        catch (error) {
            console.error('An error occurred during admin login:', error);
        }
    }
    loginClick(event) {
        event.preventDefault();
        console.log('Login Clicked');
        window.location.href = '/login';
    }
    render() {
        return (h("div", { key: '0a214e5210648907d225796a48d3a74c41ef78b3' }, h("header-component", { key: 'd39e2c7488055580a96dd96c13b2f6300ce026ea' }), h("div", { key: 'ce8bc8a1adaa85fb2f7e634543c10bcc1299ec83', class: "form-container" }, h("form", { key: 'cc9531dacc534327fd06709605f5a8e74e963e70', class: "login-container", onSubmit: this.loginAdmin.bind(this) }, h("h3", { key: '7f91674a0610db36fc55a33b35598b66f0181bba', class: "login-title" }, "Admin Login"), h("dl", { key: 'c5af24457af262c0b7f7764963b7f2a15d7dc021' }, h("dt", { key: 'ae602f30efba1d85b24777d25848ca209ff8be03', class: "dt" }, "Email"), h("input", { key: '35c5d5779ec2f97ee8349136bc80c03792863737', type: "email", required: true, class: "inputfield", id: "email", value: this.email, onInput: this.handleEmailChange.bind(this) }), h("dt", { key: '444ee564f733d7b473a7fba67dd974aa9f831d0c', class: "dt" }, "Password"), h("input", { key: 'e97c686101dfa3bf4f7509dbc89b23459a2b6e79', type: "password", required: true, class: "inputfield", id: "password", minlength: "8", value: this.password, onInput: this.handlePasswordChange.bind(this) })), h("button", { key: '675944e8e53d342849d4646675e6c45e90dca854', class: "login-btn", type: 'submit' }, "Login"), h("p", { key: 'd19b4dab2565c6d7d361506f8aea88df77e3a1ed' }, "Back to User Account \u00A0", h("a", { key: 'd179d6e8fb17a40bcb0f91dc555c036210e27600', href: '', onClick: this.loginClick.bind(this) }, " Login"))))));
    }
};
AdminLogin.style = adminLoginCss;

export { AdminLogin as admin_login };

//# sourceMappingURL=admin-login.entry.js.map