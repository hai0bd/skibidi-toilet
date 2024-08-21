import { sys, Vec3 } from "cc"

declare global {
    var data: {
        score: number,
    };
}

const initGameData = () => {
    return {
        score: 0,
    };
};

const getGameData = () => {
    const storedData = sys.localStorage.getItem('SBD_Data');
    if (storedData) {
        return JSON.parse(storedData);
    }
    else {
        const newData = initGameData();
        sys.localStorage.setItem('SBD_Data', JSON.stringify(newData));
        return newData;
    }
}
window.data = getGameData();