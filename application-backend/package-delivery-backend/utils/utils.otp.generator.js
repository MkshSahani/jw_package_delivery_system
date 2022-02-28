function otpGenerator() {
    let n1 = parseInt(Math.random() * 10); 
    let n2 = parseInt(Math.random() * 10); 
    let n3 = parseInt(Math.random() * 10); 
    let n4 = parseInt(Math.random() * 10); 
    return (n1 * 1000 + n2 * 100 + n3 * 10 + n4).toString(); 
}

module.exports = {
    otpGenerator
}