<?php
require_once __DIR__ . '/../models/Escola.php';
require_once __DIR__ . '/../config/ConnectionDb.php'; 

class EscolaController {

    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();  // Obter a conexão
    }

    public function listar() {
        $escola = new Escola();
        return $escola->listar($this->conn);  // Passar a conexão ao método
    }

    public function cadastrar($nome, $endereco, $status = 'ativo') {
        $escola = new Escola();
        return $escola->cadastrar($nome, $endereco, $status, $this->conn);  
    }

    public function editar($id, $nome, $endereco, $status) {
        $escola = new Escola();
        return $escola->editar($id, $nome, $endereco, $status, $this->conn);  
    }

    public function excluir($id) {
        $escola = new Escola();
        return $escola->excluir($id, $this->conn);  
    }   
}
?>