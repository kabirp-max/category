import React, { useState } from 'react';
import styled from 'styled-components';
import EditorSidebar from './EditorSidebar';
import { saveAs } from 'file-saver'; // Import FileSaver.js

// Styled Components for the Preview Section
const LandingPageContainer = styled.div`
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: ${props => props.backgroundColor || '#f4f7fc'};
  color: ${props => props.textColor || '#333'};
  padding: 10px;
`;

const Header = styled.header`
  width: 100%;
  background: #333;
  color: white;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 30px;
  padding: 30px;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    width: 80%;
  }
`;

const InfoSection = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const FormSection = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  color: ${props => props.textColor || '#333'};
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  color: ${props => props.textColor || '#555'};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #333;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const App = () => {
  const [settings, setSettings] = useState({
    logo: './adobe.png',
    heading: 'Welcome to Our Site!',
    subheading: 'We are glad to have you here.',
    backgroundColor: '#f4f7fc',
    textColor: '#333',
    formPlaceholder: 'Enter your name',
    formHeader : 'Sign Upp'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    
    setSettings({
      ...settings,
      [name]: value
    });
  };

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value
    });
  };

  const handleExport = () => {
    const componentCode = `
import React from 'react';

const App = () => {
  return (
    <div style={{ backgroundColor: '${''}', color: '${settings.textColor}' }}>
      <header style={{ backgroundColor: '#333', color: 'white', padding: '20px 0', textAlign: 'center' }}>
        <img src="${settings.logo}" alt="Logo" style={{ width: '120px' }} />
        ${settings.heading}
      </header>
      <main style={{ display: 'flex', justifyContent: 'space-between', padding: '30px', flexDirection: 'column', alignItems: 'center' }}>
        <section style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', width: '100%', maxWidth: '500px' }}>
          <h1 style={{ color: '${settings.textColor}' }}>${settings.heading}</h1>
          <p style={{ color: '${settings.textColor}' }}>${settings.subheading}</p>
        </section>
        <section style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', width: '100%', maxWidth: '500px' }}>
          <h1 style={{ color: '${settings.textColor}' }}>${settings.formPlaceholder}</h1>
          <form>
            <input type="text" placeholder="${settings.formPlaceholder}" style={{ width: '100%', padding: '12px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px' }} />
            <button style={{ width: '100%', padding: '12px', backgroundColor: '#333', color: 'white', fontSize: '1.1rem', border: 'none', borderRadius: '5px' }}>Submit</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default App;
    `;

    const blob = new Blob([componentCode], { type: 'text/javascript' });
    saveAs(blob, 'App.js');
  };

  return (
    <div style={{ display: 'flex' }}>
      <LandingPageContainer style={{ width: "74%" }} backgroundColor={settings.backgroundColor} textColor={settings.textColor}>
        {/* Header */}
        <Header>
          <Logo src={settings.logo} alt="Logo" />
        </Header>

        {/* Main Content Section */}
        <ContentContainer>
          {/* Info Section */}
          <InfoSection>
            <Title textColor={settings.textColor}>{settings.heading}</Title>
            <Paragraph textColor={settings.textColor}>{settings.subheading}</Paragraph>
          </InfoSection>

          {/* Form Section */}
          <FormSection>
            <Title textColor={settings.textColor}>{settings.formHeader}</Title>
            <form>
              <Input
                type="text"
                placeholder={settings.formPlaceholder}
                required
              />
              <Button type="submit">Submit</Button>
            </form>
          </FormSection>
        </ContentContainer>
      </LandingPageContainer>

      <EditorSidebar
        settings={settings}
        handleInputChange={handleInputChange}
        handleColorChange={handleColorChange}
        handleExport={handleExport}
      />
    </div>
  );
};

export default App;
