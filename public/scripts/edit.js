const editor = document.querySelector('.ql-editor');
editor.innerHTML = editor.textContent;

const updatePostBtn = document.querySelector("#update-post-btn");

updatePostBtn.onclick = () => {
    const title = document.querySelector('input[type="text"]').value;
    const content = JSON.stringify(quill.getContents().ops);
    const rawHTML = quill.root.innerHTML;
    const image = document.querySelector('input[type="url"]').value;
    const id = document.querySelector('[type="hidden"]').value;
    post(`/admin/update/${id}`, {title, content, image, rawHTML});
}