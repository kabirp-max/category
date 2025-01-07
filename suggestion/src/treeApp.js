import React, { useState } from "react";
import Tree from "./Tree";

// Transform flat data into hierarchical tree structure
const transformDataToTree = (data) => {
  const tree = { name: "Root", children: [] };

  const categoryMap = {};

  data.forEach((item) => {
    // Check or add category level
    if (!categoryMap[item.category]) {
      categoryMap[item.category] = { name: item.category, children: [] };
      tree.children.push(categoryMap[item.category]);
    }

    const categoryNode = categoryMap[item.category];

    // Check or add subcategory level
    let subcategoryNode = categoryNode.children.find(
      (child) => child.name === item.subcategory
    );

    if (!subcategoryNode) {
      subcategoryNode = { name: item.subcategory, children: [] };
      categoryNode.children.push(subcategoryNode);
    }

    // Check or add tag level
    let tagNode = subcategoryNode.children.find(
      (child) => child.name === item.tag
    );

    if (!tagNode) {
      tagNode = { name: item.tag, children: [] };
      subcategoryNode.children.push(tagNode);
    }

    tagNode.children.push({ name: item.title });
  });

  return tree;
};

function App() {
  const [flatData, setFlatData] = useState([
    { title: "iphone phone blast", category: "Tech", subcategory: "Phones", tag: "iphone" },
    { title: "Apple phone slow", category: "Tech", subcategory: "Phones", tag: "iphone" },
    { title: "s24 ultra phone of the year", category: "Tech", subcategory: "Phones", tag: "s24" },
    { title: "mac mini best", category: "Tech", subcategory: "PCs", tag: "mac" },
    { title: "macbook air m2", category: "Tech", subcategory: "PCs", tag: "mac" },
    { title: "zomato sold to swiggy", category: "Startup", subcategory: "India", tag: "zomato" },
    { title: "Paytm failed", category: "Startup", subcategory: "India", tag: "Paytm" },
    { title: "Paytm Banks Closed", category: "Startup", subcategory: "India", tag: "Paytm" },
  ]);

  const hierarchicalData = transformDataToTree(flatData);

  return (
    <div>
      <h1>Tree Visualization with Clickable Titles</h1>
      <Tree data={hierarchicalData} />
    </div>
  );
}

export default App;
