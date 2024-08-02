import { mergeSort } from "./mergeSort.js";
import { Node } from "./node.js";
import { prettyPrint } from "./prettyPrint.js";
import { createRandomArray, deleteInsert, findRoot } from "./logic.js";

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
  let root;
  let tempRoot;
  let queue = [];
  if (tempRoot === undefined) {
    root = buildTree(sortedArray);
  } else {
    root = reBalance();
  }

  function insert(value) {
    function treeTraversal(root) {
      if (root === null) {
        return Node(value);
      } else {
        if (value < root.data) {
          root.left = treeTraversal(root.left);
        } else if (value > root.data) {
          root.right = treeTraversal(root.right);
        }
        if (value === root.data) {
          throw new Error("value already exist");
        }
        return root;
      }
    }
    return treeTraversal(root);
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
    if (node === null) {
      return 0;
    } else {
      let leftHeight = height(node.left);
      let rightHeight = height(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    }
  }
  function depth(node) {
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
  function reBalance() {
    let array = [];
    function sortNode(node) {
      array.push(node.data);
    }
    inOrder(sortNode);
    root = buildTree(array);
    return root;
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
    reBalance,
  };
}

let a = Tree(createRandomArray(13));
a.insert(120);
a.insert(300);
a.insert(453);
prettyPrint(a.root);
console.log(a.height(a.root));
