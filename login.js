(async () => {
    const username = localStorage.getItem('username');
    if (username) {
      document.querySelector('#name').textContent = username;
      setDisplay('loginControls', 'none');
      setDisplay('createControls', 'block');
    } else {
      setDisplay('loginControls', 'block');
      setDisplay('createControls', 'none');
    }
  })();
  
  async function loginUser() {
    loginOrNew(`/api/auth/login`);
  }
  
  async function newUser() {
    loginOrNew(`/api/auth/new`);
  }
  
  async function loginOrNew(endpoint) {
    const username = document.querySelector('#userName')?.value;
    const password = document.querySelector('#userPassword')?.value;
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: username, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  
    if (response.ok) {
      localStorage.setItem('username', username);
      window.location.href = 'create.html';
    } else {
      const body = await response.json();
      const modalEl = document.querySelector('#msgModal');
      modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
      const msgModal = new bootstrap.Modal(modalEl, {});
      msgModal.show();
    }
  }
  
  function create() {
    window.location.href = 'create.html';
  }
  
  function logout() {
    localStorage.removeItem('username');
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => (window.location.href = '/'));
  }
  
  async function getUser(email) {
    let images = [];
    // See if we have a user with the given email.
    const response = await fetch(`/api/user/${email}`);
    if (response.status === 200) {
      return response.json();
    }
  
    return null;
  }
  
  function setDisplay(controlId, display) {
    const createControlEl = document.querySelector(`#${controlId}`);
    if (createControlEl) {
      createControlEl.style.display = display;
    }
  }
  