import React from 'react';
import styled from 'styled-components';

// Styled Components for Sidebar
const SidebarContainer = styled.div`
  width: 300px;
  position: fixed;
  top: 0;
  right: 0;
  background: #fff;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow-y: auto;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const ColorPicker = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const EditorSidebar = ({ settings, handleInputChange, handleColorChange, handleExport }) => {
  return (
    <SidebarContainer>
      <h2>Editor Sidebar</h2>

      {/* Logo Image */}
      <label>Logo Image URL</label>
      <InputField
        type="text"
        name="logo"
        value={settings.logo}
        onChange={handleInputChange}
        placeholder="Enter logo image URL"
      />

      {/* Heading and Text Changes */}
      <label>Heading Text</label>
      <InputField
        type="text"
        name="heading"
        value={settings.heading}
        onChange={handleInputChange}
        placeholder="Enter heading text"
      />

      <label>Subheading Text</label>
      <InputField
        type="text"
        name="subheading"
        value={settings.subheading}
        onChange={handleInputChange}
        placeholder="Enter subheading text"
      />

      {/* Background Color */}
      <label>Background Color</label>
      <ColorPicker
        type="color"
        name="backgroundColor"
        value={settings.backgroundColor}
        onChange={handleColorChange}
      />

      {/* Text Color */}
      <label>Text Color</label>
      <ColorPicker
        type="color"
        name="textColor"
        value={settings.textColor}
        onChange={handleColorChange}
      />

      {/* Form Input Field Change */}
      <label>Form Input Placeholder</label>
      <InputField
        type="text"
        name="formPlaceholder"
        value={settings.formPlaceholder}
        onChange={handleInputChange}
        placeholder="Enter form input placeholder"
      />

      {/* Form Input Field Change */}
      <label>Form Heading</label>
      <InputField
        type="text"
        name="formHeader"
        value={settings.formHeader}
        onChange={handleInputChange}
        placeholder="Enter form header"
      />

      {/* Export Button */}
      <Button onClick={handleExport}>Export as React File</Button>
    </SidebarContainer>
  );
};

export default EditorSidebar;
