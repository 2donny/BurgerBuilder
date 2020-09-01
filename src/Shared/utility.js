export const checkValidity = (value, rules) => {
    let isValid = false;

    if(!rules) {
        return false;
    }
    if(rules.required) {
        isValid = value.trim() !== '';
    }

    if(rules.minLength) {
        isValid = (value.length >= rules.minLength);
    }

    if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
}