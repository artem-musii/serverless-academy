const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const sortWords = (input) => input.sort();

const sortNumbers = (input) => input.sort((a, b) => a - b);

const sortWordsByLength = (input) => input.sort((a, b) => a.length - b.length);

const getUniqueWords = (input) => Array.from(new Set(input));

const getUniqueValues = (input) => [...new Set(input)];

const sortInput = () => {
  rl.question(
    'Enter a few words or numbers separated by a space: ',
    (inputString) => {
      const input = inputString.split(' ');
      const numbers = input
        .filter((val) => !isNaN(val))
        .map((val) => parseInt(val));
      const words = input.filter((val) => isNaN(val));

      rl.question(
        `What operation would you like to do with the input?
      1. Sort words alphabetically
      2. Show numbers from lesser to greater
      3. Show numbers from bigger to smaller
      4. Display words in ascending order by number of letters in the word
      5. Show only unique words
      6. Display only unique values from the set of words and numbers entered by the user
      Enter the number corresponding to the operation or type 'exit' to close program: `,
        (operation) => {
          switch (operation) {
            case '1':
              console.log(sortWords(words));
              break;
            case '2':
              console.log(sortNumbers(numbers));
              break;
            case '3':
              console.log(sortNumbers(numbers).reverse());
              break;
            case '4':
              console.log(sortWordsByLength(words));
              break;
            case '5':
              console.log(getUniqueWords(words));
              break;
            case '6':
              console.log(getUniqueValues(input));
              break;
            case 'exit':
              rl.close();
              return;
            default:
              console.log('Invalid operation');
              break;
          }
          sortInput();
        }
      );
    }
  );
};

sortInput();
