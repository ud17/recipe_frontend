import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Skeleton } from "antd";
//import { Pagination } from "@mui/material"
import { useGetRecipeByCategoryQuery } from "../service/recipeApi";
import { TextField } from "@mui/material";
import MultipleValueTextInput from 'react-multivalue-text-input';
import "../styles/Global.css";
import axios from "axios";

function Cuisine() {

  const [cuisine, setCuisine] = useState([]);
  //const [page, setPage] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const {data, isFetching, isLoading} = useGetRecipeByCategoryQuery({type: params.type, userId: localStorage.getItem("userId")});
  let instructions = [], ingredients = [];
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [views, setViews] = useState(-1);
  const [error, setError] = useState("");

  axios.interceptors.response.use(
    (response) => {
      if(response.data.code === 200) {
        navigate("/");
        window.location.reload();
      }
    },
    (error) => {
      if (error.response.status === 401) {
        setError("Unauthorized.")
      }
      else if(error.response.status === 403) {
        setError("Forbidden.")
      }
      return Promise.reject(error);
    }
  )

  useEffect(() => {
    const response = data?.data;
    setCuisine(response);
    //if(page>response?.totalCount) setPage(1);
  }, [data?.data])

  // const handleChange = async (e, page) => {
  //   setPage(page);
  // }

  const addInstructions = (item, allItems) => {
    instructions.push(item);
  }

  const deleteInstructions = (item, allItems) => {
    instructions = instructions.filter(i => i !== item);
  }

  const addIngredients = (item, allItems) => {
    ingredients.push(item);
  }

  const deleteIngredients = (item, allItems) => {
    ingredients = ingredients.filter(i => i !== item);
  }

  const addRecipe = async () => {
    if(title === "") {
      setError("Title is either missing or invalid.")
      return;
    }
    else if(image === "") {
      setError("Image is either missing or invalid.")
      return;
    }
    else if(views < 0) {
      setError("View is either missing or invalid.")
      return;
    }
    else if(instructions.length === 0) {
      setError("Instructions is either missing or invalid.")
      return;
    }
    else if(ingredients.length === 0) {
      setError("Ingredients is either missing or invalid.")
      return;
    }
    else {
      setError("");
      let body = {
        title: title,
        category: params.type.toUpperCase(),
        image: image,
        views: views,
        instructions: instructions.join(","),
        ingredients: ingredients.join(","),
        userId: localStorage.getItem("userId")
      }
      
      await axios.post("http://localhost:8080/add", body, {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
    }
  }

  if(isFetching || isLoading) return <Skeleton active />;

  return (
    <div>
      {/* <Page>
        <Pagination count={data?.data.totalCount} defaultPage={1} page={page} variant="outlined" color="secondary" onChange={handleChange}/>
      </Page> */}
      {
        error.length !== 0 && error
      }
      {localStorage.getItem("role") === "ADMIN" && <div>
        <TextField placeholder="Title" style={{margin: '1%'}} onChange={(e) => setTitle(e.target.value)}></TextField>
        <TextField value={params.type.toUpperCase()} disabled style={{margin: '1%'}}></TextField>
        <TextField placeholder="Image URL address" onChange={(e) => setImage(e.target.value)} style={{margin: '1%'}}></TextField>
        <TextField  type="number" placeholder="Views" style={{margin: '1%'}} onChange={(e) => setViews(e.target.value)}></TextField>
        <Button style={{margin: '1%'}} onClick={() => addRecipe()}>Add</Button>
      </div>}
      {localStorage.getItem("role") === "ADMIN" && <div style={{margin: '1%'}}>
        <MultipleValueTextInput placeholder='Instructions' className='multivalue' 
          onItemAdded={(item, allItems) => addInstructions(item, allItems)}
          onItemDeleted={(item, allItems) => deleteInstructions(item, allItems)}
          />
          <MultipleValueTextInput placeholder='Ingredients' className='multivalue' 
          onItemAdded={(item, allItems) => addIngredients(item, allItems)}
          onItemDeleted={(item, allItems) => deleteIngredients(item, allItems)}
          />
      </div>}
      
      <Grid>
      {
        cuisine?.map((item) => {
          return (
            <Card key={item._id}>
              <Link to={"/recipe/" + item._id} >
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
              </Link>
            </Card>
          )
        })
      }
      </Grid>
    </div>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
  margin: 3% 0%;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

// const Page = styled.div`
//   display: flex;
//   justify-content: end;
//   margin: 3rem 0rem;
// `;

export default Cuisine