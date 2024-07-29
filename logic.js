function findRoot(root) {
  if (root.left === null) return root;
  else {
    return findRoot(root.left);
  }
}

function deleteInsert(root, value) {
  if (root === null) {
    return root;
  } else {
    if (value < root.data) {
      root.left = deleteInsert(root.left, value);
    } else if (value > root.data) {
      root.right = deleteInsert(root.right, value);
    }
    if (value === root.data) {
      if (root.left == null) {
        return root.right;
      } else if (root.right == null) {
        return root.left;
      }

      let succ = findRoot(root.right);
      root.data = succ.data;
      root.right = deleteInsert(root.right, succ.data);
    }

    return root;
  }
}

export { deleteInsert, deleteRecursion };
