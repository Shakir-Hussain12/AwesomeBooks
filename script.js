const btn = document.querySelector('#btn');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const book = document.querySelector('#content');
const myDate = document.querySelector('.date');
const data = JSON.parse(localStorage.getItem('bookData')) || [];
const li = document.querySelectorAll('.nav-links a');
const newForm = document.getElementById('newform');
const contact = document.getElementById('contact');

// functionality to display element on the page
const handleDisplay = (element) => {
  if (element.innerText === 'Add new') {
    newForm.style.display = 'contents';
  } else if (element.innerText === 'List') {
    book.style.display = 'contents';
  } else if (element.innerText === 'Contact') {
    contact.style.display = 'contents';
  }
};

// functionality to give the active class to the nav-link
li.forEach((item) => {
  item.addEventListener('click', (e) => {
    li.forEach((item) => {
      item.classList.remove('active');
      newForm.style.display = 'none';
      contact.style.display = 'none';
      book.style.display = 'none';
    });
    e.target.classList.toggle('active');
    handleDisplay(e.target);
  });
});

let d = new Date().toUTCString();
d = d.toString();
myDate.innerText = d;
class NewBook {
  addItem = (title, author) => {
    if (title && author) {
      const item = {
        id: Date.now(),
        title,
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
if (data.length > 0) {
  book.appendChild(h1);
}
data.forEach((item) => {
  const div = document.createElement('div');
  div.className = 'book_item';
  const h2 = document.createElement('h1');
  h2.className = 'book_description';
  h2.innerText = `${item.title.charAt(0).toUpperCase()}${item.title
    .split('')
    .splice(1)
    .join('')} by ${item.author.charAt(0).toUpperCase()}${item.author
    .split('')
    .splice(1)
    .join('')}`;
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
