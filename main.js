import './style.css'
console.log('hi mom')

const form = document.getElementById('generate-form')
const qr = document.getElementById('qrcode')
const inputUrl = document.getElementById('url')
const qrSize = document.getElementById('qr-dimensions')

const handleQRGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = inputUrl.value.trim()
  const size = qrSize.value

  if (url === '') {
    alert('Please enter a valid url')
  } else {
    showSpinner()
    const qrTimeout = setTimeout(() => {
      hideSpinner()
      generateQRCode(url, size)

      setTimeout(() => {
        createSaveBtn(qr.querySelector('img').src)
      }, 100)
    }, 1000)

  }
}

// handling form submit
form.addEventListener('submit', handleQRGenerateSubmit, false)

//toggle spinner //todo better ui
const showSpinner = () => {
  document.getElementById('spinner').style.display = 'block'
}

const hideSpinner = () => {
  document.getElementById('spinner').style.display = 'none'
}

hideSpinner()

const generateQRCode = (url, size) => {
  const qrcode = new QRCode(document.getElementById("qrcode"), {
    text: url,
    width: size,
    height: size,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}

// clear ui for already generated qr codes imgs
const clearUI = () => {
  qr.innerHTML = ''
  const saveLinkCreated = document.getElementById('saved-link')
  if (saveLinkCreated) {
    saveLinkCreated.remove()
  }
}

// make the save btn 
const createSaveBtn = (savedUrl) => {
  const link = document.createElement('a');
  link.id = 'saved-link';
  link.classList =
    'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.href = savedUrl;
  link.download = 'qrcode';
  link.innerHTML = 'Save Image';
  document.getElementById('generated').appendChild(link);
};