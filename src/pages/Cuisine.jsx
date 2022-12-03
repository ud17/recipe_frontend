import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Skeleton } from "antd";
import { Pagination } from "@mui/material"
import { useGetRecipeByCategoryQuery } from "../service/recipeApi";

function Cuisine() {

  const [cuisine, setCuisine] = useState([]);
  const [page, setPage] = useState();
  const params = useParams();
  const {data, isFetching, isLoading} = useGetRecipeByCategoryQuery({type: params.type, page});

  useEffect(() => {
    const response = data?.data;
    setCuisine(response?.recipe_details);
    if(page>response?.totalCount) setPage(1);
  }, [data?.data])

  const handleChange = async (e, page) => {
    setPage(page);
  }

  if(isFetching || isLoading) return <Skeleton active />;

  return (
    <div>
      <Page>
        <Pagination count={data?.data.totalCount} defaultPage={1} page={page} variant="outlined" color="secondary" onChange={handleChange}/>
      </Page>
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

export default Cuisine