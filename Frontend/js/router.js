export class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
    }

    init() {
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.page) {
                this.navigateTo(event.state.page, event.state.params, false);
            }
        });
    }

    addRoute(path, handler) {
        this.routes.set(path, handler);
    }

    navigateTo(page, params = {}, pushState = true) {
        if (pushState) {
            history.pushState({ page, params }, '', `#${page}`);
        }
        this.currentRoute = { page, params };
    }
}