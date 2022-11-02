export default class Utils {
    /**
     * @param list array of any type
     * @returns random entry from the list
     */
    static getRandomFromList = (list:any[])=> list[Math.floor(Math.random()*list.length)]

    /**
     * if database is not available (e.g., for heroku live)
     */
    static getJsonData = ()=>{
        return require('../../myjsonfile.json')
    }
}