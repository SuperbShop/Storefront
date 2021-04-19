import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// class Price extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // originalPrice: '',
//       // salePrice: '',
//       // onSale: false,
//     };
//   }

//   componentDidMount() {
//     this.checkPrice();
//   }

//   checkPrice() {
//     const { selectedStyle } = this.props;
//     console.log(selectedStyle.orginal_price);
//     if (selectedStyle.sale_price !== null) {
//       this.setState({
//         originalPrice: selectedStyle.orginal_price,
//         salePrice: selectedStyle.sale_price,
//         onSale: true,
//       });
//     } else {
//       this.setState({
//         originalPrice: selectedStyle.orginal_price,
//       });
//     }
//   }

//   render() {
//     return (
//       <div>
//         <span className="sale">{this.props.selectedStyle.orginal_price}</span>
//       </div>
//     );
//   }
// }

const NoSale = styled.div`
  padding: 15px 0;
  font-size: 13px;
  font-weight: 300;
`;
const OnSale = styled.div`
  padding: 15px 0;
  font-size: 13px;
  font-weight: 300;
`;

const RegularPrice = styled.span`
  text-decoration: line-through;

`;

const SalePrice = styled.span`
  color: red;
  padding-left: 5px;
  font-weight: 700;
`;

const Price = ({price, sale}) => {
  if (!sale) {
    return (
      <NoSale>{`$${price}`}</NoSale>
    );
  }
  return (
    <OnSale>
      <RegularPrice>{`$${price}`}</RegularPrice>
      <SalePrice>{`$${sale}`}</SalePrice>
    </OnSale>
  );
};

export default Price;
