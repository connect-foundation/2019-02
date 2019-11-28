/* eslint-disable no-param-reassign */
const isObjectType = (val) => typeof val === 'object';

const mergeOne = (target, source) => {
  Object.keys(source).forEach((key) => {
    if ([target[key], source[key]].every(isObjectType)) {
      target[key] = mergeOne(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  });

  return target;
};

const merge = (target, ...sources) => sources.reduceRight(
  (result, source) => mergeOne(result, source),
  target,
);

const assignFilter = (keyArr, ...targets) => targets.reduce((obj, target) => {
  keyArr.forEach((key) => {
    if (target[key] !== undefined) obj[key] = target[key];
  });

  return obj;
}, {});

module.exports = { merge, assignFilter };
