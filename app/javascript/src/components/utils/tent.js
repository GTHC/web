const defineTentColors = (tentTypeInput) => {

  let tentType, tentTypeColor;
  switch (tentTypeInput.toLowerCase()) {
    case 'black': {
      tentType = 'Black';
      tentTypeColor = 'black';
      break;
    }
    case 'blue': {
      tentType = 'Blue';
      tentTypeColor = 'blue';
      break;
    }
    case 'white': {
      tentType = 'White';
      tentTypeColor = 'white';
      break;
    }
    case 'dirty black': {
      tentType = 'Dirty Black';
      tentTypeColor = 'black';
      break;
    }
    case 'dirty blue': {
      tentType = 'Dirty Blue';
      tentTypeColor = 'blue';
      break;
    }
    default: {
      tentType = 'Unknown';
      tentTypeColor = 'grey';
      break;
    }
  }

  return { tentType, tentTypeColor };
}

export {
  defineTentColors,
};
