export default function getExpressionVariable(val: string): string[] {
    const regex = new RegExp(/[a-zA-Z]+/g);
    return val.match(regex) || [];
}
