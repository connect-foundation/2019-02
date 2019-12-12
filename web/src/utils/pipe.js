const pipe = (...funcs) => (args) => funcs.reduce((arg, nextFn) => nextFn(arg), args);

export default pipe;
