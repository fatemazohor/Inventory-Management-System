const connection = require('../connection');
const stockService = require('../services/stockupdate');

// get all order
const findAll = (req,res,next)=>{
    var query = "select * from order_details";
    connection.query(query,(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }else{
            return res.status(500).json(err);
        }
    })
}
// get all order
const findByKeyword = (req,res,next)=>{
    const value = req.query.value;
    if(value != null){
        console.log("keyword "+value)
    var query = "select * from order_details where productid like CONCAT('%', ?, '%')";
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
// get order by id
const findById = async(req,res,next)=>{
    const id = req.params.id;
    var query = "select * from order_details where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results == null){
                return res.status(400).json({message:"order id does not match."});

            }
            return res.status(200).json(results)
        }
        else{
            return res.status(500).json(err);
        }
    });
    
}
    
// save order
const save=(req,res,next)=>{
    const currentDate = new Date();
    let order = req.body;
    
    var query = "insert into order_details(quantity, productid, unit_price, statusid, total_price, vendorid, createdate) values(?,?,?,?,?,?,?)";
    connection.query(query,[order.quantity,order.productid,order.unit_price,order.statusid, order.total_price, order.vendorid, currentDate],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"order added sucessfully"});
        }else{
            return res.status(500).json(err);
        }

    });
    stockService.saveStock(order.productid, order.quantity);

}
// update
const updateById = (req,res,next)=>{
    const id = req.params.id;
    let order = req.body;
    var query = " update order_details set quantity=?, productid=?, unit_price=?, statusid=?, total_price=?, vendorid=? where id=?";
    connection.query(query,[order.quantity,order.productid,order.unit_price,order.statusid, order.total_price, order.vendorid, id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(400).json({message:"order id does not match."});

            }
            return res.status(200).json({message:"order updated sucessfully."})
        }
        else{
            return res.status(500).json(err);
        }
    })

}
//delete
const deleteById =(req,res,next)=>{
    const id = req.params.id;
    var query = "delete from order_details where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(404).json({message:"order id does not match."});

            }
            return res.status(200).json({message:"order deleted sucessfully."})
        }
        else{
            return res.status(500).json(err);
        }
    })

}

// get latest 10 delivery
const findLatest = (req,res,next)=>{
    var query = "select * from order_details order by id desc limit 10";
    // var query = "select * from order_details";
    connection.query(query,(err,result)=>{
        if(!err){
            // console.log(result);
            return res.status(200).json(result);

        }else{
            return res.status(500).json(err);
        }
    })
}

// get total money for purchase products
const findTotalSale = (req,res,next)=>{
    var query = "select sum(total_price) from order_details";
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