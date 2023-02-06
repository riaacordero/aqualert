// const form = document.getElementById("myForm");
//     const inputValue = document.getElementById("inputValue");
//     const tableBody = document.getElementById("tableBody");


//     class TrieNode {
//         constructor() {
//           this.children = {};
//           this.isEnd = false;
//           this.fail = null;
//         }
//       }
      
//       class Trie {
//         constructor() {
//           this.root = new TrieNode();
//         }
      
//         insert(word) {
//           let node = this.root;
//           for (let i = 0; i < word.length; i++) {
//             if (!node.children[word[i]]) {
//               node.children[word[i]] = new TrieNode();
//             }
//             node = node.children[word[i]];
//           }
//           node.isEnd = true;
//         }
//         buildFailPointers() {
//             let queue = [];
//             for (let child in this.root.children) {
//               queue.push(this.root.children[child]);
//               this.root.children[child].fail = this.root;
//             }
        
//             while (queue.length) {
//               let node = queue.shift();
//               for (let child in node.children) {
//                 let nextNode = node.children[child];
//                 queue.push(nextNode);
        
//                 let failNode = node.fail;
//                 while (failNode && !failNode.children[child]) {
//                   failNode = failNode.fail;
//                 }
//                 nextNode.fail = failNode ? failNode.children[child] : this.root;
//               }
//             }
//         }
//       }
    

//     const valuesArray = ["test", "sad", "boang"]; // keywords
//     const trie = new Trie();
//     for (let value of valuesArray) {
//         trie.insert(value);
// }  
//     trie.buildFailPointers();

//     form.addEventListener("submit", function(event) {
//     event.preventDefault();
      
//     const value = inputValue.value;
//     let row;
      
//     if (valuesArray.includes(value)) {
//         row = tableBody.insertRow(tableBody.rows.length);
//     } else {
//         row = tableBody.insertRow(0);
//     }

//     const cell = row.insertCell(0);
//     cell.innerHTML = value;
// });


const form = document.getElementById("myForm");
const inputValue = document.getElementById("inputValue");
const tableBody = document.getElementById("tableBody");

class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
        this.fail = null;
    }
}

    class Trie {
        constructor() {
            this.root = new TrieNode();
        }

    insert(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            if (!node.children[word[i]]) {
                node.children[word[i]] = new TrieNode();
            }
            node = node.children[word[i]];
        }
        node.isEnd = true;
    }

    buildFailPointers() {
        let queue = [];
        for (let child in this.root.children) {
            queue.push(this.root.children[child]);
            this.root.children[child].fail = this.root;
        }

    while (queue.length) {
    let node = queue.shift();
    for (let child in node.children) {
      let nextNode = node.children[child];
      queue.push(nextNode);
  
      let failNode = node.fail;
      while (failNode && !failNode.children[child]) {
        failNode = failNode.fail;
      }
      nextNode.fail = failNode ? failNode.children[child] : this.root;
    }
  }
}

    search(text) {
        let node = this.root;
        let foundWords = [];
        for (let i = 0; i < text.length; i++) {
            while (node && !node.children[text[i]]) {
                node = node.fail;
            }
        node = node ? node.children[text[i]] : this.root;
        let temp = node;
            while (temp) {
                if (temp.isEnd) {
                    foundWords.push(text.substring(i - temp.word.length + 1, i + 1));
                }
            temp = temp.fail;
            }
        }
        return foundWords;
    }
}

    const valuesArray = ["test", "sad", "boang"];
    const trie = new Trie();
    for (let value of valuesArray) {
        trie.insert(value);
}
    trie.buildFailPointers();

    form.addEventListener("submit", function(event) {
    event.preventDefault();

    const value = inputValue.value;
    let foundWords = trie.search(value);

    for (let foundWord of foundWords) {
        let row = tableBody.insertRow(tableBody.rows.length);
        let cell = row.insertCell(0);
        cell.innerHTML = foundWord;
    }
});