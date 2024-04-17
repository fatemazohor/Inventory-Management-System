const connection = require('../connection');

// get all product
const findAll = (req,res,next)=>{
    var query = "select * from products";
    connection.query(query,(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }else{
            return res.status(500).json(err);
        }
    })
}
// get product by id
const findById = async(req,res,next)=>{
    const id = req.params.id;
    var query = "select * from products where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results == null){
                return res.status(400).json({message:"Product id does not match."});

            }
            return res.status(200).json(results)
        }
        else{
            return res.status(500).json(err);
        }
    });
    
}
    
// save product
const save=(req,res,next)=>{
    const currentDate = new Date();
    let product = req.body;
    var query = "insert into products(pcode, pname, pcate,price,createdate) values(?,?,?,?,?)";
    connection.query(query,[product.pcode,product.pname,product.pcate,product.price,currentDate],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"Product added sucessfully"});
        }else{
            return res.status(500).json(err);
        }

    });

}
// update
const updateById = (req,res,next)=>{
    const id = req.params.id;
    let product = req.body;
    var query = " update products set pcode=?, pname=?, pcate=? , price=? where id=?";
    connection.query(query,[product.pcode,product.pname,product.pcate,product.price,id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(400).json({message:"Product id does not match."});

            }
            return res.status(200).json({message:"Product updated sucessfully."})
        }
        else{
            return res.status(500).json(err);
        }
    })

}
//delete
const deleteById =(req,res,next)=>{
    const id = req.params.id;
    var query = "delete from products where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(404).json({message:"Product id does not match."});

            }
            return res.status(200).json({message:"Product deleted sucessfully."})
        }
        else{
            return res.status(500).json(err);
        }
    })

}


module.exports = {
    findAll,
    findById,
    save,
    updateById,
    deleteById,
}