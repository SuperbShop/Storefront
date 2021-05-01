/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle as farCheckCircle } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';
import Price from './Price';

const StyleWrapper = styled.div`
  padding: 0,
  margin: 0
`;

const StyleText = styled.span`
  font-weight: 700;
  text-transform: uppercase;
`;
const CurrentStyle = styled.span`
  padding-left: 5px;
  text-transform: uppercase;
  font-weight: 300;
`;

const ThumbWrapper = styled.div`
  padding-top: 1.5rem;
`;
const Thumbnail = styled.img`
  justify-content: space-between;
  align-items: center;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  margin: 5px;
  object-fit: cover;
  opacity: 0.5;

  &:hover {
    border: 2px solid #fb3640;
    opacity: 1;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    transform: scale(1.5);
    transition: transform 0.5s;
    cursor: pointer;
  }
`;
const SelectedImageWrapper = styled.span`
  position: relative;
`;
const SelectedImage = styled.img`
  justify-content: space-between;
  align-items: center;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  margin: 5px;
  object-fit: cover;
  opacity: 1;
  border: 2px solid #e63946;
`;

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    const { handleStyleChange } = this.props;
    handleStyleChange(id);
  }

  render() {
    const { selectedStyle, styles } = this.props;
    const {
      name, sale_price, original_price, style_id,
    } = selectedStyle;

    const checkmark = {
      position: 'absolute',
      right: '0',
      color: '#e63946',
    };

    return (
      <StyleWrapper data-testid="styleSelector">
        <Price price={original_price} sale={sale_price} />
        <StyleText>Style &gt;</StyleText>
        <CurrentStyle>{name}</CurrentStyle>
        <ThumbWrapper>
          {
            styles.map((style) => (
              <React.Fragment key={style.style_id}>
                {
                (style.style_id === style_id)
                  ? (
                    <SelectedImageWrapper>
                      <SelectedImage
                        key={style.style_id}
                        src={style.photos[0].thumbnail_url
                          || 'https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder-564x564.jpg'}
                        alt="style thumbnail"
                      />
                      <FontAwesomeIcon icon={farCheckCircle} style={checkmark} />
                    </SelectedImageWrapper>
                  )
                  : (
                    <Thumbnail
                      key={style.style_id}
                      src={style.photos[0].thumbnail_url
                        || 'https://www.arraymedical.com/wp-content/uploads/2018/12/product-image-placeholder-564x564.jpg'}
                      alt="style thumbnail"
                      onClick={() => this.handleClick(style.style_id, style.name)}
                    />
                  )
              }
              </React.Fragment>
            ))
          }
        </ThumbWrapper>

      </StyleWrapper>
    );
  }
}
StyleSelector.propTypes = {
  handleStyleChange: PropTypes.func.isRequired,
  selectedStyle: PropTypes.shape({}).isRequired,
  styles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
export default StyleSelector;
