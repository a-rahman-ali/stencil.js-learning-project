import { Component, h } from "@stencil/core";

@Component({
    tag: 'loading-spinner',
    styleUrl: 'loading-spinner.css',
    shadow: true
})
export class LoadingSpinner {
    render() {
        let spinnerDiv = (
            <div class="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
        return spinnerDiv;
    }
}