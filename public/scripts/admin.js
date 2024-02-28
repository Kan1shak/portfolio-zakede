Quill.register("modules/imageUploader", ImageUploader);
const quill = new Quill('#editor', {
  modules: {
    syntax: true,
    toolbar: '#toolbar-container'
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

postBtn.onclick = () => {
  const title = document.querySelector('input[type="text"]').value;
  const content = quill.root.innerHTML;
  const image = document.querySelector('input[type="url"]').value;
  post("/admin/new", {title, content, image});
}