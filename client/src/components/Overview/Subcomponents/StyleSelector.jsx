import React from 'react';
import styled from 'styled-components';
import Price from './Price';

const StyleWrapper = styled.div`
`;

const StyleText = styled.span`
  font-weight: 700;
  color: #535353;
  text-transform: uppercase;
`;
const CurrentStyle = styled.span`
  padding-left: 5px;
  text-transform: uppercase;
`;
class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      name, sale_price, original_price, style_id,
    } = this.props.selectedStyle;
    return (
      <StyleWrapper>
        <Price price={original_price} sale={sale_price}/>
        <StyleText>Style &gt;</StyleText>
        <CurrentStyle>{name}</CurrentStyle>
      </StyleWrapper>

    );
  }
}

export default StyleSelector;
