const connection = require('../connection');

// get all stock
const findAll = (req,res,next)=>{
    var query = "select * from stocks";
    connection.query(query,(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }else{
            return res.status(500).json(err);
        }
    })
}
// get all stock
const findByKeyword = (req,res,next)=>{
    const value = req.query.value;
    if(value != null){
        console.log("keyword "+value)
    var query = "select * from stocks where quantity like CONCAT('%', ?, '%') or productid like CONCAT('%', ?, '%') or warehouseid like CONCAT('%', ?, '%') or updatedate like CONCAT('%', ?, '%')";
    connection.query(query,[value,value,value,value],(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }else{
            return res.status(500).json(err);
        }
    })

    }else{
        return findAll;

    }
    
}
// get stocks by id
const findById = async(req,res,next)=>{
    const id = req.params.id;
    var query = "select * from stocks where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results == null){
                return res.status(400).json({message:"stocks id does not match."});

            }
            return res.status(200).json(results)
        }
        else{
            return res.status(500).json(err);
        }
    });
    
}
    
// save stocks
const save=(req,res,next)=>{
    const currentDate = new Date();
    let stocks = req.body;
    var query = "insert into stocks(quantity, productid, warehouseid,updatedate) values(?,?,?,?)";
    connection.query(query,[stocks.quantity,stocks.productid,stocks.warehouseid,currentDate],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"stocks added sucessfully"});
        }else{
            return res.status(500).json(err);
        }

    });

}
// update
const updateById = (req,res,next)=>{
    const currentDate = new Date();
    const id = req.params.id;
    let stocks = req.body;
    var query = " update stocks set quantity=?, productid=?, warehouseid=?, updatedate=? where id=?";
    connection.query(query,[stocks.quantity,stocks.productid,stocks.warehouseid,currentDate,id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(400).json({message:"stocks id does not match."});

            }
            return res.status(200).json({message:"stocks updated sucessfully."})
        }
        else{
            return res.status(500).json(err);
        }
    })

}
//delete
const deleteById =(req,res,next)=>{
    const id = req.params.id;
    var query = "delete from stocks where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(404).json({message:"stocks id does not match."});

            }
            return res.status(200).json({message:"stocks deleted sucessfully."})
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
    findByKeyword
}