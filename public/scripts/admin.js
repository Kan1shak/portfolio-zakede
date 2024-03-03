const quill = new Quill('#editor', {
  modules: {
    syntax: true,
    toolbar: '#toolbar-container',
  },
  placeholder: 'Compose an epic...',
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

function post(path, params, method='post') {

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

const postBtn = document.querySelector("#new-post-btn");

if (postBtn) {
    postBtn.onclick = () => {
    const title = document.querySelector('input[type="text"]').value;
    const content = JSON.stringify(quill.getContents().ops);
    const rawHTML = quill.root.innerHTML;
    const image = document.querySelector('input[type="url"]').value;
    const body = {title, content, image, rawHTML};
    console.log(body);
    post("/admin/new",body);
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