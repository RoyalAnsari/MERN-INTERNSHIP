export function createAuditCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}
