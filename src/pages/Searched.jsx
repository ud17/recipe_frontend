import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Skeleton } from "antd";
import { Pagination } from "@mui/material"
import { Link, useParams } from "react-router-dom";
import { useGetRecipesByTitleQuery } from "../service/recipeApi";

function Searched() {

    const [page, setPage] = useState();
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const params = useParams();
    const {data, isFetching, isLoading} = useGetRecipesByTitleQuery({title: params.search, userId: 'udit'});

    useEffect(() => {
      const response = data?.data;
      setSearchedRecipes(response);
    }, [data?.data, params.search]);

    // const handleChange = async (e, page) => {
    //   setPage(page);
    // }

    if(isFetching || isLoading) return <Skeleton active />;

  return (
    <div>
      {/* <Page>
          <Pagination count={data?.data.totalCount} defaultPage={1} page={page} variant="outlined" color="secondary" onChange={handleChange}/>
      </Page> */}
      <Grid>
          {
              searchedRecipes?.map((recipe) => {
                  return (
                      <Card key={recipe._id}>
                        <Link to={"/recipe/" + recipe._id}>
                          <img src={recipe.image} alt={recipe.title}/>
                          <h4>{recipe.title}</h4>
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

const Page = styled.div`
  display: flex;
  justify-content: end;
  margin: 3rem 0rem;
`;

export default Searched;