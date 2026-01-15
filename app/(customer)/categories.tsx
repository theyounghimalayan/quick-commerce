import { View, Text } from "react-native";
import React from "react";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import ProductCategories from "@/features/category/ProductCategories";

const Categories = () => {
  return (
    <CustomSafeAreaView>
      <ProductCategories />
    </CustomSafeAreaView>
  );
};

export default Categories;
