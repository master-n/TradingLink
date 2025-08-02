import {useBasicAuthHeaders, useBearerTokenHeaders} from "@/utils/functions";
import axios from "../axios/axios-kaqadmin";

export const userService = {
    login,
    adminLogin,
    adminRegister,
    logout,
    getTrades,
    homeOwnerJobPosts,
    getForumQuestions,
    getProfileViews,
    getForumQuestionDetails,
    searchForum,
    askQuestions,
    submitQuestionComment,
    submitReply,
    postJobTrades,
    postProfileView,
    contactFormSubmit,
    verifyIdentity,
    completeJob,
    submitRating,
    getTradespersonsByTrade,
    getTradesperson,
    getTradeQuestion,
    getParisCities,
    getServiceInvites,
    getUserInterest,
    createAccount,
    registerHomeOwner,
    signUp,
    saveProfession,
    sendInvite,
    inviteTradesperson,
    saveTravelToWork,
    workArea,
    businessType,
    businessDetails,
    idVerification,
    proofOfSkills,
    verifyEmail,
    getUserInfo,
    getGuarantee,
    getProjectDetails,
    getProjectInterest,
    jobDetails,
    adminJobDetails,
    getPostedServices,
    getJobPosts,
    getJobsNearMe,
    userStats,
    getTradePeople,
    getHomeowners,
    updateGuarantee,
    getPortfolio,
    getBusinessType,
    getProfessions,
    getBusinessDetails,
    getUserProfile,
    getIdStatus,
    checkIdVerified,
    editPortfolio,
    editTrade,
    addPortfolio,
    getRecommendedTradesperson,
    getRatings,
    savePortfolioOrder,
    deletePortfolio,
    deleteTrades,
    createTrade,
    resendVerifyEmail,
    getPermissions,
    verifyHomeOwner,
    postJob,
    acceptInvite,
    getAcceptedInterest,
    addAdmins,
    saveTradeQuestions,
    editAdmin,
    resendPasswordAdmin,
    forgotPassword,
    resetPassword,
    updatePersonalInfo,
    changePassword
};

