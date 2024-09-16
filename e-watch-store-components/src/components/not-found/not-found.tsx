import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'not-found',
  styleUrl: 'not-found.css',
  shadow: true,
})
export class NotFound {

  render() {
    return (
      <Host>
        <div class="not-found">
          <header-component></header-component>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The requested page could not be found.</p>
          <a href="/home">Back to Home</a>
        </div>
      </Host>
    );
  }

}
