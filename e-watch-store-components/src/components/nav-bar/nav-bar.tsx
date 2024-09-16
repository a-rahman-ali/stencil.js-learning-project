import { Component, h, State, Listen } from '@stencil/core';
import { users_endpoint } from '../../interfaces/endpoints';

@Component({
    tag: 'nav-bar',
    styleUrl: 'nav-bar.css',
    shadow: true
})
export class NavBar {
    @State() isLoggedIn: boolean = localStorage.getItem('useremail')?.length > 0 || localStorage.getItem('adminemail')?.length > 0;
    @State() userName: string = '';
    @State() isAdmin: boolean = localStorage.getItem('adminemail') == 'admin@gmail.com';
    @State() cartItemCount: number = 0;

    componentWillLoad() {
        if (this.isLoggedIn) {
            this.fetchUserName();
        }
        this.updateCartItemCount();
    }

    @Listen('cartItemCountUpdated', { target: 'body' })
    cartItemCountUpdatedHandler(event: CustomEvent<number>) {
        this.cartItemCount = event.detail;
    }

    async fetchUserName() {
        try {
            const useremail = localStorage.getItem('useremail');
            const adminusername = localStorage.getItem('adminusername');
            if (adminusername) {
                this.userName = adminusername;
                return;
            }

            const response = await fetch(`${users_endpoint}`);
            const users = await response.json();
            const user = users.find(user => user.email === useremail);
            if (user) {
                this.userName = user.username;
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    async updateCartItemCount() {
        const userEmail = localStorage.getItem('useremail');
        if (!userEmail) {
            const tempCart = JSON.parse(localStorage.getItem('tempCart') || '[]');
            this.cartItemCount = tempCart.length;
        } else {
            try {
                const response = await fetch(`${users_endpoint}`);
                const users = await response.json();
                const currentUser = users.find(user => user.email === userEmail);
                if (currentUser && currentUser.cart) {
                    this.cartItemCount = currentUser.cart.length;
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    }

    logoutClick(event: Event) {
        event.preventDefault();
        console.log('Logout clicked');
        localStorage.clear();
        location.href = '/home';
        this.isLoggedIn = false;
    }

    homeClick(event: Event) {
        event.preventDefault();
        console.log('Home clicked');
        location.href = '/home';
    }

    cartClick(event: Event) {
        event.preventDefault();
        console.log('Cart clicked');
        location.href = '/cart';
    }

    adminPanel(event: Event) {
        event.preventDefault();
        console.log('Admin Panel clicked');
        location.href = '/admin-dashboard';
    }

    render() {
        return (
            <div class="nav-elements">
                <h4>{this.isLoggedIn ? `Welcome, ${this.userName || localStorage.getItem('useremail')}` : ''}</h4>
                {!this.isAdmin ? (<div onClick={this.homeClick.bind(this)}>Home</div>) : ''}
                {this.isAdmin ? <div onClick={this.adminPanel.bind(this)}>Admin Panel</div> :
                    <div onClick={this.cartClick.bind(this)}>
                        <i class="bi bi-cart4"></i> <sup>{this.cartItemCount}</sup>
                    </div>
                }
                {this.isLoggedIn ? (
                    <div onClick={this.logoutClick.bind(this)}>Logout <i class="bi bi-power"></i></div>
                ) : (
                    <div onClick={(event: Event) => { event.preventDefault(); location.href = '/login' }}>Login</div>
                )}
            </div>
        );
    }
}
