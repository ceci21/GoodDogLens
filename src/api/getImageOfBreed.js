import api from './call';

const getImageOfBreed = async (breed, subBreed) => {
  let url = `/breed/${breed}/${subBreed ? subBreed + '/' : ''}images/random`;
  const {
    data: { message: imgUrl },
  } = await api.get(url, {
    cache: {
      maxAge: 15 * 60 * 1000,
    },
  });
  return imgUrl;
};

export default getImageOfBreed;
