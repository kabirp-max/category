import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const Tree = ({ data }) => {
  const [clickedTags, setClickedTags] = useState({});
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 600;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Create an SVG container
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible")
      .style("font-family", "sans-serif");

    // Create a tree layout
    const treeLayout = d3.tree().size([width - 200, height - 200]);

    // Convert adjacency list to hierarchical data
    const hierarchyData = d3.hierarchy(data, (d) => d.children || []);

    // Apply the tree layout to the hierarchical data
    treeLayout(hierarchyData);

    // Add links (lines) between nodes
    svg
      .selectAll(".link")
      .data(hierarchyData.links())
      .join("line")
      .attr("class", "link")
      .attr("x1", (d) => d.source.x + 100)
      .attr("y1", (d) => d.source.y + 100)
      .attr("x2", (d) => d.target.x + 100)
      .attr("y2", (d) => d.target.y + 100)
      .attr("stroke", "#555")
      .attr("stroke-width", 2);

    // Add nodes
    const nodes = svg
      .selectAll(".node")
      .data(hierarchyData.descendants())
      .join("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x + 100},${d.y + 100})`);

    // Add circles for nodes
    nodes
      .append("circle")
      .attr("r", 10)
      .attr("fill", "#69b3a2");

    // Add labels for nodes (categories, subcategories, tags)
    nodes
      .append("text")
      .attr("dy", -15)
      .attr("text-anchor", "middle")
      .text((d) => d.data.name);

    // Add click event to toggle visibility of titles under the tags
    nodes
      .on("click", function (event, d) {
        if (d.data.children) {
          if (d.data.children.length > 0 && !d.data.children[0].children) {
            const tag = d.data.name;
            setClickedTags((prevState) => ({
              ...prevState,
              [tag]: !prevState[tag], // Toggle visibility of titles for this tag
            }));
          }
        }
      });

    // Add titles under tags when the tag node is clicked
    nodes
      .filter((d) => d.data.children && d.data.children[0]?.children) // Only for tags
      .each(function (d) {
        const tagNode = d3.select(this);
        const tag = d.data.name;
        const isClicked = clickedTags[tag]; // Check if the tag is clicked

        // Add titles under the clicked tags
        if (isClicked) {
          const titlesGroup = tagNode.append("g").attr("class", "titles");

          d.data.children.forEach((child) => {
            if (child.children) {
              child.children.forEach((title) => {
                titlesGroup
                  .append("text")
                  .attr("class", "title")
                  .attr("x", 0)
                  .attr("dy", 20)
                  .attr("text-anchor", "middle")
                  .text(title.name);
              });
            }
          });
        } else {
          // Remove previously displayed titles
          tagNode.selectAll(".titles").remove();
        }
      });
  }, [data, clickedTags]);

  return <svg ref={svgRef}></svg>;
};

export default Tree;
