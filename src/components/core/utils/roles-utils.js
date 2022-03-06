const { config } = require('../../../config');

exports.hasRole = (roles, roleName) => {
    if (!roles) return false;
    let arrayRoles = JSON.parse(roles);
    return arrayRoles.includes(roleName);
};

exports.deleteRole = (roles, roleName) => {
    let arrayRoles = JSON.parse(roles);
    arrayRoles = arrayRoles.filter((item) => item !== roleName);
    return JSON.stringify(arrayRoles);
};

exports.addRole = (roles, roleName) => {
    let arrayRoles = JSON.parse(roles);
    arrayRoles.push(roleName);
    return JSON.stringify(arrayRoles);
};