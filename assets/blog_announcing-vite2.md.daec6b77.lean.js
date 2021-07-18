import{o as e,c as r,a as t,b as n}from"./app.19c78100.js";const a='{"title":"Announcing Vite 2.0","description":"","frontmatter":{"sidebar":false},"headers":[{"level":2,"title":"What\'s New in 2.0","slug":"what-s-new-in-2-0"},{"level":3,"title":"Framework Agnostic Core","slug":"framework-agnostic-core"},{"level":3,"title":"New Plugin Format and API","slug":"new-plugin-format-and-api"},{"level":3,"title":"esbuild Powered Dep Pre-Bundling","slug":"esbuild-powered-dep-pre-bundling"},{"level":3,"title":"First-class CSS Support","slug":"first-class-css-support"},{"level":3,"title":"Server-Side Rendering (SSR) Support","slug":"server-side-rendering-ssr-support"},{"level":3,"title":"Opt-in Legacy Browser Support","slug":"opt-in-legacy-browser-support"},{"level":2,"title":"Give it a Try!","slug":"give-it-a-try"}],"relativePath":"blog/announcing-vite2.md","lastUpdated":1626642333027}',o={},i=t("h1",{id:"announcing-vite-2-0"},[t("a",{class:"header-anchor",href:"#announcing-vite-2-0","aria-hidden":"true"},"#"),n("Announcing Vite 2.0")],-1),s=t("p",{style:{"text-align":"center"}},[t("img",{src:"/logo.svg",style:{height:"200px"}})],-1),l=t("p",null,"Today we are excited to announce the official release of Vite 2.0!",-1),d=t("p",null,[n('Vite (French word for "fast", pronounced '),t("code",null,"/vit/"),n(") is a new kind of build tool for frontend web development. Think a pre-configured dev server + bundler combo, but leaner and faster. It leverages browser's "),t("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",target:"_blank",rel:"noopener noreferrer"},"native ES modules"),n(" support and tools written in compile-to-native languages like "),t("a",{href:"https://esbuild.github.io/",target:"_blank",rel:"noopener noreferrer"},"esbuild"),n(" to deliver a snappy and modern development experience.")],-1),p=t("p",null,[n("To get a sense of how fast Vite is, check out "),t("a",{href:"https://twitter.com/amasad/status/1355379680275128321",target:"_blank",rel:"noopener noreferrer"},"this video comparison"),n(" of booting up a React application on "),t("a",{href:"http://Repl.it",target:"_blank",rel:"noopener noreferrer"},"Repl.it"),n(" using Vite vs. "),t("code",null,"create-react-app"),n(" (CRA).")],-1),u=t("p",null,[n("If you've never heard of Vite before and would love to learn more about it, check out "),t("a",{href:"https://vitejs.dev/guide/why.html",target:"_blank",rel:"noopener noreferrer"},"the rationale behind the project"),n(". If you are interested in how Vite differs from other similar tools, check out the "),t("a",{href:"https://vitejs.dev/guide/comparisons.html",target:"_blank",rel:"noopener noreferrer"},"comparisons"),n(".")],-1),h=t("h2",{id:"what-s-new-in-2-0"},[t("a",{class:"header-anchor",href:"#what-s-new-in-2-0","aria-hidden":"true"},"#"),n("What's New in 2.0")],-1),c=t("p",null,"Since we decided to completely refactor the internals before 1.0 got out of RC, this is in fact the first stable release of Vite. That said, Vite 2.0 brings about many big improvements over its previous incarnation:",-1),g=t("h3",{id:"framework-agnostic-core"},[t("a",{class:"header-anchor",href:"#framework-agnostic-core","aria-hidden":"true"},"#"),n("Framework Agnostic Core")],-1),f=t("p",null,[n("The original idea of Vite started as a "),t("a",{href:"https://github.com/vuejs/vue-dev-server",target:"_blank",rel:"noopener noreferrer"},"hacky prototype that serves Vue single-file components over native ESM"),n(". Vite 1 was a continuation of that idea with HMR implemented on top.")],-1),m=t("p",null,[n("Vite 2.0 takes what we learned along the way and is redesigned from scratch with a more robust internal architecture. It is now completely framework agnostic, and all framework-specific support is delegated to plugins. There are now "),t("a",{href:"https://github.com/vitejs/vite/tree/main/packages/create-vite",target:"_blank",rel:"noopener noreferrer"},"official templates for Vue, React, Preact, Lit Element"),n(", and ongoing community efforts for Svelte integration.")],-1),v=t("h3",{id:"new-plugin-format-and-api"},[t("a",{class:"header-anchor",href:"#new-plugin-format-and-api","aria-hidden":"true"},"#"),n("New Plugin Format and API")],-1),b=t("p",null,[n("Inspired by "),t("a",{href:"https://github.com/preactjs/wmr",target:"_blank",rel:"noopener noreferrer"},"WMR"),n(", the new plugin system extends Rollup's plugin interface and is "),t("a",{href:"https://vite-rollup-plugins.patak.dev/",target:"_blank",rel:"noopener noreferrer"},"compatible with many Rollup plugins"),n(" out of the box. Plugins can use Rollup-compatible hooks, with additional Vite-specific hooks and properties to adjust Vite-only behavior (e.g. differentiating dev vs. build or custom handling of HMR).")],-1),w=t("p",null,[n("The "),t("a",{href:"https://vitejs.dev/guide/api-javascript.html",target:"_blank",rel:"noopener noreferrer"},"programmatic API"),n(" has also been greatly improved to facilitate higher level tools / frameworks built on top of Vite.")],-1),k=t("h3",{id:"esbuild-powered-dep-pre-bundling"},[t("a",{class:"header-anchor",href:"#esbuild-powered-dep-pre-bundling","aria-hidden":"true"},"#"),n("esbuild Powered Dep Pre-Bundling")],-1),y=t("p",null,[n("Since Vite is a native ESM dev server, it pre-bundles dependencies to reduce the number browser requests and handle CommonJS to ESM conversion. Previously Vite did this using Rollup, and in 2.0 it now uses "),t("code",null,"esbuild"),n(" which results in 10-100x faster dependency pre-bundling. As a reference, cold-booting a test app with heavy dependencies like React Material UI previously took 28 seconds on an M1-powered Macbook Pro and now takes ~1.5 seconds. Expect similar improvements if you are switching from a traditional bundler based setup.")],-1),S=t("h3",{id:"first-class-css-support"},[t("a",{class:"header-anchor",href:"#first-class-css-support","aria-hidden":"true"},"#"),n("First-class CSS Support")],-1),V=t("p",null,"Vite treats CSS as a first-class citizen of the module graph and supports the following out of the box:",-1),R=t("ul",null,[t("li",null,[t("strong",null,"Resolver enhancement"),n(": "),t("code",null,"@import"),n(" and "),t("code",null,"url()"),n(" paths in CSS are enhanced with Vite's resolver to respect aliases and npm dependencies.")]),t("li",null,[t("strong",null,"URL rebasing"),n(": "),t("code",null,"url()"),n(" paths are automatically rebased regardless of where the file is imported from.")]),t("li",null,[t("strong",null,"CSS code splitting"),n(": a code-split JS chunk also emits a corresponding CSS file, which is automatically loaded in parallel with the JS chunk when requested.")])],-1),j=t("h3",{id:"server-side-rendering-ssr-support"},[t("a",{class:"header-anchor",href:"#server-side-rendering-ssr-support","aria-hidden":"true"},"#"),n("Server-Side Rendering (SSR) Support")],-1),_=t("p",null,[n("Vite 2.0 ships with "),t("a",{href:"https://vitejs.dev/guide/ssr.html",target:"_blank",rel:"noopener noreferrer"},"experimental SSR support"),n(". Vite provides APIs to to efficiently load and update ESM-based source code in Node.js during development (almost like server-side HMR), and automatically externalizes CommonJS-compatible dependencies to improve development and SSR build speed. The production server can be completely decoupled from Vite, and the same setup can be easily adapted to perform pre-rendering / SSG.")],-1),x=t("p",null,"Vite SSR is provided as a low-level feature and we are expecting to see higher level frameworks leveraging it under the hood.",-1),P=t("h3",{id:"opt-in-legacy-browser-support"},[t("a",{class:"header-anchor",href:"#opt-in-legacy-browser-support","aria-hidden":"true"},"#"),n("Opt-in Legacy Browser Support")],-1),T=t("p",null,[n("Vite targets modern browsers with native ESM support by default, but you can also opt-in to support legacy browsers via the official "),t("a",{href:"https://github.com/vitejs/vite/tree/main/packages/plugin-legacy",target:"_blank",rel:"noopener noreferrer"},"@vitejs/plugin-legacy"),n(". The plugin automatically generates dual modern/legacy bundles, and delivers the right bundle based on browser feature detection, ensuring more efficient code in modern browsers that support them.")],-1),M=t("h2",{id:"give-it-a-try"},[t("a",{class:"header-anchor",href:"#give-it-a-try","aria-hidden":"true"},"#"),n("Give it a Try!")],-1),C=t("p",null,"That was a lot of features, but getting started with Vite is simple! You can spin up a Vite-powered app literally in a minute, starting with the following command (make sure you have Node.js >=12):",-1),A=t("div",{class:"language-bash"},[t("pre",null,[t("code",null,[t("span",{class:"token function"},"npm"),n(" init @vitejs/app\n")])])],-1),I=t("p",null,[n("Then, check out "),t("a",{href:"https://vitejs.dev/guide/",target:"_blank",rel:"noopener noreferrer"},"the guide"),n(" to see what Vite provides out of the box. You can also check out the source code on "),t("a",{href:"https://github.com/vitejs/vite",target:"_blank",rel:"noopener noreferrer"},"GitHub"),n(", follow updates on "),t("a",{href:"https://twitter.com/vite_js",target:"_blank",rel:"noopener noreferrer"},"Twitter"),n(", or join discussions with other Vite users on our "),t("a",{href:"http://chat.vitejs.dev/",target:"_blank",rel:"noopener noreferrer"},"Discord chat server"),n(".")],-1);o.render=function(t,n,a,o,E,F){return e(),r("div",null,[i,s,l,d,p,u,h,c,g,f,m,v,b,w,k,y,S,V,R,j,_,x,P,T,M,C,A,I])};export default o;export{a as __pageData};
