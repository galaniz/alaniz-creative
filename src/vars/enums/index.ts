/**
 * Vars - enums
 */

/**
 * Namespace
 *
 * @type {string}
 */

const enumNamespace: string = 'ac'

/**
 * Site info
 *
 * @type {object}
 * @prop {string} title
 * @prop {string} email
 * @prop {object} meta
 * @prop {string} meta.description
 * @prop {string} meta.image
 */

interface Site {
  title: string
  email: string
  meta: {
    description: string
    image: string
  }
}

const enumSite: Site = {
  title: 'Alaniz Creative',
  email: 'graciela@alanizcreative.com',
  meta: {
    description: 'Graciela Alaniz is a designer/developer based in Toronto. She strives to create elegant, engaging and accessible digital experiences.',
    image: 'img/alaniz-creative-meta.webp'
  }
}

/**
 * Colors
 *
 * @type {object}
 * @prop {string} base
 * @prop {object} foreground
 * @prop {string} foreground.base
 * @prop {object} background
 * @prop {string} background.light
 */

interface Colors {
  base: string
  foreground: {
    base: string
  }
  background: {
    light: string
  }
}

const enumColors: Colors = {
  base: '#222222',
  foreground: {
    base: '#222222'
  },
  background: {
    light: '#ffffff'
  }
}

/**
 * Waves
 *
 * @type {object}
 * @prop {object} one
 * @prop {object} two
 * @prop {object} three
 * @prop {object} four
 * @prop {object} five
 */

interface Wave {
  path: string
  width: number
  height: number
}

interface Waves {
  one: Wave
  two: Wave
  three: Wave
  four: Wave
  five: Wave
}

const enumWaves: Waves = {
  one: {
    path: 'm.33,7.11c2.46,2.08,5.29,3.77,8.48,4.97,20.45,7.71,36.26-5.21,49.49-8.12,23.54-5.17,25.75,3.14,38.63,0,2.9-.71,5.49-1.92,7.78-3.53',
    width: 105,
    height: 15
  },
  two: {
    path: 'm.34.39c5.6,4.98,12.55,7.39,19.64,5.4,27.44-7.73,33.19,18.71,61.75,18.71,6.91,0,12.53-2.2,16.93-5.9',
    width: 99,
    height: 25
  },
  three: {
    path: 'm.35.37c.09.07.17.15.26.22,18.48,15.51,22.12.04,42.95,12.05,17.05,9.84,27.13,8.38,37.67,0,.85-.68,1.66-1.39,2.42-2.13',
    width: 84,
    height: 20
  },
  four: {
    path: 'm.39.35c14.15,16.04,29.88,6.56,34.95,5.91,14.99-1.92,20.79,9.86,36.57,6.69,5.73-1.15,10.68-4.76,14.68-9.91',
    width: 87,
    height: 14
  },
  five: {
    path: 'm99.72,11.81c-2.06,1.3-4.22,2.07-6.48,2.43-15.81,2.54-36.07-14.88-56.49-7.63C20.74,12.3,8.56,8.52.37.36',
    width: 100,
    height: 15
  }
}

/**
 * Blobs
 *
 * @type {object}
 * @prop {object} one
 * @prop {object} two
 * @prop {object} three
 * @prop {object} four
 * @prop {object} five
 */

interface Blob {
  path: string
}

interface Blobs {
  one: Blob
  two: Blob
  three: Blob
  four: Blob
  five: Blob
  uno: Blob
}

