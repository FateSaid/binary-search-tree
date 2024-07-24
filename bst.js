import { mergeSort } from "./mergeSort.js";
import { Node } from "./node.js";
import { prettyPrint } from "./prettyPrint.js";

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
    function searchValue(head) {
      if (head === null) {
        return;
      } else {
        if (head.data > value) {
          if (head.left.data === value) {
            return (head.left = null);
          }
          searchValue(head.left);
        } else if (head.data < value) {
          if (head.right.data === value) {
            return (head.right = null);
          }
          searchValue(head.right);
        }
      }
    }
    return searchValue(root);
  }

  return { root, insert, deleteItem };
}

let a = Tree([36, 34, 32, 40, 20, 30, 50, 70, 60, 65, 80, 75, 85]);
a.insert(32);
prettyPrint(a.root);
