import MaterialTable from "material-table"
import React,{useState,useEffect} from "react"

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import {ServerURL,postDataAndImage,getData,postData} from "../FetchNodeServices"
import Avatar from "@material-ui/core/Avatar"
import swalhtml from "@sweetalert/with-react"
import swal from "sweetalert"

import PhotoCamera from '@material-ui/icons/PhotoCamera';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import { isBlank } from "../Checks"
import renderHTML from "react-render-html"

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
    
    },
    subdiv:{
       padding:20,
       width:700,
       marginTop:20,
       background:'#f1f2f6'
       },
     input: {
    display: 'none',
  },
formControl: {
    minWidth: 690,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function DisplayAllCategory(props)
{ const[list,setList]=useState()
  const classes = useStyles();
  //////////////////////////Edit Form//////////////////////////////
  
  const [subcategoryid,setsubcategoryid]=useState('')
  const [categoryid,setcategoryid]=useState('')
  const [subcategoryname,setsubcategoryname]=useState('')
  const [categoryDescription,setCategoryDescription]=useState('')
  const [price,setprice]=useState('')
  const [discount,setdiscount]=useState('')
  const [icon,setIcon]=useState({bytes:'',file:'/icon.jpg'})
  const [ad,setAd]=useState({bytes:'',file:'/icon.jpg'})

  const [iconSaveCancel,setIconSaveCancel]=useState(false)
  const [adSaveCancel,setAdSaveCancel]=useState(false)
  const [getRowData,setRowData]=useState([])
  const [ListCategory,setListCategory]=useState([])
  const handleIcon=(event)=>{
    setIcon({bytes:event.target.files[0],
      file:URL.createObjectURL(event.target.files[0])})
      setIconSaveCancel(true)
    }
    const handleAd=(event)=>{
      setAd({bytes:event.target.files[0],
      file:URL.createObjectURL(event.target.files[0])})
       setAdSaveCancel(true)
      }
  const handleDelete=async()=>{
    var body={subcategoryid:subcategoryid}
  var result=await postData("subcategories/deletecategory",body)
  if(result)
  {
   swal({
     title: "category Deleted Successfully",
     icon: "success",
     dangerMode: true,
   })
  }
else
{
 swal({
   title: "Fail to Deleted Record",
   icon: "success",
   dangerMode: true,
 })
}
  }
  const handleClick=async()=>{
    var error=false
    var msg="<div>"
    if(isBlank(categoryid))
    {error=true
    msg+="<font color='#b2bec3'><b>Category Id Should not be blank...</b></font><br>";
    }
    if(isBlank(subcategoryname))
    {error=true
    msg+="<font color='#b2bec3'><b>SubCategory Should not be blank...</b></font><br>";
    }
    if(isBlank(categoryDescription))
    {error=true
      msg+="<font color='#b2bec3'><b>Description Should not be blank...</b></font><br>";
    }

    if(isBlank(discount))
    {error=true
      msg+="<font color='#b2bec3'><b>Pls fill the discount</b></font><br>";
    }
    msg+="</div>"
    alert(subcategoryid)
    if(error)
    {
     swalhtml(renderHTML(msg))
    }
    else
    {
   var body={subcategoryid:subcategoryid,
     categoryid:categoryid,
     subcategoryname: subcategoryname,
    description: categoryDescription,
   price:price,
    discount: discount
  }
   var result=await postData('subcategories/editcategorydata',body)
   if(result)
   {
    swal({
      title: "category Updated Successfully",
      icon: "success",
      dangerMode: true,
    })
   }
  }
 }
 const handleCancelIcon=()=>{
   setIconSaveCancel(false)
   setIcon({bytes:"",file:`${ServerURL}/images/${getRowData.icon}`})
 } 
 const handleCancelAd=()=>{
  setAdSaveCancel(false)
  setAd({bytes:"",file:`${ServerURL}/images/${getRowData.ad}`})
} 

const handleClickSaveIcon=async()=>{

  var formData=new FormData()
  formData.append("subcategoryid",subcategoryid)
  formData.append("icon",icon.bytes)

  var config={headers:{"content-type":"multipart/form-data"}}
  var result=await postDataAndImage('subcategories/editicon',formData,config)
  if(result)
  {
   swal({
     title: "Icon Updated Successfully",
     icon: "success",
     dangerMode: true,
   })
   setIconSaveCancel(false)
  }
}

const handleClickSaveAd=async()=>{

  var formData=new FormData()
  formData.append("subcategoryid",subcategoryid)
  formData.append("ad",ad.bytes)

  var config={headers:{"content-type":"multipart/form-data"}}
  var result=await postDataAndImage('subcategories/editad',formData,config)
  if(result)
  {
   swal({
     title: "Ad Updated Successfully",
     icon: "success",
     dangerMode: true,
   })
   setAdSaveCancel(false)
  }
}
 const editFormView=()=>{
  return(
    <div className={classes.root}>
    <div className={classes.subdiv}>
<Grid container spacing={1}>
<Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
 <div style={{fontSize:22,fontweight:700,letterSpacing:2,padding:20 }}>
     Category Interface
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
                    value={categoryid}
                    onChange={(event)=>setcategoryid(event.target.value)}
                    label="Category ID"
                    >
                      {showCategory()}
                    </Select>
               </FormControl>
      </Grid>
 <Grid item xs={12}>
     <TextField value={subcategoryname} onChange={(event)=> setsubcategoryname(event.target.value)} label="SubCategory Name" variant="outlined" fullWidth/>
      </Grid>


<Grid item xs={12} >
     <TextField value={categoryDescription} onChange={(event)=> setCategoryDescription(event.target.value)} label="Description" variant="outlined" fullWidth/>
     </Grid>
 
     <Grid item xs={12} >
    <TextField value={price} onChange={(event)=> setprice(event.target.value)} label="Price" variant="outlined" fullWidth/>
      </Grid> 


  <Grid item xs={12} >
    <TextField value={discount} onChange={(event)=> setdiscount(event.target.value)} label="Discount" variant="outlined" fullWidth/>
      </Grid>        
   


   <Grid item xs={6}>
   <span style={{fontsize:16,fontweight:300 }}>
     Edit Category Icon
   </span>
   <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
   <label htmlFor="icon-button-file">
   <IconButton color="primary" aria-label="upload picture" component="span">
  <PhotoCamera />
</IconButton>
</label>
</Grid>


<Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>

<Avatar variant="rounded" src={icon.file} style={{width:60,height:60}} />
{iconSaveCancel?<span><Button onClick={()=>handleClickSaveIcon()} color="secondary">Save</Button><Button color="secondary" onClick={()=>handleCancelIcon()}>Cancel</Button></span>:<></>}
</Grid>

<Grid item xs={12} sm={6}>
   <span style={{fontsize:16,fontweight:300}}>
     Edit Category Ad
      </span>
   <input onChange={(event)=>handleAd(event)} accept="image/*" className={classes.input} id="icon-button-ad-2" type="file" />
   <label htmlFor="icon-button-ad-2">
   <IconButton color="primary" aria-label="upload picture" component="span">
  <PhotoCamera />
</IconButton>
</label>
</Grid>


<Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
<Avatar variant="rounded" src={ad.file} style={{width:60,height:60}} />
{adSaveCancel?<span><Button onClick={()=>handleClickSaveAd()} color="secondary">Save</Button><Button color="secondary" onClick={()=>handleCancelAd()}>Cancel</Button></span>:<></>}
</Grid>





</Grid>
    </div>
    </div> 
)

 }




  ////////////////////////////////////////////////////////////////////
///////////////////////////Edit Dialog ///////////////////////////////

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (rowData) => {
    setRowData(rowData)
    setOpen(true);
    setsubcategoryid(rowData.subcategoryid)
    setcategoryid(rowData.categoryid)
    setsubcategoryname(rowData.subcategoryname)
    setCategoryDescription(rowData.description)
    setprice(rowData.price)
    setdiscount(rowData.discount)
    setIcon({bytes:" ",file:`${ServerURL}/images/${ rowData.icon}`})
    setAd({bytes: "",file:`${ServerURL}/images/${rowData.ad}`})

  };

  const handleClose = () => {
    setOpen(false);
    fetchAllCategory()
  };

  const showEditdialog=()=>{
    return (
      <div>
        
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Edit/Delete Game subcategories
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClick}>
                Update
              </Button>
              <Button autoFocus color="inherit" onClick={handleDelete}>
                Delete
              </Button>
            </Toolbar>
          </AppBar>
          {editFormView()}
        </Dialog>
      </div>
    );

  }
  ///////////////////////////////////////////////////////////////////
const fetchAllSubCategory=async()=>{
var result=await getData("subcategories/displayall")
setList(result)

}
const fetchAllCategory=async ()=> {
  var result = await getData("categories/displayall")
  setListCategory(result)
}

const showCategory=()=>{
  return ListCategory.map((items)=>{

    return (
       <MenuItem value={items.categoryid}>{items.categoryname}</MenuItem> 
        )
  })
}
useEffect(function(){
  fetchAllSubCategory()
  fetchAllCategory()
},[])


function displayall() {
    return (
      <div>
      <MaterialTable
        title="Category list"
        columns={[
          { title: 'Id', field: 'subcategoryid' },
          { title: 'CategoryId', field: 'categoryid' },
          { title: 'Name', field: 'subcategoryname' },
          { title: 'Description', field: 'description' },
          { title: 'Price', field: 'price' },
          { title: 'discount', field: 'discount' },
          { title: 'Icon', field: 'icon',
             render: rowData =><div><img src={`${ServerURL}/images/${rowData.icon}`} style={{borderRadius:5}} width='40' height='50'/></div>},
          { title: 'Ad', field: 'ad', 
          render: rowData =><div><img src={`${ServerURL}/images/${rowData.ad}`} style={{borderRadius:5}} width='40' height='50' /></div> },
     
         
        ]}
        data={list}       
        actions={[
          {
            icon: 'editoutlined',
            tooltip: 'Edit subcategories',
            onClick: (event, rowData) =>handleClickOpen(rowData)
          }
        ]}
      />
      {showEditdialog()}
      </div>
    )
  }
  return( <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
<div style={{width:800,marginTop:10,padding:3}}>
{displayall()}
</div>

  </div>
  )
  
}