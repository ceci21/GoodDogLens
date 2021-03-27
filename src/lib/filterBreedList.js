/** This function filters through the major dog breeds list as well as the sub-breeds
 * lists that can be found within the elements of `dogBreeds`. Since the structure
 * of `dogBreeds[n].subBreeds` is an array of strings (for the dog names), it checks the
 * element directly, but if the function is being called to filter the `dogBreeds` list, the name is found on
 * the `breed` property for each element. `majorBreedSelected` being specified here indicates whether the name
 * we want is on a `breed` property of the element or the element itself.
 *
 */
const filterBreedList = (filterQuery, list, majorBreedSelected) => {
  const regex = new RegExp(filterQuery, 'g');
  if (majorBreedSelected) {
    return list.filter((item) => {
      return regex.test(`${item} ${majorBreedSelected}`);
    });
  }
  return list.filter((item) => {
    return regex.test(item.breed);
  });
};

export default filterBreedList;
