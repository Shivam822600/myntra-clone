import React, {useEffect,useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import Header from "./Header"
import Footer from "./Footer"
import { getData, ServerURL } from '../FetchNodeServices';
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper';
import { green } from '@material-ui/core/colors';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const useStyles = makeStyles((theme) => ({
    root:{
        padding:10,
        display:'flex',
        flexDirection:'column'
    },
    paperstyle:{
     justifyContent:"flex-start",
     display:'flex',
     padding:10,
     width:210,
     height:250,
     margin:10,
     borderRadius:10,
     flexDirection:'column'
    },
    imageview:{
    width:190,
    height:160,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    padding:10,
    margin:2,
    cursor:"pointer",
    "&:hover":{
      transform:"scale(1.25)",
      tansition:"all 0.5s ease 0s"

    }

    },
    arrowstyle:{
     display:'flex',
     justifyContent:'center',
     alignItems:'center',
     

    }
}))


export default function Home(props) {
    const classes = useStyles();
const [listCategory,setListCategory]=useState([])
const [listSubOffers,setSubOffers]=useState([])
const [listtopproduct,settopproduct]=useState([])
const [listaccessories,setaccessories]=useState([])
const [listbestdeal,setbestdeal]=useState([])

var settings ={
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
}
var itemsettings ={
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows:false,
}

const fetchAllCategory=async()=>{
    var list=await getData('categories/displayall')
    setListCategory(list)
    //alert(JSON.stringify(list))

}

const fetchAllCategoryOffers=async()=>{
    var list=await getData('subcategories/subcategoryoffers')
    setSubOffers(list)
    //alert(JSON.stringify(list))

}

const fetchAllTopproductOffers=async()=>{
    var list=await getData('topproduct/topproductoffers')
    settopproduct(list)
    //alert(JSON.stringify(list))

}

const fetchAllaccessoriesOffers=async()=>{
    var list=await getData('accessory/accessoryoffers')
    setaccessories(list)
    //alert(JSON.stringify(list))

}

const fetchAllbestdealOffers=async()=>{
    var list=await getData('bestdeal/bestdealoffers')
    setbestdeal(list)
    //alert(JSON.stringify(list))

}

const showSlider=()=>{
    return(
        listCategory.map((item)=>{
        return(
            <div>
                <img src={`${ServerURL}/images/${item.ad}`} width="100%" height="320" />
               
            </div>
            
        )
        })
    )
}

const handleConsoleList=(categoryid)=>{

props.history.push({'pathname':'/consolelist'},{'categoryid':categoryid})

}


const showCategory=()=>{
    return(
        listCategory.map((item)=>{
        return(
            <div style={{border:'1px solid #ecf0f1',  justifyContent:'center', alignItems:'center',  display:'flex', flexDirection: 'column', padding:10, margin:5}}
            onClick={()=>handleConsoleList(item.categoryid)}
            >
                <img src={`${ServerURL}/images/${item.icon}`} width="50%" />
                <div style={{fontSize:22,fontWeight:'bold', padding:10}}>{item.categoryname.toUpperCase()}</div>
              
            </div>
            
        )
        })
    )
}


const showOffers=()=>{
    return(
        listSubOffers.map((item)=>{
        return(
            <div>
                
                <div style={{
                    //border:'1px solid #ecf0f1',
                width:250,display:'flex', flexDirection:"column", justifyContent:'center',alignItems:'center', padding:10, margin:5}}>
               <Paper elevation={3} className={classes.paperstyle}>
                   <div className={classes.imageview}>
                <img src={`${ServerURL}/images/${item.icon}`} width="150" height="100" />
                </div>
                <div style={{fontSize:14,fontWeight:'bold', padding:10}}>
                    {item.subcategoryname.length<=20?item.subcategoryname.toUpperCase():item.subcategoryname.toUpperCase().substring(0,18)+"..."}
                    </div>
                <div style={{fontSize:16, padding:10}}>

                 <span><b> {item.discount}</b></span>

                </div>

              
                </Paper>

            </div>
            </div>
        )
        })
    )
}


const showTopproductOffers=()=>{
    return(
        listtopproduct.map((item)=>{
        return(
            <div style={{border:'1px solid #ecf0f1',width:250, justifyContent:'center', alignItems:'center',  display:'flex', flexDirection: 'column', padding:10, margin:5}}>
                <Paper elevation={3} className={classes.paperstyle}>
                   <div className={classes.imageview}>
                <img src={`${ServerURL}/images/${item.icon}`} width="150" height="100" />
                </div>
                <div style={{display:'flex', flexDirection:"column", justifyContent:'center',alignItems:'center'}}>
                <div style={{fontSize:14,fontWeight:'bold', padding:10}}>
                {item.topproduct.length<=20?item.topproduct.toUpperCase():item.topproduct.toUpperCase().substring(0,18)+"..."}</div>
                <div style={{fontSize:16, padding:10}}>

                  <span><b> {item.discount}%</b></span>

                </div>

                <div style={{fontSize:16, padding:10}}>
                    <span style={{color:'green'}}><b>You Save </b></span><b>&#8377; {item.rentamt- item.discount}</b>
                </div>

          
            </div>
            </Paper>
            </div>
        )
        })
    )
}

const showaccessoriesOffers=()=>{
    return(
        listaccessories.map((item)=>{
        return(
            <div>
                
                <div style={{
                    //border:'1px solid #ecf0f1',
                width:250,display:'flex', flexDirection:"column", justifyContent:'center',alignItems:'center', padding:10, margin:5}}>
               <Paper elevation={3} className={classes.paperstyle}>
                   <div className={classes.imageview}>
                <img src={`${ServerURL}/images/${item.icon}`} width="150" height="100" />
                </div>
                <div style={{fontSize:14,fontWeight:'bold', padding:10}}>
                    {item.accessoryname.length<=20?item.accessoryname.toUpperCase():item.accessoryname.toUpperCase().substring(0,18)+"..."}
                    </div>
                <div style={{fontSize:16, padding:10}}>

                  <span><b> &#8377; {item.discount}</b></span>

                </div>

                </Paper>

            </div>
            </div>
        )
        })
    )
}


const showbestdealOffers=()=>{
    return(
        listbestdeal.map((item)=>{
        return(
            <div>
                
                <div style={{
                    //border:'1px solid #ecf0f1',
                width:250,display:'flex', flexDirection:"column", justifyContent:'center',alignItems:'center', padding:10, margin:5}}>
               <Paper elevation={3} className={classes.paperstyle}>
                   <div className={classes.imageview}>
                <img src={`${ServerURL}/images/${item.icon}`} width="150" height="100" />
                </div>
                <div style={{fontSize:14,fontWeight:'bold', padding:10}}>
                    {item.bestdeal.length<=20?item.bestdeal.toUpperCase():item.bestdeal.toUpperCase().substring(0,18)+"..."}
                    </div>
                <div style={{fontSize:16, padding:10}}>

                 <span><b> &#8377; {item.discount}%</b></span>

                </div>

                
                </Paper>

            </div>
            </div>
        )
        })
    )
}

useEffect(function(){
fetchAllCategory()
fetchAllCategoryOffers()
fetchAllTopproductOffers()
fetchAllaccessoriesOffers()
fetchAllbestdealOffers()
},[])

    return(<div>
<Header history={props.history} /> 

        <div  
            style={{
                display:'flex',
                alignItems:"center",
                justifyContent: "center",
            }}
        >
        
        <div style={{width: "100%"}}>
            <Slider {...settings}>{showSlider()}</Slider>
        </div>
        </div>

        <div className={classes.root}>
        <div style={{display:'flex',flexDirection:'column'}}>
        <div style={{
            fontSize: 30,
            color: "#636e72",
            fontWeight: "normal",
            display: "flex",
            letterSpacing: "3.9px",
            fontFamily: 'Georgia, Times,"Times New Roman", serif',
            justifyContent: "center",
            padding: "10",
             
        }}>
        CATEGORIES TO BAG
        </div>
        <Divider style={{marginTop:5, marginBottom:5}} />
      
        <div style={{display:'flex', flexDirection: 'row', marginTop:5}}>
            {showCategory()}
        </div>
        </div>

        <div style={{display:'flex',flexDirection:'column'}}>
        <div style={{
            fontSize: 30,
            color: "#636e72",
            fontWeight: "normal",
            display: "flex",
            letterSpacing: "3.9px",
            fontFamily: 'Georgia, Times,"Times New Roman", serif',
            justifyContent: "center",
            padding: "10",
             
        }}>
       BIGGEST DEALS ON TOP BRANDS
        </div>
        <Divider style={{marginTop:5, marginBottom:5}} />

        <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>


        <IconButton className={classes.arrowstyle} style={{background:'#1e6b7b',position:'absolute',zIndex:1,left:5,opacity:0.8}}>
            <ArrowBackIosIcon style={{color:'#FFF',fontSize:'large'}}/>
        </IconButton>
        <div style={{width: "98%"  }}>
            <Slider {...itemsettings}>{showOffers()}</Slider>
        </div>
        <IconButton className={classes.arrowstyle} style={{background:'#1e6b7b',position:'absolute',zIndex:1,right:5,opacity:0.8}}>
            <ArrowForwardIosIcon style={{color:'#FFF',fontSize:'large'}}/>
        </IconButton>
        </div>

      { /* <div style={{display:'flex', flexDirection: 'row', flexWrap:'wrap', alignContent:'center', justifyContent:'center', marginTop:5}}>
            {showOffers()}
    </div>*/}
        </div>

        <div style={{display:'flex',flexDirection:'column'}}>
        <div style={{
            fontSize: 30,
            color: "#636e72",
            fontWeight: "normal",
            display: "flex",
            letterSpacing: "3.9px",
            fontFamily: 'Georgia, Times,"Times New Roman", serif',
            justifyContent: "center",
            padding: "10",
             
        }}>
        TRENDING IN WESTERN WEAR
        </div>
        <Divider style={{marginTop:5, marginBottom:5}} />
        <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>


        <IconButton className={classes.arrowstyle} style={{background:'#1e6b7b',position:'absolute',zIndex:1,left:5,opacity:0.8}}>


            <ArrowBackIosIcon style={{color:'#FFF',fontSize:'large'}}/>


        </IconButton>

            <div style={{width: "98%"  }}>
            <Slider {...itemsettings}>{showTopproductOffers()}</Slider>
             </div>
   
            <IconButton className={classes.arrowstyle} style={{background:'#1e6b7b',position:'absolute',zIndex:1,right:5,opacity:0.8}}>


            <ArrowForwardIosIcon style={{color:'#FFF',fontSize:'large'}}/>

        </IconButton>
        </div>
        </div>
        TRENDING IN INDIAN WEAR
         <div style={{display:'flex',flexDirection:'column'}}>
        <div style={{
            fontSize: 30,
            color: "#636e72",
            fontWeight: "normal",
            display: "flex",
            letterSpacing: "3.9px",
            fontFamily: 'Georgia, Times,"Times New Roman", serif',
            justifyContent: "center",
            padding: "10",
             
        }}>
        TRENDING IN WESTERN WEAR
        </div>
        <Divider style={{marginTop:5, marginBottom:5}} />
        <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>


        <IconButton className={classes.arrowstyle} style={{background:'#1e6b7b',position:'absolute',zIndex:1,left:5,opacity:0.8}}>


            <ArrowBackIosIcon style={{color:'#FFF',fontSize:'large'}}/>


        </IconButton>

            <div style={{width: "98%"  }}>
            <Slider {...itemsettings}>{showbestdealOffers()}</Slider>
             </div>
   
            <IconButton className={classes.arrowstyle} style={{background:'#1e6b7b',position:'absolute',zIndex:1,right:5,opacity:0.8}}>


            <ArrowForwardIosIcon style={{color:'#FFF',fontSize:'large'}}/>

        </IconButton>
        </div>
        </div>
        <div style={{display:'flex',flexDirection:'column'}}>
        <div style={{
            fontSize: 30,
            color: "#636e72",
            fontWeight: "normal",
            display: "flex",
            letterSpacing: "3.9px",
            fontFamily: 'Georgia, Times,"Times New Roman", serif',
            justifyContent: "center",
            padding: "10",
             
        }}>
        TRENDING IN SPORTS WEAR
        </div>
        <Divider style={{marginTop:5, marginBottom:5}} />
        <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>


        <IconButton className={classes.arrowstyle} style={{background:'#1e6b7b',position:'absolute',zIndex:1,left:5,opacity:0.8}}>


            <ArrowBackIosIcon style={{color:'#FFF',fontSize:'large'}}/>


        </IconButton>

            <div style={{width: "98%"  }}>
            <Slider {...itemsettings}>{showaccessoriesOffers()}</Slider>
             </div>

        <IconButton className={classes.arrowstyle} style={{background:'#1e6b7b',position:'absolute',zIndex:1,right:5,opacity:0.8}}>


            <ArrowForwardIosIcon style={{color:'#FFF',fontSize:'large'}}/>

        </IconButton>
        </div>
        </div>
        
       
        </div>
        <Footer history={props.history} /> 
    </div>)
}