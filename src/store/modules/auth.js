import {userService} from '@/apis/user.service';

const state = {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
    inboxCount: localStorage.getItem("inboxCount") || null,
}

const getters = {
    'GET_USER_INFO'() {
        return state.userInfo
    },
    'GET_INBOX_COUNT'() {
        return state.inboxCount;
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
        state.userInfo = '';
        state.inboxCount = 0;
        localStorage.removeItem('userInfo');
        localStorage.removeItem('inboxCount');

    },

    // Updates inbox count in state
    SET_INBOX_COUNT(state, count) {
        if (typeof count !== 'number') {
            console.error('count must be a number');
            return;
        }
        state.inboxCount = count;
        localStorage.setItem("inboxCount", count);
    },

    UPDATE_USER_INFO(state, userData) {
        if (typeof userData !== 'object' || userData === null) {
            console.error('userData must be an object');
            return; // Exit the function if userData is not an object
        }

        // Retrieve the current user information from localStorage
        let userInfo = localStorage.getItem('userInfo');

        // Parse the user information or initialize an empty object if it doesn't exist
        let userInfoJson = userInfo ? JSON.parse(userInfo) : {};

        // Loop through the provided userData object
        for (const key in userData) {
            if (userData.hasOwnProperty(key)) {
                // Update or add the key-value pair to the userInfoJson object
                userInfoJson[key] = userData[key];
            }
        }
        // Save the updated user information back to localStorage
        state.userInfo = userInfoJson;
        localStorage.setItem("userInfo", JSON.stringify(userInfoJson));
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
        return new Promise((resolve) => {
            userService.logout();
            commit('CLEAR_USER_INFO');
            resolve('user info cleared')
        })

    },

    updateUserInfo({commit, dispatch}, payload) {
        return new Promise((resolve) => {
            commit('UPDATE_USER_INFO', payload)
            resolve('User info updated successfully')
        })
    },

    updateInboxCount({commit}, count) {
        return new Promise((resolve) => {
            commit('SET_INBOX_COUNT', count);
            resolve('Inbox count updated successfully');
        });
    },

    updatePersonalInfo({commit, dispatch}, payload) {
        dispatch('showLoader')
        userService.updatePersonalInfo(payload).then(data => {
            dispatch('hideLoader')
            if (!data.status) {
                dispatch('error', {message: data.message, showSwal: true})
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

