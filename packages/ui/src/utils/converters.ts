export const ArrayAndStringConverter = (value: unknown) => {
    try {
      // Parses the value if it is a Array
      return JSON.parse(value as string);
    } catch(e) {
      // Otherwise, returns a string
      return value;
    }
  }

export const ArrayAndNumberConverter = (value: unknown) => {
    try {
      // Parses the value if it is a Array
      return JSON.parse(value as string);
    } catch(e) {
      // Otherwise, returns a number
      return parseFloat(value as string);
    }
}

export const DefaultSizeConverter = (value: unknown) => {
  try {
    // Check if size is not one of small, medium and large
    if (value !== 'small' && value !== 'medium' && value !== 'large') {
      return 'medium';
    }

    return value as string;
  } catch (e) {
    // If it is not string, return medium
    return 'medium';
  }
}
