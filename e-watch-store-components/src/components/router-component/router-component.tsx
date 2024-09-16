import { Component, Host, h } from '@stencil/core';
import { createRouter, Route } from 'stencil-router-v2';

const route = createRouter();
@Component({
  tag: 'router-component'
})

export class RouterComponent {

  render() {
    return (
      <Host>
        <route.Switch>
          <Route path="/">
            <home-component></home-component>
          </Route>
          <Route path="/home">
            <home-component></home-component>
          </Route>
          <Route path="/signup">
            <signup-component></signup-component>
          </Route>
          <Route path="/login">
            <login-component></login-component>
          </Route>
          <Route path="/admin-login">
            <admin-login></admin-login>
          </Route>
          <Route path="/admin-dashboard">
            <admin-dashboard></admin-dashboard>
          </Route>
          <Route path="/cart">
            <cart-component></cart-component>
          </Route>
          <Route path={/.*/}>
            <not-found></not-found>
          </Route>
        </route.Switch>
      </Host>
    );
  }

}
