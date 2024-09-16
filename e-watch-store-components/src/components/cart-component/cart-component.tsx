import { Component, Host, h, State, Event, EventEmitter } from '@stencil/core';
import { products_endpoint, users_endpoint } from '../../interfaces/endpoints';
import { IProduct } from '../../interfaces/IProduct';

@Component({
  tag: 'cart-component',
  styleUrl: 'cart-component.css',
  shadow: true,
})
export class CartComponent {
  @State() cartItems: IProduct[] = [];
  @State() isLoading: boolean = true;
  @Event({ eventName: 'cartItemCountUpdated', bubbles: true, composed: true }) cartItemCountUpdated: EventEmitter<number>;


  componentWillLoad() {
    if (this.isUserLoggedIn()) {
      this.loadUserCart();
    } else {
      this.loadLocalStorageCart();
    }

    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  isUserLoggedIn(): boolean {
    const userEmail = localStorage.getItem('useremail');
    return !!userEmail;
  }

  removeFromCart(itemId: string) {
    const itemIndex = this.cartItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      // Decrease product count or remove completely from cartItems
      if (this.cartItems[itemIndex]['product-count'] > 1) {
        this.cartItems[itemIndex]['product-count']--;
      } else {
        this.cartItems.splice(itemIndex, 1);
      }
      this.cartItems = [...this.cartItems]; // Trigger re-render

      // Update localStorage temporarily (if user is not logged in)
      if (!this.isUserLoggedIn()) {
        localStorage.setItem('tempCart', JSON.stringify(this.cartItems.map(item => item.id)));
        this.updateCartItemCount();
      }

      // Update user's cart in backend (if user is logged in)
      if (this.isUserLoggedIn()) {
        const userEmail = localStorage.getItem('useremail');
        if (!userEmail) {
          console.error('User email not found.');
          return;
        }

        fetch(`${users_endpoint}?email=${userEmail}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(users => {
            if (!users || users.length === 0 || !users[0].id) {
              throw new Error('Invalid user data received.');
            }

            const userId = users[0].id;
            // Update user object with updated cart data
            users[0].cart = this.cartItems.map(item => item.id);

            // Make PUT request to update user's cart
            fetch(`${users_endpoint}/${userId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(users[0]),
            })
              .then(() => {
                this.updateCartItemCount();
              })
              .catch(error => console.error('Error updating user cart:', error));
          })
          .catch(error => console.error('Error fetching user data:', error));
      }
    }
  }

  updateCartItemCount() {
    const cartItemCount = this.cartItems.reduce((total, item) => total + item['product-count'], 0);
    this.cartItemCountUpdated.emit(cartItemCount);
  }

  loadUserCart() {
    const userEmail = localStorage.getItem('useremail');
    if (!userEmail) {
      console.error('User email not found.');
      return;
    }

    fetch(`${users_endpoint}?email=${userEmail}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(users => {
        if (!users || users.length === 0 || !users[0].cart) {
          throw new Error('Invalid user data received.');
        }

        const user = users[0]; // Assuming you're expecting a single user object
        const cartItems: IProduct[] = [];
        user.cart.forEach(itemId => {
          const existingItem = cartItems.find(item => item.id === itemId);
          if (existingItem) {
            existingItem['product-count']++;
          } else {
            cartItems.push({
              id: itemId,
              'product-name': '',
              'product-price': 0,
              'product-url': '',
              'product-count': 1,
            });
          }
        });
        this.cartItems = cartItems;
        this.loadProductDetails();
      })
      .catch(error => console.error('Error loading user cart:', error));
  }

  loadLocalStorageCart() {
    const tempCart = JSON.parse(localStorage.getItem('tempCart') || '[]');
    // Initialize cart items with counts
    const cartItems: IProduct[] = [];
    tempCart.forEach(itemId => {
      const existingItem = cartItems.find(item => item.id === itemId);
      if (existingItem) {
        existingItem['product-count']++;
      } else {
        cartItems.push({
          id: itemId,
          'product-name': '',
          'product-price': 0,
          'product-url': '',
          'product-count': 1,
        });
      }
    });
    this.cartItems = cartItems;
    this.loadProductDetails();
  }

  loadProductDetails() {
    Promise.all(
      this.cartItems.map(item =>
        fetch(`${products_endpoint}/${item.id}`)
          .then(response => response.json())
          .then(product => ({
            id: item.id,
            'product-name': product['product-name'],
            'product-price': product['product-price'],
            'product-url': product['product-url'],
            'product-count': item['product-count'], // Preserve count
          }))
      )
    )
      .then(productDetails => {
        this.cartItems = productDetails;
      })
      .catch(error => console.error('Error fetching product details:', error));
  }

  calculateCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item['product-price'] * item['product-count']), 0);
  }

  handleCheckout() {
    window.location.href = '/checkout';
  }

  render() {
    return (
      <Host>
        <header-component></header-component>
        <main class="content">
          {this.isLoading ? (
            <loading-spinner></loading-spinner>
          ) : (
            this.cartItems.length > 0 ? (
              <div class="cart-items">
                {this.cartItems.map(item => (
                  <div class="cart-item" key={item.id}>
                    <img src={item['product-url']} alt={item['product-name']} />
                    <div class="details">
                      <div>{item['product-name']}</div>
                      <div class="price">₹{item['product-price'].toFixed(2)}</div>
                      <div class="count">Quantity: {item['product-count']}</div>
                    </div>
                    <button class="remove-btn" onClick={() => this.removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                ))}
                <div class="cart-total">
                  <strong>Cart Total: ₹ {this.calculateCartTotal().toFixed(2)}</strong>
                </div>
                <button class="checkout-btn" onClick={this.handleCheckout}>
                  Checkout
                </button>
              </div>
            ) : (
              <div class="no-items">
                <p>No items in cart</p>
              </div>
            )
          )}
        </main>
      </Host>
    );
  }

}
