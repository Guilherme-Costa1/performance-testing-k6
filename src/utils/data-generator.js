export function generateCPF() {
    let n = (Math.random() * 999999999).toFixed(0).padStart(9, '0');
    let d1 = calculateCPFVerifierDigit(n);
    let d2 = calculateCPFVerifierDigit(n + d1);
    return `${n}${d1}${d2}`;
}

function calculateCPFVerifierDigit(digits) {
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
        sum += parseInt(digits[i]) * (digits.length + 1 - i);
    }
    let rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
}

export function generateCNPJ() {
    let n = (Math.random() * 999999999999).toFixed(0).padStart(12, '0');
    let d1 = calculateCNPJVerifierDigit(n);
    let d2 = calculateCNPJVerifierDigit(n + d1);
    return `${n}${d1}${d2}`;
}

function calculateCNPJVerifierDigit(digits) {
    let weights = digits.length == 12 ? [5,4,3,2,9,8,7,6,5,4,3,2] : [6,5,4,3,2,9,8,7,6,5,4,3,2];
    let sum = digits.split('').reduce((acc, digit, index) => acc + (parseInt(digit) * weights[index]), 0);
    let rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
}

export function generateEmail() {
    const firstNames = ["joao", "maria", "pedro", "ana", "carlos", "juliana", "gustavo", "fernanda"];
    const lastNames = ["silva", "santos", "oliveira", "rodrigues", "almeida", "costa", "pereira", "melo"];
    const domains = ["gmail.com"]; 

    let firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    let lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    let number = Math.floor(Math.random() * 9999); 
    let stressFactor = Date.now().toString().slice(-4); 
    let domain = domains[Math.floor(Math.random() * domains.length)];

    return `${firstName}stress${lastName}${number}${stressFactor}@${domain}`;
}

export function generateCellphone() {
    const ddd = Math.floor(Math.random() * 90 + 10); 
    const firstPart = Math.floor(Math.random() * 90000 + 10000); 
    const lastPart = Math.floor(Math.random() * 9000 + 1000);
    return `(${ddd}) ${firstPart}-${lastPart}`;
}

export function generateStrongPassword(length = 12) {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%&*?";
    
    const allChars = uppercase + lowercase + numbers + specialChars;
    
    let passwordArray = [];

    passwordArray.push(uppercase[Math.floor(Math.random() * uppercase.length)]);
    passwordArray.push(lowercase[Math.floor(Math.random() * lowercase.length)]);
    passwordArray.push(numbers[Math.floor(Math.random() * numbers.length)]);
    passwordArray.push(specialChars[Math.floor(Math.random() * specialChars.length)]);

    for (let i = passwordArray.length; i < length; i++) {
        passwordArray.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }

    return passwordArray.join('');
}