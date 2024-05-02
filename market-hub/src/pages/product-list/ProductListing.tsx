import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/common-components/NavBrar";

export interface productValues {
  id: Number;
  title: string;
  description: string;
  price: Number;
  discountPercentage: Number;
  rating: Number;
  stock: Number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
function ProductListing() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<productValues[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 8;
  async function fetchProducts() {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?skip=${
          (page - 1) * limit
        }&limit=${limit}`
      );
      setProducts(response.data.products);
      setTotalPages(Math.ceil(response.data.total / limit));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  const viewDetailsHandler = (id: Number) => {
    navigate(`/listOfProducts/${id}`);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <>
      {products ? (
        <>
          <NavBar title="Products" />

          <Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              {products.map((product) => (
                <Card key={product.id.toString()}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.thumbnail}
                    alt={product.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography variant="body1">
                      Category: {product.category}
                    </Typography>
                    <Typography variant="body1">
                      Brand: {product.brand}
                    </Typography>
                    <Typography variant="body1">
                      Rating: {product.rating.toString()}
                    </Typography>
                    <Typography variant="body1">
                      Price: ${product.price.toString()} (
                      {product.discountPercentage.toString()}% off)
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => viewDetailsHandler(product.id)}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
                gap: "2px",
              }}
            >
              <Button
                variant="contained"
                onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index + 1}
                  variant="contained"
                  onClick={() => setPage(index + 1)}
                  disabled={page === index + 1}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                variant="contained"
                onClick={() =>
                  setPage((prevPage) => Math.min(prevPage + 1, totalPages))
                }
                disabled={page === totalPages}
              >
                Next
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default ProductListing;
