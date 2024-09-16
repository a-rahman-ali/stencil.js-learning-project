import { r as registerInstance, h } from './index-48480441.js';

const loadingSpinnerCss = ":host{display:flex;justify-content:center;align-items:center;}.lds-roller{box-sizing:border-box;display:inline-block;position:relative;width:80px;height:80px}.lds-roller,.lds-roller div,.lds-roller div:after{box-sizing:border-box}.lds-roller{display:inline-block;position:relative;width:80px;height:80px}.lds-roller div{animation:lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;transform-origin:40px 40px}.lds-roller div:after{content:\" \";display:block;position:absolute;width:7.2px;height:7.2px;border-radius:50%;background:currentColor;margin:-3.6px 0 0 -3.6px}.lds-roller div:nth-child(1){animation-delay:-0.036s}.lds-roller div:nth-child(1):after{top:62.62742px;left:62.62742px}.lds-roller div:nth-child(2){animation-delay:-0.072s}.lds-roller div:nth-child(2):after{top:67.71281px;left:56px}.lds-roller div:nth-child(3){animation-delay:-0.108s}.lds-roller div:nth-child(3):after{top:70.90963px;left:48.28221px}.lds-roller div:nth-child(4){animation-delay:-0.144s}.lds-roller div:nth-child(4):after{top:72px;left:40px}.lds-roller div:nth-child(5){animation-delay:-0.18s}.lds-roller div:nth-child(5):after{top:70.90963px;left:31.71779px}.lds-roller div:nth-child(6){animation-delay:-0.216s}.lds-roller div:nth-child(6):after{top:67.71281px;left:24px}.lds-roller div:nth-child(7){animation-delay:-0.252s}.lds-roller div:nth-child(7):after{top:62.62742px;left:17.37258px}.lds-roller div:nth-child(8){animation-delay:-0.288s}.lds-roller div:nth-child(8):after{top:56px;left:12.28719px}@keyframes lds-roller{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const LoadingSpinner = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        let spinnerDiv = (h("div", { key: '151fb32e0277c9f64a05ad54ea88da051233699d', class: "lds-roller" }, h("div", { key: '09e05c4f63d91161476ed24bb4a84f49e14671f9' }), h("div", { key: '8c10042d62be68b6bda7f0d09c011ec2379c9858' }), h("div", { key: '8e55687bfc59951bd50638529c91b3873530216e' }), h("div", { key: '98bbad473f97448321be9298b38e39de36830ccc' }), h("div", { key: '02dc935182d88c92cfb986ed40333ff29639aabc' }), h("div", { key: '9f4c008210a91102568938840a8e04b04982de77' }), h("div", { key: 'eb0e9488d73aa7facc46f429047b41cafae611bc' }), h("div", { key: 'c7a11822f7c386bd376738813ebbb4a962c8186d' })));
        return spinnerDiv;
    }
};
LoadingSpinner.style = loadingSpinnerCss;

export { LoadingSpinner as loading_spinner };

//# sourceMappingURL=loading-spinner.entry.js.map