function login(email, password) {
    //// fetch from the server
    const data = {
        "grant_type": "password",
        "username": email,
        password,
    }

    return new Promise((resolve) => {
        axios.post('/api/oauth/token', data, useBasicAuthHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function adminLogin(email, password) {
    const data = {
        "grant_type": "password",
        "client_id": process.env.VUE_APP_ADMIN_CLIENT_ID,
        "client_secret": process.env.VUE_APP_ADMIN_CLIENT_SECRET,
        "username": email,
        "password": password,
        "scope": "*"
    }

    return new Promise((resolve) => {
        axios.post('/admin/api/login', data, useBasicAuthHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function adminRegister(payload) {
    return new Promise((resolve) => {
        axios.post('/admin/api/sign-up', payload, useBasicAuthHeaders())
            .then(response => {
                 resolve(response.data)
        }).catch(err => resolve({status: false, message: err}));
    })
}

function signUp(payload) {
    return new Promise((resolve) => {
        axios.post('/api/sign-up', payload, useBasicAuthHeaders())
            .then(response => {
                 resolve(response.data)
        }).catch(err => resolve({status: false, message: err}));
    })
}

function createAccount(payload) {
    return new Promise((resolve) => {
        axios.post('/api/create-account', payload, useBasicAuthHeaders())
            .then(response => {
                 resolve(response.data)
        }).catch(err => resolve({status: false, message: err}));
    })

}

function registerHomeOwner(payload) {
    return new Promise((resolve) => {
        axios.post('/job-poster/api/register-home-owner', payload, useBasicAuthHeaders())
            .then(response => {
                 resolve(response.data)
        }).catch(err => resolve({status: false, message: err}));
    })

}

function saveProfession(payload) {
    return new Promise((resolve) => {
        axios.post('/api/profession', payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function sendInvite(payload) {
    return new Promise((resolve) => {
        axios.post('/api/invites', payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function inviteTradesperson(payload) {
    return new Promise((resolve) => {
        axios.post('/api/invite-tradesperson', payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function saveTravelToWork(payload) {
    return new Promise((resolve) => {
        axios.post('/api/travel-to-work', payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function workArea(payload) {
    return new Promise((resolve) => {
        axios.post('/api/work-area', payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function businessType(payload) {
    return new Promise((resolve) => {
        axios.post('/api/business-type', payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function businessDetails(payload) {
    return new Promise((resolve) => {
        axios.post('/api/business-details', payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function idVerification(formData) {
    return new Promise((resolve, reject) => {
        axios.post('/api/verify-identity', formData, useBearerTokenHeaders(true))
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}


function proofOfSkills(formData) {
    return new Promise((resolve, reject) => {
        axios.post('/api/proof-of-skills', formData, useBearerTokenHeaders(true))
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })

}

function getUserInfo() {
    return new Promise((resolve) => {
        axios.get(`/api/user`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getGuarantee() {
    return new Promise((resolve) => {
        axios.get(`/api/user/guarantee`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getProjectDetails(id) {
    return new Promise((resolve) => {
        axios.get(`/api/project/${id}`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getProjectInterest(id) {
    return new Promise((resolve) => {
        axios.get(`/api/project/${id}/interests`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function adminJobDetails(id) {
    return new Promise((resolve) => {
        axios.get(`/admin/api/job/${id}`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}


function jobDetails(id) {
    return new Promise((resolve) => {
        axios.get(`/api/job/${id}`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getPostedServices() {
    return new Promise((resolve) => {
        axios.get(`/api/posted-services`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getJobPosts() {
    return new Promise((resolve) => {
        axios.get(`/admin/api/job-posts`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function homeOwnerJobPosts(id) {
    return new Promise((resolve) => {
        axios.get(`/admin/api/job-posts-by-homeowner/${id}`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getJobsNearMe() {
    return new Promise((resolve) => {
        axios.get(`/api/get-jobs-near-me`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function userStats() {
    return new Promise((resolve) => {
        axios.get(`/api/user-stats`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getTradePeople() {
    return new Promise((resolve) => {
        axios.get(`/admin/api/tradespeople`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getHomeowners() {
    return new Promise((resolve) => {
        axios.get(`/admin/api/homeowners`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getRecommendedTradesperson(service_id) {
    return new Promise((resolve) => {
        axios.get(`/api/recommended/tradesperson/${service_id}`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getRatings(id) {
    return new Promise((resolve) => {
        axios.get(`/api/user/rating/${id}`, useBasicAuthHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function updateGuarantee(payload) {
    return new Promise((resolve) => {
        axios.post('/api/update-guarantee', payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getPortfolio() {
    return new Promise((resolve) => {
        axios.get(`/api/get-portfolio`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getBusinessType() {
    return new Promise((resolve) => {
        axios.get(`/api/business-type`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getProfessions() {
    return new Promise((resolve) => {
        axios.get(`/api/professions`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getBusinessDetails() {
    return new Promise((resolve) => {
        axios.get(`/api/business-details`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}
function getUserProfile(userId) {
    return new Promise((resolve) => {
        axios.get(`/admin/api/user-profile/${userId}`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getTradesperson(userId) {
    return new Promise((resolve) => {
        axios.get(`/admin/api/tradesperson/${userId}`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getIdStatus() {
    return new Promise((resolve) => {
        axios.get(`/api/id-status`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function checkIdVerified() {
    return new Promise((resolve) => {
        axios.get(`/api/check-id-verified`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function editPortfolio(formData, id) {
    return new Promise((resolve) => {
        axios.post('/api/edit-portfolio/' + id, formData, useBearerTokenHeaders(true))
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function editTrade(formData, id) {
    return new Promise((resolve) => {
        axios.post('/admin/api/edit-trade/' + id, formData, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function addPortfolio(formData) {
    return new Promise((resolve) => {
        axios.post('/api/add-portfolio', formData, useBearerTokenHeaders(true))
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function savePortfolioOrder(formData) {
    return new Promise((resolve) => {
        axios.post('/api/portfolio/reorder', formData, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function saveTradeQuestions(payload) {
    return new Promise((resolve) => {
        axios.post('/admin/api/save-questions', payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}
function deletePortfolio(id) {
    return new Promise((resolve) => {
        axios.delete('/api/portfolio/delete/'+ id, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function deleteTrades(tradeIds) {
    return new Promise((resolve) => {
        axios.post('/admin/api/trade/delete', tradeIds, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function createTrade(formData) {
    return new Promise((resolve) => {
        axios.post('/admin/api/trade', formData, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function postJob(formData) {
    return new Promise((resolve) => {
        axios.post('/job-poster/api/post-job', formData, useBearerTokenHeaders(true))
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function acceptInvite(payload) {
    return new Promise((resolve) => {
        axios.post(`/api/accept-invite`, payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getAcceptedInterest(id) {
    return new Promise((resolve) => {
        axios.get(`/api/invite/accepted/${id}`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}


function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}


function verifyEmail(id, hash) {
    return new Promise((resolve) => {
        axios.get(`/customer/api/email/verify/${id}/${hash}`,useBasicAuthHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function resendVerifyEmail(email) {
    return new Promise((resolve) => {
        axios.post('/customer/api/email/resend', {email}, useBasicAuthHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function addAdmins(payload) {
    return new Promise((resolve) => {
        axios
            .post("/admin/api/add-user", payload, useBearerTokenHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function editAdmin(payload) {
    return new Promise((resolve) => {
        axios
            .put(
                `/admin/api/users/${payload.id}`,
                payload,
                useBearerTokenHeaders()
            )
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}


function resendPasswordAdmin(user_id) {
    return new Promise((resolve) => {
        axios.post(
                `/admin/api/users/${user_id}/resend-password`,
                {},
                useBearerTokenHeaders()
            )
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}



function getPermissions() {
    return new Promise((resolve) => {
        axios.get("/customer/api/permissions", useBearerTokenHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function getTrades(limit) {
    return new Promise((resolve) => {
        axios.get(`/api/trades${limit ? '?limit=' + limit : ''}`, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function getForumQuestions() {
    return new Promise((resolve) => {
        axios.get(`/api/forum/threads`, useBearerTokenHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function getProfileViews(userId) {
    return new Promise((resolve) => {
        axios.get(`/api/profile-views/${userId}`, useBearerTokenHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function getForumQuestionDetails(id) {
    return new Promise((resolve) => {
        axios.get(`/api/forum/threads/${id}`, useBearerTokenHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function searchForum(term) {
    return new Promise((resolve) => {
        axios.get(`/api/forum/search?q=${encodeURIComponent(term)}`, useBearerTokenHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function postJobTrades() {
    return new Promise((resolve) => {
        axios.get(`/api/post-job-trades`, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function postProfileView(payload) {
    return new Promise((resolve) => {
        axios.post(`/api/profile-views`, payload, useBearerTokenHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function contactFormSubmit(payload) {
    return new Promise((resolve) => {
        axios.post(`/api/contact-us`, payload, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}


function verifyIdentity(payload) {
    return new Promise((resolve) => {
        axios.post(`/admin/api/verify-identity`, payload, useBearerTokenHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function askQuestions(payload) {
    return new Promise((resolve) => {
        axios.post(`/api/forum/threads`, payload, useBearerTokenHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function submitQuestionComment(id, payload) {
    return new Promise((resolve) => {
        axios.post(`/api/forum/threads/${id}/comments`, payload, useBearerTokenHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function submitReply(commentId, payload) {
    return new Promise((resolve) => {
        axios.post(`/api/forum/comments/${commentId}/replies`, payload, useBearerTokenHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function completeJob(payload) {
    return new Promise((resolve) => {
        axios.post(`/api/complete-job`, payload, useBearerTokenHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function submitRating(payload) {
    return new Promise((resolve) => {
        axios.post(`/api/rate`, payload, useBearerTokenHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}


function getTradespersonsByTrade(tradeName) {
    return new Promise((resolve) => {
        axios.get(`/api/tradesperson-by-name${tradeName ? '?name=' + tradeName : ''}`, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function getTradeQuestion(id) {
    return new Promise((resolve) => {
        axios.get(`/api/trades/${id}/questions`, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function getParisCities() {
    return new Promise((resolve) => {
        axios.get("/api/parishes-cities", useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            }).catch((err) => resolve({status: false, message: err}));
    });
}

function getServiceInvites() {
    return new Promise((resolve) => {
        axios.get("/api/get-invites", useBearerTokenHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function getUserInterest() {
    return new Promise((resolve) => {
        axios.get("/api/get-user-interest", useBearerTokenHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function verifyHomeOwner(payload) {
    return new Promise((resolve) => {
        axios.post('/job-poster/api/verify-home-owner', payload, useBasicAuthHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })

}

function forgotPassword(payload) {
    return new Promise((resolve) => {
        axios.post("/api/forgot-password", payload, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function resetPassword(payload) {
    return new Promise((resolve) => {
        axios.post("/api/reset-password", payload, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function updatePersonalInfo(payload) {
    return new Promise((resolve) => {
        axios.post('/api/update-personal-info', payload, useBearerTokenHeaders(true))
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function changePassword(payload) {
    return new Promise((resolve) => {
        axios.post('/customer/api/change-password', payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}