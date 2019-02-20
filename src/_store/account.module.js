import { router } from '../_helpers';
import { userService } from '../_services';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user, bikeframe: null, bikefront: null, bikerear: null, bikeseat: null }
    : { status: {}, user: null, bikeframe: null, bikefront: null, bikerear: null, bikeseat: null };

const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });

        userService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    dispatch('getUserDetails');

                    router.push('/');
																				router.go(0);
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );


    },
    logout({ commit }) {
        userService.logout();
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);

        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    getUserDetails({dispatch,commit}){
        userService.getBikeFrame(user).then(
            img => {
                commit('bikeFrame', img);
            }
        );

        userService.getBikeSeat(user).then(
            img2 => {
                commit('bikeSeat', img2);
            }
        );

        userService.getBikeFrontWheel(user).then(
            img3 => {
                commit('bikeFront', img3);
            }
        );

        userService.getBikeRearWheel(user).then(
            img4 => {
                commit('bikeRear', img4);
            }
        );
    }
};

const mutations = {
    bikeFrame(state, resp) {
        state.bikeframe = resp.img;
    },
    bikeSeat(state, resp) {
        state.bikeseat = resp.img;
    },
    bikeFront(state, resp) {
        state.bikefront = resp.img;
    },
    bikeRear(state, resp) {
        state.bikerear = resp.img;
    },
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
								state.bikeframe = null;
								state.bikefront = null;
								state.bikerear  = null;
								state.bikeseat  = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
    },
    registerSuccess(state, user) {
        state.status = {};
    },
    registerFailure(state, error) {
        state.status = {};
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};