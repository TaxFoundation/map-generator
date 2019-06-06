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

const Content = styled.div`
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 4px;
  grid-area: 2 / 2 / span 1 / span 1;
  padding: 1rem;
`;

const Modal = ({ children }) => (
  <Wrapper>
    <Content>{children}</Content>
  </Wrapper>
);

Modal.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Modal;
