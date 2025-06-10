import store from '../store/store'

export default [

    //////// AUTHENTICATION ROUTES /////////////////////////
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/pages/account/login'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {

                // If the user is already logged in
                if (store.getters.GET_USER_INFO) {
                    next({name: 'Home'});
                } else {
                    // Continue to the login page
                    next()
                }

            },
        },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/pages/account/register'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                const user = store.getters.GET_USER_INFO;
                if (user) {
                    next({name: 'Home'});
                } else {
                    // Continue to the login page
                    next()
                }

            },
        },
    },
    {
        path: '/create-account',
        name: 'createAccount',
        component: () => import('../views/pages/account/create-account'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If logged in but not completed account creation
                const user = store.getters.GET_USER_INFO;
                if (user && !user.access_token) {
                    next()
                } else {
                    next({name: 'Home'});

                }

            },
        },
    },
    {
        path: '/about-you',
        name: 'about-you',
        component: () => import('../views/pages/account/about-you'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                const user = store.getters.GET_USER_INFO;
                // If the user is logged in and has generated a token
                if (user && user.access_token) {
                    next()
                } else {
                    next({name: 'Home'});
                }

            },
        },
    },
    {
        path: '/professions',
        name: 'professions',
        component: () => import('../views/pages/account/professions'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {

                // If the user is already logged in
                if (store.getters.GET_USER_INFO && store.getters.GET_USER_INFO.status === 'complete') {
                    next({name: 'Home'});
                } else {
                    // Continue to the login page
                    next()
                }

            },
        },
    },
    {
        path: '/travel-to-work',
        name: 'travel',
        component: () => import('../views/pages/account/travel-to-work'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {

                // If the user is already logged in
                if (store.getters.GET_USER_INFO && store.getters.GET_USER_INFO.status === 'complete') {
                    next({name: 'Home'});
                } else {
                    // Continue to the login page
                    next()
                }

            },
        },
    },
    {
        path: '/business-type',
        name: 'businessType',
        component: () => import('../views/pages/account/business-type'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {

                // If the user is already logged in
                if (store.getters.GET_USER_INFO && store.getters.GET_USER_INFO.status === 'complete') {
                    next({name: 'Home'});
                } else {
                    // Continue to the login page
                    next()
                }

            },
        },
    },
    {
        path: '/business-details',
        name: 'businessDetails',
        component: () => import('../views/pages/account/business-details'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {

                // If the user is already logged in
                if (store.getters.GET_USER_INFO && store.getters.GET_USER_INFO.status === 'complete') {
                    next({name: 'Home'});
                } else {
                    // Continue to the login page
                    next()
                }

            },
        },
    },
    {
        path: '/verify-identity',
        name: 'verifyIdentity',
        component: () => import('../views/pages/account/verify-identity'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {

                // If the user is already logged in
                if (store.getters.GET_USER_INFO && store.getters.GET_USER_INFO.status === 'complete') {
                    next({name: 'Home'});
                } else {
                    // Continue to the login page
                    next()
                }

            },
        },
    },
    {
        path: '/id-verification',
        name: 'idVerification',
        component: () => import('../views/pages/account/id-verification'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {

                // If the user is already logged in
                if (store.getters.GET_USER_INFO && store.getters.GET_USER_INFO.status === 'complete') {
                    next({name: 'Home'});
                } else {
                    // Continue to the login page
                    next()
                }

            },
        },
    },
    {
        path: '/verify-skills',
        name: 'skillVerification',
        component: () => import('../views/pages/account/verify-skills'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {

                // If the user is already logged in
                if (store.getters.GET_USER_INFO && store.getters.GET_USER_INFO.status === 'complete') {
                    next({name: 'Home'});
                } else {
                    // Continue to the login page
                    next()
                }

            },
        },
    },
    ///////////////////////// DASHBOARD ROUTES /////////////////////////////////
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/pages/home'),
    },
    {
        path: '/profile',
        name: 'profile-bio',
        meta:{
            authRequired: true,
        },
        component: () => import('../views/pages/profile'),
    },
    {
        path: '/company-description',
        name: 'company-desc',
        meta:{
            authRequired: true,
        },
        component: () => import('../views/pages/company-description'),
    },
    {
        path: '/reviews',
        name: 'reviews',
        meta:{
            authRequired: true,
        },
        component: () => import('../views/pages/reviews'),
    },
    {
        path: '/portfolio',
        name: 'portfolio',
        meta:{
            authRequired: true,
        },
        component: () => import('../views/pages/portfolio'),
    },
    {
        path: '/contact-details',
        name: 'contact-details',
        meta:{
            authRequired: true,
        },
        component: () => import('../views/pages/contact-details'),
    },
    {
        path: '/manage-account',
        name: 'manage-account',
        meta:{
            authRequired: true,
        },
        component: () => import('../views/pages/manage-account'),
    },
    {
        path: '/saved-leads',
        name: 'saved-leads',
        meta:{
            authRequired: true,
        },
        component: () => import('../views/pages/saved-leads'),
    },

    ///////// EXTRA ROUTES //////////////////////////
    {
        name: 'Logout',
        path: '/logout',
        component: () => import('../views/pages/error/logout'),
    },
    {
        path: '/extras/maintenance',
        name: 'extras-maintenance',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/maintenance')
    },
    {
        path: '/extras/coming-soon',
        name: 'extras-coming-soon',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/coming-soon')
    },
    {
        path: '/error/404',
        name: 'error-404',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/error/404')
    },
    {
        path: '/error/500',
        name: 'error-500',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/error/500')
    },

    {
        path: "*",
        redirect: "/error/404"
    }
]