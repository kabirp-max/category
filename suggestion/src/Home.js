import { useState } from "react";
import "./App.css";

function Home() {
  const initialData = [
    { title: "iphone phone blast", category: "Tech", subcategory: "Phones", tag: "iphone" },
    { title: "Apple phone slow", category: "Tech", subcategory: "Phones", tag: "iphone" },
    { title: "s24 ultra phone of the year", category: "Tech", subcategory: "Phones", tag: "s24" },
    { title: "mac mini best", category: "Tech", subcategory: "pc", tag: "mac" },
    { title: "macbook air m2", category: "Tech", subcategory: "pc", tag: "mac" },
    { title: "zomato sold to swiggy", category: "Startup", subcategory: "India", tag: "zomato" },
    { title: "Paytm failed", category: "Startup", subcategory: "India", tag: "Paytm" },
    { title: "Paytm Banks Closed", category: "Startup", subcategory: "India", tag: "Paytm" },
  ];

  const [data, setData] = useState(initialData);
  const [level, setLevel] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({ title: "", category: "", subcategory: "", tag: "" });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setLevel(1);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setLevel(2);
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setLevel(3);
  };

  const handleBack = () => {
    if (level === 3) setSelectedTag("");
    else if (level === 2) setSelectedSubcategory("");
    else if (level === 1) setSelectedCategory("");
    setLevel(level - 1);
  };

  const handleAddClick = () => {
    const prefill = {
      title: "",
      category: level >= 1 ? selectedCategory : "",
      subcategory: level >= 2 ? selectedSubcategory : "",
      tag: level >= 3 ? selectedTag : "",
    };
    setForm(prefill);
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setData([...data, form]);
    setForm({ title: "", category: "", subcategory: "", tag: "" }); // Reset form
    setShowForm(false); // Close popup
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const uniqueCategories = [...new Set(data.map((item) => item.category))];
  const uniqueSubcategories = [...new Set(data.filter((item) => item.category === selectedCategory).map((item) => item.subcategory))];
  const uniqueTags = [...new Set(data.filter((item) => item.subcategory === selectedSubcategory).map((item) => item.tag))];
  const filteredData = data.filter(
    (item) =>
      item.category === selectedCategory &&
      item.subcategory === selectedSubcategory &&
      item.tag === selectedTag
  );

  return (
    <div className="App">
      <h1>Categorization</h1>
      <div className="main">
        {level > 0 && <button onClick={handleBack} className="back-button">Back</button>}
        <div className="boxes">
          {level === 0 &&
            uniqueCategories.map((category) => (
              <div key={category} className="box" onClick={() => handleCategoryClick(category)}>
                {category}
              </div>
            ))}
          {level === 1 &&
            uniqueSubcategories.map((subcategory) => (
              <div key={subcategory} className="box" onClick={() => handleSubcategoryClick(subcategory)}>
                {subcategory}
              </div>
            ))}
          {level === 2 &&
            uniqueTags.map((tag) => (
              <div key={tag} className="box" onClick={() => handleTagClick(tag)}>
                {tag}
              </div>
            ))}
          {level === 3 &&
            filteredData.map((item, index) => (
              <div key={index} className="box large">
                {Object.entries(item).map(([key, value]) => (
                  <div key={key} className="data-row">
                    <strong>{key}:</strong> {value}
                  </div>
                ))}
              </div>
            ))}
          {level === 3 && filteredData.length === 0 && <div className="box large">No matching data found.</div>}
          <div className="box add-box" onClick={handleAddClick}>
            +
          </div>
        </div>
      </div>
      {showForm && (
        <div className="popup">
          <form className="form" onSubmit={handleFormSubmit}>
            <h2>Add New Entry</h2>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleFormChange}
              placeholder="Title"
              required
            />
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleFormChange}
              placeholder="Category"
              required
              readOnly={!!form.category}
            />
            <input
              type="text"
              name="subcategory"
              value={form.subcategory}
              onChange={handleFormChange}
              placeholder="Subcategory"
              required
              readOnly={!!form.subcategory}
            />
            <input
              type="text"
              name="tag"
              value={form.tag}
              onChange={handleFormChange}
              placeholder="Tag"
              required
              readOnly={!!form.tag}
            />
            <button type="submit">Add</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Home;
