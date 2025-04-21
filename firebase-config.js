// firebase-config.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtO7yMF8yhTkTv3faN0u1oNyJ0KpaBnsA",
  authDomain: "vu-tru-nghe-nghiep.firebaseapp.com",
  databaseURL: "https://vu-tru-nghe-nghiep-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vu-tru-nghe-nghiep",
  storageBucket: "vu-tru-nghe-nghiep.firebasestorage.app",
  messagingSenderId: "248626863436",
  appId: "1:248626863436:web:00362f550042ef8dd743e9",
  measurementId: "G-3QDN201BBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Lưu nghề nghiệp vào Firebase
function saveToDatabase(profession) {
  const professionRef = ref(db, 'professions/');
  get(professionRef).then(snapshot => {
    let data = snapshot.val();
    if (data && data[profession]) {
      // Cập nhật số lượng nghề
      data[profession] += 1;
    } else {
      data[profession] = 1;
    }
    set(professionRef, data); // Lưu lại dữ liệu
  });
}

// Lấy thống kê nghề nghiệp
function getProfessionStats() {
  const professionRef = ref(db, 'professions/');
  return get(professionRef); // Trả về dữ liệu từ Firebase
}

export { saveToDatabase, getProfessionStats };
