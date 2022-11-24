import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useGetRecipeByIdQuery } from "../service/recipeApi";
import { Skeleton } from "antd";

function Recipe() {

  let {recipeId} = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const {data, isFetching} = useGetRecipeByIdQuery(recipeId);

  // const fetchRecipe = async () => {
  //   const api = await fetch(`https://api.spoonacular.com/recipes/${params.item}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
  //   const data = await api.json();
  //   setDetails(data);
  // }
  useEffect(() => {
    const response = data?.data;
    setDetails(response);
  }, [data?.data])

  if(isFetching) return <Skeleton active />

  return (
    <DetailWrapper>
      <div>
        <h2>{details?.title}</h2>
        <img src={details?.image} alt={details?.title} />
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
                  {details?.instructions.map(instruction => 
                    <li key={instruction}>{instruction}</li>  
                  )}                  
                </ul>
              :
                <ul>
                  {details?.ingredients.map(ingredient => 
                    <li key={ingredient}>{ingredient}</li>  
                  )}                  
                </ul>
          } 
        </div>
      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
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