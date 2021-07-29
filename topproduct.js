var express = require('express');
var router = express.Router();
var pool=require('./pool.js')
var upload=require('./multer')
/* GET home page. */

router.post('/interface',upload.any(), function(req,res, next) {
pool.query("insert into topproduct (categoryid,subcategoryid,topproduct,description,price,stock,discount,icon)values(?,?,?,?,?,?,?,?)",
[req.body.categoryid,req.body.subcategoryid,req.body.topproduct,req.body.description,req.body.price,req.body.stock,req.body.discount,req.files[0].originalname],function(error,result){

if(error)
{console.log(error)
    res.status(500).json({result:false})
}
else
{ console.log(result)
    res.status(200).json({result:true})
}
}) 
}); 
router.get('/displayall',function(req,res){

    pool.query("select * from topproduct",function(error,result){
 
        if(error){

         res.status(500).json([])

       }

        else{

            res.status(200).json(result)
        }


 })
})

router.post('/editicon',upload.single('icon'), function(req, res, next) {
    pool.query("update topproduct set icon=? where topproductid=?",[req.file.originalname,req.body.topproductid],function(error,result){
    console.log(req.body)
    if(error)
    {console.log(error)
        res.status(500).json({result:false})
    }
    else
    { console.log(result)
        res.status(200).json({result:true})
    }
    }) 
    });  
     router.post('/edittopproduct', function(req, res, next) {
            pool.query("update topproduct set categoryid=?,subcategoryid=?,topproduct=?,description=?,price=?,stock=?,discount=?where gameid=?",
            [req.body.categoryid,req.body.subcategoryid,req.body.topproduct,req.body.description,req.body.price,req.body.stock,req.body.discount,req.body.gameid],function(error,result){
            
            if(error)
            {console.log(error)
                res.status(500).json({result:false})
            }
            else
            { console.log(result)
                res.status(200).json({result:true})
            }
            }) 
            });  
            
            
router.post('/deletetopproduct', function(req, res, next) {
 pool.query(
" delete from topproduct  where topproductid=?",[req.body.topproductid],function(error,result){
            console.log(result)
            if(error)
            {console.log(error)
                res.status(500).json({result:false})
            }
            else
            { 
                res.status(200).json({result:true})
            }
            }) 
            });

            
            router.get('/topproductoffers',function(req,res) {

                pool.query("select * from topproduct where discount>0",function(error,result){
                  
                    if(error)
                    {
                        res.status(500).json([])
                    }
                    else
                    {
                       
                        res.status(200).json(result)
                    }
                })
              //res.render('index', { title: 'Express' });
            });

            router.post('/displayalltopproductbysubcategoryid',function(req,res){
                pool.query("select * from topproduct where subcategoryid=?",[req.body.subcategoryid],function(error,result){
                            
                if(error){
                           
                res.status(500).json([])
                           
                }
                           
               else{
                           
               res.status(200).json(result)
                  }
                           
                           
               })
                 })  
module.exports = router;