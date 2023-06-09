'use strict';

const chooseOne = document.getElementById('chooseOne');
const tbody = document.querySelector('#categoryTable tbody');
const searchByCategory = document.getElementById('searchByCategory');
const table = document.getElementById('categoryTable');
const linkData = document.getElementById('linkData');

chooseOne.addEventListener('change', () => {
    const categoryApi = fetch('http://localhost:8081/api/products');
    if(chooseOne.options[chooseOne.selectedIndex].textContent == 'Select one') {
            tbody.innerHTML = '';
        }
    if(chooseOne.options[chooseOne.selectedIndex].textContent == 'View all') {
        searchByCategory.options.length = 0;
        searchByCategory.size = '';
        tbody.innerHTML = '';
        categoryApi.then((response) => response.json()).then((data) => {
            data.forEach(element => {
                const row = tbody.insertRow(-1);
    
                const cell1 = row.insertCell(0);
                cell1.innerHTML = element.categoryId;
                const cell2 = row.insertCell(1);
                cell2.innerHTML = element.productName;
                const cell3 = row.insertCell(2);
                cell3.innerHTML = `$ ${element.unitPrice}`;
                const cell4 = row.insertCell(3);
                cell4.innerHTML = element.supplier;

                const cell5 = row.insertCell(4);
                const link = document.createElement('a');
                link.href = `./pdetails.html?categoryId = ${element.categoryId}`;
                link.text = 'See details';
                cell5.appendChild(link);
            });
            linkData.style.display = 'block';
            table.style.display = 'table';
        });
    }
    if(chooseOne.options[chooseOne.selectedIndex].textContent == 'Search by category') {
        tbody.innerHTML = '';
        const categoryApiTwo = fetch('http://localhost:8081/api/categories');
       categoryApiTwo.then((response) => response.json()).then((cate) => {

        cate.forEach(element => {
            const theOption = new Option(element.name, element.categoryId);
            searchByCategory.appendChild(theOption);
        })
        searchByCategory.style.display = 'block';
        searchByCategory.addEventListener('change', () => {
            tbody.innerHTML = '';
            const id = searchByCategory.value;
            const eachCategoryApi = fetch(`http://localhost:8081/api/categories/${id}`);
            eachCategoryApi.then((response) => response.json()).then((file) => {
                file.forEach(element => {
                    const row = tbody.insertRow(-1);

                    const cell1 = row.insertCell(0);
                    cell1.innerHTML = element.productId;
                    const cell2 = row.insertCell(1);
                    cell2.innerHTML = element.productName;
                    const cell3 = row.insertCell(2);
                    cell3.innerHTML = `$ ${element.unitPrice}`;
                    const cell4 = row.insertCell(3);
                    cell4.innerHTML = element.supplier;
                });  
            })
            table.style.display = 'table';
        });
       })
    }
});
