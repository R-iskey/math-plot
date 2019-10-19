/**
 * validating min and max
 * @param max
 * @param min
 */
const validateRange = (max, min) => (min > max) ? [max, min] : [min, max];

export default validateRange;
