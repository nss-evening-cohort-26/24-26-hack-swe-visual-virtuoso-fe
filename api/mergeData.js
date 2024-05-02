import { getSingleArt } from './artData';
// import { deleteTag, getArtTags } from './tagData';
// import { getSingleTag } from './tagData';

const viewArtDetails = async (artId) => {
  const art = await getSingleArt(artId);
  console.warn(art);
  return { ...art };
  // getSingleTag(artObject.tagIds);
};
// const deleteArtTags = (artwork) => new Promise((resolve, reject) => {
//   getArtTags(artwork.Id).then((tagsArray) => {
//     console.warn(tagsArray, 'Author Books');
//     const deleteTagPromises = tagsArray.map((tag) => deleteTag(tag.Id));

//     Promise.all(deleteTagPromises).then(() => {
//       deleteArt(artwork).then(resolve);
//     });
//   }).catch((error) => reject(error));
// });
export default viewArtDetails;
