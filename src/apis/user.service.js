import {useBasicAuthHeaders, useBearerTokenHeaders} from "@/utils/functions";
import axios from "../axios/axios-kaqadmin";

export const userService = {
    login,
    logout,
    getTrades,
    getParisCities,
    createAccount,
    signUp,
    saveProfession,
    saveTravelToWork,
    businessType,
    businessDetails,
    idVerification,
    proofOfSkills,
    verifyEmail,
    getUserInfo,
    getGuarantee,
    updateGuarantee,
    resendVerifyEmail,
    getPermissions,
    addAdmins,
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

function saveProfession(payload) {
    return new Promise((resolve) => {
        axios.post('/api/profession', payload, useBearerTokenHeaders())
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

function updateGuarantee(payload) {
    return new Promise((resolve) => {
        axios.post('/api/update-guarantee', payload, useBearerTokenHeaders())
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

function getTrades() {
    return new Promise((resolve) => {
        axios.get("/api/trades", useBasicAuthHeaders())
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
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function forgotPassword(payload) {
    return new Promise((resolve) => {
        axios.post("/customer/api/forgot-password", payload, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function resetPassword(payload) {
    return new Promise((resolve) => {
        axios.post("/customer/api/reset-password", payload, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function updatePersonalInfo(payload) {
    return new Promise((resolve) => {
        axios.post('/customer/api/update-personal-info', payload, useBearerTokenHeaders())
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