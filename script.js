const btn = document.querySelector('#btn');
const ti = document.querySelector('#title');
const au = document.querySelector('#author');
const book = document.querySelector('#content');
const data = JSON.parse(localStorage.getItem('bookData')) || [];

class Methods {
  addItem = (val1, val2) => {
    if (val1 && val2) {
      const item = {
        title: val1,
        author: val2,
      };
      data.push(item);
      localStorage.setItem('bookData', JSON.stringify(data));
    }
  }

  deleteItem = (name, author) => {
    data.filter((val, ind, arr) => {
      if (val.title === name && val.author === author) {
        arr.splice(ind, 1);
        window.location.reload();
        return true;
      }
      return false;
    });
    localStorage.setItem('bookData', JSON.stringify(data));
  };
}

const myMethod = new Methods();
btn.addEventListener('click', () => {
  myMethod.addItem(ti.value, au.value);
});

data.forEach((item) => {
  const h1 = book.appendChild(document.createElement('h1'));
  h1.innerText = item.title;
  const h2 = book.appendChild(document.createElement('h2'));
  h2.innerText = item.author;
  const button = book.appendChild(document.createElement('button'));
  button.innerText = 'Remove';
  book.appendChild(document.createElement('hr'));
  button.addEventListener('click', () => {
    myMethod.deleteItem(item.title, item.author);
  });
});
