import api from './call';

const getAllMajorDogBreeds = async () => {
  const {
    data: { message: dogs },
  } = await api.get('/breeds/list/all');
  return Object.keys(dogs);
};

export default getAllMajorDogBreeds;
