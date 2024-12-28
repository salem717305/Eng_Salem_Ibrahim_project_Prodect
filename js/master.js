// تعريف العناصر
let proName = document.getElementById('proName');
let proPrice = document.getElementById('proPrice');
let proCategory = document.getElementById('proCategory');
let proDesc = document.getElementById('proDesc');
let btn = document.getElementById('btn');
let proSearch = document.getElementById('proSearch');
let proContainer = [];

// تحميل البيانات من localStorage إذا كانت موجودة
if (localStorage.getItem('proContainer') != null) {
    proContainer = JSON.parse(localStorage.getItem('proContainer'));
    displayProduct();
}
setTimeout(() => {
    document.querySelector('.loader-page').style.display = 'none';
}, 3000);


btn.addEventListener("click", function() {
    let product = {
        name: proName.value,
        price: proPrice.value,
        category: proCategory.value,
        desc: proDesc.value,
    }
    if (proCategory.value == "" && proDesc.value == "" && proName.value == "" && proPrice.value == "") {
        btn.preventDefault();

    } else {
        proName.value = "";
        proPrice.value = "";
        proCategory.value = "";
        proDesc.value = "";
    }
    proContainer.push(product);
    console.log(proContainer);
    localStorage.setItem('proContainer', JSON.stringify(proContainer));
    displayProduct();
})

function displayProduct() {
    let products = ``
    for (let i = 0; i < proContainer.length; i++) {
        products += `
       <tr>
                            <td>${i + 1}</td>
                            <td>${proContainer[i].name}</td>
                            <td>${proContainer[i].price}</td>
                            <td>${proContainer[i].category}</td>
                            <td>${proContainer[i].desc}</td>
                          
                            <td>
                                <button class="btn delete">Delete</button>
                                <button class="btn update">Update</button>
                            </td>
                        </tr>
  `

    }
    document.getElementById('tbody').innerHTML = products;
}








// حذف المنتج
function deleteProduct(index) {
    proContainer.splice(index, 1); // إزالة العنصر من المصفوفة
    localStorage.setItem('proContainer', JSON.stringify(proContainer)); // تحديث localStorage
    displayProduct(); // تحديث العرض
}

// تحديث المنتج
function updateProduct(index) {
    let product = proContainer[index];
    proName.value = product.name;
    proPrice.value = product.price;
    proCategory.value = product.category;
    proDesc.value = product.desc;

    btn.innerText = "Update Product"; // تغيير النص على الزر
    btn.onclick = function() {
        // تحديث البيانات
        product.name = proName.value;
        product.price = proPrice.value;
        product.category = proCategory.value;
        product.desc = proDesc.value;

        // إعادة النص إلى الحالة الافتراضية
        btn.innerText = "Add Product";
        btn.onclick = function() {
            btn.click();
        };

        // تحديث البيانات في المصفوفة وفي localStorage
        localStorage.setItem('proContainer', JSON.stringify(proContainer));
        displayProduct();
        proName.value = "";
        proPrice.value = "";
        proCategory.value = "";
        proDesc.value = "";
    };
}

// تعديل displayProduct لإضافة وظائف الحذف والتحديث
function displayProduct() {
    let products = ``;
    for (let i = 0; i < proContainer.length; i++) {
        products += `
            <tr>
                <td>${i + 1}</td>
                <td>${proContainer[i].name}</td>
                <td>${proContainer[i].price}</td>
                <td>${proContainer[i].category}</td>
                <td>${proContainer[i].desc}</td>
                <td>
                    <button class="btn delete" onclick="deleteProduct(${i})">Delete</button>
                    <button class="btn update" onclick="updateProduct(${i})">Update</button>
                </td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = products;
}





// وظيفة البحث
document.getElementById("proSearch").addEventListener("input", function() {
    let searchValue = this.value.toLowerCase(); // النص الذي يتم إدخاله في مربع البحث
    let filteredProducts = proContainer.filter(product =>
        product.name.toLowerCase().includes(searchValue) ||
        product.price.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue) ||
        product.desc.toLowerCase().includes(searchValue)
    );

    // عرض المنتجات المفلترة
    displayFilteredProducts(filteredProducts);
});

// عرض النتائج المفلترة
function displayFilteredProducts(filteredProducts) {
    let products = ``;
    for (let i = 0; i < filteredProducts.length; i++) {
        products += `
            <tr>
                <td>${i + 1}</td>
                <td>${filteredProducts[i].name}</td>
                <td>${filteredProducts[i].price}</td>
                <td>${filteredProducts[i].category}</td>
                <td>${filteredProducts[i].desc}</td>
                <td>
                    <button class="btn delete" onclick="deleteProduct(${i})">Delete</button>
                    <button class="btn update" onclick="updateProduct(${i})">Update</button>
                </td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = products;
}