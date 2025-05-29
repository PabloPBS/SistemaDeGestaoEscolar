<?php
class Turma {

    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;  
    }

    // Método para cadastrar uma turma
    public function cadastrar($id_escola, $nome, $turno, $status) {
        $stmt = $this->conn->prepare("INSERT INTO turmas (id_escola, nome, turno, status) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$id_escola, $nome, $turno, $status]);
    }

    // Método para editar uma turma
    public function editar($id, $id_escola, $nome, $turno, $status) {
        $stmt = $this->conn->prepare("UPDATE turmas SET id_escola = ?, nome = ?, turno = ?, status = ? WHERE id = ?");
        return $stmt->execute([$id_escola, $nome, $turno, $status, $id]);
    }

    // Método para excluir uma turma
    public function excluir($id) {
        $stmt = $this->conn->prepare("DELETE FROM turmas WHERE id = ?");
        return $stmt->execute([$id]);
    }

    // Método para listar todas as turmas
    public function listar() {
        $stmt = $this->conn->prepare("SELECT turmas.id, turmas.nome, turmas.turno, turmas.id_escola, turmas.status FROM turmas");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>