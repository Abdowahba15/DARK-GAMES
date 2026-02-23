const gameKey = "comments_hollow";
const commentsDiv = document.getElementById("comments");

function loadComments() {
  let comments = JSON.parse(localStorage.getItem(gameKey)) || [];
  commentsDiv.innerHTML = "";

  comments.forEach((c, index) => {
    commentsDiv.innerHTML += `
      <div class="comment">
        <span>${escapeHTML(c)}</span>
        <button class="delete-btn" onclick="deleteComment(${index})">
          ✖
        </button>
      </div>
    `;
  });
}

function addComment() {
  let input = document.getElementById("commentInput");

  if (input.value.trim() === "") return;

  let comments = JSON.parse(localStorage.getItem(gameKey)) || [];
  comments.push(input.value.trim());

  localStorage.setItem(gameKey, JSON.stringify(comments));

  input.value = "";
  loadComments();
}

function deleteComment(index) {
  let comments = JSON.parse(localStorage.getItem(gameKey)) || [];
  comments.splice(index, 1);
  localStorage.setItem(gameKey, JSON.stringify(comments));
  loadComments();
}

// حماية من XSS
function escapeHTML(text) {
  const div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}

loadComments();