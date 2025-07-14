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
        path: '/faq',
        name: 'faq',
        component: () => import('../views/pages/faq'),
    },
    {
        path: '/find-tradesperson',
        name: 'findTradesperson',
        component: () => import('../views/pages/find-tradesperson'),
    },
    {
        path: '/admin',
        name: 'admin',
        meta: {
            authRequired:false,
        },
        component: () => import('../views/pages/admin/trades'),
    },
    {
        path: '/admin/job-posts',
        name: 'jobPosts',
        meta: {
            authRequired:false,
        },
        component: () => import('../views/pages/admin/jobs'),
    },
    {
        path: '/admin/trades',
        name: 'adminTrades',
        meta: {
            authRequired:false,
        },
        component: () => import('../views/pages/admin/trades'),
    },
    {
        path: '/jobs/:id',
        name: 'jobDetails',
        component: () => import('../views/pages/admin/job-details'),
    },
    {
        path: '/question-builder',
        name: 'questionBuilder',
        component: () => import('../views/pages/admin/question-builder'),
    },
    {
        path: '/admin/homeowners',
        name: 'homeowners',
        component: () => import('../views/pages/admin/homeowner'),
    },
    {
        path: '/admin/tradespeople',
        name: 'tradespeople',
        component: () => import('../views/pages/admin/tradespeople'),
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
            authRequired: true,
            roles: ['tradesperson'],
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
            authRequired: true,
            roles: ['tradesperson'],
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
            authRequired: true,
            roles: ['tradesperson'],
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
            authRequired: true,
            roles: ['tradesperson'],
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
            authRequired: true,
            roles: ['tradesperson'],
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
            authRequired: true,
            roles: ['tradesperson'],
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
            authRequired: true,
            roles: ['tradesperson'],
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters.GET_USER_INFO && store.getters.GET_USER_INFO.status === 'complete') {
                    next({name: 'Home'});
                } else {
                    // Continue to the login page
                   return next()
                }

            },
        },
    },
    {
        path: '/verify-skills',
        name: 'skillVerification',
        component: () => import('../views/pages/auth/verify-skills'),
        meta: {
            authRequired: true,
            roles: ['tradesperson'],
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
        path: '/post-a-job',
        name: 'postJob',
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                const loggedUser = store.getters.GET_USER_INFO;

                // Allow access if user is not logged in
                if (!loggedUser) {
                    return next();
                }

                // Allow access if user is logged in and role is 'homeowner'
                const userRole = loggedUser.roles?.[0] || '';
                if (userRole === 'homeowner') {
                    return next();
                }

                // Otherwise, redirect to unauthorized
                return next({name: 'unauthorized'});
            },
        },
        component: () => import('../views/pages/home/post-job'),
    },


    {
        path: '/service-request-posted/:id',
        name: 'serviceRequestPosted',
        meta: {
            authRequired: true,
            beforeResolve(routeTo, routeFrom, next) {
                const loggedUser = store.getters.GET_USER_INFO;

                // Allow access if user is not logged in
                if (!loggedUser) {
                    return next();
                }

                // Allow access if user is logged in and role is 'homeowner'
                const userRole = loggedUser.roles?.[0] || '';
                if (userRole === 'homeowner') {
                    return next();
                }

                // Otherwise, redirect to unauthorized
                return next({name: 'unauthorized'});
            },
        },

        component: () => import('../views/pages/homeowner/service-request-posted'),
    },
    {
        path: '/profile-menu',
        name: 'profileMenu',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/base-layout/navigation/small-screen-profile-menu'),
    },
    {
        path: '/homeowner/profile-menu',
        name: 'homeownerProfileMenu',
        meta: {
            authRequired: true,
            roles: ['homeowner'],
        },
        component: () => import('../views/base-layout/navigation/small-screen-owner-menu'),
    },
    {
        path: '/projects/menu/:id',
        name: 'projectMenu',
        meta: {
            authRequired: true,
            roles: ['homeowner']
        },
        component: () => import('../views/base-layout/navigation/home-owner-sm-menu'),
    },
    {
        path: '/tradesperson-recommendation/:id',
        name: 'tradesperson-recommendation',
        meta: {
            authRequired: true,
            roles: ['homeowner']
        },
        component: () => import('../views/pages/homeowner/tradesperson-recommendation'),
    },
    {
        path: '/homeowner/my-contact-details',
        name: 'homeownerContactDetails',
        meta: {
            authRequired: true,
            roles: ['homeowner']
        },
        component: () => import('../views/pages/homeowner/my-contact-details'),
    },
    {
        path: '/homeowner/manage-account',
        name: 'homeownerManageAccount',
        meta: {
            authRequired: true,
            roles: ['homeowner']
        },
        component: () => import('../views/pages/homeowner/my-account'),
    },
    {
        path: '/homeowner/notification-settings',
        name: 'homeownerNotificationSettings',
        meta: {
            authRequired: true,
            roles: ['homeowner']
        },
        component: () => import('../views/pages/homeowner/notifications-settings'),
    },
    {
        path: '/my-projects/:id',
        name: 'project-details',
        meta: {
            authRequired: true,
            roles: ['homeowner']
        },
        component: () => import('../views/pages/homeowner/project-details'),
    },
    {
        path: '/profile',
        name: 'profile',
        meta: {
            authRequired: true,
            roles: ['tradesperson']
        },
        component: () => import('../views/pages/company-description'),
    },
    {
        path: '/who-viewed-my-profile',
        name: 'profileView',
        meta: {
            authRequired: true,
            roles: ['tradesperson']
        },
        component: () => import('../views/pages/profile-views'),
    },
    {
        path: '/user-profile/:userId',
        name: 'user-profile',
        component: () => import('../views/pages/user-profile'),
    },
    {
        path: '/company-description',
        name: 'company-desc',
        meta:{
            authRequired: true,
            roles: ['tradesperson']
        },
        component: () => import('../views/pages/company-description'),
    },
    {
        path: '/reviews',
        name: 'reviews',
        meta:{
            authRequired: true,
            roles: ['tradesperson']
        },
        component: () => import('../views/pages/reviews'),
    },
    {
        path: '/portfolio',
        name: 'portfolio',
        meta:{
            authRequired: true,
            roles: ['tradesperson']
        },
        component: () => import('../views/pages/portfolio'),
    },
    {
        path: '/inbox',
        name: 'inbox',
        meta: {
            authRequired: true,
            roles: ['tradesperson']

        },
        component: () => import('../views/pages/inbox'),
    },

    {
        path: '/chat',
        name: 'chat',
        meta: {
            authRequired: true,
            roles: ['tradesperson']

        },
        component: () => import('../views/pages/chat'),
    },
    {
        path: '/contact-details',
        name: 'contact-details',
        meta: {
            authRequired: true,
            roles: ['tradesperson']

        },
        component: () => import('../views/pages/account/contact-details'),
    },
    {
        path: '/manage-account',
        name: 'manage-account',
        meta: {
            authRequired: true,
            roles: ['tradesperson']

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
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/new-leads'),
    },

    {
        path: '/job-lead-details/:name/:id',
        name: 'leadDetails',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/job-lead-details'),
    },

    {
        path: '/homeowner/my-projects',
        name: 'homeowner-my-projects',
        meta: {
            authRequired: true,
            roles: ['homeowner']

        },
        component: () => import('../views/pages/homeowner/my-projects'),
    },

    {
        path: '/work-area',
        name: 'work-area',
        meta:{
            authRequired: true,
            roles: ['tradesperson']

        },
        component: () => import('../views/pages/lead-settings/work-area'),
    },
    {
        path: '/services',
        name: 'services',
        meta:{
            authRequired: true,
            roles: ['tradesperson']
        },
        component: () => import('../views/pages/lead-settings/services'),
    },
    {
        path: '/notifications',
        name: 'notifications',
        meta:{
            authRequired: true,
            roles: ['tradesperson']
        },
        component: () => import('../views/pages/lead-settings/notifications'),
    },
    {
        path: '/support',
        name: 'support',
        meta: {
            authRequired: true,
            roles: ['tradesperson']
        },
        component: () => import('../views/pages/support/support'),
    },
    {
        path: '/ask-a-trade',
        name: 'AskATrade',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ask-a-trade'),
    },

    {
        path: '/my-proposals/contacts',
        name: 'MyProposalsContacts',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/my-contacts'),
    },

    ///////// EXTRA ROUTES //////////////////////////
    {
        path: '/logout',
        name: 'Logout',
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
        path: '/unauthorized',
        name: 'unauthorized',
        component: () => import('../views/pages/error/unauthorized')
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