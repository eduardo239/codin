const t = () => {
  let root1, root2;

  const a = prompt("Enter the first number: ");
  const b = prompt("Enter the second number: ");
  const c = prompt("Enter the third number: ");

  const dx = b * b - 4 * a * c;

  if (dx > 0) {
    root1 = (-b + Math.sqrt(dx)) / (2 * a);
    root2 = (-b - Math.sqrt(dx)) / (2 * a);

    console.log(`XXX are ${root1} and ${root2}`);
  } else if (dx == 0) {
    root1 = root2 = -b / (2 * a);

    console.log(`XXX are ${root1} and ${root2}`);
  }
};
