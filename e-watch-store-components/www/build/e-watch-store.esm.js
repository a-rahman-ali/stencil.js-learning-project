import { B as BUILD, c as consoleDevInfo, H, d as doc, N as NAMESPACE, p as promiseResolve, b as bootstrapLazy } from './index-48480441.js';
export { s as setNonce } from './index-48480441.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Browser v4.18.3 | MIT Licensed | https://stenciljs.com
 */
var patchBrowser = () => {
  if (BUILD.isDev && !BUILD.isTesting) {
    consoleDevInfo("Running in development mode.");
  }
  if (BUILD.cloneNodeFix) {
    patchCloneNodeFix(H.prototype);
  }
  const scriptElm = BUILD.scriptDataOpts ? Array.from(doc.querySelectorAll("script")).find(
    (s) => new RegExp(`/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) || s.getAttribute("data-stencil-namespace") === NAMESPACE
  ) : null;
  const importMeta = import.meta.url;
  const opts = BUILD.scriptDataOpts ? (scriptElm || {})["data-opts"] || {} : {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return promiseResolve(opts);
};
var patchCloneNodeFix = (HTMLElementPrototype) => {
  const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
  HTMLElementPrototype.cloneNode = function(deep) {
    if (this.nodeName === "TEMPLATE") {
      return nativeCloneNodeFn.call(this, deep);
    }
    const clonedNode = nativeCloneNodeFn.call(this, false);
    const srcChildNodes = this.childNodes;
    if (deep) {
      for (let i = 0; i < srcChildNodes.length; i++) {
        if (srcChildNodes[i].nodeType !== 2) {
          clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
        }
      }
    }
    return clonedNode;
  };
};

patchBrowser().then(async (options) => {
  await globalScripts();
  return bootstrapLazy([["nav-bar",[[1,"nav-bar",{"isLoggedIn":[32],"userName":[32],"isAdmin":[32],"cartItemCount":[32]},[[16,"cartItemCountUpdated","cartItemCountUpdatedHandler"]]]]],["header-component",[[1,"header-component",{"isInputEmpty":[32]}]]],["cart-component",[[1,"cart-component",{"cartItems":[32],"isLoading":[32]}]]],["home-component",[[1,"home-component",{"smartwatches":[32],"filteredProducts":[32]}]]],["admin-dashboard",[[1,"admin-dashboard",{"products":[32],"newProduct":[32],"editIndex":[32],"showCard":[32]}]]],["admin-login",[[1,"admin-login",{"email":[32],"password":[32]}]]],["signup-component",[[1,"signup-component",{"username":[32],"email":[32],"password":[32],"userExists":[32],"cart":[32]}]]],["router-component",[[0,"router-component"]]],["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["login-component",[[1,"login-component",{"email":[32],"password":[32]}]]],["not-found",[[1,"not-found"]]],["loading-spinner",[[1,"loading-spinner"]]]], options);
});

//# sourceMappingURL=e-watch-store.esm.js.map