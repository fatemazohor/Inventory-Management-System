const connection = require('../connection');
const stockService = require('../services/stockupdate');

// get all delivery
const findAll = (req,res,next)=>{
    var query = "select * from delivery_details";
    connection.query(query,(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }else{
            return res.status(500).json(err);
        }
    })
}

// get all delivery
const findByKeyword = (req,res,next)=>{
    const value = req.query.value;
    if(value != null){
        console.log("keyword "+value)
    var query = "select * from delivery_details where productid like CONCAT('%', ?, '%')";
    connection.query(query,[value],(err,result)=>{
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
// get delivery by id
const findById = async(req,res,next)=>{
    const id = req.params.id;
    var query = "select * from delivery_details where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results == null){
                return res.status(400).json({message:"delivery id does not match."});

            }
            return res.status(200).json(results)
        }
        else{
            return res.status(500).json(err);
        }
    });
    
}
    
// save delivery
const save=(req,res,next)=>{
    const currentDate = new Date();
    let delivery = req.body;
    
    var query = "insert into delivery_details(quantity, productid, customerid, deliverydate, unit_price, total_price, statusid, createdate) values(?,?,?,?,?,?,?,?)";
    connection.query(query,[delivery.quantity,delivery.productid,delivery.customerid,delivery.deliverydate,delivery.unit_price, delivery.total_price, delivery.statusid, currentDate],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"delivery added sucessfully"});
        }else{
            return res.status(500).json(err);
        }

    });
    stockService.decreaseStock(delivery.productid, delivery.quantity);

}
// update
const updateById = (req,res,next)=>{
    const id = req.params.id;
    let delivery = req.body;
    var query = " update delivery_details set quantity=?, productid=?, customerid=?, deliverydate=?, unit_price=?, total_price=?, statusid=? where id=?";
    connection.query(query,[delivery.quantity,delivery.productid,delivery.customerid,delivery.deliverydate,delivery.unit_price, delivery.total_price, delivery.statusid, id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(400).json({message:"delivery id does not match."});

            }
            return res.status(200).json({message:"delivery updated sucessfully."})
        }
        else{
            return res.status(500).json(err);
        }
    })

}
//delete
const deleteById =(req,res,next)=>{
    const id = req.params.id;
    var query = "delete from delivery_details where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(404).json({message:"delivery id does not match."});

            }
            return res.status(200).json({message:"delivery deleted sucessfully."})
        }
        else{
            return res.status(500).json(err);
        }
    })

}

// get latest 10 delivery
const findLatest = (req,res,next)=>{
    // var query = "select * from delivery_details order by id desc limit 10";
    var query = "select * from delivery_details";
    connection.query(query,(err,result)=>{
        if(!err){
            console.log(result);
            return res.status(200).json(result);

        }else{
            return res.status(500).json(err);
        }
    })
}

// get total money
const findTotalSale = (req,res,next)=>{
    var query = "select sum(total_price) from delivery_details";
    connection.query(query,(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }else{
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
    findByKeyword,
    findLatest,
    findTotalSale
}