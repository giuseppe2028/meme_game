import {getCaptionRelatedToMeme, getMultipleMemeDAO, getRandomCaption, getSingleMemeDAO} from "../dao/MemeDAO.mjs";


export const getMemes = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let randomMemes = await getMultipleMemeDAO();

            randomMemes = await Promise.all(randomMemes.map(async meme => {

                const relatedCaption = await getCaptionRelatedToMeme(meme.name);
                const randomCaption = await getRandomCaption(meme.name);

                meme.description = [...relatedCaption, ...randomCaption];

                return meme;
            }));
            resolve(randomMemes);
        } catch (error) {
            reject(error);
        }
    });
};


export const getSingleMeme = ()=>{
    return new Promise(async (resolve, reject) => {
        try {

            let randomMeme = await getSingleMemeDAO();

            const relatedCaption = await getCaptionRelatedToMeme(randomMeme.name);
            const randomCaption = await getRandomCaption(randomMeme.name);

            randomMeme.description = [...relatedCaption, ...randomCaption]
            resolve(randomMeme)
        } catch (error) {
            reject(error);
        }
    })
}

