import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCZHbisrhUgJBhsj059SPNBJ7WKlHJP3RY',
  authDomain: 'nwitter-b4da7.firebaseapp.com',
  projectId: 'nwitter-b4da7',
  storageBucket: 'nwitter-b4da7.appspot.com',
  messagingSenderId: '998345686274',
  appId: '1:998345686274:web:34be0ac4da3959503c161b',
};

const firebase = initializeApp(firebaseConfig);

export default firebase;
