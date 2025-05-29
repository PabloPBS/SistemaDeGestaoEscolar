<?php
require_once __DIR__ . '/../models/Turma.php';
require_once __DIR__ . '/../config/ConnectionDb.php';

class TurmaController {

    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    // Método para listar as turmas
    public function listar() {
        $turma = new Turma($this->conn);  
        return $turma->listar();
    }

    // Método para cadastrar uma turma
    public function cadastrar($id_escola, $nome, $turno, $status) {
        $turma = new Turma($this->conn); 
        return $turma->cadastrar($id_escola, $nome, $turno, $status);
    }

    // Método para editar uma turma
    public function editar($id, $id_escola, $nome, $turno, $status) {
        $turma = new Turma($this->conn);  
        return $turma->editar($id, $id_escola, $nome, $turno, $status);
    }

    // Método para excluir uma turma
    public function excluir($id) {
        $turma = new Turma($this->conn);  
        return $turma->excluir($id);
    }
}
?>