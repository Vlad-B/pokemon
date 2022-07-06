export const alphaNumeric = (value) => new RegExp("^[a-zA-Z0-9]*$").test(value);

export const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);
