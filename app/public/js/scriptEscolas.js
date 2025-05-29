// Função para listar as escolas
function listarEscolas() {
    fetch('index.php?action=listarEscolas') 
        .then(response => response.json())
        .then(data => {
            const escolasTable = document.getElementById('escolasTable').getElementsByTagName('tbody')[0];
            escolasTable.innerHTML = ''; // Limpa a tabela
            data.forEach(escola => {
                const row = escolasTable.insertRow();
                row.innerHTML = `
                    <td>${escola.id}</td>
                    <td>${escola.nome}</td>
                    <td>${escola.endereco}</td>
                    <td>${escola.status}</td>
                    <td>
                        <button class="editar" onclick="editarEscola(${escola.id})">Editar</button>
                        <button class="excluir" onclick="excluirEscola(${escola.id})">Excluir</button>
                    </td>
                `;
            });
        })
        .catch(error => {
            console.error('Erro ao listar as escolas:', error);
            alert('Erro ao carregar as escolas');
        });
}

// Função para cadastrar uma nova escola
document.getElementById('formCadastrarEscola').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nomeEscola').value;
    const endereco = document.getElementById('enderecoEscola').value;

    const data = { nome, endereco };

    fetch('index.php?action=cadastrarEscola', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Escola cadastrada com sucesso!');
                listarEscolas(); // Recarrega a lista de escolas
                document.getElementById('modalCadastrarEscola').style.display = 'none';
            } else {
                alert('Erro ao cadastrar escola');
            }
        })
        .catch(error => {
            console.error('Erro ao cadastrar a escola:', error);
        });
});

// Função para excluir uma escola
function excluirEscola(id) {
    fetch(`index.php?action=excluirEscola&id=${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Escola excluída com sucesso!');
                listarEscolas();
            } else {
                alert('Erro ao excluir escola');
            }
        })
        .catch(error => {
            console.error('Erro ao excluir a escola:', error);
        });
}

function editarEscola(id) {
    const nome = prompt("Digite o novo nome da escola:");
    const endereco = prompt("Digite o novo endereço da escola:");
    const status = prompt("Digite o novo status da escola (ativo/inativo):");

    if (nome && endereco && status) {
        fetch('index.php?action=editarEscola', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                nome: nome,
                endereco: endereco,
                status: status  
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Escola editada com sucesso!');
                listarEscolas(); 
            } else {
                alert('Erro ao editar escola');
            }
        })
        .catch(error => {
            console.error('Erro ao editar a escola:', error);
        });
    } else {
        alert('Nome, endereço ou status não informados.');
    }
}

// Carrega a lista de escolas ao iniciar a página
window.onload = function () {
    listarEscolas();
};
