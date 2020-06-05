function decimalToBinary(dec: number): string {
    return (dec >>> 0).toString(2);
}

// function getBufferSize(data: string | Buffer | number): number {
function getBufferSize(data: string | number | Buffer): number {
    let dataSize: string | Buffer;

    if (typeof data === 'number')
        dataSize = decimalToBinary(data);
    else
        dataSize = data;
    
    const size = Buffer.byteLength(dataSize);

    return size
}

export default getBufferSize;