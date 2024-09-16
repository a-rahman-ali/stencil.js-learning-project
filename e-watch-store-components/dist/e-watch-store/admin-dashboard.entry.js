import { r as registerInstance, h } from './index-48480441.js';
import { p as products_endpoint } from './endpoints-9013fb32.js';

const adminDashboardCss = ":host{display:block}.container{margin-top:8%}.body-section{display:flex;flex-direction:row;flex-wrap:wrap;align-items:top;justify-content:center;margin:10px}.products-list{width:100%}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:center}th{background-color:black;color:white}tfoot td{font-weight:bold}.card{border:1px solid grey;width:300px;padding:20px;margin:20px;border-radius:10px}.card h3{margin-bottom:15px;font-size:18px;color:#333}.card dl{margin:0}.card dt{font-weight:bold;margin-top:10px}.card dd{margin:0;margin-bottom:10px}.card input[type=\"text\"],.card input[type=\"date\"],.card select{width:calc(100% - 10px);padding:8px;margin-top:5px;border:1px solid #ccc;border-radius:4px;box-sizing:border-box}.card button{display:inline-block;width:100%;padding:10px 15px;margin-top:10px;background-color:rgb(71, 71, 71);color:white;border:none;border-radius:4px;cursor:pointer;font-size:16px;font-weight:bold;transition:background-color 0.3s ease}.card button:hover{background-color:rgb(138, 166, 144)}#show-product-card-button{position:fixed;bottom:20px;right:20px;background-color:rgb(0, 123, 255);color:white;border:none;padding:10px;cursor:pointer}#show-product-card-button i{font-size:24px}#arrow{font-size:200%}.edit-btn{background-color:rgb(0, 123, 255);color:white;border:none;padding:5px;cursor:pointer;font-size:16px;width:100%}.delete-btn{background-color:rgba(255, 84, 84, 0.8);color:white;border:none;padding:5px;cursor:pointer;font-size:16px;width:100%}";

