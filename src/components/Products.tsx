import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  // TextField,
  Typography,
  CircularProgress,
} from "../FivePluginApi";

import DeleteIcon from "@mui/icons-material/Delete";

const Products = ({five, setProducts, productsSaved, account}) => {
  console.log("Products Saved ===> ", productsSaved)
  const [selectedProducts, setSelectedProducts] = useState(productsSaved ? productsSaved : [
    { name: "", qty: "", key: "", brandname: "", qcode: "" },
  ]);
  const [loading, setLoading] = React.useState(false);
  const [products, setProductList] = React.useState(null);
/*
const products = [
  { Description: "Biovance - Q4154", QCode: "Q4154", Brand: "Biovance", PRD: 'F9EAC457-DE79-4C08-B2A2-05417C3E2217' },
  { Description: "Biovance_3L - Q4283", QCode: "Q4283", Brand: "Biovance_3L", PRD: 'C92CFA9A-C13C-4459-A758-ED5EAE98656E' },
  { Description: "Complete_ACA - Q4302", QCode: "Q42302", Brand: "Complete_ACA", PRD: '4F7A8B8F-64E7-4EEB-AF98-017544C494A0' },
  { Description: "Impax - Q4262", QCode: "Q4262", Brand: "Impax", PRD: '0612FAFD-53F6-4C47-B682-D70AFAE52A41' },
  { Description: "Orion - Q4276", QCode: "Q4276", Brand: "Orion", PRD: '4909AE5B-8DEA-4845-91E3-8BED0BED8665' },
  { Description: "Rebound - Q4296", QCode: "Q4296", Brand: "Rebound", PRD: 'F509E91A-3AC8-48E3-A7AA-553E6C82B194' },
  { Description: "Surgraft - Q4268", QCode: "Q4268", Brand: "Surgraft", PRD: '0E067184-4777-49A7-9E8B-A9CAA959485A' },
  { Description: "Zenith - Q4523", QCode: "Q4523", Brand: "Zenith", PRD: '016876A9-65E1-4303-AF66-B438D7E30885' }
];
*/

 useEffect(() => {
  if (products === null) {
    const fetchData = async () => {
      setLoading(true);
      five.executeFunction(
        "getAccountProducts",
        account,
        null,
        null,
        null,
        (result) => {
          setProductList(JSON.parse(result.serverResponse.results));
          setLoading(false);
        }
      );
    };

    fetchData();
  }
}, []);

  //@ts-ignore
  const handleProductChange = (index, event) => {
    const newProducts = [...selectedProducts];
    newProducts[index].name = event.target.value;
    const matchingProduct = products?.find(product => product?.Description === newProducts[index].name);
    if (matchingProduct) {
      newProducts[index].key = matchingProduct.PRD;
      newProducts[index].qcode = matchingProduct.QCode;
      newProducts[index].brandname = matchingProduct.Brand;
      
    } else {
      newProducts[index].key = ""; // Clear the key if no matching product is found
      newProducts[index].qcode = "";
      newProducts[index].brandname = "";
    }
    setSelectedProducts(newProducts);
    setProducts(newProducts)
  };


  const handleAddProduct = () => {
    if(selectedProducts?.length < 2){
    setSelectedProducts([...selectedProducts, { name: "", qty: "", key: "", brandname: "", qcode: "" }]);
    }
  };

  const handleRemoveProduct = (index) => {
    const newProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(newProducts);
    setProducts(newProducts)
  };

  useEffect(() => {
    if (productsSaved.length === 0) {
      setSelectedProducts([
        { name: "", qty: "",key: "", brandname: "", qcode: "" },
      ]);
    } else {
      setSelectedProducts(productsSaved);
    }
  }, [productsSaved]);

  if (loading) {
    return (
      <Container
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{color:"#14706A"}} />
      </Container>
    );
  }

  return (
    <Container
      id="products-container"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" style={{ textAlign: "center", marginBottom: "20px" }}  mt={6}>
        Select the product needed for this request.
      </Typography>
      {selectedProducts.map((product, index) => (
        <Box
          id={`product-row-${index}`}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
          }}
        >
          <Select
            id={`product-select-${index}`}
            fullWidth
            sx={{ margin: "10px 5px" }}
            value={product.name}
            onChange={(event) => handleProductChange(index, event)}
            displayEmpty
          >
            <MenuItem id={`product-default-${index}`} value="" disabled>
              Select a product
            </MenuItem>
            {products ? (
              products.map((product, idx) => (
              <MenuItem 
                id={`product-option-${index}-${idx}`} 
                key={idx} 
                value={product?.Description}
              >
                {product.Brand} - {product.QCode}
              </MenuItem>
            ))) : (
              <CircularProgress sx={{color:"#14706A"}} />
            )}
          </Select>

          <DeleteIcon
            id={`delete-product-${index}`}
            htmlColor="red"
            onClick={() => handleRemoveProduct(index)}
            sx={{
              fill: "!important red",
              cursor: "pointer",
              "&:hover": {
                fill: "!important darkred",
                opacity: 0.5, // Change the color on hover
              },
            }}
          />
        </Box>
      ))}
      {selectedProducts.length < 2 ? (<Box style={{ width: "50%" }}>
        <Button
          id="add-product-btn"
          variant="contained"
          color="primary"
          onClick={handleAddProduct}
          style={{ marginTop: "20px", borderRadius: '50px', background: "#D8EEDA", color: "#157069" }}
        >
          +
        </Button>
      </Box>) : null}

    </Container>
  );
};

export default Products;
