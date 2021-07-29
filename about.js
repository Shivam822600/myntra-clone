var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload=require('./multer')

/* GET home page. */
router.post(
    "/addabout",
    upload.single("icon"),
    function (req, res, next) {
    console.log(req.body);
      pool.query(
        "insert into about(about)values(?)",
        [
        
          req.body.about,
         
        ],
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(500).json({ result: false });
          } else {
            res.status(200).json({ result: true });
          }
        }
      );
    }
  );

  router.get('/displayall',function(req,res) {

    pool.query("select * from about",function(error,result){
      
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

router.post('/editabout', function(req, res, next) {
    pool.query("update about set about=? where aboutid=?",[req.body.about,req.body.aboutid],function(error,result){
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

    router.post('/deleteabout', function(req, res, next) {
        pool.query(
       " delete from about  where aboutid=?",[req.body.aboutid],function(error,result){
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
       
     
module.exports = router;