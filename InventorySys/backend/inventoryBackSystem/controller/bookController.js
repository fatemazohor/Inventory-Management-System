const Book = require('../model/book_model');
const connection = require('../connection');


// get all book
const findAllBook = (req,res,next)=>{
    var query = "select * from book";
    connection.query(query,(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }else{
            return res.status(500).json(err);
        }
    })
}
// get book by id
const getBookById = async(req,res,next)=>{
    const id = req.params.id;
    var query = "select * from book where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results == null){
                return res.status(400).json({message:"book id does not match."});

            }
            return res.status(200).json(results)
        }
        else{
            return res.status(500).json(err);
        }
    });
    
}
    
// save book
const saveBook=(req,res,next)=>{
    let book = req.body;
    var query = "insert into book(name,price,dept_id) values(?,?,?)";
    connection.query(query,[book.name,book.price,book.dept_id],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"Book added sucessfully"});
        }else{
            return res.status(500).json(err);
        }

    });

}

const updateBook = (req,res,next)=>{
    const id = req.params.id;
    let book = req.body;
    var query = " update book set name=?,price=?,dept_id=? where id=?";
    connection.query(query,[book.name,book.price,book.dept_id,id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(400).json({message:"book id does not match."});

            }
            return res.status(200).json({message:"Book updated sucessfully."})
        }
        else{
            return res.status(500).json(err);
        }
    })

}
const deleteBook =(req,res,next)=>{
    const id = req.params.id;
    var query = "delete from book where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(404).json({message:"book id does not match."});

            }
            return res.status(200).json({message:"Book deleted sucessfully."})
        }
        else{
            return res.status(500).json(err);
        }
    })

}

const getBookNameById = (req, res,next) => {
    const id = req.params.id;
    Book.getById(id, book => {
      res.json(book);
    });
  };

module.exports = {
    getBookById,
    getBookNameById,
    saveBook,
    updateBook,
    deleteBook,
    findAllBook
}