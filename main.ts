export function isPrime(number: number) {
  if (number <= 1) return false;

  if (number == 2) return true;

  if (number % 2 == 0) return false;

  const limit = Math.floor(number ** 0.5) + 1;

  for (let i = 3; i < limit; i += 2) {
    if (number % i == 0) return false;
  }
  return true;
}

const isPrimeNum = isPrime(29);
console.log(isPrimeNum);
