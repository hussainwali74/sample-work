export default class Utils {
    /**
     * @param list array of any type
     * @returns random entry from the list
     */
    static getRandomFromList= (list:any[])=> list[Math.floor(Math.random()*list.length)]
}