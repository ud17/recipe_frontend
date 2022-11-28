import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Skeleton } from "antd";
import { useGetRecipeByCategoryQuery } from "../service/recipeApi";

function Cuisine() {

  const [cuisine, setCuisine] = useState([]);
  const params = useParams();
  const {data, isFetching} = useGetRecipeByCategoryQuery(params.type, 1);

  useEffect(() => {
    const response = data?.data;
    setCuisine(response?.recipe_details);
  }, [data?.data])

  if(isFetching) return <Skeleton active />;

  return (
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
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
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

export default Cuisine