const incidents = [
  {
    id: 1,
    createdOn: 'Feb 2018',
    createdBy: 2,
    type: 'red-flag',
    location: '5.222222 , 5.232323',
    status: 'under investigation',
    Images: ['url', 'url'],
    videos: ['url'],
    comment: 'Police officer threatens driver',
  },

  {
    id: 2,
    createdOn: 'Jan 2018',
    createdBy: 3,
    type: 'red-flag',
    location: '5.224444 , 6.265655',
    status: 'draft',
    Images: [],
    videos: [],
    comment: 'Looting of ballot in my voting center',
  },

  {
    id: 3,
    createdOn: 'Oct 2018',
    createdBy: 2,
    type: 'intervention',
    location: '4.572122 , 5.99999',
    status: 'resolved',
    Images: [],
    videos: [],
    comment: 'Erosion in my area',
  },

  {
    id: 4,
    createdOn: 'Nov 2018',
    createdBy: 2,
    type: 'red-flag',
    location: '5.222222 , 5.232323',
    status: 'rejected',
    Images: [],
    videos: [],
    comment: 'Civil servant collenting bribe',
  },

  {
    id: 5,
    createdOn: 'Aug 2018',
    createdBy: 3,
    type: 'intervention',
    location: '7.999999 , 6.232323',
    status: 'resolved',
    Images: [],
    videos: [],
    comment: 'collapsed bridge',
  },
];

const users = [
  {
    id: 1,
    firstname: 'Abolaji',
    lastname: 'Micheal',
    othernames: 'Saba',
    email: 'micheal@gmail.com',
    phoneNumber: '09033332222',
    username: 'abolaji_mike',
    registered: 'Feb 2018',
    isAdmin: true,
  },

  {
    id: 2,
    firstname: 'Chewitel',
    lastname: 'Chidi',
    othernames: 'Victor',
    email: 'victor@gmail.com',
    phoneNumber: '09011112222',
    username: 'chidi_che',
    registered: 'March 2018',
    isAdmin: false,
  },

  {
    id: 3,
    firstname: 'Tobi',
    lastname: 'Oyebanji',
    othernames: 'Cynthia',
    email: 'cynthia@gmail.com',
    phoneNumber: '09044441111',
    username: 'tobi_oyebee',
    registered: 'Jan 2018',
    isAdmin: false,
  },

];


module.exports = { users, incidents };
