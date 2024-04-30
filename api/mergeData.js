import { getSingleArt, deleteArt } from './artData';
import { getSingleTag } from './tagData';

const viewArtDetails = (artId) => new Promise((resolve, reject) => {
  getSingleArt(artId)
    .then((artObject) => {
      getSingleTag(artObject.id)
        .then((tagObject) => {
          resolve({ tagObject, ...artObject });
        });
    }).catch((error) => reject(error));
});

export { viewArtDetails, deleteArt };
