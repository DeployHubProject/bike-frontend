export function authHeader(user) {

    let header = {};

    if (user && user.token) 
    {
        header['x-Feature-Set'] = user.feature;
        header['Authorization'] =  'Bearer ' + user.token;
    }
    return header;
}