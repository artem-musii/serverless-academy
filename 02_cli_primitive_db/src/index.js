const inquirer = require('inquirer');
const fs = require('fs');

const openAndCloseFile = () => {
  fs.open('users.txt', 'a', (err, file) => {
    if (err) {
      throw err;
    }
    fs.close(file, (err) => {
      if (err) {
        throw err;
      }
    });
  });
};

const addUser = async () => {
  const nameAnswer = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter name (or press Enter to stop):',
  });

  if (!nameAnswer.name) {
    return await searchUser();
  }

  const genderAndAgeAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'gender',
      message: 'Choose gender:',
      choices: ['Male', 'Female'],
    },
    {
      type: 'input',
      name: 'age',
      message: 'Enter age:',
    },
  ]);

  openAndCloseFile();

  const data = await fs.promises.readFile('users.txt', 'utf-8').catch((err) => {
    if (err) {
      throw err;
    }
  });

  let users = JSON.parse(data || '[]');
  users.push({
    name: nameAnswer.name,
    gender: genderAndAgeAnswer.gender,
    age: genderAndAgeAnswer.age,
  });

  await fs.promises
    .writeFile('users.txt', JSON.stringify(users))
    .catch((err) => {
      if (err) {
        throw err;
      }
    });

  console.log(`User ${nameAnswer.name} added to the database.`);
  return await addUser();
};

const searchUser = async () => {
  const searchAgainAnswer = await inquirer.prompt({
    type: 'confirm',
    name: 'searchAgain',
    message: 'Do you want to search for a user? (Y/N)',
  });

  if (!searchAgainAnswer.searchAgain) {
    console.log('Goodbye!');
    return;
  }

  const nameAnswer = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter user name:',
  });

  openAndCloseFile();

  const data = await fs.promises.readFile('users.txt', 'utf-8').catch((err) => {
    if (err) {
      throw err;
    }
  });

  const users = JSON.parse(data || '[]');
  const user = users.find(
    (user) => user.name.toLowerCase() === nameAnswer.name.toLowerCase()
  );

  if (!user) {
    console.log(`User ${nameAnswer.name} not found in the database.`);
    return await searchUser();
  }

  console.log(`User ${user.name} found in the database:`);
  console.log(`Gender: ${user.gender}`);
  console.log(`Age: ${user.age}`);
  return await searchUser();
};

addUser();
