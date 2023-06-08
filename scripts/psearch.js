'use strict';

const chooseOne = document.getElementById('chooseOne');
const tbody = document.querySelector('#categoryTable tbody');
const searchByCategory = document.getElementById('searchByCategory');
const table = document.getElementById('categoryTable');

chooseOne.addEventListener('change', () => {
    const categoryApi = fetch('http://localhost:8081/api/categories');
    if(chooseOne.options[chooseOne.selectedIndex].textContent == 'View all') {
        categoryApi.then((response) => response.json()).then((data) => {
            data.forEach(element => {
                const row = tbody.insertRow(-1);
    
                const cell1 = row.insertCell(0);
                cell1.innerHTML = element.categoryId;
                const cell2 = row.insertCell(1);
                cell2.innerHTML = element.name;
                const cell3 = row.insertCell(2);
                cell3.innerHTML = '';
                const cell4 = row.insertCell(3);
                cell4.innerHTML = element.description;
            });
            table.style.display = 'table';
        });
    }
    if(chooseOne.options[chooseOne.selectedIndex].textContent == 'Search by category') {
       
       categoryApi.then((response) => response.json()).then((data) => {
        data.forEach(element => {
            const theOption = new Option(element.name, element.name);
            searchByCategory.appendChild(theOption);
        })
        searchByCategory.style.display = 'block';
        searchByCategory.addEventListener('change', () => {
            const id = data.categoryId;
            const eachCategoryApi = fetch(`http://localhost:8081/api/products`);
            eachCategoryApi.then((response) => response.json()).then((file) => {
                console.log(file);
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
                table.style.display = 'table';
            })
        })
       })
       
    }
})
