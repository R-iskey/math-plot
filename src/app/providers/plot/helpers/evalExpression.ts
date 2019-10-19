// @NOTE: this expression copied from archived sources
// I spent a lots of time to find this excellent piece of code
const evalExpression = (value: string, xValue: number) => {
    const eq = value.replace(/([a-z\d\)]+)\^([a-z\d]+)/g, 'pow($1,$2)')
        .replace(/(\d)x/g, '$1*x')
        .replace(/x/g, ''+xValue)
        .replace(/- *-/g, '+')
        .replace(/(\d)([a-z\(])/g, '$1*$2')
        .replace(/\)\(/g, ')*(')
        .replace(/\)([a-z])/g, ')*$1');
    return eval(eq);
};

export default evalExpression;

