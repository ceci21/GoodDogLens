
/* eslint-disable */
import React from 'react';
import Box from 'react-bulma-components/lib/components/box';
import Heading from 'react-bulma-components/lib/components/heading';
import Masonry from 'react-masonry-css';

const breakPoints = {
  default: 4,
  1024: 3,
  768: 2,
  512: 1,
};

const DogList = ({ list, breedImages, selectedBreed, selectBreedHandler }) => (
  <div className="dog-list">
    <Masonry breakpointCols={breakPoints} className="grid" columnClassName="grid-column">
      {list.map((item, i) => {
        // Here decides how breed and sub-breed are chosen
        const breed = selectedBreed ? ` ${item} ${selectedBreed}` : item.breed;
        const breedImage = selectedBreed
          ? breedImages[`${selectedBreed}:${item}`]
          : breedImages[item.breed];
        const clickHandler = selectedBreed ? () => {} : () => selectBreedHandler(breed);
        const addBtn =
          item.subBreeds && item.subBreeds.length ? (
            <a className="add-btn" href="#" onClick={clickHandler}>
              View {item.breed} sub-breeds
            </a>
          ) : null;
        if (breedImage) {
          return (
            <Box className="item" key={`item-${i}`}>
              <div className="item-text">
                <Heading className="breed-name fade-in">{breed}</Heading>
                {addBtn}
              </div>
              <img src={breedImage} alt={breed} loading="lazy"></img>
            </Box>
          );
        }
        return null;
      })}
    </Masonry>
  </div>
);

export default DogList;
