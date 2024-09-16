import { EventEmitter } from '../../stencil-public-runtime';
export declare class HeaderComponent {
    searchEvent: EventEmitter<string>;
    inputElement: HTMLInputElement;
    isInputEmpty: boolean;
    handleUserInput(): void;
    handleInputChange: () => void;
    render(): any;
}
