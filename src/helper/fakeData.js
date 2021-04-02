const randomInt = (max, min) =>{
    return Math.floor(Math.random() * (max - min)) + min;
}
export const fakeData = type =>{
    let max, min;
    const data = []
    if (type === 'Bike'){
        max = 80;
        min = 50;
    } else if (type === 'Car'){
        max = 150;
        min = 80;
    } else if (type === 'Bus'){
        max = 60;
        min = 20;
    } else if (type === 'Train'){
        max = 50;
        min = 10;
    }
    for (let i= 0; i<=3; i++){
        const passenger = type === 'Car' ? randomInt(6,4) : 1
        data.push({
            passenger,
            cost: randomInt(max,min)
        })
    }
    return data
}