/* eslint-disable camelcase */
export const user_no_firstName = {
  lastName: 'ajima',
  email: 'meeky@mail.com',
  password: '-12345678',
};

export const user_no_lastName = {
  firstName: 'ajima',
  email: 'meeky@mail.com',
  password: '-12345678',
};

export const user_no_email = {
  firstName: 'chukwuemeka',
  lastName: 'ajima',
  password: '-12345678',
};

export const user_no_password = {
  firstName: 'chukwuemeka',
  lastName: 'ajima',
  email: 'meeky@mail.com',
};

export const user_invalid_firstname = {
  firstName: 'chukwuemeka08',
  lastName: 'ajima',
  email: 'meeky@mail.com',
  password: '-12345678',
};

export const user_invalid_lastname = {
  firstName: 'chukwuemeka',
  lastName: 'ajima08',
  email: 'meeky@mail.com',
  password: '-12345678',
};

export const user_invalid_email = {
  firstName: 'chukwuemeka',
  lastName: 'ajima',
  email: 'meeky?mail.com',
  password: '-12345678',
};

export const user_short_password_length = {
  firstName: 'chukwuemeka',
  lastName: 'ajima',
  email: 'meeky@mail.com',
  password: '-12345',
};

// correct password but incorrect email
export const user_wrong_email = {
  email: 'meeky00@mail.com',
  password: '-12345678',
};

// correct email but wrong password
export const user_wrong_password = {
  email: 'gerda44@ethereal.email',
  password: '-1234567',
};

export const user = {
  firstName: 'chukwuemeka',
  lastName: 'ajima',
  email: 'gerda44@ethereal.email',
  password: '-12345678',
};

export const user2 = {
  firstName: 'chukwuemeka',
  lastName: 'ajima',
  email: 'gerda44@ethereal.mail',
  password: '-12345678',
};

export const user_profile = {
  name: 'ajima chukwuemeka',
  email: 'gerda44@ethereal.email',
  dob: '1995-01-01T00:00:00Z',
  gender: 'male',
  address: 'Lagos Lagos',
  contact: '0808123456',
  city: 'Lagos',
  country: 'Nigeria',
  avatar: 'https://www.example.com/images/avatar.png',
  handles: {
    twitter: 'twitter_updated',
    facebook: 'facebook_updated',
    linkedin: 'linkedin',
    github: 'github_updated',
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

export const user_profile_unknownmail = {
  name: 'ajima chukwuemeka',
  email: 'gerda44@ethereal.eemail',
  dob: '1995-01-01T00:00:00Z',
  gender: 'male',
  address: 'Lagos Lagos',
  contact: '0808123456',
  city: 'Lagos',
  country: 'Nigeria',
  avatar: 'https://www.example.com/images/avatar.png',
  handles: {
    twitter: 'twitter_updated',
    facebook: 'facebook_updated',
    linkedin: 'linkedin',
    github: 'github_updated',
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

export const user_profile_unknownmail2 = {
  name: 'ajima chukwuemeka',
  email: 'gerda44@ethereal.mail',
  dob: '1995-01-01T00:00:00Z',
  gender: 'male',
  address: 'Lagos Lagos',
  contact: '0808123456',
  city: 'Lagos',
  country: 'Nigeria',
  avatar: 'https://www.example.com/images/avatar.png',
  handles: {
    twitter: 'twitter_updated',
    facebook: 'facebook_updated',
    linkedin: 'linkedin',
    github: 'github_updated',
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
