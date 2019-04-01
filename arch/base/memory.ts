export default abstract class Memory {
    size: number;
    getType() {
        return this.constructor.name;
    }
}