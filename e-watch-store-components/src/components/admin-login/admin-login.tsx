import { Component, State, h } from '@stencil/core';
import { users_endpoint } from '../../interfaces/endpoints';

@Component({
  tag: 'admin-login',
  styleUrl: 'admin-login.css',
  shadow: true,
})
export class AdminLogin {
  @State() email: string = '';
  @State() password: string = '';

  handleEmailChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.email = target.value;
  }

  handlePasswordChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.password = target.value;
  }

  async loginAdmin(event: Event) {
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
      } else {
        console.log('Invalid email or password');
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error('An error occurred during admin login:', error);
    }
  }

  loginClick(event: Event) {
    event.preventDefault();
    console.log('Login Clicked');
    window.location.href = '/login';
  }

  render() {
    return (
      <div>
        <header-component></header-component>
        <div class="form-container">
          <form class="login-container" onSubmit={this.loginAdmin.bind(this)}>
            <h3 class="login-title">Admin Login</h3>
            <dl>
              <dt class="dt">Email</dt>
              <input type="email" required class="inputfield" id="email" value={this.email} onInput={this.handleEmailChange.bind(this)} />
              <dt class="dt">Password</dt>
              <input type="password" required class="inputfield" id="password" minlength="8" value={this.password} onInput={this.handlePasswordChange.bind(this)} />
            </dl>
            <button class="login-btn" type='submit'>Login</button>
            <p>Back to User Account &nbsp;<a href='' onClick={this.loginClick.bind(this)}> Login</a></p>
          </form>
        </div>
      </div>
    );
  }
}
