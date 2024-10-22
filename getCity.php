<?php
// Conexión a la base de datos
$servername = "db-world.cvcz6scsbftk.us-east-1.rds.amazonaws.com";
$username = "admin";
$password = "Admin12345#!";
$database = "world";

header('Content-Type: application/json');

try {
    // Se realiza la conexión
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Obtener el ID de la ciudad desde la URL
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if ($id > 0) {
        // Prepara la consulta
        $stmt = $conn->prepare("SELECT ID, Name, CountryCode, District, Population FROM city WHERE ID = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        // Verifica si se encontró algún registro
        if ($stmt->rowCount() > 0) {
            $city = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($city);
        } else {
            echo json_encode(['error' => 'City not found']);
        }
    } else {
        echo json_encode(['error' => 'Invalid ID']);
    }

} catch(PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
}
?>
