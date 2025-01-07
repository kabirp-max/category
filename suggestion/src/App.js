import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components

const LandingPageContainer = styled.div`
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #f4f7fc;
  color: #333;
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
  width: 80%;
  margin-top: 30px;
  padding: 30px;
`;

const InfoSection = styled.div`
  width: 45%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormSection = styled.div`
  width: 45%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  color: #333;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  color: #555;
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

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: ${props => (props.show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const PopupButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <LandingPageContainer>
      {/* Header */}
      <Header>
        <Logo src="https://via.placeholder.com/120x50.png" alt="Logo" />
      </Header>

      {/* Main Content Section */}
      <ContentContainer>
        {/* Info Section */}
        <InfoSection>
          <Title>Welcome to Our Site!</Title>
          <Paragraph>
            We are glad to have you here. Learn more about our services and how we can help you.
            Fill out the form to get started!
          </Paragraph>
        </InfoSection>

        {/* Form Section */}
        <FormSection>
          <Title>Sign Up</Title>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
            <Button type="submit">Submit</Button>
          </form>
        </FormSection>
      </ContentContainer>

      {/* Popup Overlay */}
      <PopupOverlay show={showPopup}>
        <PopupContent>
          <h3>Thank you for filling the form!</h3>
          <PopupButton onClick={() => setShowPopup(false)}>Close</PopupButton>
        </PopupContent>
      </PopupOverlay>
    </LandingPageContainer>
  );
};

export default App;
