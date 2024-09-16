# router-component



<!-- Auto Generated Below -->


## Dependencies

### Depends on

- [home-component](../home-component)
- [signup-component](../signup-component)
- [login-component](../login-component)
- [admin-login](../admin-login)
- [admin-dashboard](../admin-dashboard)
- [cart-component](../cart-component)
- [not-found](../not-found)

### Graph
```mermaid
graph TD;
  router-component --> home-component
  router-component --> signup-component
  router-component --> login-component
  router-component --> admin-login
  router-component --> admin-dashboard
  router-component --> cart-component
  router-component --> not-found
  home-component --> loading-spinner
  home-component --> header-component
  header-component --> nav-bar
  signup-component --> header-component
  login-component --> header-component
  admin-login --> header-component
  admin-dashboard --> header-component
  cart-component --> header-component
  style router-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
