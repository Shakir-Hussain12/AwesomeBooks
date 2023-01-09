const btn = document.querySelector('#btn');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const book = document.querySelector('#content');
const data = JSON.parse(localStorage.getItem('bookData')) || [];

class NewBook {
  addItem = (name, author) => {
    if (name && author) {
      const item = {
        name,
        author,
      };
      data.push(item);
      localStorage.setItem('bookData', JSON.stringify(data));
    }
    window.location.reload();
  };

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

const myMethod = new NewBook();
btn.addEventListener('click', (e) => {
  e.preventDefault();
  myMethod.addItem(title.value, author.value);
});

const section = document.createElement('section');
section.className = 'books_container';
const h1 = document.createElement('h1');
h1.innerText = 'All awesome books';
h1.className = 'books_header';
book.appendChild(h1);
data.forEach((item) => {
  const div = document.createElement('div');
  div.className = 'book_item';
  const h2 = document.createElement('h1');
  h2.className = 'book_description';
  h2.innerText = `${item.author} by ${item.name}`;
  const button = book.appendChild(document.createElement('button'));
  button.innerText = 'Remove';
  button.className = 'book_button';
  div.appendChild(h2);
  div.appendChild(button);
  section.appendChild(div);
  book.appendChild(section);
  button.addEventListener('click', () => {
    myMethod.deleteItem(item.title, item.author);
  });
});
