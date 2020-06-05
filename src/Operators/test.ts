import Operator from "./operator";

const opt = (): void => {
    const operator1 = new Operator('localhost', '/echo', 'json', undefined, 1, 'service-messages');
    const operator2 = new Operator('localhost', '/echo-2', 'json', undefined, 1, 'service-messages');

    setTimeout(() => {
        operator1.consume()
        operator2.consume()
    }, 2000)
}

export default opt;