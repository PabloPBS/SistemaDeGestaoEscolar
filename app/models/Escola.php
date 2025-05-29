<?php
class Escola {
    
    public function cadastrar($nome, $endereco, $status = 'ativo') {
        global $conn;
        $stmt = $conn->prepare("INSERT INTO escolas (nome, endereco, status) VALUES (?, ?, ?)");
        return $stmt->execute([$nome, $endereco, $status]);
    }

    public function editar($id, $nome, $endereco, $status) {
        global $conn;
        $stmt = $conn->prepare("UPDATE escolas SET nome = ?, endereco = ?, status = ? WHERE id = ?");
        return $stmt->execute([$nome, $endereco, $status, $id]);
    }

    public function excluir($id) {
        global $conn;
        $stmt = $conn->prepare("DELETE FROM escolas WHERE id = ?");
        return $stmt->execute([$id]);
    }

    public function listar() {
        global $conn;
        $stmt = $conn->prepare("SELECT * FROM escolas");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>