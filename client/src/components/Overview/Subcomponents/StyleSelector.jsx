import React from 'react';
import styled from 'styled-components';
import Price from './Price';

const StyleWrapper = styled.div`
  padding: 0,
  margin: 0
`;

const StyleText = styled.span`
  font-weight: 700;
  color: #535353;
  text-transform: uppercase;
`;
const CurrentStyle = styled.span`
  padding-left: 5px;
  text-transform: uppercase;
  font-weight: 300;
  color: #535353;
`;

const ThumbWrapper = styled.div`
  padding-top: 1.5rem;
`;
const Thumbnail = styled.img`
  border-radius: 50%;
  height: 69px;
  width: 69px;
  margin: 5px;
  object-fit: cover;
  &:hover {
    border: 2px solid #000
  }
`;
class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    const { selectedStyle } = props;
    this.state = {
      selectedStyle: selectedStyle.name,
    };
  }

  render() {
    const {
      name, sale_price, original_price, style_id, photos,
    } = this.props.selectedStyle;

    const { styles } = this.props;
    const { selectedStyle } = this.state;
    console.log(styles);

    if (name) {
      return (
        <StyleWrapper>
          <Price price={original_price} sale={sale_price} />
          <StyleText>Style &gt;</StyleText>
          <CurrentStyle>{name}</CurrentStyle>
          <ThumbWrapper>
            {
            styles.map((style) => (
              <Thumbnail src={style.photos[0].thumbnail_url} />
            ))
          }
          </ThumbWrapper>

        </StyleWrapper>
      );
    }
    return <div>Loading...</div>;
  }
}

export default StyleSelector;
