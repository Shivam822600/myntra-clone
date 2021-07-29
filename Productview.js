import React,{useEffect,useState,createRef} from "react"
import Grid from '@material-ui/core/Grid'
import {ServerURL,getData,postData} from '../FetchNodeServices'
import Header from "./Header"
import Booter from "./Footer"
import TodayIcon from '@material-ui/icons/Today';
import {fade , makeStyles} from "@material-ui/core/styles"
import TextField from '@material-ui/core/TextField';
import QtySpinner from './QtySpinner';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import renderHTML from "react-render-html"
import { ArrowBackIos } from "@material-ui/icons"
import Slider from 'react-slick';
import {useDispatch,useSelector} from 'react-redux'
const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 220,
    },
  }));

 export default function Productview(props){
   var consoleslider=createRef(null)
const classes = useStyles();
var settings ={
  dots: false,
  infinite: true,
  arrows:false,
  speed: 1000,
  slidesToShow: 4,
  slidesToScroll: 1,
 // autoplay: true,
  autoplaySpeed: 2000,
}
var item=props.history.location.state.product
//alert(JSON.stringify(item))

const [totalAmt,settotalAmt]=useState("")

const [msg,setMsg]=useState("")
const[documents,setdocuments]=useState("")
const[tc,settc]=useState("")
const [consolePictures,setConsolePicture]=useState([])
const [getImage,setImage]=useState(item.icon)
const [pageRender,setPageRender]=useState(false)
var dispatch=useDispatch()
var cart=useSelector(state=>state.cart)


const fetchDocuments= async()=>{
  var result=await getData('documents/displayall')
  setdocuments(result[0].documents)

}

const fetchTC=async()=>{
  var result=await getData('terms/displayall')
  settc(result[0].conditioned)

}

const fetchProductPictures=async()=>{
  var body={subcategoryid:item.subcategoryid}
  var result=await postData('console/displayallproductpictures',body)
 setConsolePicture(result)

}
useEffect( function(){
  fetchDocuments()
  fetchTC()
  fetchProductPictures()
},[])
////////////////////////////////////////tabs//////////////////
const showtabs=(description) => (
  <Tabs style={{padding:20}}>
    <TabList>
      <Tab style={{fontWeight:'bold',fontSize:20,letterSpacing:1}}>Description</Tab>
      <Tab style={{fontWeight:'bold',fontSize:20,letterSpacing:1}}>Terms & Conditions</Tab>
      <Tab style={{fontWeight:'bold',fontSize:20,letterSpacing:1}}>Documents</Tab>
    </TabList>

    <TabPanel>
      <h2>{description}</h2>
    </TabPanel>
    <TabPanel>
      <div>
      {renderHTML(tc)}
</div>
    </TabPanel>
    <TabPanel>
    <div>
      {renderHTML(documents)}
    </div>
    </TabPanel>
  </Tabs>
);
//////////////////////////tabs//////////////

const handleQtyChange=(value,item)=>{
  if(value==0)
  {
      dispatch({type:'REMOVE_CART',payload:[item.subcategoryid]})  
  }
  else{
  item['qtydemand']=value

    //alert(JSON.stringify(item))
    dispatch({type:'ADD_CART',payload:[item.subcategoryid,item]})
    
}
setPageRender(!pageRender)
}




const productdetails=(item)=>{

  var rentamt=item.discount>0?item.discount:item.price
var v=cart[item.subcategoryid]||0
var qty=0
if(v!=0)
{ qty=cart[item.subcategoryid].qtydemand}
    return(<div>
     <div style={{padding:10,fontSize:18,fontWeight:'bold',letterSpacing:1}}>
         {item.subcategoryname}
     </div>

     <div style={{fontSize:16, padding:10}}>

 Price:<s> &#8377;{item.rentamt}</s>  <span style={{color:'green'}}><b> &#8377; {item.discount}</b></span>

</div>
 

   
   

<div style={{padding:10}}>
  {msg}
  </div>

<div style={{padding:10}}>
<QtySpinner value={qty}  onChange={(value)=>handleQtyChange(value,item)} />
</div>

    </div>)
}

const showConsolePictures=()=>{
  return consolePictures.map(function(citem,index){
  return(<div style={{display:'flex',justifyContent:'center', alignItems:'center', outline:'none'}}>

      <div style={{display:'flex',
      justifyContent:'center', 
      alignItems:'center',
       outline:'none',
        width:70,
         height:70, 
         border:'2px solid #000', 
         borderRadius:5,
          margin:2,
          cursor:"pointer",
          }}
          onMouseEnter={()=>setImage(citem.image)}
          >
      <img src={`${ServerURL}/images/${citem.image}`} width={56} height={56}/>
      </div>

    </div>)
    
  })
}



const handleNext=()=>{
consoleslider.current.slickNext();

}

const handleBack=()=>{
  consoleslider.current.slickPrev();
  
}
return(
<div>
    <Header history={props.history}/>
    <div style={{padding:20}}>
<Grid container spacing={1}>
<Grid item xs={6}>
  <div style={{padding:30, display:'flex',justifyContent:'center',alignItems:'center'}}>
<img src={`${ServerURL}/images/${getImage}`} width="300" height="300"/>
</div>
{consolePictures.length>=1 && consolePictures.length<=4?(
<div style={{padding:'30px 10px',
display:'flex',
justifyContent:"center",
alignItems:'center',
flexDirection:'column'}}>
  
<div style={{width:325}}>
<Slider {...settings} ref={consoleslider}>
      {showConsolePictures()}
                    </Slider>

  </div>
  </div>):(
    <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
  <div style={{marginLeft:10,fontSize:"small"}}>
<ArrowBackIosIcon onClick={()=>handleBack()} />
  </div>
  <div style={{padding:'30px 10px',
  display:'flex',
  justifyContent:"center",
  alignItems:'center',
  flexDirection:'row'}}>
  
  <div style={{width:325}}>
  <Slider {...settings} ref={consoleslider}>
   {showConsolePictures()}
    </Slider>

    </div>
    </div>
    <div style={{marginLeft:10,fontSize:"small"}}>
    <ArrowForwardIosIcon onClick={()=>handleNext()} />
      </div>
      </div>)}
</Grid>
<Grid item xs={6}>
{productdetails(item)}
</Grid>
</Grid>
<div>
{showtabs(item.description)}
</div>
<Booter history={props.history}/>
</div>
</div>


)









}