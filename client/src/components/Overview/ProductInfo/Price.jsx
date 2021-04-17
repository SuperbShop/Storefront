import React from 'react';
import PropTypes from 'prop-types';

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

const Price = ({price, sale}) => {
  if (!sale) {
    return (
      <div className="nosale">{`$${price}`}</div>
    );
  }
  return (
    <div>
      <span>{`$${price}`}</span>
      <span>{`$${sale}`}</span>
    </div>
  );
};

export default Price;
