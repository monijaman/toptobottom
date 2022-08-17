import styled from "styled-components";

 

export const ProductBox = styled.div`
  display: flex;
  background: ${props => props.theme.colors.main};
  height: 50px;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.secondary};
`;


export const CardBOx = styled.div`
  display: flex;
  background: red;
  height: 300px;
  width:300px;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.secondary};
`;

export const CardBtn = styled.div`
  background: Black;
  color:#FFF;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.secondary};
`;