// Tesla Services Interaction Logic (Order, Test Drive, Board, Inquiry)

// General Modal Controllers
function openBoardModal() { document.getElementById('boardModal').style.display = 'block'; }
function closeBoardModal() { document.getElementById('boardModal').style.display = 'none'; }

function openOrderModal() {
    // Sync order summary from config if available
    const model = document.getElementById('display-model').innerText;
    const trim = document.getElementById('display-trim').innerText;
    const price = document.getElementById('total-price').innerText;
    
    document.getElementById('order-summary-text').innerText = `${model} ${trim} | ${price}원`;
    document.getElementById('orderModal').style.display = 'block';
}
function closeOrderModal() { document.getElementById('orderModal').style.display = 'none'; }

function openTestDriveModal() { 
    // Default to currently selected model
    const currentModel = document.getElementById('display-model').innerText;
    const select = document.getElementById('td-model-select');
    for(let i=0; i<select.options.length; i++) {
        if(select.options[i].text === currentModel) {
            select.selectedIndex = i;
            break;
        }
    }
    document.getElementById('testDriveModal').style.display = 'block'; 
}
function closeTestDriveModal() { document.getElementById('testDriveModal').style.display = 'none'; }

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Form Submissions
document.getElementById('inquiry-form').onsubmit = function(e) {
    e.preventDefault();
    alert('문의가 성공적으로 제출되었습니다. 테슬라 어드바이저가 곧 연락드리겠습니다.');
    this.reset();
}

document.getElementById('order-form').onsubmit = function(e) {
    e.preventDefault();
    alert('Tesla 주문이 성공적으로 접수되었습니다! 예약 번호: TS' + Math.floor(Math.random()*1000000));
    this.reset();
    closeOrderModal();
}

document.getElementById('test-drive-form').onsubmit = function(e) {
    e.preventDefault();
    alert('시승 신청이 완료되었습니다. 선택하신 일자에 전시장에서 뵙겠습니다.');
    this.reset();
    closeTestDriveModal();
}

// Board Logic
let postCount = 2;
document.getElementById('post-form').onsubmit = function(e) {
    e.preventDefault();
    const title = document.getElementById('post-title').value;
    const author = document.getElementById('post-author').value;
    const date = new Date().toLocaleDateString();
    
    postCount++;
    const tableBody = document.getElementById('board-body');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `<td>${postCount}</td><td>${title}</td><td>${author}</td><td>${date}</td>`;
    tableBody.insertBefore(newRow, tableBody.firstChild);
    
    alert('게시글이 등록되었습니다.');
    this.reset();
    closeBoardModal();
}
