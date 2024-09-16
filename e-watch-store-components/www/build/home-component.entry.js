import { r as registerInstance, i as createEvent, h, e as Host } from './index-48480441.js';
import { p as products_endpoint, u as users_endpoint } from './endpoints-9013fb32.js';

const homeComponentCss = ":host{display:block;background-image:url(\"https://png.pngtree.com/thumb_back/fw800/background/20240204/pngtree-smart-watches-floating-in-ramadan-themed-background-image_15596011.png\");background-repeat:no-repeat;background-size:cover;background-position:center;min-height:100vh}.watch-list{display:flex;flex-wrap:wrap;gap:16px;justify-content:center;margin-top:6%}.watch-card{border:1px solid white;border-radius:8px;padding:10px;text-align:center;width:200px;box-shadow:0 4px 8px rgba(0, 0, 0, 0.1);transition:transform 0.2s}.watch-card:hover{transform:scale(1.05)}.watch-card img{max-width:100%;height:150px;border-bottom:1px solid rgb(221, 221, 221);padding-bottom:8px;margin-bottom:8px;border:1px solid white}.watch-card h2{font-size:19.2px;margin:0;color:white}.watch-card p{margin:8px 0;color:white}.watch-card button{background-color:rgb(0, 123, 255);border:none;border-radius:4px;color:rgb(255, 255, 255);cursor:pointer;padding:8px 16px;font-size:16px;transition:background-color 0.2s}.watch-card button:hover{background-color:rgb(0, 86, 179)}.watch-card button:disabled{background-color:rgb(221, 221, 221);cursor:not-allowed}";

const HomeComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.cartItemCountUpdated = createEvent(this, "cartItemCountUpdated", 7);
        this.handleSearchEvent = (event) => {
            const searchQuery = event.detail;
            console.log(searchQuery);
            if (searchQuery.trim() !== '') {
                const lowercaseQuery = searchQuery.toLowerCase();
                this.filteredProducts = this.smartwatches.filter(product => product['product-name'].toLowerCase().indexOf(lowercaseQuery) !== -1);
            }
            else {
                this.filteredProducts = []; // Clear filtered products if search query is empty
            }
        };
        this.smartwatches = [];
        this.filteredProducts = [];
    }
    componentWillLoad() {
        this.fetchProducts();
    }
    async fetchProducts() {
        try {
            const response = await fetch(products_endpoint);
            const data = await response.json();
            this.smartwatches = data;
        }
        catch (error) {
            console.error('Error fetching products:', error);
        }
    }
    async addToCart(watch) {
        if (this.isUserLoggedIn()) {
            await this.addToUserCart(watch);
        }
        else {
            this.addToLocalStorageCart(watch);
        }
    }
    isUserLoggedIn() {
        const userEmail = localStorage.getItem('useremail');
        return !!userEmail;
    }
    async addToUserCart(watch) {
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
        }
        catch (error) {
            console.error('Error adding to cart:', error);
        }
    }
    addToLocalStorageCart(watch) {
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
    reduceProductCount(productId) {
        const productToUpdate = this.smartwatches.find(product => product.id === productId);
        if (productToUpdate) {
            productToUpdate['product-count']--;
        }
    }
    updateSmartwatchesState() {
        this.smartwatches = [...this.smartwatches];
    }
    async calculateCartItemCount() {
        if (this.isUserLoggedIn()) {
            const userEmail = localStorage.getItem('useremail');
            try {
                const response = await fetch(`${users_endpoint}?email=${userEmail}`);
                let user = await response.json();
                user = user[0];
                return user.cart.length;
            }
            catch (error) {
                console.error('Error fetching user:', error);
                return 0; // Return 0 in case of error
            }
        }
        else {
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
    render() {
        let productsToDisplay = this.filteredProducts.length > 0 ? this.filteredProducts : this.smartwatches;
        let loadedProducts = '';
        if (productsToDisplay.length > 0) {
            loadedProducts = (h("div", { key: '4b0b5312da1da4aa868eb3b9d04b1b8791383029', class: "watch-list" }, productsToDisplay.map(watch => (h("div", { class: "watch-card", key: watch.id }, h("img", { src: watch['product-url'], alt: watch['product-name'] }), h("h2", null, watch['product-name']), h("p", null, "Price: \u20B9 ", watch['product-price'].toFixed(2)), h("p", null, watch['product-count'] > 0 ? 'In Stock' : 'Out of Stock'), h("button", { disabled: watch['product-count'] <= 0, onClick: this.addToCart.bind(this, watch) }, "Add to Cart"))))));
        }
        else {
            loadedProducts = (h("loading-spinner", { key: '249d2da52dba4c0e44a154ca8cfbea470525df35' }));
        }
        return (h(Host, { key: '3d119500e353935d33c295fd51d770e00a53262a' }, h("header-component", { key: '1d7f1b33c6a831f3bcb04f261f0705ba2916937e' }), loadedProducts));
    }
};
HomeComponent.style = homeComponentCss;

export { HomeComponent as home_component };

//# sourceMappingURL=home-component.entry.js.map