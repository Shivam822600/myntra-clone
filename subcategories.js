var express = require('express');
var router = express.Router();
var pool=require('./pool.js')
var upload=require('./multer')
/* GET home page. */

router.post('/addsubcategory',upload.any(), function(req,res, next) {
pool.query("insert into subcategories (categoryid,subcategoryname,description,price,discount,icon,ad)values(?,?,?,?,?,?)",
[req.body.categoryid,req.body.subcategoryname,req.body.description,req.body.price,req.body.discount,req.files[0].originalname,req.files[1].originalname],function(error,result){

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


router.get('/subcategoryoffers',function(req,res) {

    pool.query("select * from subcategories where discount>0",function(error,result){
      
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

router.get('/displayall',function(req,res){

    pool.query("select * from subcategories",function(error,result){
 
        if(error){

         res.status(500).json([])

       }

        else{

            res.status(200).json(result)
        }


 })
})

router.post('/editicon',upload.single('icon'), function(req, res, next) {
    pool.query("update subcategories set icon=? where subcategoryid=?",[req.file.originalname,req.body.subcategoryid],function(error,result){
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

    router.post('/editad',upload.single('ad'), function(req, res, next) {
        pool.query("update subcategories set ad=? where subcategoryid=?",[req.file.originalname,req.body.subcategoryid],function(error,result){
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


        router.post('/editcategorydata', function(req, res, next) {
            pool.query("update subcategories set categoryid=?,subcategoryname=?,description=?,price=?,discount=? where subcategoryid=?",[req.body.categoryid,req.body.subcategoryname,req.body.description,req.body.discount,req.body.price,req.body.stock,req.body.rented,req.body.rentamt,req.body.adstatus,req.body.subcategoryid],function(error,result){
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
            
            
router.post('/deletecategory', function(req, res, next) {
 pool.query(
" delete from subcategories  where subcategoryid=?",[req.body.subcategoryid],function(error,result){
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
            })
            
router.post('/displayallsubcategorybycategoryid',function(req,res){
 pool.query("select * from subcategories where categoryid=?",[req.body.categoryid],function(error,result){
             
 if(error){
            
 res.status(500).json([])
            
 }
            
else{
            
res.status(200).json(result)
   }
            
            
})
  })  
                  
module.exports = router;