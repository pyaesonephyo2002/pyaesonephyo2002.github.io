$(document).ready(function(){
    getData();
    
    function getData() {
        let itemsString = localStorage.getItem('shops');
        if(itemsString){
           let itemsArray = JSON.parse(itemsString);
           let data = '';
           let j = 1;
           
           $.each(itemsArray, function(i, v){
               data += `<tr>
                   <td>${j++}</td>
                   <td>${v.name}</td>
                   <td>${v.price}</td>
                   <td>${v.qty}</td>
                   <td>${v.price * v.qty}</td>
               </tr>`;
           });
           data += `<tr>
            <td>Total</td>
            <td></td>
           </tr>`
           $('#tbody').html(data);


        }
    }
    
    $('.addToCart').click(function(){
        let id = $(this).data('id');
        let name = $(this).data('name');
        let price = $(this).data('price');

        let items = {
            id: id,
            name: name,
            price: price,
            qty: 1
        };

        let itemsString = localStorage.getItem('shops');
        let itemsArray;
        if(itemsString == null) {
            itemsArray = [];
        } else {
            itemsArray = JSON.parse(itemsString);
        }

        let status = false;
        $.each(itemsArray, function(i, v){
            if(v.id == id){
                v.qty++;
                status = true;
            }
        });

        if(status == false) {
            itemsArray.push(items);
        }

        let itemsData = JSON.stringify(itemsArray);
        localStorage.setItem('shops', itemsData);
    });
});
