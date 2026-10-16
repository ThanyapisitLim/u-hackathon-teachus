/* Photos from Wikimedia Commons (licenses allow reuse; CC BY / CC BY-SA require the credit shown in the app). */
export type ImageRef = {
  src: string;
  author: string;
  license: string;
  url: string;
};

export const IMG = {
  harness: {
    src: "/images/products/harness.jpg",
    author: "Sobaki2016",
    license: "CC0",
    url: "https://commons.wikimedia.org/wiki/File:Dog_in_a_harness.jpg",
  },
  dentalChew: {
    src: "/images/products/dental-chew.jpg",
    author: "Shane Adams",
    license: "CC BY 2.0",
    url: "https://commons.wikimedia.org/wiki/File:Dog_with_rawhide_chew_toy.jpg",
  },
  slowFeeder: {
    src: "/images/products/slow-feeder.jpg",
    author: "ELTORO.VET",
    license: "CC0",
    url: "https://commons.wikimedia.org/wiki/File:Blue_Slow_Feeder_Dog_Bowl_with_Raised_Studs_and_Ridges.jpg",
  },
  teethingToy: {
    src: "/images/products/teething-toy.jpg",
    author: "Justin Veenema justinveenema",
    license: "CC0",
    url: "https://commons.wikimedia.org/wiki/File:Puppy_playing_with_a_toy_(Unsplash).jpg",
  },
  dogRun: {
    src: "/images/places/dog-run.jpg",
    author: "David Shankbone",
    license: "CC BY-SA 3.0",
    url: "https://commons.wikimedia.org/wiki/File:Tompkins_Square_Big_Dog_Run.JPG",
  },
  trail: {
    src: "/images/places/trail.jpg",
    author: "GA_Kevin",
    license: "CC0",
    url: "https://commons.wikimedia.org/wiki/File:Freedom_Park_Dog_Park.jpeg",
  },
  cafe: {
    src: "/images/places/cafe.jpg",
    author: "epSos.de",
    license: "CC BY 2.0",
    url: "https://commons.wikimedia.org/wiki/File:Cute_dog_on_table.jpg",
  },
  vet: {
    src: "/images/places/vet.jpg",
    author: "Veterinarian Pet Alliance",
    license: "CC BY 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Stethoscope_examination_of_a_white_dog_in_Newark,_New_Jersey.jpg",
  },
  groomer: {
    src: "/images/places/groomer.jpg",
    author: "daveynin",
    license: "CC BY 2.0",
    url: "https://commons.wikimedia.org/wiki/File:Grooming_Poodle.jpg",
  },
  store: {
    src: "/images/places/store.jpg",
    author: "Syced",
    license: "CC0",
    url: "https://commons.wikimedia.org/wiki/File:Pet_shop_in_Ebisu.jpg",
  },
} satisfies Record<string, ImageRef>;
