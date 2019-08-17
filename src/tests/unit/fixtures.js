/* eslint-disable camelcase */
export const user = {
  firstName: 'chukwuemeka',
  lastName: 'ajima',
  email: 'gerda44@ethereal.email',
  password: '-12345678',
};

export const user_wrong_email = {
  firstName: 'chukwuemeka',
  lastName: 'ajima',
  email: 'meeky00@mail.com',
  password: '-12345678',
};

export const user_no_password = {
  firstName: 'chukwuemeka',
  lastName: 'ajima',
  email: 'gerda44@ethereal.email',
  password: undefined,
};

export const user_profile = {
  name: 'chukwuemeka ajima',
  email: 'gerda44@ethereal.eemail',
  dob: '1995-01-01T00:00:00Z',
  gender: 'male',
  address: 'Lagos Lagos',
  contact: '0808123456',
  city: 'Lagos',
  country: 'Nigeria',
  avatar: 'https://www.example.com/images/avatar.png',
  handles: {
    twitter: 'twitter',
    facebook: 'facebook',
    linkedin: 'linkedin',
    github: 'github',
  },
  additionalInfo: {
    profileViewCount: 0,
    lastSeen: '1995-01-01T00:00:00Z',
  },
  details: {
    badge: 'https://www.example.com/images/badge.png',
    ratings: 4.5,
    skills: [
      { primarySkills: 'nodejs reactjs angularjs' },
      { secondarySkills: 'java python php' },
    ],
  },
};
