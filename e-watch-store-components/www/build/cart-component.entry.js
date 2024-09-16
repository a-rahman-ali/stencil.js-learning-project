import { r as registerInstance, i as createEvent, h, e as Host } from './index-48480441.js';
import { u as users_endpoint, p as products_endpoint } from './endpoints-9013fb32.js';

const cartComponentCss = ":host{display:block;background-image:url(\"https://png.pngtree.com/thumb_back/fw800/background/20240204/pngtree-smart-watches-floating-in-ramadan-themed-background-image_15596011.png\");background-repeat:no-repeat;background-size:cover;background-position:center;min-height:100vh}.content{margin-top:10%}.cart-item{display:flex;align-items:center;padding:12px;border:1px solid #ccc;margin-bottom:12px}.cart-item img{width:50px;height:50px;margin-right:12px}.cart-item .details{flex:1;display:flex;justify-content:space-around}.cart-item .price{font-weight:bold}.cart-item .remove-btn{cursor:pointer;padding:6px 12px;background-color:#f44336;color:white;border:none;border-radius:4px}.cart-item .remove-btn:hover{background-color:#cc0000}.checkout-btn{margin-top:20px;padding:10px 20px;background-color:#4caf50;color:white;border:none;border-radius:4px;cursor:pointer;font-size:16px}.checkout-btn:hover{background-color:#45a049}.no-items{display:flex;justify-content:center;align-items:center;flex-direction:column;color:white;text-align:center;padding:50px 50px;font-size:80px;font-weight:500}";

const CartComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.cartItemCountUpdated = createEvent(this, "cartItemCountUpdated", 7);
        this.cartItems = [];
        this.isLoading = true;
    }
    componentWillLoad() {
        if (this.isUserLoggedIn()) {
            this.loadUserCart();
        }
        else {
            this.loadLocalStorageCart();
        }
        setTimeout(() => {
            this.isLoading = false;
        }, 1500);
    }
    isUserLoggedIn() {
        const userEmail = localStorage.getItem('useremail');
        return !!userEmail;
    }
    removeFromCart(itemId) {
        const itemIndex = this.cartItems.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            // Decrease product count or remove completely from cartItems
            if (this.cartItems[itemIndex]['product-count'] > 1) {
                this.cartItems[itemIndex]['product-count']--;
            }
            else {
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
            const cartItems = [];
            user.cart.forEach(itemId => {
                const existingItem = cartItems.find(item => item.id === itemId);
                if (existingItem) {
                    existingItem['product-count']++;
                }
                else {
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
        const cartItems = [];
        tempCart.forEach(itemId => {
            const existingItem = cartItems.find(item => item.id === itemId);
            if (existingItem) {
                existingItem['product-count']++;
            }
            else {
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
        Promise.all(this.cartItems.map(item => fetch(`${products_endpoint}/${item.id}`)
            .then(response => response.json())
            .then(product => ({
            id: item.id,
            'product-name': product['product-name'],
            'product-price': product['product-price'],
            'product-url': product['product-url'],
            'product-count': item['product-count'], // Preserve count
        }))))
            .then(productDetails => {
            this.cartItems = productDetails;
        })
            .catch(error => console.error('Error fetching product details:', error));
    }
    calculateCartTotal() {
        return this.cartItems.reduce((total, item) => total + (item['product-price'] * item['product-count']), 0);
    }
    handleCheckout() {
        window.location.href = '/checkout';
    }
    render() {
        return (h(Host, { key: 'cddce11125b9d8e624c3e24ad9cd91d1037f6da8' }, h("header-component", { key: '34eec7198b8f4b429cc9fee4eb38920526534dae' }), h("main", { key: 'b07af2791ec98224503f07f99a545f93a4d04af5', class: "content" }, this.isLoading ? (h("loading-spinner", null)) : (this.cartItems.length > 0 ? (h("div", { class: "cart-items" }, this.cartItems.map(item => (h("div", { class: "cart-item", key: item.id }, h("img", { src: item['product-url'], alt: item['product-name'] }), h("div", { class: "details" }, h("div", null, item['product-name']), h("div", { class: "price" }, "\u20B9", item['product-price'].toFixed(2)), h("div", { class: "count" }, "Quantity: ", item['product-count'])), h("button", { class: "remove-btn", onClick: () => this.removeFromCart(item.id) }, "Remove")))), h("div", { class: "cart-total" }, h("strong", null, "Cart Total: \u20B9 ", this.calculateCartTotal().toFixed(2))), h("button", { class: "checkout-btn", onClick: this.handleCheckout }, "Checkout"))) : (h("div", { class: "no-items" }, h("p", null, "No items in cart")))))));
    }
};
CartComponent.style = cartComponentCss;

export { CartComponent as cart_component };

//# sourceMappingURL=cart-component.entry.js.map