import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRecipeByIdQuery } from "../service/recipeApi";
import { Skeleton } from "antd";
import { TextField } from "@mui/material";
import MultipleValueTextInput from 'react-multivalue-text-input';
import axios from "axios";

function Recipe() {

  let {recipeId} = useParams();
  const ROLE = localStorage.getItem("role");
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const {data, isFetching} = useGetRecipeByIdQuery({recipeId, userId: localStorage.getItem("userId")});
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [views, setViews] = useState("");
  const [category, setCategory] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  let instructions = details?.instructions, ingredients = details?.ingredients;
  const navigate = useNavigate();

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

  // const fetchRecipe = async () => {
  //   const api = await fetch(`https://api.spoonacular.com/recipes/${params.item}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
  //   const data = await api.json();
  //   setDetails(data);
  // }
  useEffect(() => {
    const response = data?.data;
    setDetails(response);
    setTimeout(() => setIsLoaded(true), 1000);
  }, [data?.data])

  const handleDelete = async () => {
    const response = await axios.post("http://localhost:8080/delete", {recipeId, userId: localStorage.getItem("userId")}, {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).data;
    if(response.code === 200) {
      navigate("/");
      //window.location.reload();
    }
  }

  const addInstructions = (item, allItems) => {
    instructions = allItems;
  }

  const deleteInstructions = (item, allItems) => {
    instructions = instructions.filter(i => i !== item);
  }

  const addIngredients = (item, allItems) => {
    ingredients = allItems;
  }

  const deleteIngredients = (item, allItems) => {
    ingredients = ingredients.filter(i => i !== item);
  }

  if(isFetching) return <Skeleton active />

  const updateRecipe = async () => {
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
      
      let body = {
        recipeId: recipeId,
        title: title,
        image: image,
        views: views,
        instructions: instructions.join(","),
        ingredients: ingredients.join(","),
        userId: localStorage.getItem("userId")
      }

      console.log(body);
      const response = await axios.post("http://localhost:8080/update", body, {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
    }
  }

  return (
    <Parent>
    <DetailWrapper>
      {
        details && <DetailWrapper>
          <div>
            <h2>{details?.title}</h2>
            <img style={{width: '600px', height: '500px'}} src={details?.image} alt={details?.title} />
          </div>
          <Info>
            <Container>
              <Button 
                className={activeTab === 'ingredients' ? 'active' : '' }
                onClick={() => setActiveTab('instructions')}>
                  Instructions
              </Button>
              <Button 
                className={activeTab === 'instructions' ? 'active' : '' }
                onClick={() => setActiveTab('ingredients')}>
                  Ingredients
              </Button>
            </Container>
            <div>
              {
                activeTab === 'instructions' ? 
                    <ul>
                      {details?.instructions?.map(instruction => 
                        <li key={instruction}>{instruction}</li>  
                      )}                  
                    </ul>
                  :
                    <ul>
                      {details?.ingredients?.map(ingredient => 
                        <li key={ingredient}>{ingredient}</li>  
                      )}                  
                    </ul>
              } 
            </div>
          </Info>
        </DetailWrapper>
      }
    </DetailWrapper>
    {
          error.length !== 0 && error
    }
    {ROLE === 'ADMIN' && <DetailWrapper>
      <Parent>
        
        <div>
          <TextField placeholder="Title" style={{margin: '1%'}} onChange={(e) => setTitle(e.target.value)}></TextField>
            <TextField value={details?.category} disabled style={{margin: '1%'}}></TextField>
            <TextField placeholder="Image URL address" onChange={(e) => setImage(e.target.value)} style={{margin: '1%'}}></TextField>
            <TextField type="number" placeholder="Views" onChange={(e) => setViews(e.target.value)} style={{margin: '1%'}}></TextField>
            {isLoaded && <div style={{margin: '1%'}}>
              <MultipleValueTextInput placeholder='Instructions' className='multivalue'
                onItemAdded={(item, allItems) => addInstructions(item, allItems)}
                onItemDeleted={(item, allItems) => deleteInstructions(item, allItems)}
                values={instructions}
                />
              <MultipleValueTextInput placeholder='Ingredients' className='multivalue' 
                onItemAdded={(item, allItems) => addIngredients(item, allItems)}
                onItemDeleted={(item, allItems) => deleteIngredients(item, allItems)}
                values={ingredients}
                />
            </div>}
            <Button style={{margin: '1%'}} onClick={() => updateRecipe()}>Update</Button>
            <Button style={{color: 'white', background: '#ba3c3c'}}
                onClick={() => handleDelete()}
              >
                  Delete
              </Button>
        </div>
      </Parent>
    </DetailWrapper>}
    </Parent>
  )
}

const Parent = styled.div`
  display: flex;
  flex-direction: column
`

const DetailWrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`

export default Recipe;