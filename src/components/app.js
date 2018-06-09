import React from "react";
import Form from "./form";
import styled from "styled-components";

const Heading = styled.h1`
  font-weight: 900;
  margin-bottom: 0;
  font-size: 2.8rem;
  text-align: center;
`;

const SubTitle = styled.p`
  font-weight: 300;
  font-size: .8rem;
  margin-top: 0;
  margin-bottom: 2rem;
  text-align: center;
`;

const Wrapper = styled.div`
  margin: 4rem auto;
  /* display: flex; */
  /* align-items: center; */
  /* min-height: 90vh; */
  /* justify-content: center; */
  width: 80%;
  max-width: 30rem;
`;

const App = () => {
  return (
    <Wrapper>
      <div>
        <Heading>Weather to wear..?</Heading>
        <SubTitle>Clothing recommendations based on the weather</SubTitle>
        <Form />
      </div>
    </Wrapper>
  );
};

export default App;