import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, TextField, Typography } from "@mui/material";
import PageLayout from "../../../components/PageLayout";
import LabeledTextField from "../../../components/LabeledTextField";
import axios from "axios";
import styles from "./styles";
import ArrowIcon from "../../../icons/arrowIcon";
import useProductMutation from "../../../hooks/useProductionMutation";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const BASE_URL = "http://localhost:9000/";

const AddProduct = () => {
  const classes = styles();
  const userId = useSelector((state) => state.roleManager.userId);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const location = useLocation();
  const productData = location.state?.productData || {};
  // Determine if we are updating an existing product
  const isUpdate = Boolean(productData.productId);
  const mutation = useProductMutation(isUpdate);

  // Initialize formik with initial values from productData
  const formik = useFormik({
    initialValues: {
      sku: productData.sku || "",
      productName: productData.productName || "",
      qty: productData.qty || "",
      price: productData.price || "",
      productDescription: productData.productDescription || "",
    },
    onSubmit: async (values) => {
      // Create FormData object
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("sku", values.sku);
      formData.append("productName", values.productName);
      formData.append("qty", values.qty);
      formData.append("price", values.price);
      formData.append("productDescription", values.productDescription);

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("images", selectedFiles[i]);
      }

      if (isUpdate) {
        formData.append("_id", productData._id);
      }

      try {
        await mutation.mutateAsync(formData);
        formik.resetForm();
        setSelectedFiles([]);
        setPreviewImages([]);
      } catch (error) {
        console.error("Error submitting product:", error);
      }
    },
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prevPreviews) => [...prevPreviews, ...previews]);
  };

  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <PageLayout
      pageHeading={
        <Grid item container flexWrap={"wrap"}>
          <Grid item>Products</Grid>
          <Grid item>
            <ArrowIcon sx={classes.icon} />
          </Grid>
          <Grid item sx={classes.subHeading}>
            {isUpdate ? "Edit Product" : "Add New Product"}
          </Grid>
        </Grid>
      }
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <LabeledTextField
              id="sku"
              name="sku"
              label="SKU"
              onChange={(value) => formik.setFieldValue("sku", value)}
              value={formik.values.sku}
            />
          </Grid>

          <Grid item xs={6}>
            <LabeledTextField
              id="productName"
              name="productName"
              label="Name"
              onChange={(value) => formik.setFieldValue("productName", value)}
              value={formik.values.productName}
            />
          </Grid>

          <Grid item xs={6}>
            <LabeledTextField
              id="qty"
              name="qty"
              label="Qty"
              onChange={(value) => formik.setFieldValue("qty", value)}
              value={formik.values.qty}
            />
          </Grid>

          <Grid item xs={6}>
            <LabeledTextField
              id="price"
              name="price"
              label="Price"
              onChange={(value) => formik.setFieldValue("price", value)}
              value={formik.values.price}
            />
          </Grid>

          <Grid item xs={12} sx={classes.description}>
            <Grid sx={classes.label}>Product Description</Grid>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              name="productDescription"
              placeholder="A small description about the product"
              onChange={(e) =>
                formik.setFieldValue("productDescription", e.target.value)
              }
              value={formik.values.productDescription}
            />
          </Grid>

          <Grid item xs={12} sx={classes.imageUpload}>
            <Grid sx={classes.label}>Product Images</Grid>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleFileChange}
              accept="image/*"
            />
            <Typography variant="body2" color="textSecondary">
              JPEG, PNG, SVG, or GIF (Maximum file size 50MB)
            </Typography>

            {/* Display existing product images */}
            <Grid container spacing={2} sx={classes.previewContainer}>
              {productData.images &&
                productData.images.map((imagePath, index) => (
                  <Grid item key={index} sx={12}>
                    <img
                      src={`${BASE_URL}${imagePath}`}
                      alt={`Product ${index}`}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </Grid>
                ))}
            </Grid>

            {/* Display new image previews */}
            <Grid container spacing={2} sx={classes.previewContainer}>
              {previewImages.map((image, index) => (
                <Grid item key={index}>
                  <img
                    src={image}
                    alt={`Preview ${index}`}
                    style={{ width: "100px", height: "100px" }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid item container justifyContent={"flex-end"}>
          <Grid item>
            <Button variant="contained" type="submit">
              {isUpdate ? "Update Product" : "Save Product"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </PageLayout>
  );
};

export default AddProduct;
