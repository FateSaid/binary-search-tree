function deleteRecursion(root) {
  if (root.left === null) return root.data;
  else {
    let value = deleteRecursion(root.left);
    root.left = null;
    return value;
  }
}

function deleteInsert(root, value) {
  if (root === null) {
    return;
  } else {
    if (value < root.data) {
      root.left = deleteInsert(root.left, value);
    } else if (value > root.data) {
      root.right = deleteInsert(root.right, value);
    }
    if (value === root.data) {
      if (root.left !== null && root.right !== null) {
        value = deleteRecursion(root.right);
        root.data = value;
        return root;
      }
      if (root.left !== null) {
        return root.left;
      } else if (root.right !== null) {
        return root.right;
      }
      return null;
    }

    return root;
  }
}

export { deleteInsert };
