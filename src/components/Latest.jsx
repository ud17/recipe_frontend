import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import { Link } from 'react-router-dom';
import '@splidejs/react-splide/css';
import { Skeleton } from "antd";
import { useGetLatestRecipesQuery } from '../service/recipeApi';


const Latest = () => {

  const [Latest, setLatest] = useState([]);
  const {data, isFetching} = useGetLatestRecipesQuery(localStorage.getItem("userId"));

  useEffect(() => {
    setLatest(data?.data);
  },[data?.data]);

  if(isFetching) return <Skeleton active />;

  return (
    <div>
      {
        <Wrapper>
          <h3>Latest Addition</h3>
          <Splide options={{
            perPage: 2,
            arrows: true,
            pagination: false,
            drag: "free",
            gap: "5rem"
          }}>
          {
            Latest?.map((recipe) => {
              return(
                <SplideSlide key={recipe._id}>
                  <Card>
                    <Link to={"/recipe/" + recipe._id}>
                      <p>{recipe.title}</p>
                      <img src={recipe.image} alt={recipe.title}/>
                      <Gradient />
                    </Link>
                  </Card>
                </SplideSlide>
              )
            })
          }
          </Splide>
        </Wrapper>
      }
    </div>
  )
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 20rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    widht: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0) , rgba(0,0,0,0.5))
`;

export default Latest;