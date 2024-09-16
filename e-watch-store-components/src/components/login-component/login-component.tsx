import { Component, State, h } from '@stencil/core';
import { users_endpoint } from '../../interfaces/endpoints';

@Component({
  tag: 'login-component',
  styleUrl: 'login-component.css',
  shadow: true,
})
export class LoginComponent {
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

  signupClick(event: Event) {
    event.preventDefault();
    console.log('Signup Clicked');
    location.href = '/signup';
  }

  adminClick(event: Event) {
    event.preventDefault();
    console.log('Admin Login Clicked');
    location.href = '/admin-login';
  }

  async login(event: Event) {
    event.preventDefault();
    const response = await fetch(`${users_endpoint}`);
    const users = await response.json();
    // console.log(users[0]);
    const user = users.find(u => {
      console.log(this.email);
      return u.email === this.email && u.password === this.password
    });

    if (user.email !== 'admin@gmail.com') {
      console.log('Login successful');
      localStorage.setItem('useremail', user.email);
      location.href = '/home';
    } else if (user.email === 'admin@gmail.com') {
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
    loginDiv = (
      <div>
        <header-component></header-component>
        <div class="form-container">
          <form class="login-container" onSubmit={this.login.bind(this)}>
            <h3 class="login-title">User Login</h3>
            <dl>
              <dt class="dt">Email</dt>
              <input type="email" required class="inputfield" id="email" value={this.email} onInput={this.handleEmailChange.bind(this)} />
              <dt class="dt">Password</dt>
              <input type="password" required class="inputfield" id="password" minlength="8" value={this.password} onInput={this.handlePasswordChange.bind(this)} />
            </dl>
            <button class="login-btn" type='submit'>Login</button>
            <p>Don't have an account? &nbsp; <a href='' onClick={this.signupClick.bind(this)}>Signup</a></p>
            <p>Login as Seller Account &nbsp; <a href='' onClick={this.adminClick.bind(this)}>Admin Login</a></p>
          </form>
        </div>
      </div>
    )
    return loginDiv;
  }

}
