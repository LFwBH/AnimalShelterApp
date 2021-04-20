export const PET_IMAGE_API = {
  Dog: {
    thumb: () => `http://loremflickr.com/320/240/dog?v=${Date.now()}`,
    full: () => `http://loremflickr.com/1920/1080/dog?v=${Date.now()}`,
  },
  Cat: {
    thumb: () => `https://cataas.com/cat?width=320&height=240&v=${Date.now()}`,
    full: () => `https://cataas.com/cat?width=1920&height=1080&v=${Date.now()}`,
  },
};
