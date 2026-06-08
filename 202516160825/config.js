// 테슬라 전 시리즈 데이터 및 가격 정보 (추정치)
const teslaData = {
    models: {
        name: 'Model S',
        basePrice: 109900000,
        img: 'model_s.png',
        trims: [
            { name: '롱 레인지 (Long Range)', addPrice: 0, specs: 'Dual Motor AWD | 652km' },
            { name: '플래드 (Plaid)', addPrice: 30000000, specs: 'Tri Motor AWD | 600km' }
        ],
        colors: [
            { name: '펄 화이트 (Pearl White Multi-Coat)', hex: '#f0f0f0', addPrice: 0 },
            { name: '솔리드 블랙 (Solid Black)', hex: '#111111', addPrice: 1500000 },
            { name: '딥 블루 (Deep Blue Metallic)', hex: '#1e3a8a', addPrice: 1500000 }
        ]
    },
    model3: {
        name: 'Model 3',
        basePrice: 59990000,
        img: 'model_3.png',
        trims: [
            { name: '후륜 구동 (RWD)', addPrice: 0, specs: 'Rear-Wheel Drive | 382km' },
            { name: '롱 레인지 (Long Range)', addPrice: 10000000, specs: 'Dual Motor AWD | 528km' }
        ],
        colors: [
            { name: '펄 화이트 (Pearl White Multi-Coat)', hex: '#f0f0f0', addPrice: 0 },
            { name: '솔리드 블랙 (Solid Black)', hex: '#111111', addPrice: 1500000 },
            { name: '울트라 레드 (Ultra Red)', hex: '#cc0000', addPrice: 2500000 }
        ]
    },
    modelx: {
        name: 'Model X',
        basePrice: 129900000,
        img: 'model_x.png',
        trims: [
            { name: '롱 레인지 (Long Range)', addPrice: 0, specs: 'Dual Motor AWD | 560km' },
            { name: '플래드 (Plaid)', addPrice: 30000000, specs: 'Tri Motor AWD | 528km' }
        ],
        colors: [
            { name: '펄 화이트 (Pearl White Multi-Coat)', hex: '#f0f0f0', addPrice: 0 },
            { name: '솔리드 블랙 (Solid Black)', hex: '#111111', addPrice: 1500000 }
        ]
    },
    modely: {
        name: 'Model Y',
        basePrice: 54990000,
        img: 'ev_car.png',
        trims: [
            { name: '후륜 구동 (RWD)', addPrice: 0, specs: 'Rear-Wheel Drive | 350km' },
            { name: '롱 레인지 (Long Range)', addPrice: 9000000, specs: 'Dual Motor AWD | 511km' },
            { name: '퍼포먼스 (Performance)', addPrice: 19000000, specs: 'Dual Motor AWD | 448km' }
        ],
        colors: [
            { name: '펄 화이트 (Pearl White Multi-Coat)', hex: '#f0f0f0', addPrice: 0 },
            { name: '솔리드 블랙 (Solid Black)', hex: '#111111', addPrice: 1500000 }
        ]
    },
    cybertruck: {
        name: 'Cybertruck',
        basePrice: 89900000, 
        img: 'hero_tesla.png',
        trims: [
            { name: 'Dual Motor', addPrice: 0, specs: 'Dual Motor AWD | 547km' },
            { name: 'Cyberbeast', addPrice: 30000000, specs: 'Tri Motor AWD | 515km' }
        ],
        colors: [
            { name: '스테인리스 스틸 (Stainless Steel)', hex: '#b0b0b0', addPrice: 0 }
        ]
    }
};

const interiorPrices = {
    black: 0,
    white: 2500000
};

let selectedModelId = 'models';
let selectedColorHex = '#f0f0f0';

window.onload = function() {
    updateConfig();
};

function updateConfig() {
    selectedModelId = document.getElementById('model-select').value;
    const modelData = teslaData[selectedModelId];

    // Trim Group
    const trimOptionsDiv = document.getElementById('trim-options');
    trimOptionsDiv.innerHTML = '';
    modelData.trims.forEach((trim, index) => {
        const item = document.createElement('div');
        item.className = 'trim-item';
        item.innerHTML = `
            <input type="radio" id="trim-${index}" name="trim-group" value="${index}" 
                   ${index === 0 ? 'checked' : ''} onchange="calculatePrice()">
            <label for="trim-${index}">${trim.name}</label>
        `;
        trimOptionsDiv.appendChild(item);
    });

    // Color Options
    const colorPickerDiv = document.querySelector('.color-picker');
    colorPickerDiv.innerHTML = '';
    modelData.colors.forEach((color, index) => {
        const colorOption = document.createElement('div');
        colorOption.className = `color-option ${index === 0 ? 'active' : ''}`;
        colorOption.style.backgroundColor = color.hex;
        colorOption.title = color.name;
        colorOption.onclick = function() {
            document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            selectedColorHex = color.hex;
            document.getElementById('color-name').innerText = color.name;
            calculatePrice();
        };
        colorPickerDiv.appendChild(colorOption);
    });
    
    selectedColorHex = modelData.colors[0].hex;
    document.getElementById('color-name').innerText = modelData.colors[0].name;

    calculatePrice();
}

function calculatePrice() {
    const modelData = teslaData[selectedModelId];
    const selectedTrimIndex = document.querySelector('input[name="trim-group"]:checked').value;
    const selectedTrim = modelData.trims[selectedTrimIndex];
    const selectedColor = modelData.colors.find(c => c.hex === selectedColorHex);
    const selectedInteriorId = document.getElementById('interior-select').value;
    
    const totalPrice = modelData.basePrice + (selectedTrim.addPrice || 0) + (selectedColor.addPrice || 0) + interiorPrices[selectedInteriorId];
    
    // Display updates
    document.getElementById('display-model').innerText = modelData.name;
    document.getElementById('display-trim').innerText = selectedTrim.name;
    
    const colorInd = document.getElementById('display-color');
    if (colorInd) {
        colorInd.style.backgroundColor = selectedColor.hex;
        colorInd.title = selectedColor.name;
    }
    
    document.getElementById('display-specs').innerText = selectedTrim.specs;
    document.getElementById('total-price').innerText = totalPrice.toLocaleString('ko-KR');

    // Update Image
    const configImg = document.getElementById('config-img');
    if (configImg && modelData.img) {
        configImg.src = modelData.img;
    }
}