const AdminDashboard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.apiUrl = products_endpoint;
        this.handleInputChange = (field, event) => {
            const target = event.target;
            const value = field === 'product-price' || field === 'product-count' ? parseFloat(target.value) : target.value;
            this.newProduct = Object.assign(Object.assign({}, this.newProduct), { [field]: value });
        };
        this.toggleCard = (show) => {
            this.showCard = show;
        };
        this.handleFormSubmit = () => {
            if (this.editIndex === null) {
                this.addProduct();
            }
            else {
                this.updateProduct();
            }
        };
        this.products = [];
        this.newProduct = { 'id': '', 'product-name': '', 'product-price': 0, 'product-url': '', 'product-count': 0 };
        this.editIndex = null;
        this.showCard = false;
    }
    componentWillLoad() {
        this.fetchProducts();
    }
    async fetchProducts() {
        const response = await fetch(this.apiUrl);
        const data = await response.json();
        this.products = data;
    }
    getNextProductId() {
        if (this.products.length === 0)
            return '1';
        const maxId = Math.max(...this.products.map(p => parseInt(p['id'], 10)));
        const nextId = maxId + 1;
        return nextId.toString();
    }
    async addProduct() {
        this.newProduct['id'] = this.getNextProductId();
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.newProduct),
        });
        if (response.ok) {
            this.fetchProducts();
            this.resetForm();
        }
        this.toggleCard(false); // Hide card after adding
    }
    async updateProduct() {
        const updatedProduct = Object.assign({}, this.newProduct);
        const productIdToUpdate = this.products[this.editIndex]['id']; // Retrieve existing product-id
        // Fetch current product to ensure it exists
        const responseFetch = await fetch(`${this.apiUrl}/${productIdToUpdate}`);
        if (!responseFetch.ok) {
            console.log("Product not found");
            alert("Product not found");
            return;
        }
        // Send PUT request
        const response = await fetch(`${this.apiUrl}/${productIdToUpdate}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct),
        });
        if (response.ok) {
            console.log("Product updated successfully!");
            this.fetchProducts();
            this.resetForm();
            this.editIndex = null;
        }
        else {
            console.log("Failed to update product", response);
            alert("Failed to update product");
        }
        this.toggleCard(false); // Hide card after updating
    }
    async deleteProduct(index) {
        const productId = this.products[index]['id'];
        const response = await fetch(`${this.apiUrl}/${productId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            this.fetchProducts();
        }
    }
    editProduct(index) {
        this.editIndex = index;
        this.newProduct = Object.assign({}, this.products[index]);
        this.toggleCard(true); // Show card when editing
    }
    resetForm() {
        this.newProduct = { 'id': '', 'product-name': '', 'product-price': 0, 'product-url': '', 'product-count': 0 };
    }
    render() {
        return (h("div", { key: '43abbf0cc67ed83092204ddf046b55156bf791ce', class: "container-fluid" }, h("header-component", { key: '9f9aadd641433a1efef2366fdea3da43b650b02b' }), h("div", { key: '64f25c470e131331ed423ba791356af2be8c65c9', class: "container" }, h("div", { key: 'af52a11ca99922734975c30d35845d211c238681', class: "body-section" }, h("div", { key: '8761d2bd506f1bae13345fa582f59a220bbbf804', class: "products-list container-fluid" }, h("table", { key: '3613aaf47ac39e03afe1cccdec9a11491663ab34', class: "container-fluid" }, h("thead", { key: '1c2d5182e72c671a716b713158dad948f71b8b76' }, h("tr", { key: '61207b18d28973e446888ecfee6581b2684f3499' }, h("th", { key: 'af80b1d3c48455298080be00b216920c20d3de43' }, "Product Image"), h("th", { key: '7bb6f37745c80317bf81d806b9d004996076de17' }, "Product Name"), h("th", { key: '9b0a16e2f8217e291370f210f6ddc12af104a4ca' }, "Price"), h("th", { key: '9a5e3fd529b987697d958a985d7f494bbc580015' }, "Stock Count"), h("th", { key: '4551cd371299085707c472b9ff81dc9aa70e95ad' }, "Edit"), h("th", { key: 'cc53e0f6dd36d71d3a167b70fea9e08501e5f6fc' }, "Delete"))), h("tbody", { key: '5cefd2dd8d54c74de4c6ecf9f93f840adda4f9a4' }, this.products.map((product, index) => (h("tr", { key: index }, h("td", null, h("img", { src: product['product-url'], alt: product['product-name'], width: "50" })), h("td", null, product['product-name']), h("td", null, " \u20B9", Number(product['product-price']).toFixed(2)), h("td", null, product['product-count']), h("td", null, h("button", { class: "edit-btn", onClick: () => this.editProduct(index) }, "Edit")), h("td", null, h("button", { class: "delete-btn", onClick: () => this.deleteProduct(index) }, "Delete"))))))), h("hr", { key: '8db120b56784bdcf43b7efc09b2473b138420d1f' })), this.showCard ? (h("div", { class: "card", id: "expense-card" }, h("h3", { id: "expense-card-title" }, this.editIndex === null ? 'Add Product' : 'Edit Product'), h("dl", null, h("dt", null, "Product Name"), h("dd", null, h("input", { type: "text", value: this.newProduct['product-name'], onInput: this.handleInputChange.bind(this, 'product-name') })), h("dt", null, "Product Price"), h("dd", null, h("input", { type: "text", value: this.newProduct['product-price'], onInput: this.handleInputChange.bind(this, 'product-price') })), h("dt", null, "Product URL"), h("dd", null, h("input", { type: "text", value: this.newProduct['product-url'], onInput: this.handleInputChange.bind(this, 'product-url') })), h("dt", null, "Product Count"), h("dd", null, h("input", { type: "text", value: this.newProduct['product-count'], onInput: this.handleInputChange.bind(this, 'product-count') }))), h("button", { onClick: this.handleFormSubmit }, this.editIndex === null ? 'Add' : 'Update'))) : '', h("button", { key: 'caaccb1b15a26e44399190def14138412371e047', id: "show-product-card-button", onClick: this.toggleCard.bind(this, !this.showCard) }, h("span", { key: '39e4df5a2985895c0470aeaa81f97521f65afe13', id: "arrow" }, this.showCard ? '-' : '+'))))));
    }
};
AdminDashboard.style = adminDashboardCss;

export { AdminDashboard as admin_dashboard };

//# sourceMappingURL=admin-dashboard.entry.js.map