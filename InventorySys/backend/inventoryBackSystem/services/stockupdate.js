const connection = require('../connection');


async function saveStock(dataid, dataquantity) {
    try {
        const stocks = await getStockById(dataid);
        const currentDate = new Date();
        if (stocks) {
            const id = stocks.productid;
            const query = "UPDATE stocks SET quantity=?, updatedate=? WHERE productid=?";
            connection.query(query, [parseFloat(stocks.quantity) + parseFloat(dataquantity),currentDate, id], (err, results) => {
                if (!err) {
                    if (results.affectedRows === 0) {
                        throw { status: 400, message: "Stock ID does not match." };
                    } else {
                        console.log("Stock updated successfully.");
                    }
                } else {
                    throw err;
                }
            });
        } else {
            const query = "INSERT INTO stocks (quantity, productid, warehouseid, updatedate) VALUES (?, ?, ?, ?)";
            connection.query(query, [dataquantity, dataid, 1, currentDate], (err, results) => {
                if (err) {
                    throw err; // Throw error if query execution fails
                }
                console.log("Stock added successfully.");
            });
        }
    } catch (error) {
        throw error;
    }
}
async function decreaseStock(dataid, dataquantity) {
    try {
        const stocks = await getStockById(dataid);
        const currentDate = new Date();
        if (stocks) {
            const id = stocks.productid;
            const query = "UPDATE stocks SET quantity=?, updatedate=? WHERE productid=?";
            connection.query(query, [parseFloat(stocks.quantity) - parseFloat(dataquantity),currentDate, id], (err, results) => {
                if (!err) {
                    if (results.affectedRows === 0) {
                        throw { status: 400, message: "Stock ID does not match." };
                    } else {
                        console.log("Stock updated successfully.");
                    }
                } else {
                    throw err;
                }
            });
        } else {
            const query = "INSERT INTO stocks (quantity, productid, warehouseid, updatedate) VALUES (?, ?, ?, ?)";
            connection.query(query, [-dataquantity, dataid, 1, currentDate], (err, results) => {
                if (err) {
                    throw err; // Throw error if query execution fails
                }
                console.log("Stock added successfully.");
            });
        }
    } catch (error) {
        throw error;
    }
}



async function getStockById(idproduct) {
    try {
        const id = idproduct;
        const query = "SELECT * FROM stocks WHERE productid=?";
        
        // Wrap the database query in a promise
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    if (results.length === 0) {
                        resolve(null); // Return null if stock ID does not exist
                    } else {
                        resolve(results[0]); // Return only the first result
                    }
                }
            });
        });
    } catch (error) {
        throw error;
    }
}
module.exports={
    saveStock,
    decreaseStock
}