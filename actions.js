module.exports = (app,product)=>{
    app.get("/productlist",(req,res)=>{

        
        // dbo.collection("products").find({}).toArray(function(err, result) {
        // if (err) throw err;
        // //console.log(result.name);
        // res.send(JSON.stringify(result));
        // //db.close();
        // });

    });
    app.get('/',function(req,res){
        // res.sendFile(__dirname+"/"+"Index.html");
        product.find({},(err,result)=>{
            if (err) throw err;
            // console.log(result);
            res.render('customer',{data:result});
        });
    });

    app.get('/admin',function(req,res){
        res.sendFile(__dirname+"/"+"admin.html");
    });
    app.get("/adminlist",(req,res)=>{
        // var dbo = db.db("prodb");
        product.find({},(err, result)=>{
        if (err) throw err;
        //console.log(result.name);
        res.send(JSON.stringify(result));
        //db.close();
        });
    });
    app.get('/add',(req,res)=>{
        res.sendFile(__dirname+"/"+"addproduct.html");
    });
    app.post('/add',(req,res)=>{
        // console.log(req.body);
        product(req.body).save((err,data)=>{
            if(err) throw err;
        });
        res.redirect('/admin');
    });
}