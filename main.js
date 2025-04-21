// main.js
import { saveToDatabase, getProfessionStats } from './firebase-config.js';

// Chức năng giải mã nhị phân thành văn bản
function binaryToText(binary) {
  let text = '';
  for (let i = 0; i < binary.length; i += 8) {
    let byte = binary.slice(i, i + 8);
    text += String.fromCharCode(parseInt(byte, 2));
  }
  return text;
}

// Tạo hành tinh từ dãy nhị phân nhập vào
function createPlanet() {
  let binaryInput = document.getElementById('binary-input').value;
  if (binaryInput.length % 8 !== 0) {
    alert('Vui lòng nhập một dãy nhị phân hợp lệ!');
    return;
  }

  let profession = binaryToText(binaryInput);  // Giải mã nhị phân thành văn bản
  alert(`Nghề nghiệp được giải mã: ${profession}`);

  // Lưu vào Firebase
  saveToDatabase(profession);

  // Tạo hành tinh mới
  let planet = document.createElement('div');
  planet.classList.add('planet');
  planet.style.animationDuration = `${Math.random() * 5 + 3}s`;
  document.getElementById('planets-container').appendChild(planet);

  // Cập nhật thống kê nghề nghiệp
  updateProfessionStats();
}

// Cập nhật thống kê nghề nghiệp
function updateProfessionStats() {
  getProfessionStats().then(snapshot => {
    const data = snapshot.val();
    const totalProfessions = Object.values(data).reduce((acc, count) => acc + count, 0);

    let statsHTML = '<h2>Thống kê nghề nghiệp</h2>';
    for (let profession in data) {
      const percentage = ((data[profession] / totalProfessions) * 100).toFixed(2);
      statsHTML += `<p>${profession}: ${percentage}%</p>`;
    }
    document.getElementById('stats-container').innerHTML = statsHTML;
  });
}

window.createPlanet = createPlanet; // Export function to global scope
