var socket = io.connect('http://localhost:3000');

    socket.on("rc",(data)=>{
        var oldQty = $("#Q"+data.id).text();
        if(oldQty>0){
            $("#Q"+data.id).text(data.qtty);
        }
    });
    socket.on("update",(data)=>{
        // var obj = JSON.parse(data);
        $("#n"+data.id).text(data.name);
        $("#p"+data.id).text(data.price);
        $("#Q"+data.id).text(data.qtty);
    });

    function buy(id)
    {
        var qtty = $("#t"+id).val();
        var oldQty = $("#Q"+id).text();
        console.log(oldQty);
        var newVal = oldQty - qtty;
        socket.emit('buy',{ID:id,Qty:newVal});
    }
