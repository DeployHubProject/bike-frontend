import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    getBikeFrame,
    getBikeSeat,
    getBikeFrontWheel,
    getBikeRearWheel,
    delete: _delete
};

function geturl(uri)
{
 var url = window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '') + uri;

  console.log(url);
  return url;
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    
    return fetch( geturl('/users/authenticate'), requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch( geturl('/users/register'), requestOptions).then(handleResponse);
}

function getAll(user) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(user)
    };

    return fetch( geturl('/users'), requestOptions).then(handleResponse);
}

function getBikeFrame(user) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(user)
    };
    return fetch( geturl('/getbikeframe'), requestOptions).then(handleResponse);
}

function getBikeSeat(user) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(user)
    };
    return fetch( geturl('/getbikeseat'), requestOptions).then(handleResponse);
}

function getBikeFrontWheel(user) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(user)
    };
    return fetch( geturl('/getbikefrontwheel'), requestOptions).then(handleResponse);
}

function getBikeRearWheel(user) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(user)
    };
    return fetch( geturl('/getbikerearwheel'), requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch( geturl('/users/${id}'), requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch( geturl('/users/${user.id}'), requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch( geturl('/users/${id}'), requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}