var express = require('express');
var router = express.Router();
var pool=require('./pool.js')
var upload=require('./multer')
/* GET home page. */

router.post('/interface',upload.any(), function(req,res, next) {
pool.query("insert into bestdeal (categoryid,subcategoryid,bestdeal,description,price,stock,discount,icon)values(?,?,?,?,?,?,?,?,?,?)",
[req.body.categoryid,req.body.subcategoryid,req.body.bestdeal,req.body.description,req.body.price,req.body.stock,req.body.discount,req.files[0].originalname],function(error,result){

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

    pool.query("select * from bestdeal",function(error,result){
 
        if(error){

         res.status(500).json([])

       }

        else{

            res.status(200).json(result)
        }


 })
})

router.post('/editicon',upload.single('icon'), function(req, res, next) {
    pool.query("update bestdeal set icon=? where bestdealid=?",[req.file.originalname,req.body.bestdealid],function(error,result){
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
     router.post('/editbestdeal', function(req, res, next) {
            pool.query("update bestdeal set categoryid=?,subcategoryid=?,bestdeal=?,description=?,price=?,stock=?,discount=?where gameid=?",
            [req.body.categoryid,req.body.subcategoryid,req.body.bestdeal,req.body.description,req.body.price,req.body.stock,req.body.discount,req.body.gameid],function(error,result){
            
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
            
            
router.post('/deletebestdeal', function(req, res, next) {
 pool.query(
" delete from bestdeal  where bestdealid=?",[req.body.bestdealid],function(error,result){
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

            
            router.get('/bestdealoffers',function(req,res) {

                pool.query("select * from bestdeal where discount>0",function(error,result){
                  
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

            router.post('/displayallbestdealbysubcategoryid',function(req,res){
                pool.query("select * from bestdeal where subcategoryid=?",[req.body.subcategoryid],function(error,result){
                            
                if(error){
                           
                res.status(500).json([])
                           
                }
                           
               else{
                           
               res.status(200).json(result)
                  }
                           
                           
               })
                 })  
module.exports = router;