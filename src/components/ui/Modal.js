import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  bottom: 0;
  display: grid;
  grid-template: 10vh 1fr 10vh / 10vw 1fr 10vw;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
`;

const Heading = styled.div`
  align-items: center;
  border-bottom: 1px solid #333;
  display: grid;
  grid-gap: 1rem;
  grid-template: auto / 1fr auto;
  margin-bottom: 1rem;
  padding-bottom: 1rem;

  h1 {
    font-size: 2rem;
  }
`;

const CloseButton = styled.button`
  border: 1px solid #0094ff;
  border-radius: 4px;
  background-color: #fff;
  color: #0094ff;
  cursor: pointer;
  display: block;
  padding: 0.5rem;
  transition: all 0.1s ease-in-out;
  user-select: none;

  &:hover {
    background-color: #0094ff;
    color: #fff;
    transform: scale(1.1);
  }
`;

const Content = styled.div`
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 4px;
  grid-area: 2 / 2 / span 1 / span 1;
  padding: 1rem;
`;

const Modal = ({ title, close, children }) => (
  <Wrapper>
    <Content>
      <Heading>
        <h1>{title}</h1>
        <CloseButton onClick={close}>Close</CloseButton>
      </Heading>
      {children}
    </Content>
  </Wrapper>
);

Modal.propTypes = {
  title: PropTypes.string,
  close: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Modal;
