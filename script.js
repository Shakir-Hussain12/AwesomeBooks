const btn = document.querySelector('#btn');
const ti = document.querySelector('#title');
const au = document.querySelector('#author');
const book = document.querySelector('#content');
let t_title = '';
let t_author = '';
let data = JSON.parse(localStorage.getItem('bookData'));

btn.addEventListener('click', () => {
    let item = {
        'title': ti.value,
        'author': au.value,
    }
    data.push(item);
    localStorage.setItem('bookData',JSON.stringify(data));
})

const removeValue = (val, ind, arr) => {
    if(val.title == t_title && val.author == t_author) {
        arr.splice(ind, 1);
        return true;
    }
    return false;
}

data.forEach((item) => {
    let h1 = book.appendChild(document.createElement('h1'));
    h1.innerText = item.title;
    let h2 = book.appendChild(document.createElement('h2'));
    h2.innerText = item.author;
    let button = book.appendChild(document.createElement('button'));
    button.innerText = "Remove";
    book.appendChild(document.createElement('hr'));
    button.addEventListener('click', () => {
        console.log("deleted");
        t_title = item.title;
        t_author = item.author;
        data.filter(removeValue);
        localStorage.setItem('bookData', JSON.stringify(data));
        window.location.reload(); 
    })
});
