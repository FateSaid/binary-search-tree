export function mergeSort(array) {
  if (array.length === 1) {
    return array;
  } else {
    let left = mergeSort(array.splice(0, Math.round(array.length / 2)));
    let right = mergeSort(array);
    return merge(left, right);
  }
}

function merge(a, b) {
  let sum = a.length + b.length;
  let array = [];
  for (let i = 0; i < sum; i++) {
    if (a[0] === b[0]) {
      b.shift();
    } else if (a[0] <= b[0] || b.length === 0) {
      array.push(a.shift());
    } else if (b[0] <= a[0] || a.length === 0) {
      array.push(b.shift());
    }
  }
  return array;
}
