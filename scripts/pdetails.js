'use strict';

const params = new URLSearchParams(location.search);
const categoryId = params.get('categoryId');

console.log(categoryId);

const span = document.querySelector('h2 span');
span.innerHTML = `Product ${categoryId}`;