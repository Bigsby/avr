export default abstract class Protocol {
    getType() {
        return this.constructor.name;
    }
}