const enumBlobs: Blobs = {
  one: {
    path: 'm455.85,718.87c-90.3-19.8-139.71-13.79-178.9-5.83-5.35,1.09-10.5,2.21-15.54,3.31-31.87,6.94-59.13,12.88-101.62,2.52C66.74,696.2,14.26,605.41,2.87,504.32c-11.39-101.09,18.32-212.27,89.41-275.51,50.1-44.57,78.64-87.04,102.77-122.97,8.98-13.37,17.36-25.83,26-37.15,15.95-20.88,32.83-37.91,56.21-49.73C300.64,7.13,330.55.5,372.59.5c84.04,0,133.27,28,176.28,56.02,3.81,2.48,7.57,4.97,11.31,7.43,38.41,25.36,73.83,48.75,127.78,48.75,171.14,0,275.99,141.35,303.97,295.69,27.99,154.38-20.99,321.36-157.08,372.6-78.23,29.46-147.58,19.51-210.07-.6-26.97-8.68-52.66-19.25-77.23-29.36-3.9-1.61-7.78-3.2-11.62-4.77-28.06-11.48-54.68-21.84-80.08-27.41Z'
  },
  two: {
    path: 'm1.96,344.05c-8.51,84.45,20.8,170.22,69.83,229.93,49.02,59.71,117.68,93.28,187.88,73.54,55.89-15.72,100.78-14.07,140.29-2.73,39.5,11.33,73.6,32.33,107.93,55.26,5.27,3.52,10.55,7.09,15.86,10.67,63.8,43.1,131.41,88.78,238.52,88.78,91.95,0,155.7-47.87,193.78-118.86,38.1-71.01,50.51-165.15,39.71-257.58-10.8-92.43-44.82-183.08-99.49-247.11-54.66-64.02-129.97-101.43-223.45-87.46-43.56,6.51-77.77,4.26-107.17-2.79-29.4-7.05-53.96-18.88-78.23-31.51-3.63-1.89-7.24-3.79-10.87-5.7C431.62,24.85,385.35.5,308.87.5c-32.4,0-102.29,17.95-167.51,69.89C76.16,122.31,15.65,208.19,1.96,344.05Z'
  },
  three: {
    path: 'm102.84,610.86c44.34,38.69,79.74,58.03,111.02,67.18,31.27,9.15,58.46,8.11,86.42,5.98,3.04-.23,6.09-.48,9.15-.72,25.11-2.01,51.26-4.11,81.78.19,34.26,4.82,74.01,17.7,124.05,47.73,81.84,49.11,146.89,69.99,204.07,68.17,57.17-1.82,106.56-26.32,157.1-68.12,126.18-104.37,147.59-281.79,99.22-425.96-48.38-144.18-166.43-254.84-318.98-225.99-88.72,16.78-153.03,17.07-202.59,9.05-49.57-8.02-84.35-24.36-114.03-40.79-6.56-3.63-12.87-7.27-19.03-10.82-21.71-12.51-41.58-23.96-64.24-30.52-29.04-8.41-62.69-8.79-110.62,7.09-47.85,15.85-83.14,53.53-107,103.09C15.3,165.98,2.9,227.39.82,290.61c-2.08,63.22,6.15,128.22,23.55,184.96,17.4,56.74,43.96,105.17,78.47,135.29Z'
  },
  four: {
    path: 'm954.43,589.64c52.53-99.05,57.68-235.28,23.06-341.99-17.32-53.35-44.56-99.28-80.76-129.5-36.18-30.2-81.33-44.72-134.52-35.25-157.18,28-221.01,18.6-267.91-2.54-11.72-5.28-22.37-11.29-33.14-17.61-2.37-1.39-4.75-2.8-7.14-4.22-8.49-5.03-17.22-10.19-26.76-15.31-24.44-13.12-54.21-25.93-98.86-35.21-113.17-23.53-194.21,10.04-247.41,74.54C27.74,147.09,2.33,242.64.6,343.1c-1.73,100.45,20.22,205.75,61.63,289.72,41.42,83.98,102.26,146.55,178.26,161.74,71.92,14.37,121.09-5.17,169.47-26.17,2.09-.91,4.17-1.82,6.26-2.72,46.27-20.16,92.69-40.4,158.35-32.02,6.78.86,15.6,3.43,26.08,6.72,2.4.75,4.88,1.54,7.45,2.36,8.68,2.76,18.33,5.83,28.8,8.77,27.12,7.61,59.67,14.33,94.95,12.53,35.27-1.8,73.26-12.12,111.26-38.62,38-26.5,76.03-69.18,111.33-135.76Z'
  },
  five: {
    path: 'm680.05,799.3c-92.52,0-139.33-39.21-187-79.14-4.39-3.68-8.8-7.37-13.24-11.03-26.34-21.7-54.21-42.55-91.19-56.21-36.98-13.66-83.02-20.11-145.7-13.06-62.4,7.02-114.32-21.43-153.92-69.69-39.6-48.27-66.84-116.35-79.82-188.47C-3.79,309.57-2.5,233.45,14.92,169.1,32.34,104.75,65.87,52.24,117.32,27.22,168.86,2.16,210.19-2.8,246.57,2.96c36.4,5.76,67.91,22.26,99.82,40.18,3.1,1.74,6.2,3.49,9.31,5.25,60.95,34.45,125.1,70.72,228.63,44,108.54-28.01,212.32-27.98,288.95,22.1,76.6,50.07,126.22,150.26,126.22,322.94,0,128.64-44.8,219.09-107.11,277.39-62.32,58.3-142.18,84.47-212.34,84.47Z'
  },
  uno: {
    path: 'm6.26,0c0,8.36,4.57,13.69,4.57,21.1C10.83,32.85.5,43.19.5,53.15s7.15,21.35,22.16,21.35c16.99,0,28.72-13.59,42.63-13.59,18.55,0,39.95,12.34,62.4-3.38'
  }
}

/**
 * Posts layouts
 *
 * @type {object}
 * @prop {object} cardsMinimal
 * @prop {string} cardsMinimal.type
 * @prop {string} cardsMinimal.subtype
 * @prop {object} cardsAlternating
 * @prop {string} cardsAlternating.type
 * @prop {string} cardsAlternating.subtype
 * @prop {object} cardsCascading
 * @prop {string} cardsCascading.type
 * @prop {string} cardsCascading.subtype
 */

interface Card {
  type: string
  subtype: string
}

interface Layouts {
  listMinimal: {
    type: string
  }
  cardsMinimal: Card
  cardsAlternating: Card
  cardsCascading: Card
}

const enumLayouts: Layouts = {
  listMinimal: {
    type: 'listMinimal'
  },
  cardsMinimal: {
    type: 'cards',
    subtype: 'minimal'
  },
  cardsAlternating: {
    type: 'cards',
    subtype: 'alternating'
  },
  cardsCascading: {
    type: 'cards',
    subtype: 'cascading'
  }
}

/* Export */

export {
  enumNamespace,
  enumSite,
  enumColors,
  enumLayouts,
  enumWaves,
  enumBlobs
}
