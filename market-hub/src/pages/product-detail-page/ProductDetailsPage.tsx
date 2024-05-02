import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { productValues } from "../product-list/ProductListing";
import NavBar from "../../components/common-components/NavBrar";
function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<productValues | null>(null);
  async function fetchProductDetail() {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(response.data);
    } catch {
      console.error("somthing went wrong!");
    }
  }

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  return (
    <>
      <Box>
        {product ? (
          <>
            <NavBar title="Product Details" />
            <Box
              sx={{
                maxWidth: 600,
                margin: "auto",
                marginTop: 4,
                boxShadow: 2,
                borderRadius: 4,
              }}
            >
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={product.thumbnail}
                  alt={product.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body1">
                    Description: {product.description}
                  </Typography>
                  <Typography variant="body1">
                    Price: ${product.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body1">
                    Discount: {product.discountPercentage.toString()}%
                  </Typography>
                  <Typography variant="body1">
                    Rating: {product.rating.toString()}
                  </Typography>
                  <Typography variant="body1">
                    Stock: {product.stock.toString()}
                  </Typography>
                  <Typography variant="body1">
                    Brand: {product.brand}
                  </Typography>
                  <Typography variant="body1">
                    Category: {product.category}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </>
        ) : (
          <Typography variant="h6" align="center" mt={4}>
            Loading...
          </Typography>
        )}
      </Box>
      {/* {product ? (
        <Box>
          <Box>
            <NavBar title="Product Details" />
          </Box>
          <Box sx={{ maxWidth: 600, margin: "auto" }}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={product.thumbnail}
                alt={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body1">
                  Description: {product.description}
                </Typography>
                <Typography variant="body1">
                  Price: ${product.price.toString()}
                </Typography>
                <Typography variant="body1">
                  Discount: {product.discountPercentage.toString()}%
                </Typography>
                <Typography variant="body1">
                  Rating: {product.rating.toString()}
                </Typography>
                <Typography variant="body1">
                  Stock: {product.stock.toString()}
                </Typography>
                <Typography variant="body1">
                  Brand: {product.brand.toString()}
                </Typography>
                <Typography variant="body1">
                  Category: {product.category}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      ) : (
        <div>Loading...</div>
      )} */}
    </>
  );
}

export default ProductDetailsPage;
