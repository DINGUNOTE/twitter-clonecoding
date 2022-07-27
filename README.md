## 📌 Skills
- Front-end: React(CRA, react-router-dom v6)
- Back-end: firebase v9(Authentication, Firestore Database(NoSQL DB))

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