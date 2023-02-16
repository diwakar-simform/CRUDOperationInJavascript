// Before storing forms should be validated properly.
function validateForm() {
    var pid = document.getElementById("pid").value;
    var pname = document.getElementById("pname").value;
    // var pimage = document.getElementById('pimage').files[0].name
    var pprice = document.getElementById("pprice").value;
    var pdescription = document.getElementById("pdescription").value;
    console.log(pimage)
    if(pid == ""){
        alert("Product-ID is required")
    }

    if (pname == "") {
        alert("Product-name is required");
        return false;
    }

    if (pimage == "") {
        alert("Product-image is required");
        return false;
    }

    if (pprice == "") {
        alert("Product price is required");
        return false;
    }

    if (pdescription == "") {
        alert("Product description is required");
        return false;
    } 

    return true;
}

// showProduct used to display data in tabular form
function showProduct() {
    var productList;
    if (localStorage.getItem("productList") == null) {
        productList = [];
    } else {
        productList = JSON.parse(localStorage.getItem("productList"));
    }

    var html = "";
    // productList.element.pimage;
    // console.log(productList.element.pimage);
    productList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.pid + "</td>"
        html += "<td>" + element.pname + "</td>";
        html += "<td><img style='height:100px; width:100px' src = '" + element.pimage + "' alt='No image'></td>";
        html += "<td>" + element.pprice + "</td>";
        html += "<td>" + element.pdescription + "</td>";
        html += '<td><button onclick="deleteProduct(' + index + ')" class="btn btn-danger">Delete</button><button onclick="updateProduct(' + index + ')" class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";

    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showProduct();

// 
function AddProduct() {
    if (validateForm() == true) {
        var pid = document.getElementById("pid").value;
        var pname = document.getElementById("pname").value;
        var pimage = document.getElementById("pimage").files[0].name;
        var pprice = document.getElementById("pprice").value;
        var pdescription = document.getElementById("pdescription").value;

        var productList;
        if (localStorage.getItem("productList") == null) {
            productList = [];
        } else {
            productList = JSON.parse(localStorage.getItem("productList"));
 
       }

       productList.push({
        pid : pid,
        pname : pname,
        pimage : pimage,
        pprice : pprice,
        pdescription : pdescription,

       });

       localStorage.setItem("productList", JSON.stringify(productList));
       showProduct();

       emptyInput();

    }
}

// delete the product
function deleteProduct(index){
    alert("Are you sure you want to delete");
    var productList;
        if (localStorage.getItem("productList") == null) {
            productList = [];
        } else {
            productList = JSON.parse(localStorage.getItem("productList"));
 
       }

       productList.splice(index, 1);
       localStorage.setItem("productList", JSON.stringify(productList));
       showProduct();

}

// Updation
function updateProduct(index){
    
    //submit button will hide and Update button will show for updating of Data in local Storage
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var productList;
        if (localStorage.getItem("productList") == null) {
            productList = [];
        } else {
            productList = JSON.parse(localStorage.getItem("productList"));
 
       }
    

       document.getElementById("pid").value = productList[index].pid;
       document.getElementById("pname").value = productList[index].pname;
    // document.getElementById("pimage").value = productList[index].pimage;
    // document.getElementById("pimage").value=productList[index].pimage.value;
       document.getElementById("pprice").value = productList[index].pprice;
       document.getElementById("pdescription").value = productList[index].pdescription;

       document.querySelector("#Update").onclick = function(){
        if(validateForm() == true){
            productList[index].pid = document.getElementById("pid").value;
            productList[index].pname = document.getElementById("pname").value;
            // console.log(document.getElementById("pimage").files.name);
           
            if(document.getElementById("pimage").files[0]){
                productList[index].pimage = document.getElementById("pimage").files[0].name;
            }else{
                console.log("No image is updated");
            }
         
            productList[index].pprice = document.getElementById("pprice").value;
            productList[index].pdescription = document.getElementById("pdescription").value;

            localStorage.setItem("productList",JSON.stringify(productList));

            showProduct();

            emptyInput();
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";

        }
       }

}

// used to clear the input fields
function emptyInput(){
    document.getElementById("pid").value = "";
    document.getElementById("pname").value = "";
    document.getElementById("pimage").value = "";
    document.getElementById("pprice").value = "";
    document.getElementById("pdescription").value = "";
}

// use to filter the products
function filterProduct(){
    var filter = document.getElementById("filter").value.toUpperCase();
    var crudTable = document.getElementById('crudTable');
    // var tbody = crudTable.getElementsByTagName('tbody');
    var tr = crudTable.getElementsByTagName('tr');

    for(var row = 1; row<tr.length; row++){
        var td = tr[row].getElementsByTagName('td')[0];

        if(td){
            var tdvalue = td.textContent || td.innerHTML;
            if(tdvalue.toUpperCase().indexOf(filter) > -1){
                tr[row].style.display = "";
            }else{
                tr[row].style.display = "none";
            }
        }

    }

}

// For sorting
function sortProduct(){
    var optvalue = document.getElementById('sort').value;
    console.log(optvalue);
    var productList = JSON.parse(localStorage.getItem("productList"));
    switch(optvalue){
        case "spid":
                    console.log("HI you are in spid")
                    productList.sort(function(a,b){return a.pid - b.pid});
                    
                    break;
        case "spname":
                    console.log("Hi you are in spname")
                    productList.sort(function(a,b){
                        let x = a.pname.toLowerCase();
                        let y = b.pname.toLowerCase();
                        if(x < y){
                            return -1;
                        }

                        if(x > y){
                            return 1;
                        }

                        return 0;
                    });
                    console.log(productList);

                    break;

        case "spprice":
                    console.log("Hi you are in spprice")
                    productList.sort(function(a,b){return a.pprice - b.pprice});
                    break;
    }
    localStorage.setItem("productList",JSON.stringify(productList));
    showProduct();
}
