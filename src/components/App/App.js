import React, { useEffect, useState } from 'react';
import { getAllMajorDogBreeds, getAllSubBreeds, getImageOfBreed } from '../../api';
import filterBreedList from '../../lib/filterBreedList';
import Breadcrumbs from '../Breadcrumbs';
import DogList from '../DogList';
import Filter from '../Filter';
import Navbar from 'react-bulma-components/lib/components/navbar';
import Section from 'react-bulma-components/lib/components/section';

const areDogsGood = true;
console.log('Are all dogs good dogs?', areDogsGood);

/***
 * State structure:
 * `dogBreeds`:
 * [
 *    {
 *      "breed": <breed name here>
 *      "subBreeds": [
 *        <sub-breed 1>,
 *        <sub-breed 2>,
 *        ...
 *       ]
 *    },
 *    ...
 * ]
 *
 * `breedImages`: {
 *    [<breed name>]: <image url of breed>,
 *    ...
 * }
 *
 * `selectedBreed`: <breed name>
 *
 * `selectedBreedI`: <integer-- index of `selectedBreed` in `dogBreeds`>
 *  (^ helpful for retrieving the sub breeds, as `dogBreeds` is an array and not an object, although I do realize it could have been an object)
 *
 * `query`: <filter query>
 *
 * `isLoading` <boolean-- indicates whether dog breed images have loaded or not>
 */

const App = () => {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [breedImages, setBreedImages] = useState({});
  const [selectedBreed, setSelectedBreed] = useState('');
  const [selectedBreedI, setSelectedBreedI] = useState(-1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState('');

  const selectBreedHandler = (breed) => setSelectedBreed(breed);
  const resetList = () => {
    setSelectedBreed('');
  };

  useEffect(() => {
    // Load in dogs, sub-breeds, and images of each major dog breed.
    const loadDogs = async () => {
      const retrievedBreeds = await getAllMajorDogBreeds();
      setIsLoading(true);
      for (const breed of retrievedBreeds) {
        const newBreedEntry = {
          breed,
          subBreeds: await getAllSubBreeds(breed),
        };
        const newBreedImage = {
          [breed]: await getImageOfBreed(breed),
        };
        setBreedImages((oldBreedImages) => ({
          ...oldBreedImages,
          ...newBreedImage,
        }));
        setDogBreeds((oldDogBreeds) => [...oldDogBreeds, newBreedEntry]);
      }
      setIsLoading(false);
    };
    loadDogs();
  }, []);

  useEffect(() => {
    // Loads in sub breed images once a major selected breed has been chosen.
    const loadSubBreedImages = async () => {
      if (!selectedBreed) {
        return setSelectedBreedI(-1);
      }

      const newSelectedBreedI = dogBreeds.findIndex(({ breed }) => breed === selectedBreed);
      const { subBreeds } = dogBreeds[newSelectedBreedI];
      setSelectedBreedI(newSelectedBreedI);
      for (const subBreed of subBreeds) {
        // Collect the images from the sub-breeds.
        // Here, I'm using a system of breed:sub-breed for the object keys for easier access
        const newBreedImage = {
          [`${selectedBreed}:${subBreed}`]: await getImageOfBreed(selectedBreed, subBreed),
        };
        setBreedImages((oldBreedImages) => ({
          ...oldBreedImages,
          ...newBreedImage,
        }));
      }
    };

    loadSubBreedImages();
  }, [selectedBreed]);

  let dogList = [];
  if (selectedBreedI > -1 && dogBreeds[selectedBreedI] && dogBreeds[selectedBreedI].subBreeds) {
    dogList = dogBreeds[selectedBreedI].subBreeds;
  } else {
    dogList = dogBreeds;
  }

  // If query is applied, apply filter to dogBreeds or subBreeds list.
  const list = query ? filterBreedList(query, dogList, selectedBreed) : dogList;

  // Message above list
  let resultWord = list.length === 1 ? 'result' : 'results';
  let resultsMessage = '';
  if (query && list.length) {
    resultsMessage = `${list.length} ${resultWord} found`;
  } else if (query && !list.length) {
    resultsMessage = `No dogs found with '${query}'`;
  } else {
    resultsMessage = `Showing ${list.length} ${resultWord}`;
  }

  if (isLoading && !query && !selectedBreed) {
    resultsMessage = 'Loading... ' + resultsMessage;
  }

  return (
    <div className="app">
      <div className="app-inner">
        <header>
          <Navbar
            className="top-bar"
            color="warning"
            fixed="top"
            active={false}
            transparent={false}
          >
            <div className="top-bar-inner">
              <div className="nav-container">
                {<Breadcrumbs selectedBreed={selectedBreed} resetList={resetList} />}
              </div>
            </div>
          </Navbar>
        </header>
        <Section>
          <div className="logo">
            <img src="./dog-api-logo.svg" alt="dog api logo" />
            <h1 className="title">GoodDogLens</h1>
            <img src="./magnifying-glass.svg" alt="magnifying glass" />
          </div>
          <Filter updateQuery={(q) => setQuery(q)} />

          <h1 className="results">{resultsMessage}</h1>
          <DogList
            list={list}
            breedImages={breedImages}
            selectedBreed={selectedBreed}
            selectBreedHandler={selectBreedHandler}
          />
        </Section>
        <footer>
          <Section>GoodDogLens &#169; 2021</Section>
        </footer>
      </div>
    </div>
  );
};

export default App;
