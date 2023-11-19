const urlWEBsiteAPI = "https://api.openweathermap.org/data/2.5";

const API_key = "9079b38e88a27e184fb5bffa95d75625";
const getweatherdata = async (type, data) => {
    let url = null

    switch (type) {
        case "current":
            if (typeof data === "string") {
                url = `${urlWEBsiteAPI}/weather?q=${data}&appid=${API_key}&units=metric`
            } else {
                url = `${urlWEBsiteAPI}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${API_key}&units=metric`
            }
            break;

        case "forecast":
            if (typeof data === "string") {
                url = `${urlWEBsiteAPI}/forecast?q=${data}&appid=${API_key}&units=metric`
            } else {
                url = `${urlWEBsiteAPI}/forecast?lat=${data.longitude}&lon=${data.longitude}&appid=${API_key}&units=metric`
            }
            break;
        default:
          url = `${urlWEBsiteAPI}/weather?q=sabzevar&appid=${API_key}&units=metric`
    }


    try {
        const response = await fetch(url)
        const jsons = await response.json()
        if (+jsons.cod === 200){
            return jsons;
        }else {
            console.log(jsons.message)
        }


    }catch (error){
console.log("an error")
    }

}

export default getweatherdata;