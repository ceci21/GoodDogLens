import api from './call';

const getAllSubBreeds = async (breed) => {
  const {
    data: { message: subBreeds },
  } = await api.get(`/breed/${breed}/list`);
  if (subBreeds.length) {
    return subBreeds;
  }
  return;
};

export default getAllSubBreeds;
