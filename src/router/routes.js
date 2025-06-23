import store from '../store/store'

export default [

    //////// AUTHENTICATION ROUTES /////////////////////////
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/pages/auth/login'),
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
        component: () => import('../views/pages/auth/register'),
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
        component: () => import('../views/pages/auth/create-account'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If logged in but not completed auth creation
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
        component: () => import('../views/pages/auth/about-you'),
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
        component: () => import('../views/pages/auth/professions'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                if (store.getters.GET_USER_INFO) {
                    if (store.getters.GET_USER_INFO.status === 'complete') {
                        next({name: 'profile'});
                        return;
                    }
                    if (store.getters.GET_USER_INFO.registration_step >= 2 || routeFrom.name === 'about-you') {
                        next()
                        return;
                    }
                    next({name: 'profile'});
                } else {
                    next({name: 'Home'});
                }

            },

        },
    },
    {
        path: '/travel-to-work',
        name: 'travel',
        component: () => import('../views/pages/auth/travel-to-work'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                if (store.getters.GET_USER_INFO) {
                    if (store.getters.GET_USER_INFO.status === 'complete') {
                        next({name: 'profile'});
                        return;
                    }
                    if (store.getters.GET_USER_INFO.registration_step >= 3 || routeFrom.name === 'professions') {
                        next()
                        return;
                    }
                    next({name: 'profile'});
                } else {
                    next({name: 'Home'});
                }

            },
        },
    },
    {
        path: '/business-type',
        name: 'businessType',
        component: () => import('../views/pages/auth/business-type'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                if (store.getters.GET_USER_INFO) {
                    if (store.getters.GET_USER_INFO.status === 'complete') {
                        next({name: 'profile'});
                        return;
                    }
                    if (store.getters.GET_USER_INFO.registration_step >= 4 || routeFrom.name === 'travel') {
                        next()
                        return;
                    }
                    next({name: 'profile'});
                } else {
                    next({name: 'Home'});
                }

            },

        },
    },
    {
        path: '/business-details',
        name: 'businessDetails',
        component: () => import('../views/pages/auth/business-details'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                if (store.getters.GET_USER_INFO) {
                    if (store.getters.GET_USER_INFO.status === 'complete') {
                        next({name: 'profile'});
                        return;
                    }
                    if (store.getters.GET_USER_INFO.registration_step >= 5 || routeFrom.name === 'businessType') {
                        next()
                        return;
                    }
                    next({name: 'profile'});
                } else {
                    next({name: 'Home'});
                }

            },

        },
    },
    {
        path: '/verify-identity',
        name: 'verifyIdentity',
        component: () => import('../views/pages/auth/verify-identity'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                if (store.getters.GET_USER_INFO) {
                    if (store.getters.GET_USER_INFO.status === 'complete') {
                        next({name: 'profile'});
                        return;
                    }
                    if (store.getters.GET_USER_INFO.registration_step >= 6 || routeFrom.name === 'businessDetails') {
                        next()
                        return;
                    }
                    next({name: 'profile'});
                } else {
                    next({name: 'Home'});
                }

            },
        },
    },
    {
        path: '/id-verification',
        name: 'idVerification',
        component: () => import('../views/pages/auth/id-verification'),
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
        component: () => import('../views/pages/auth/verify-skills'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                if (store.getters.GET_USER_INFO) {
                    if (store.getters.GET_USER_INFO.status === 'complete') {
                        next({name: 'profile'});
                        return;
                    }
                    if (store.getters.GET_USER_INFO.registration_step >= 7 || routeFrom.name === 'idVerification') {
                        next()
                        return;
                    }
                    next({name: 'profile'});
                } else {
                    next({name: 'Home'});
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
        path: '/profile-menu',
        name: 'profileMenu',
        meta:{
            authRequired: true,
        },
        component: () => import('../views/base-layout/navigation/small-screen-profile-menu'),
    },
    {
        path: '/profile',
        name: 'profile',
        meta:{
            authRequired: true,
        },
        component: () => import('../views/pages/company-description'),
    },
    {
        path: '/user-profile',
        name: 'user-profile',
        meta:{
            authRequired: true,
        },
        component: () => import('../views/pages/user-profile'),
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
        path: '/inbox',
        name: 'inbox',
        meta:{
            authRequired: true,
        },
        component: () => import('../views/pages/inbox'),
    },
    {
        path: '/contact-details',
        name: 'contact-details',
        meta:{
            authRequired: true,
        },
        component: () => import('../views/pages/account/contact-details'),
    },
    {
        path: '/manage-account',
        name: 'manage-account',
        meta:{
            authRequired: true,
        },
        component: () => import('../views/pages/account/manage-account'),
    },

    {
        path: '/auth-login',
        name: 'auth-login',
        meta:{
            authRequired: true,
        },
        component: () => import('../views/pages/auth/auth-login'),
    },

    {
        path: '/saved-leads',
        name: 'saved-leads',
        meta:{
            authRequired: true,
        },
        component: () => import('../views/pages/account/saved-leads'),
    },

    {
        path: '/new-leads',
        name: 'new-leads',
        meta:{
            authRequired: true,
        },
        component: () => import('../views/pages/new-leads'),
    },

    {
        path: '/work-area',
        name: 'work-area',
        meta:{
            authRequired: true,
        },
        component: () => import('../views/pages/lead-settings/work-area'),
    },
    {
        path: '/services',
        name: 'services',
        meta:{
            authRequired: true,
        },
        component: () => import('../views/pages/lead-settings/services'),
    },
    {
        path: '/notifications',
        name: 'notifications',
        meta:{
            authRequired: true,
        },
        component: () => import('../views/pages/lead-settings/notifications'),
    },
    {
        path: '/support',
        name: 'support',
        meta:{
            authRequired: true,
        },
        component: () => import('../views/pages/support/support'),
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