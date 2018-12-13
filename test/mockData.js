const user = {
  firstname: 'Soji',
  lastname: 'Daniel',
  othernames: 'Paul',
  email: 'soji@gmail.com',
  phoneNumber: '09012988309',
  username: 'soji_dan',
  password: '12345678',
  password2: '12345678',
};

const admin = {
  firstname: 'Adesoji',
  lastname: 'Daniel',
  othernames: 'Oluwagbogo',
  email: 'sojiman@gmail.com',
  phoneNumber: '09011111111',
  username: 'Superman',
};


const goodRedFlagInput = {
  type: 'red-flag',
  location: '5.222222,5.232323',
  title: 'Bribery',
  images: ['url.jpg'],
  videos: ['url.mp4'],
  comment: 'Civil servant collenting bribe',
  status: 'draft',

};

const goodRedFlagInput2 = {
  type: 'red-flag',
  location: '5.222222,5.232323',
  title: 'Bribery',
  images: ['url.jpg'],
  videos: ['url.mp4'],
  comment: 'Civil servant collenting bribe',
  status: 'resolved',

};

const goodInterventionInput = {
  type: 'intervention',
  title: 'Bribery',
  location: '5.222222,5.232323',
  images: ['url.jpg'],
  videos: ['url.mp4'],
  comment: 'Civil servant collenting bribe',
  status: 'resolved',

};

const badInput = {
  location: '5.222222 , 5.232323',
  images: ['url', 'url2'],
  videos: ['url3', 'url4'],
  comment: 'Civil servant collenting bribe',

};


const badInput2 = {};


module.exports = {
  user,
  goodInterventionInput,
  goodRedFlagInput,
  badInput,
  badInput2,
  admin,
  goodRedFlagInput2,
};
