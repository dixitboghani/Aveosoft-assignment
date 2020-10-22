import React,{useState,useEffect} from 'react';
import axios from "axios"
import {Button,Typography,Container,Grid,CircularProgress} from '@material-ui/core';

function DetailPage(props) {
    const [Setfrom,setFormData]=React.useState(null);
    
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        let mounted=true;
          console.log("useeffectcall")
          const getdata= async ()=>{
            console.log(props)
            const result =await axios.get(`https://aveosoft-react-assignment.herokuapp.com/products/${props.match.params.id}`)
             console.log(result);
               if(result){
                    setFormData(result.data); 
                    setLoading(false)   
            }
        }
          getdata();
            return()=>{
                mounted=false;
            }
    
    
      },[]);

        if(loading){
        return (
            <div style={{ textAlign: 'center' }}>
              <CircularProgress size={55} />
            </div>
          );

      }else{
        return (
            <div>
                <Container>
                    <Grid container>
                        <Grid container item sm={12}>
                            <>
                                <Grid item sm={4}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQlLIftekhJmrq6YtvS0Dvodv4NdEt1xX04Ew&usqp=CAU" />
                            </Grid>
                            <Grid item sm={6}>
                                 <Typography variant="h6">
                                  Name: {Setfrom.name}
                                 </Typography>  
                                 <Typography variant="h6">
                                 price:{Setfrom.price} 
                                 </Typography>  
                                 <Typography variant="h6" >
                                  description:{Setfrom.description} 
                                 </Typography>   
                            </Grid>
                            </>
                        
                           
                        </Grid>
                        
        
                    </Grid>
                </Container>
            </div>
        );
      }
    
}

export default DetailPage;