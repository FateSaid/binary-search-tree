import { mergeSort } from "./mergeSort.js";
import { Node } from "./node.js";
import { prettyPrint } from "./prettyPrint.js";
import { deleteInsert, findRoot } from "./logic.js";

function buildTree(array) {
  if (array.length === 0) {
    return null;
  } else {
    let middle = Math.floor(array.length / 2);
    let node = Node(array[middle]);
    node.left = buildTree(array.slice(0, middle));
    node.right = buildTree(array.slice(middle + 1, array.length));

    return node;
  }
}

function Tree(array) {
  let sortedArray = mergeSort(array);
  let root = buildTree(sortedArray);
  let queue = [];

  function insert(value) {
    while (root !== null) {
      if (root.data === value) {
        return;
      }
      if (root.data > value) {
        if (root.left === null) {
          return (root.left = Node(value));
        }
        root = root.left;
      } else if (root.data < value) {
        if (root.right === null) {
          return (root.right = Node(value));
        }
        root = root.right;
      }
    }
  }
  function deleteItem(value) {
    value;
    return deleteInsert(root, value);
  }
  function find(value) {
    return findRoot(root, value);
  }
  function levelOrder(callback) {
    queue.push(root);
    while (queue.length !== 0) {
      let node = queue.shift();
      if (typeof callback !== "function") {
        throw new Error("Callback is requried ");
      }
      callback(node);
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }
  function preOrder(callback) {
    function treeTraversal(root) {
      if (root === null) {
        return;
      } else {
        callback(root);
        treeTraversal(root.left);
        treeTraversal(root.right);
        return;
      }
    }
    return treeTraversal(root);
  }
  function inOrder(callback) {
    function treeTraversal(root) {
      if (root === null) {
        return;
      } else {
        treeTraversal(root.left);
        callback(root);
        treeTraversal(root.right);
        return;
      }
    }
    return treeTraversal(root);
  }
  function postOrder(callback) {
    function treeTraversal(root) {
      if (root === null) {
        return;
      } else {
        treeTraversal(root.left);
        treeTraversal(root.right);
        callback(root);
        return;
      }
    }
    return treeTraversal(root);
  }

  return {
    root,
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    postOrder,
    preOrder,
  };
}

function lately(node) {
  console.log(node);
}

let a = Tree([36, 34, 32, 40, 20, 30, 50, 70, 60, 65, 80, 75, 85]);
a.postOrder(lately);
prettyPrint(a.root);
