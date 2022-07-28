## 📌 Skills
- Front-end: React, react-router-dom v6
- Back-end: firebase v9(Authentication, Firestore Database(NoSQL DB), Storage)

## 📌 Authentication
1. `getAuth()`를 사용해서 인스턴스와 연결
   - [getAuth()](https://firebase.google.com/docs/reference/js/auth.md#getauth)
2. 이메일 & 패스워드를 이용한 회원가입, 로그인
   - [signInWithCredential(인증, 자격 증명)](https://firebase.google.com/docs/reference/js/auth.md#signinwithemailandpassword) 
3. `signInWithPopup()`를 사용해서 팝업 기반 OAuth 인증 흐름으로 Firebase 클라이언트 인증
   - [signInWithPopup()](https://firebase.google.com/docs/reference/js/auth.md?authuser=0#signinwithpopup)
4. 구글 계정을 이용한 회원가입, 로그인
   - [GoogleAuthProvider](https://firebase.google.com/docs/auth/web/google-signin)
5. 깃헙 계정을 이용한 회원가입, 로그인
   - [GithubAuthProvider](https://firebase.google.com/docs/auth/web/github-auth)
6. `signOut()` 메서드를 사용해서 로그아웃 구현
   - [signOut()](https://firebase.google.com/docs/reference/js/auth.md#signout)

## 📌 Database
1. `getFireStore()`를 사용해서 DB와 App Instance 연결
   - [getfirestore()](https://firebase.google.com/docs/reference/js/firestore_.md#getfirestore)
2. `addDoc()`과 `collection()`을 사용해서 DB에 데이터 추가
   - [addDoc()](https://firebase.google.com/docs/reference/js/firestore_.md#adddoc)
   - [collection()](https://firebase.google.com/docs/reference/js/firestore_.md#collection)
3. `getDocs()`와 `query()`를 사용해서 DB의 데이터 가져오기
   - [getDocs()](https://firebase.google.com/docs/reference/js/firestore_.md#getdocs)
   - [query()](https://firebase.google.com/docs/reference/js/firestore_.query)
4. `onSnapshot()`을 이용해서 DB와 실시간 데이터 동기화
   - [onSnapshot()](https://firebase.google.com/docs/reference/js/firestore_.md?authuser=0#onsnapshot)
5. `doc()`으로 인스턴스를 가져온 후 `deleteDoc()`으로 데이터 삭제
   - [doc()](https://firebase.google.com/docs/reference/js/firestore_.md?authuser=0#doc)
   - [deleteDoc()](https://firebase.google.com/docs/reference/js/firestore_.md?authuser=0#deletedoc)
6. `doc()`으로 인스턴스를 가져온 후 `updateDoc()`으로 데이터 삭제
   - [updateDoc()](https://firebase.google.com/docs/reference/js/firestore_.md?authuser=0#updatedoc)

## 📌 Storage
1. `getStorage()`를 사용해서 Firebase 앱의 Storage 인스턴스를 가져온다.
   - [getStorage()](https://firebase.google.com/docs/reference/js/storage.md#getstorage)
2. 업로드 될 파일의 이름을 고유한 식별자로 만들어주기 위해서 `uuid`를 사용
3. 인풋에서 받아온 이미지 파일을 `readAsDataURL()`로 받은 data_url(string)으로 파일을 Storage에 업로드하기 위해서 `ref()` `uploadString()`을 사용
   - [ref()](https://firebase.google.com/docs/reference/js/storage.md?hl=en#ref)
   - [uploadString()](https://firebase.google.com/docs/reference/js/storage.md?hl=en#uploadstring)
4. Storage 참조 경로에 있는 파일의 URL을 다운로드하기 위해 `getDownloadURL()`을 사용
   - [getDownloadURL()](https://firebase.google.com/docs/reference/js/storage.md?hl=en#getdownloadurl)
5. 트윗을 삭제할 때 Storage에 저장된 이미지 파일도 같이 삭제하기 위해서 `deleteObject()`를 사용한다.
   - [deleteObject()](https://firebase.google.com/docs/reference/js/storage.md?hl=en#deleteobject)


## 💡 Refactoring
- [x] 로그인 여부를 확인하기 위해 사용했던 isLoggedIn state를 없애고, 사용자의 정보를 담아 prop으로 내려주기 위해 사용됐던 userObj를 Boolean으로 사용하면서 불필요한 렌더링을 줄였다.
- [ ] Home 컴포넌트의 코드 컴포넌트 분리