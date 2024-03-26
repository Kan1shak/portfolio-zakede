// let FontAttributor = Quill.import('formats/font');
// let fonts = ['Poppins','Dela Gothic One'];
// FontAttributor.whitelist = fonts;
// Quill.register(FontAttributor, true);

const quill = new Quill('#editor', {
  modules: {
    syntax: true,
    toolbar: '#toolbar-container',
  },
  placeholder: 'Write things about your thing here...',
  theme: 'snow',
});

const changeUrl = (url) => {
  const urlInput = document.querySelector('input[type="url"]');
  urlInput.value = url;
  urlInput.focus();
}

const fileInput = document.querySelector('input[type="file"]');
fileInput.onchange = async () => {
  const file = fileInput.files[0];
  const formData = new FormData();
  let url;
  formData.append("image", file);
  fileInput.parentElement.classList.add("loading");
  await fetch(
    "https://api.imgbb.com/1/upload?key=01f897d8e48b933108125462a564711f  ",
    {
      method: "POST",
      body: formData
    }
  )
    .then(response => response.json())
    .then(result => {
      console.log(result);
      url = result.data.url;
    })
    .catch(error => {
      console.error("Error:", error);
    });
  if(url) changeUrl(url);
  fileInput.parentElement.classList.remove("loading");
};

const post = (path, params, method='post') => {

  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}

const validateParams = (params) => {
  if(!params.title) return false;
  if(!params.image) return false;
  if(!params.image.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|webp)/g)) return false;
  return true;

}

const postBtn = document.querySelector("#new-post-btn");

if (postBtn) {
    postBtn.onclick = () => {
    const title = document.querySelector('input[type="text"]').value;
    const content = JSON.stringify(quill.getContents().ops);
    const rawHTML = quill.root.innerHTML;
    const image = document.querySelector('input[type="url"]').value;
    const body = {title, content, image, rawHTML};
    if(validateParams(body)){ 
      post("/admin/new",body);
    }
    else{
      alert('You need to enter a title and add an image you bozo!');
    }
  }
}

const base64ToImage = async (urlBase64) =>{
  const editor = document.querySelector('.ql-editor');
  const lastImg = [...editor.querySelectorAll('img')].pop();
  lastImg.classList.add('loading-state'); 
  const formData = new FormData();
  urlBase64 = urlBase64.split(',')[1];
  formData.append("image", urlBase64);
  await fetch(
    "https://api.imgbb.com/1/upload?key=01f897d8e48b933108125462a564711f  ",
    {
      method: "POST",
      body: formData
    }
  )
    .then(response => response.json())
    .then(result => {
      // console.log(result);
      lastImg.src = result.data.url;
      lastImg.classList.remove('loading-state');
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

quill.on('editor-change', (eventName, ...args) => {
  if (eventName === 'text-change') {
    const isImage = args[0].ops.pop().insert?.image;
    if (isImage) {
      const base64 = isImage;
      if(base64.includes('base64')){
        base64ToImage(base64);
      }
    }
  }
});