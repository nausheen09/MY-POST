let selectedImage = '';
// Function to select the image for the post background
function selectImage(imgElement) {
    selectedImage = imgElement.src;
}

// Function to add a new post with the selected image as background
function addPost() {
    const postTitle = document.getElementById('post-title');
    const postDescription = document.getElementById('post-description');
    const posts = document.getElementById('posts');

    if (postTitle.value.trim() && postDescription.value.trim() && selectedImage) {
        posts.innerHTML += `
                <div class="card mb-3" style="background-image: url('${selectedImage}');">
                    <div class="card-header fontStyle">@Posts</div>
                    <div class="card-body">
                        <h5 class="card-title fontStyle">${postTitle.value}</h5>
                        <p class="card-text fontStyle">${postDescription.value}</p>
                    </div>
                    <div class="button p-4">
                        <button type="button" class="btn btn-primary color-blue" onclick="edit(event)">Edit</button>
                        <button type="button" class="btn btn-primary color-red" onclick="remove(event)">Delete</button>
                    </div>
                </div>`;
        postTitle.value = '';
        postDescription.value = '';
        selectedImage = '';  // Reset the selected image
    } else {
        Swal.fire({
            title: "No input",
            text: "Please enter a title, description, and select an image.",
            icon: "question"
        });
    }
}

// Function to remove a post
function remove(event) {
    event.target.parentNode.parentNode.remove();
}

// Function to edit a post
async function edit(event) {
    const postCard = event.target.parentNode.parentNode;
    const currentTitle = postCard.children[1].children[0].innerText;
    const currentDescription = postCard.children[1].children[1].innerText;

    const { value: formValues } = await Swal.fire({
        title: 'Edit Post',
        html: `
                <label>Title:</label>
                <input id="swal-input1" class="swal2-input" value="${currentTitle}">
                <label>Description:</label>
                <input id="swal-input2" class="swal2-input" value="${currentDescription}">
                `,
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value
            ];
        }
    });

    if (formValues) {
        postCard.querySelector('.card-title').innerText = formValues[0];
        postCard.querySelector('.card-text').innerText = formValues[1];
    }
}