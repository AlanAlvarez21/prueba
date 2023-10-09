export interface User {
    name: {
      first: string;
      last: string;
    };
    location: {
      country: string;
    };
    picture: {
      thumbnail: string;
    };
    [key: string]: any;
  }
  