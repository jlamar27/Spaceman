const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];


const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabe = alpha.map((x) => String.fromCharCode(x));
console.log(alphabe);