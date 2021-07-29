import React, {useEffect,useState} from 'react';
import {  makeStyles } from '@material-ui/core/styles';

import Header from "./Header"
import Footer from "./Footer"
import { ServerURL,postData } from '../FetchNodeServices';

import Paper from '@material-ui/core/Paper';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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
     height:300,
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
const [listConsole,setListConsole]=useState([])

//console.log(props.history.location.state.categoryid)
var categoryid=props.history.location.state.categoryid


const fetchAllSubCategory=async()=>{
    var body={categoryid:categoryid}
    var list=await postData('subcategories/displayallsubcategorybycategoryid',body)
    setListConsole(list)
    //alert(JSON.stringify(list))

}


const showConsole=()=>{
    return(
        listConsole.map((item)=>{
        return(
            <div>
                
                <div style={{
                    //border:'1px solid #ecf0f1',
                width:250,display:'flex', flexDirection:"column", justifyContent:'center',alignItems:'center', padding:10, margin:5}}>
               <Paper  elevation={3} className={classes.paperstyle}>
                   
                   <div onClick={()=>props.history.push({'pathname':'/productview'},{'product':item})} className={classes.imageview}>
                <img src={`${ServerURL}/images/${item.icon}`} width="150" height="100" />
                </div>
                <div style={{fontSize:14,fontWeight:'bold', padding:10}}>
                    {item.subcategoryname.length<=20?item.subcategoryname.toUpperCase():item.subcategoryname.toUpperCase().substring(0,18)+"..."}
                    </div>
                <div style={{fontSize:16, padding:10}}>

                  <span><b>{item.discount} %</b></span>

                </div>

              
            
                </Paper>

            </div>
            </div>
        )
        })
    )
}


useEffect(function(){
fetchAllSubCategory()

},[])

    return(<div>
      <Header history={props.history} />
        <div style={{padding:8,flexDirection:'row',display:'flex',flexWrap:'wrap',justifyContent:'left'}}>
        {showConsole()}
        </div>
        <Footer/>
    </div>)
}