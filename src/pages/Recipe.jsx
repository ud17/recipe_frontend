import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {

  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  let params = useParams();

  const fetchRecipe = async () => {
    const api = await fetch(`https://api.spoonacular.com/recipes/${params.item}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const data = await api.json();
    setDetails(data);
  }

  useEffect(() => {
    fetchRecipe();
  }, [params.item]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
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
        <div>
          {
            activeTab === 'instructions' ? 
              <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
              :
              <ul>
                {details.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
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

export default Recipe;