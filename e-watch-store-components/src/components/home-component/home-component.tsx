import { Component, Host, h, State, Event, EventEmitter } from '@stencil/core';
import { ISmartwatch } from '../../interfaces/ISmartWatch';
import { products_endpoint, users_endpoint } from '../../interfaces/endpoints';

@Component({
  tag: 'home-component',
  styleUrl: 'home-component.css',
  shadow: true,
})
export class HomeComponent {

  @State() smartwatches: ISmartwatch[] = [];
  @State() filteredProducts: ISmartwatch[] = [];
  @Event({ eventName: 'cartItemCountUpdated', bubbles: true, composed: true }) cartItemCountUpdated: EventEmitter<number>;


  componentWillLoad() {
    this.fetchProducts();
  }

  async fetchProducts() {
    try {
      const response = await fetch(products_endpoint);
      const data = await response.json();
      this.smartwatches = data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  async addToCart(watch: ISmartwatch) {
    if (this.isUserLoggedIn()) {
      await this.addToUserCart(watch);
    } else {
      this.addToLocalStorageCart(watch);
    }
  }

  isUserLoggedIn(): boolean {
    const userEmail = localStorage.getItem('useremail');
    return !!userEmail;
  }

  async addToUserCart(watch: ISmartwatch) {
    const userEmail = localStorage.getItem('useremail');
    if (!userEmail) {
      console.error('User is not logged in.');
      return;
    }

    try {
      // Fetch user details to get user ID
      const response = await fetch(`${users_endpoint}?email=${userEmail}`);
      const users = await response.json();
      if (users.length === 0) {
        console.error('User not found.');
        return;
      }
      const userId = users[0].id;

      // Fetch user by ID to update cart
      const userResponse = await fetch(`${users_endpoint}/${userId}`);
      const user = await userResponse.json();
      user.cart.push(watch.id);

      // Update user's cart
      await fetch(`${users_endpoint}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      this.reduceProductCount(watch.id);
      this.updateSmartwatchesState();

      const cartItemCount = await this.calculateCartItemCount();
      this.cartItemCountUpdated.emit(cartItemCount); // Emit event to update cart count in NavBar

    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  addToLocalStorageCart(watch: ISmartwatch) {
    let tempCart = JSON.parse(localStorage.getItem('tempCart') || '[]');
    tempCart.push(watch.id);
    localStorage.setItem('tempCart', JSON.stringify(tempCart));
    this.reduceProductCount(watch.id);
    this.updateSmartwatchesState();
    this.calculateCartItemCount().then(cartItemCount => {
      this.cartItemCountUpdated.emit(cartItemCount); // Emit event to update cart count in NavBar
    }).catch(error => {
      console.error('Error calculating cart item count:', error);
    });
  }

  reduceProductCount(productId: string) {
    const productToUpdate = this.smartwatches.find(product => product.id === productId);
    if (productToUpdate) {
      productToUpdate['product-count']--;
    }
  }

  updateSmartwatchesState() {
    this.smartwatches = [...this.smartwatches];
  }

  async calculateCartItemCount(): Promise<number> {
    if (this.isUserLoggedIn()) {
      const userEmail = localStorage.getItem('useremail');
      try {
        const response = await fetch(`${users_endpoint}?email=${userEmail}`);
        let user = await response.json();
        user = user[0];
        return user.cart.length;
      } catch (error) {
        console.error('Error fetching user:', error);
        return 0; // Return 0 in case of error
      }
    } else {
      const tempCart = JSON.parse(localStorage.getItem('tempCart') || '[]');
      return tempCart.length;
    }
  }

  componentDidLoad() {
    document.addEventListener('searchEvent', this.handleSearchEvent);
  }

  disconnectedCallback() {
    document.removeEventListener('searchEvent', this.handleSearchEvent);
  }

  handleSearchEvent = (event: CustomEvent<string>) => {
    const searchQuery = event.detail;
    console.log(searchQuery)
    if (searchQuery.trim() !== '') {
      const lowercaseQuery = searchQuery.toLowerCase();
      this.filteredProducts = this.smartwatches.filter(product =>
        product['product-name'].toLowerCase().indexOf(lowercaseQuery) !== -1
      );
    } else {
      this.filteredProducts = []; // Clear filtered products if search query is empty
    }
  };

  render() {
    let productsToDisplay = this.filteredProducts.length > 0 ? this.filteredProducts : this.smartwatches;

    let loadedProducts = '';
    if (productsToDisplay.length > 0) {
      loadedProducts = (
        <div class="watch-list">
          {productsToDisplay.map(watch => (
            <div class="watch-card" key={watch.id}>
              <img src={watch['product-url']} alt={watch['product-name']} />
              <h2>{watch['product-name']}</h2>
              <p>Price: ₹ {watch['product-price'].toFixed(2)}</p>
              <p>{watch['product-count'] > 0 ? 'In Stock' : 'Out of Stock'}</p>
              <button disabled={watch['product-count'] <= 0} onClick={this.addToCart.bind(this, watch)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )
    } else {
      loadedProducts = (<loading-spinner></loading-spinner>)
    }

    return (
      <Host>
        <header-component></header-component>
        {loadedProducts}
      </Host>
    );
  }


}
