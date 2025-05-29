<?php
require_once __DIR__ . '/../models/Professor.php';
require_once __DIR__ . '/../config/ConnectionDb.php';

class ProfessorController {

    private $conn;

    public function __construct($database) {
        $this->conn = $database; 
    }

    // Método para listar todos os professores
    public function listar() {
        $professor = new Professor($this->conn);
        return $professor->listar(); 
    }

    // Método para cadastrar um novo professor
    public function cadastrar($nome, $id_turma = null) {
        $professor = new Professor($this->conn);
        return $professor->cadastrar($nome, $id_turma);  
    }

    // Método para editar um professor
    public function editar($id, $nome, $id_turma = null) {
        $professor = new Professor($this->conn);
        return $professor->editar($id, $nome, $id_turma);  
    }

    // Método para excluir um professor
    public function excluir($id) {
        $professor = new Professor($this->conn);
        return $professor->excluir($id);
    }
}
?>