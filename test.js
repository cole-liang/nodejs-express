const test = { a: { pop: '1', bob: '2' }, b: 'b' };
const test2 = { pop: 'abc', bob: 'cdf' };
let { a } = test;
Object.entries(test).forEach(item => console.log(item));
// a.pop = '3';
a = { ...test2 };
console.log(a);
console.log(test);

test.a = { ...test2 };
console.log(test);
