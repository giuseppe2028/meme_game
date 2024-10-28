import {UserDAO} from "../dao/UserDAO.mjs";
import {getTotalMatches, getTotalPoint} from "../dao/GameplayDao.mjs";

export const getPersonalInfo = async (user) => {

    const userDao = new UserDAO()
    const personalInfo = await userDao.getPersonalInfo(user);
    const total_matches = await getTotalMatches(user);
    const total_point = await getTotalPoint(user);

    personalInfo.totalMatch = total_matches;
    personalInfo.totalScore = total_point;

    return personalInfo;

}