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
  function height(node) {
    let heigthLeft = 0;
    let heightRight = 0;
    function findHeight(root) {
      if (root === null) {
        return 0;
      } else {
        if (root.left !== null) {
          heigthLeft = findHeight(root.left);
        } else if (root.right !== null) {
          heightRight = findHeight(root.right);
        }
        if (heigthLeft > heightRight) {
          return heigthLeft++;
        } else {
          return heightRight++;
        }
      }
    }
    return findHeight(node);
  }
  function depth(node) {
    debugger;
    let depthNum = 0;
    function searchDepth(root) {
      if (root === null) {
        return;
      } else {
        if (node.data === root.data) {
          return depthNum;
        }
        if (node.data > root.data) {
          depthNum++;
          searchDepth(root.right);
        } else {
          depthNum++;
          searchDepth(root.left);
        }
        return depthNum;
      }
    }
    return searchDepth(root);
  }
  function isBalanced() {
    debugger;
    let booleanArray = [];
    function collectHeight(node) {
      let leftChildHeigth = height(node.left);
      let rightChildHeight = height(node.right);
      if (leftChildHeigth > rightChildHeight) {
        !(leftChildHeigth - rightChildHeight <= 1)
          ? booleanArray.push("false")
          : booleanArray.push("true");
      } else {
        !(rightChildHeight - leftChildHeigth <= 1)
          ? booleanArray.push("false")
          : booleanArray.push("true");
      }
    }

    levelOrder(collectHeight);
    return !booleanArray.includes("false");
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
    height,
    depth,
    isBalanced,
  };
}

let a = Tree([36, 34, 32, 40, 20, 30, 50, 70, 60, 65, 80, 75, 85]);
prettyPrint(a.root);
console.log(a.isBalanced());
