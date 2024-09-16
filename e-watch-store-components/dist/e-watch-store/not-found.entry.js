import { r as registerInstance, h, e as Host } from './index-48480441.js';

const notFoundCss = ":host{display:block;background-image:url(\"https://static.vecteezy.com/system/resources/previews/023/372/283/non_2x/broken-electronic-wristwatch-broken-smart-watch-screen-generative-ai-photo.jpg\");background-repeat:no-repeat;background-size:cover;background-position:center;min-height:100vh}.not-found{display:flex;justify-content:center;align-items:center;flex-direction:column;color:rgb(232, 232, 231);text-align:center;padding:50px 50px;margin:100px}.not-found a{color:red}";

const NotFound = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, { key: '0aef1ad637a8e15cfa516f8aa083cb3ca9ea1b39' }, h("div", { key: 'a37d6796c33dafc5961e0f03b44cc7be7581746e', class: "not-found" }, h("header-component", { key: 'cbe45fd3a9ffda65fafaf0be2304e0cdfaef8a2d' }), h("h1", { key: '80f2dadba40b7db0c7fbc8c2da45c35c1372e1eb' }, "404"), h("h2", { key: '989464d957984e7e6a678c6afa307c59f8a03c6f' }, "Page Not Found"), h("p", { key: 'b11accd600b9e41abf9472d8688dd038e66ba003' }, "The requested page could not be found."), h("a", { key: '63f18f95ed75dff2d9b6795e51948c39170ce2c7', href: "/home" }, "Back to Home"))));
    }
};
NotFound.style = notFoundCss;

export { NotFound as not_found };

//# sourceMappingURL=not-found.entry.js.map