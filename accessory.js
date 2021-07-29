var express = require('express');
var router = express.Router();
var pool=require('./pool.js')
var upload=require('./multer')
/* GET home page. */

router.post('/interface',upload.any(), function(req,res, next) {
pool.query("insert into accessory (categoryid,subcategoryid,accessory,description,price,stock,discount,icon)values(?,?,?,?,?,?,?,?,?,?)",
[req.body.categoryid,req.body.subcategoryid,req.body.accessory,req.body.description,req.body.price,req.body.stock,req.body.discount,req.files[0].originalname],function(error,result){

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

    pool.query("select * from accessory",function(error,result){
 
        if(error){

         res.status(500).json([])

       }

        else{

            res.status(200).json(result)
        }


 })
})

router.post('/editicon',upload.single('icon'), function(req, res, next) {
    pool.query("update accessory set icon=? where accessoryid=?",[req.file.originalname,req.body.accessoryid],function(error,result){
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
     router.post('/editaccessory', function(req, res, next) {
            pool.query("update accessory set categoryid=?,subcategoryid=?,accessory=?,description=?,price=?,stock=?,discount=?where gameid=?",
            [req.body.categoryid,req.body.subcategoryid,req.body.accessory,req.body.description,req.body.price,req.body.stock,req.body.discount,req.body.gameid],function(error,result){
            
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
            
            
router.post('/deleteaccessory', function(req, res, next) {
 pool.query(
" delete from accessory  where accessoryid=?",[req.body.accessoryid],function(error,result){
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

            
            router.get('/accessoryoffers',function(req,res) {

                pool.query("select * from accessory where discount>0",function(error,result){
                  
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

            router.post('/displayallaccessorybysubcategoryid',function(req,res){
                pool.query("select * from accessory where subcategoryid=?",[req.body.subcategoryid],function(error,result){
                            
                if(error){
                           
                res.status(500).json([])
                           
                }
                           
               else{
                           
               res.status(200).json(result)
                  }
                           
                           
               })
                 })  
module.exports = router;