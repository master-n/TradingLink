import {userService} from '@/apis/user.service';

const state = {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
}

const getters = {
    'GET_USER_INFO'() {
        return state.userInfo
    },
    userInformation(state) {
        return state.userInfo;
    }

}

const mutations = {
    // Updates user info in state and localstorage
    SET_USER_INFO(state, payload) {
        // Store data in localStorage
        state.userInfo = payload;
        localStorage.setItem("userInfo", JSON.stringify(payload))
    },

    'CLEAR_USER_INFO'() {
        localStorage.removeItem('userInfo');
    },

    UPDATE_USER_INFO(state, {email, phone}) {
        const userInfo = localStorage.getItem('userInfo');
        const userInfoJson = JSON.parse(userInfo);
        userInfoJson['email'] = email;
        userInfoJson['phone'] = phone;

        localStorage.setItem("userInfo", JSON.stringify(userInfoJson))
    }

}

const actions = {
    // JWT
    login({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            dispatch('showLoader');
            userService.login(payload.email, payload.password).then(data => {
                dispatch('hideLoader')
                const {status, extra, message} = data;
                if (status) {
                    commit('SET_USER_INFO', extra)
                    dispatch('success', {message, showSwal: false}, {root: true});
                    resolve(data)
                } else {
                    dispatch('error', {message}, {root: true});
                    reject(message)
                }
            });
        })
    },

    signUp({commit, dispatch}, payload) {
        return new Promise((resolve) => {
            dispatch('showLoader');
            userService.signUp(payload).then(data => {
                    dispatch('hideLoader')
                    const {status, extra} = data;
                    if (status) {
                        commit('SET_USER_INFO', extra)
                    }
                    resolve(data)
                },
            );
        })

    },

    createAccount({commit, dispatch}, payload) {
        return new Promise((resolve) => {
            dispatch('showLoader');
            userService.createAccount(payload).then(data => {
                    dispatch('hideLoader')
                    const {status, extra} = data;
                    if (status) {
                        commit('SET_USER_INFO', extra)
                    }
                    resolve(data)
                },
            );
        })

    },

    logout({commit}) {
        userService.logout();
        commit('CLEAR_USER_INFO');
        window.location.href = "/"
    },

    updatePersonalInfo({commit, dispatch}, payload) {
        dispatch('showLoader')
        userService.updatePersonalInfo(payload).then(data => {
            dispatch('hideLoader')
            if (!data.status) {
                dispatch('error', {message:data.message, showSwal: true})
                resolve({status: false, message: data.message});
                return;
            }
            commit('UPDATE_USER_INFO', payload)
            dispatch('success', {message: 'Information updated!', showSwal: true});
            resolve({status: true, data: data.extra})

        })
    },

    changePassword({commit, dispatch}, payload){
        dispatch('showLoader')
        userService.changePassword(payload).then(data => {
            dispatch('hideLoader')
            if(!data.status){
                dispatch('error', {message:data.message, showSwal: true})
                resolve({status: false, message: data.message});
                return;
            }
            dispatch('success', {message: data.message, showSwal: true});
            resolve({status: true, data: data.extra})
        })
    },

    addAdmin({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            dispatch("showLoader");
            userService.addAdmins(payload).then((data) => {
                dispatch("hideLoader");
                if (!data.status) {
                    dispatch("error", { message: data.message, showSwal: true });
                    reject();
                    return;
                }

                resolve(data);
                dispatch("success", { message: data.message, showSwal: true });
            });
        });
    },
    editAdmin({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            dispatch("showLoader");
            userService.editAdmin(payload).then((data) => {
                dispatch("hideLoader");
                if (!data.status) {
                    dispatch('error', {message:data.message, showSwal: true})
                    resolve({status: false, message: data.message});
                    return;
                }

                dispatch("success", { message: data.message, showSwal: true });
                resolve(data);
            });
        });
    },

    getAdmins({dispatch }) {
        return new Promise((resolve, reject) => {
            dispatch("showLoader");
            userService.getAdmins().then((data) => {
                dispatch("hideLoader");
                if (!data.status) {
                    dispatch("error", { message: data.message });
                    reject();
                    return;
                }
                resolve(data);
            });
        });
    },

    getVendorUsers({dispatch }) {
        return new Promise((resolve, reject) => {
            dispatch("showLoader");
            userService.getVendorUsers().then((data) => {
                dispatch("hideLoader");
                if (!data.status) {
                    dispatch("error", { message: data.message });
                    reject();
                    return;
                }
                resolve(data);
            });
        });
    },
    getPermissions({dispatch }) {
        return new Promise((resolve, reject) => {
            dispatch("showLoader");
            userService.getPermissions().then((data) => {
                dispatch("hideLoader");
                if (!data.status) {
                    dispatch("error", { message: data.message });
                    reject();
                    return;
                }
                resolve(data);
            });
        });
    },

    addVendorUser({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            dispatch("showLoader");
            userService.addVendorUser(payload).then((data) => {
                dispatch("hideLoader");
                if (!data.status) {
                    dispatch("error", { message: data.message, showSwal: true });
                    reject();
                    return;
                }

                dispatch("success", { message: data.message, showSwal: true });
                resolve(data);
            });
        });
    },
    editVendorUser({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            dispatch("showLoader");
            userService.editVendorUser(payload).then((data) => {
                dispatch("hideLoader");
                if (!data.status) {
                    dispatch("error", { message: data.message, showSwal: true });
                    reject();
                    return;
                }

                dispatch("success", { message: data.message, showSwal: true });
                resolve(data);
            });
        });
    },



    toggleAdminUserStatus({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            dispatch("showLoader");
            userService.toggleAdminUserStatus(payload).then((data) => {
                dispatch("hideLoader");
                if (!data.status) {
                    dispatch("error", { message: data.message });
                    reject();
                    return;
                }
                resolve(data);
                dispatch("success", { message: data.message, showSwal: true });
            });
        });
    },
    resendPasswordAdmin({ commit, dispatch }, admin_id) {
        return new Promise((resolve, reject) => {
            dispatch("showLoader");
            userService.resendPasswordAdmin(admin_id).then((data) => {
                dispatch("hideLoader");
                if (!data.status) {
                    dispatch("error", { message: data.message });
                    reject();
                    return;
                }
                resolve(data);
                dispatch("success", { message: data.message, showSwal: true });
            });
        });
    },

}

export default {
    state,
    getters,
    mutations,
    actions
}

