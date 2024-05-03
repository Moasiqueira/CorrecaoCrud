const openModal = () => {
    document.getElementById("modal").classList.add("active");

    document.getElementById('title-modal').innerText = "Cadastrar usuário"
    document.getElementById('saveValues').innerText = "Salvar"

  };
  
  const closeModal = () => {
    document.getElementById("modal").classList.remove("active");
  };
  
  
  document
    .getElementById("userRegistration")
    .addEventListener("click", openModal);
  
  document.getElementById("modalClose").addEventListener("click", closeModal);
  
  const CreateNewUser = () => {
    let listUser = [];
    const nome = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const tel = document.getElementById("tel").value;
    const cidade = document.getElementById("city").value;
    const id = Math.floor(Math.random() * 100);
  
    const objUser = {
      nomeUser: nome,
      emailUser: email,
      telUser: tel,
      cidadeUser: cidade,
      idUser: id,
    };
  
    if (localStorage.getItem("userInfos")) {
      listUser = JSON.parse(localStorage.getItem("userInfos"));
    }
  
    listUser.push(objUser);
  
    console.log(listUser);
  
    localStorage.setItem("userInfos", JSON.stringify(listUser));
  
    closeModal();
  
    window.location.reload();
  };
  
  document.getElementById("saveValues").addEventListener("click", CreateNewUser);
  
  
  function carregarUsuario() {
  
    let listUser = []
  
    if (localStorage.getItem("userInfos")) {
      listUser = JSON.parse(localStorage.getItem("userInfos"));
    }
  
    if (listUser.length === 0) {
      let tabela = document.getElementById('corpoTabela');
  
      tabela.innerHTML = `
        <tr>
          <td colspan = '5'> Nenhum usuário cadastrado! </td>
        </tr>
      `
    }else{
      createTableUser(listUser);
    }
  }
  
  document.addEventListener('DOMContentLoaded', carregarUsuario);
  
  function createTableUser(listUser) {

    let tabela = document.getElementById("corpoTabela");

    let template = "";

    listUser.forEach((user) => {
        template += `
        <tr>
        <td> ${user.nomeUser}</td>
        <td> ${user.emailUser}</td>
        <td> ${user.telUser}</td>
        <td> ${user.cidadeUser}</td>
        
        <td>
        <button type="button" class="button green" onclick="updateUser(${user.idUser})">Editar</button>
        <button type="button" class="button red" onclick="deleteUser(${user.idUser})">Excluir</button>
        </td>
        </tr>
        `;

    });

    tabela.innerHTML = template;
    }

    // ATUALIZAR USUARIOS

    // trazendo as informações do cadastro
    function updateUser(id) {
      openModal();

      document.getElementById('title-modal').innerText = "Atualizar Usuário"
      document.getElementById('saveValues').innerText = "Atualizar"

      document.getElementById('saveValues').removeEventListener("click", CreateNewUser);

      const retornoData = JSON.parse(localStorage.getItem("userInfos"));

      const usuarioEncontrado = retornoData.find((userFind) => userFind.idUser == id);

      document.getElementById('name').value = usuarioEncontrado.nomeUser;
      document.getElementById('email').value = usuarioEncontrado.emailUser;
      document.getElementById('tel').value = usuarioEncontrado.telUser;
      document.getElementById('city').value = usuarioEncontrado.cidadeUser;

      document.getElementById('saveValues').addEventListener('click', () => updateUserInfos(id))
    }

    // ATUALIZAR OS CADASTROS 

    function updateUserInfos(id) {

      const newName = document.getElementById('name').value;
      const newEmail = document.getElementById('email').value;
      const newCel = document.getElementById('tel').value;
      const newCity = document.getElementById('city').value;

      const userList = JSON.parse(localStorage.getItem('userInfos')) || []

      const userIndexFind  = userList.findIndex((user) => user.idUser == id);

      if (userIndexFind !== -1){
        userList[userIndexFind].nomeUser = newName;
        userList[userIndexFind].emailUser = newEmail;
        userList[userIndexFind].telUser= newCel;
        userList[userIndexFind].cidadeUser = newCity;

        localStorage.setItem('userInfos', JSON.stringify(userList));
      }
      closeModal()
      window.location.reload()
      
    }

    function deleteUser(id) {
        alert(id)

        let userList = JSON.parse(localStorage.getItem("userInfos")) || [];

        const findIndex = userList.findIndex((userId) => userId.idUser == id);

        if(findIndex !== -1) {
          alert("nenhum usuário encontrado")}
          else{
            userList.splice(findIndex, 1)
            localStorage.setItem("userInfos", JSON.stringify(userList));
            window.location.reload();
        }
        }