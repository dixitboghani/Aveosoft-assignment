import React,{useState,useEffect} from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Card,CardActionArea,CardActions,CardContent,CardMedia,Button,Typography,Container,Grid,CircularProgress} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
    root: {
      maxWidth:345,

    },
    media: {
      height: 160,
      
    },
    formControl: {
       minWidth: 120,
      },
      GridStyle: {
            marginBottom:"15px"
      },
  });

function ProductList(props) {
    const classes = useStyles();
    const history=useHistory();
    const [Setfrom,setFormData]=React.useState(null);
    const [selectCategories,setSelectCategories]=React.useState(null);
    const [categories,setCategories]=React.useState([]);
    const [filterData,setFilterdata]=React.useState(null);
    const [loading, setLoading] = useState(true);
    const handleChange = (event) => {
        setSelectCategories(event.target.value);
        setFilterdata(Setfrom.filter(elm=>elm.categoryId === event.target.value));
        console.log(event.target.value)
  };
  useEffect(()=>{
    let mounted=true;
     const getdata= async ()=>{
          const result =await axios.get(`https://aveosoft-react-assignment.herokuapp.com/products`)
           console.log(result);
           const result2 =await axios.get(`https://aveosoft-react-assignment.herokuapp.com/categories`);
            if(result && result2){
                setFormData(result.data); 
                setCategories(result2.data)
                setLoading(false)   
            }
    }
      getdata();
        return()=>{
            mounted=false;
        }


  },[]);
  useEffect(()=>{
    if(Setfrom){
        setFilterdata(Setfrom)
       
    }
},[Setfrom])
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
                    <Grid item sm={12} >
                        <Typography variant="h5" style={{textAlign:"center",marginTop:"20px",marginBottom:"20px"}}>
                            ProductList
                        </Typography>
                    </Grid>
                        <Grid item sm={12}>
                            <Typography style={{textAlign:"center"}}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <Select
                                    value={selectCategories}
                                    onChange={handleChange}
                                    style={{marginBottom:"15px"}}
                                >
                                {categories.map((value)=>{
                                        return(
                                            <MenuItem value={value.id}>{value.name}</MenuItem>
                                        );
                                })}
                            </Select>
                        </FormControl>                
                        </Typography>
                    </Grid>

                        {filterData.map((value)=>{
                                return(
                        <Grid container item sm={3} className={classes.GridStyle}>
                             <Card className={classes.root}>
                              <CardActionArea>
                                <CardMedia  className={classes.media}>      
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQlLIftekhJmrq6YtvS0Dvodv4NdEt1xX04Ew&usqp=CAU"/>                                      
                                </CardMedia>
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                 {value.name}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2">
                                {value.model} 
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2">
                                {value.price}  
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                          <CardActions>
                                <Button size="small" color="primary" onClick={()=>{
                                        history.push(`/detail/${value.id}`)
                                }}>
                                    Description
                              </Button>
                        </CardActions>
                        </Card>
                    </Grid>
                    )

                        })}
                </Grid>

            </Container>
        </div>
    );
  }
    
};

export default ProductList;