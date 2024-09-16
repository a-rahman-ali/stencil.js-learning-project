import { Component, Host, h, EventEmitter, Event, State } from '@stencil/core';

@Component({
    tag: 'header-component',
    styleUrl: 'header-component.css',
    shadow: true,
})
export class HeaderComponent {

    @Event({ eventName: 'searchEvent', bubbles: true, composed: true }) searchEvent: EventEmitter<string>;

    inputElement: HTMLInputElement;
    @State() isInputEmpty: boolean = true;

    handleUserInput() {
        console.log('Entering search');
        console.log(this.inputElement?.value)
        if (this.inputElement && this.inputElement.value.trim() !== '') {
            const searchQuery = this.inputElement.value.trim();
            this.searchEvent.emit(searchQuery);
        }
    }

    handleInputChange = () => {
        this.isInputEmpty = this.inputElement.value.trim() === '';
        // this.handleUserInput();
    };

    render() {
        return (
            <Host>
                <header class="header">
                    <h1 onClick={() => location.href = '/home'}>e-Watch Store</h1>
                    <span>
                        <input type="text" required placeholder="Search Smart Watches"
                            ref={(el) => this.inputElement = el as HTMLInputElement}
                            onInput={this.handleInputChange.bind(this)} />
                        <button class="bi bi-search" onClick={() => this.handleUserInput()} disabled={this.isInputEmpty}></button>
                    </span>
                    <nav-bar></nav-bar>
                </header>
            </Host>
        );
    }

}
