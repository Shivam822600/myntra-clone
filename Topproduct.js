import React,{ useState ,useEffect} from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Avatar from "@material-ui/core/Avatar"
import swalhtml from "@sweetalert/with-react"
import swal from "sweetalert"
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import {ServerURL,postDataAndImage,getData,postData} from"../FetchNodeServices"
import { isBlank } from "../Checks"
import renderHTML from "react-render-html"

const useStyles=makeStyles((theme)=> ({
root:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
    
    },
    subdiv:{
       padding:20,
       width:750,
       marginTop:20,
       background:'#fff'
       },
     input: {
    display: 'none',
  },
   }));
       export default function Topproduct(Props)
      { const classes=useStyles();
         
        
        const [categoryid,setCategoryid]=useState('')
        const [subcategoryid,setsubCategoryid]=useState('')
        const [topproduct,settopproduct]=useState('')
        const [description,setdescription]=useState('')
        const [price,setprice]=useState('')
        const [stock,setstock]=useState('')
        const [discount,setdiscount]=useState('')
        const [icon,setIcon]=useState({bytes:'',file:'/icon.jpg'})
   
        const [ListCategory,setListCategory]=useState([]);
        const [ListSubCategory,setListSubCategory]=useState([]);
        
        const handleCategoryChange=async(event)=>{
         setCategoryid(event.target.value)
         var body={categoryid:event.target.value}
         var result=await postData("subcategories/displayallsubcategorybycategoryid",body);
         setListSubCategory(result);

        }

        const fetchAllCategory=async()=>{
        var result=await getData("categories/displayall");
        setListCategory(result);
        
        };
        useEffect(function(){
          fetchAllCategory();
        },[]);

        const fillCategory=()=>{
          return ListCategory.map((items)=>{

            return (
               <MenuItem value={items.categoryid}>{items.categoryname}</MenuItem> 
                )
          })
        }
        const fillSubCategory=()=>{
          return ListSubCategory.map((items)=>{

            return (
               <MenuItem value={items.subcategoryid}>{items.subcategoryname}</MenuItem> 
                )
          })
        }
        const handleClick=async()=>{
          var error=false
          var msg="<div>"
          if(isBlank(categoryid))
          {error=true
          msg+="<font color='#b2bec3'><b>Category Should not be blank...</b></font><br>";
          }
          if(isBlank(subcategoryid))
          {error=true
          msg+="<font color='#b2bec3'><b>SubCategory Should not be blank...</b></font><br>";
          }
          if(isBlank(topproduct))
          {error=true
          msg+="<font color='#b2bec3'><b>Product Should not be blank...</b></font><br>";
          }
          if(isBlank(description))
          {error=true
            msg+="<font color='#b2bec3'><b>Description Should not be blank...</b></font><br>";
          }
          if(isBlank(price))
          {error=true
            msg+="<font color='#b2bec3'><b>Price Should not be blank...</b></font><br>";
          }
          if(isBlank(stock))
          {error=true
            msg+="<font color='#b2bec3'><b>Stock Should not be blank...</b></font><br>";
          }
        
          if(isBlank(discount))
          {error=true
            msg+="<font color='#b2bec3'><b>Rentamt Should not be blank...</b></font><br>";
          }
        
          if(isBlank(icon.bytes))
          {error=true
            msg+="<font color='#b2bec3'><b>Pls select Category Icon</b></font><br>";
          }
          msg+="</div>"
          if(error)
          {
           swalhtml(renderHTML(msg))
          }
          else
          {

          

         var formData=new FormData()
         formData.append("categoryid",categoryid)
         formData.append("subcategoryid",subcategoryid)
         formData.append("topproduct",topproduct)
         formData.append("description",description)
         formData.append("price",price)
         formData.append("stock",stock)
     
         formData.append("discount",discount)
        
         formData.append("icon",icon.bytes)
         
         var config={headers:{"content-type":"multipart/form-data"}}
         var result=await postDataAndImage('topproduct/interface',formData,config)
         if(result)
         {
          swal({
            title: "Data Submitted Successfully",
            icon: "success",
            dangerMode: true,
          })
         }
        }
       }
        
        const handleIcon=(event)=>{
          setIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
  
          }
         
           
       return(
            <div className={classes.root}>
            <div className={classes.subdiv}>
       <Grid container spacing={1}>
        <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
         <div style={{fontSize:22,fontweight:700,letterSpacing:2,padding:20 }}>
             Man Product
         </div>
        </Grid>
        <Grid item xs={12}>
             <FormControl
               variant="outlined"
               fullWidth
               className={classes.formControl}
               >
                 <InputLabel id="demo-simple-select-outlined-category">
                   Category Id
                 </InputLabel>
                 <Select
                    labelId="demo-simple-select-outlined-category"
                    id="demo-simple-select-outlined-category"
                    //value={age}
                    onChange={(event)=>handleCategoryChange(event)}
                    label="Category ID"
                    >
                      {fillCategory()}
                    </Select>
               </FormControl>
            
              </Grid>
        <Grid item xs={12}>
        <FormControl
               variant="outlined"
               fullWidth
               className={classes.formControl}
               >
                 <InputLabel id="demo-simple-select-outlined-subcategory">
                   SubCategory Id
                 </InputLabel>
                 <Select
                    labelId="demo-simple-select-outlined-subcategory"
                    id="demo-simple-select-outlined-subcategory"
                    //value={age}
                    onChange={(event)=>setsubCategoryid(event.target.value)}
                    label="SubCategory ID"
                    >
                      {fillSubCategory()}
                    </Select>
               </FormControl>
            
              </Grid>           
         <Grid item xs={12}>
             <TextField onChange={(event)=> settopproduct(event.target.value)} label="Man Product" variant="outlined" fullWidth/>
              </Grid>


        <Grid item xs={12} >
             <TextField onChange={(event)=> setdescription(event.target.value)} label="Description" variant="outlined" fullWidth/>
             </Grid>
     
        <Grid item xs={12} >
             <TextField onChange={(event)=> setprice(event.target.value)} label="Price" variant="outlined" fullWidth/>
             </Grid>

         <Grid item xs={12} >
             <TextField onChange={(event)=> setstock(event.target.value)} label="Stock" variant="outlined" fullWidth/>
             </Grid>  

             <Grid item xs={12} >
             <TextField onChange={(event)=> setdiscount(event.target.value)} label="discount" variant="outlined" fullWidth/>
             </Grid>  

           <Grid item xs={12}>
           <span style={{fontsize:16,fontweight:300}}>Upload Accessory Picture</span>
           <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
           <label htmlFor="icon-button-file">
           <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </Grid>


     <Grid item xs={12}  style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

      <Avatar variant="rounded" src={icon.file} style={{width:60,height:60}} />
      
      </Grid>

    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Button onClick={()=>handleClick()} fullWidth variant="contained" color="primary">Save</Button>
     </Grid>

     <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Button fullWidth variant="contained" color="primary">Reset</Button>
     </Grid>
</Grid>
            </div>
            </div> 
        ) }