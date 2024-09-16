import { Component, h, State } from '@stencil/core';
import { products_endpoint } from '../../interfaces/endpoints';
import { IProduct } from '../../interfaces/IProduct';

@Component({
  tag: 'admin-dashboard',
  styleUrl: 'admin-dashboard.css',
  shadow: true,
})
export class AdminDashboard {
  @State() products: IProduct[] = [];
  @State() newProduct: IProduct = { 'id': '', 'product-name': '', 'product-price': 0, 'product-url': '', 'product-count': 0 };
  @State() editIndex: number | null = null;
  @State() showCard: boolean = false; // State to control the visibility of the card

  apiUrl: string = products_endpoint;

  componentWillLoad() {
    this.fetchProducts();
  }

  async fetchProducts() {
    const response = await fetch(this.apiUrl);
    const data = await response.json();
    this.products = data;
  }

  getNextProductId() {
    if (this.products.length === 0) return '1';

    const maxId = Math.max(...this.products.map(p => parseInt(p['id'], 10)));
    const nextId = maxId + 1;

    return nextId.toString();
  }

  handleInputChange = (field: string, event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = field === 'product-price' || field === 'product-count' ? parseFloat(target.value) : target.value;
    this.newProduct = { ...this.newProduct, [field]: value };
  };

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
    const updatedProduct = { ...this.newProduct };
    const productIdToUpdate = this.products[this.editIndex!]['id']; // Retrieve existing product-id

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
    } else {
      console.log("Failed to update product", response);
      alert("Failed to update product");
    }

    this.toggleCard(false); // Hide card after updating
  }

  async deleteProduct(index: number) {
    const productId = this.products[index]['id'];
    const response = await fetch(`${this.apiUrl}/${productId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      this.fetchProducts();
    }
  }

  editProduct(index: number) {
    this.editIndex = index;
    this.newProduct = { ...this.products[index] };
    this.toggleCard(true); // Show card when editing
  }

  toggleCard = (show: boolean) => {
    this.showCard = show;
  };

  handleFormSubmit = () => {
    if (this.editIndex === null) {
      this.addProduct();
    } else {
      this.updateProduct();
    }
  }

  resetForm() {
    this.newProduct = { 'id': '', 'product-name': '', 'product-price': 0, 'product-url': '', 'product-count': 0 };
  }

  render() {
    return (
      <div class="container-fluid">
        <header-component></header-component>

        <div class="container">
          <div class="body-section">
            <div class="products-list container-fluid">
              <table class="container-fluid">
                <thead>
                  <tr>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Stock Count</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.products.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <img src={product['product-url']} alt={product['product-name']} width="50" />
                      </td>
                      <td>{product['product-name']}</td>
                      <td> ₹{Number(product['product-price']).toFixed(2)}</td>
                      <td>{product['product-count']}</td>
                      <td>
                        <button class="edit-btn" onClick={() => this.editProduct(index)}>Edit</button>
                      </td>
                      <td>
                        <button class="delete-btn" onClick={() => this.deleteProduct(index)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr />
            </div>
            {this.showCard ? (
              <div class="card" id="expense-card">
                <h3 id="expense-card-title">{this.editIndex === null ? 'Add Product' : 'Edit Product'}</h3>
                <dl>
                  <dt>Product Name</dt>
                  <dd><input type="text" value={this.newProduct['product-name']} onInput={this.handleInputChange.bind(this, 'product-name')} /></dd>
                  <dt>Product Price</dt>
                  <dd><input type="text" value={this.newProduct['product-price']} onInput={this.handleInputChange.bind(this, 'product-price')} /></dd>
                  <dt>Product URL</dt>
                  <dd><input type="text" value={this.newProduct['product-url']} onInput={this.handleInputChange.bind(this, 'product-url')} /></dd>
                  <dt>Product Count</dt>
                  <dd><input type="text" value={this.newProduct['product-count']} onInput={this.handleInputChange.bind(this, 'product-count')} /></dd>
                </dl>
                <button onClick={this.handleFormSubmit}>{this.editIndex === null ? 'Add' : 'Update'}</button>
              </div>
            ) : ''}
            <button id="show-product-card-button" onClick={this.toggleCard.bind(this, !this.showCard)}>
              <span id="arrow">{this.showCard ? '-' : '+'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
