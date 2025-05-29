// Função para listar os professores
function listarProfessores() {
    fetch('index.php?action=listarProfessores')
        .then(response => response.json())
        .then(data => {
            const professoresTable = document.getElementById('professoresTable').getElementsByTagName('tbody')[0];
            professoresTable.innerHTML = ''; // Limpa a tabela

            data.forEach(professor => {
                const row = professoresTable.insertRow();
                row.innerHTML = `
                    <td>${professor.id}</td>
                    <td>${professor.nome}</td>
                    <td>${professor.id_turma || 'Nenhuma'}</td>
                    <td>
                        <button class="editar" onclick="editarProfessor(${professor.id})">Editar</button>
                        <button class="excluir" onclick="excluirProfessor(${professor.id})">Excluir</button>
                    </td>
                `;
            });
        })
        .catch(error => {
            console.error('Erro ao listar os professores:', error);
            alert('Erro ao carregar os professores');
        });
}

// Função para cadastrar um novo professor
document.getElementById('formCadastrarProfessor').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nomeProfessor').value;
    const id_turma = document.getElementById('idTurmaProfessor').value || null; 

    const data = { nome, id_turma };

    fetch('index.php?action=cadastrarProfessor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert(result.message || 'Professor cadastrado com sucesso!');
                listarProfessores();  
            } else {
                alert(result.message || 'Erro ao cadastrar professor');
            }
        })
        .catch(error => {
            console.error('Erro ao cadastrar professor:', error);
            alert('Erro ao cadastrar professor. Tente novamente mais tarde.');
        });
});

// Função para excluir um professor
function excluirProfessor(id) {
    fetch(`index.php?action=excluirProfessor&id=${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert(result.message || 'Professor excluído com sucesso!');
                listarProfessores(); 
            } else {
                alert(result.message || 'Erro ao excluir professor');
            }
        })
        .catch(error => {
            console.error('Erro ao excluir professor:', error);
            alert('Erro ao excluir professor. Tente novamente mais tarde.');
        });
}

// Função para editar um professor
function editarProfessor(id) {
    const nome = prompt("Digite o novo nome do professor:");
    const id_turma = prompt("Digite o novo ID da turma ou deixe em branco para desvincular:");

    if (nome !== null) {
        fetch('index.php?action=editarProfessor', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                nome: nome,
                id_turma: id_turma || null // Se vazio, remove o vínculo
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert(result.message || 'Professor editado com sucesso!');
                listarProfessores();
            } else {
                alert(result.message || 'Erro ao editar professor');
            }
        })
        .catch(error => {
            console.error('Erro ao editar o professor:', error);
            alert('Erro ao editar o professor. Tente novamente mais tarde.');
        });
    } else {
        alert('Nome não informado.');
    }
}

// Carrega a lista de professores ao iniciar a página
window.onload = function () {
    listarProfessores();
};
