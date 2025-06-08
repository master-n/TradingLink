import Vue from 'vue'
import VueMeta from 'vue-meta'
import store from '/src/store/store'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)
Vue.use(VueMeta, {
    keyName: 'page',
})

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { x: 0, y: 0 }
    },
})

// Before each route evaluates...
router.beforeEach((routeTo, routeFrom, next) => {
    const publicPages = ['/login','register', '/forgot-password', '/admin/login'];
    const authRequired = routeTo.matched.some(route => route.meta.authRequired);
    const loggedUser = store.getters.GET_USER_INFO;

    if (!loggedUser && authRequired) {
        store.dispatch('setRedirectPath', routeTo.fullPath);

        if (routeTo.path.startsWith('/admin')) {
            return next('/admin/login');
        } else if (routeTo.path.startsWith('/branch')) {
            return next('/branch/login');
        }
        return next('/login');
    }

    if (loggedUser) {
        const userRole = loggedUser.roles?.[0] || '';
        const userPermissions = loggedUser.permissions || [];
        console.log('permmisiosnf')
        if (publicPages.includes(routeTo.path)) {
            if (userRole === 'admin') return next('/admin');
            if (userRole === 'branch') return next('/branch/home');
            if (userRole === 'customer' || userRole === 'vendor_manager') return next('/');
            if (userRole === 'customer_service') return next('/customer-service');
            return next('/error/403');
        }

        // Check role-based access
        const routeRoles = routeTo.matched.flatMap(route => route.meta.roles || []);
        if (routeRoles.length > 0 && !routeRoles.includes(userRole)) {
            if (userRole === 'admin') return next('/admin');
            if (userRole === 'branch') return next('/branch/home');
            if (userRole === 'customer_service') return next('/customer-service');
            if (userRole === 'customer' || userRole === 'vendor_manager') return next('/');
            return next('/error/403');
        }

        // Check permission-based access (exclude admin, branch, customer, and customer_service)
        if (!['admin', 'branch', 'customer'].includes(userRole)) {
            const requiredPermissions = routeTo.matched.flatMap(route => route.meta.permissions || []);
            const hasPermission = requiredPermissions.every(permission => userPermissions.includes(permission));

            if (requiredPermissions.length > 0 && !hasPermission) {
                return next('/error/403'); // Redirect unauthorized users
            }
        }

        // Handle redirect after login if a redirect path is saved
        const redirectPath = store.getters.GET_REDIRECT_PATH;
        if (redirectPath) {
            store.dispatch('clearRedirectPath');
            return next(redirectPath);
        }
    }

    store.dispatch('setRoutePath', {
        to: routeTo.fullPath,
        from: routeFrom.fullPath,
    });

    next();
});

// Ensure data is fetched before resolving routes
router.beforeResolve(async (routeTo, routeFrom, next) => {
    try {
        for (const route of routeTo.matched) {
            await new Promise((resolve, reject) => {
                if (route.meta?.beforeResolve) {
                    route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
                        if (args.length) {
                            next(...args);
                            reject(new Error('Redirected'));
                        } else {
                            resolve();
                        }
                    });
                } else {
                    resolve();
                }
            });
        }
    } catch (error) {
        return;
    }
    next();
});

export default router;
