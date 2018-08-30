module.exports = (client,io,product)=>{
    client.on("buy",(data)=>{
        //console.log("chqty: "+data.ID);
        product.findByIdAndUpdate(data.ID, { $set: { qty: data.Qty }}, { new: true }, function (err, res) {
            if (err) throw err;
          });
        io.sockets.emit("rc",{id:data.ID,qtty:data.Qty});
    });
    client.on("delall",(id)=>{
        // dbo.collection("products").deleteOne({"_id":id}, function(err, obj) {
        //     if (err) throw err;
        //     console.log("1 document deleted");
        //     io.sockets.emit("delete",id);
        //   });
        
    });
    client.on("chall",(data)=>{
        var newvalues = { $set: {name:data.name, price:data.price ,qty:data.qtty} };
        
          product.findByIdAndUpdate(data.id, newvalues, { new: true }, function (err, res) {
            if (err) throw err;
            io.sockets.emit("update",data);
          });
    });
}