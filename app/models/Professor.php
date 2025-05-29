<?php
class Professor {

    private $conn;

    public function __construct($database) {
        $this->conn = $database;
    }

    public function cadastrar($nome, $id_turma = null) {
        $stmt = $this->conn->prepare("INSERT INTO professores (nome, id_turma) VALUES (?, ?)");
        return $stmt->execute([$nome, $id_turma]);
    }

    public function editar($id, $nome, $id_turma = null) { 
        $stmt = $this->conn->prepare("UPDATE professores SET nome = ?, id_turma = ? WHERE id = ?");
        return $stmt->execute([$nome, $id_turma, $id]);
    }

    public function excluir($id) {
        $stmt = $this->conn->prepare("DELETE FROM professores WHERE id = ?");
        return $stmt->execute([$id]);
    }

    public function listar() {
        $stmt = $this->conn->prepare("SELECT professores.*, turmas.nome AS nome_turma FROM professores LEFT JOIN turmas ON professores.id_turma = turmas.id");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
