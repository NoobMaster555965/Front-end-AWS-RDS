<?php
// se importa el archivo donde hacemos la conexion a la base de datos
include ('conect.php');

$sql = 'call world()';
// se prepara la consulta
$query = $conn -> prepare($sql);
// se ejecuta la consulta
$query -> execute();
// se guarda el resultado de la consulta
$results = $query -> fetchAll(PDO::FETCH_OBJ);

//imprime el contenido de un objeto
//var_dump($results);

//imprime el nombre del registro 2
//echo $results[2]->Name;



if($query -> rowCount() > 0)   {
    echo "<table border='1px'>";
    echo "<tr>
      <td>Name</td>
      <td>Continent</td>
      <td>Region</td>
      <td>Population</td>
    </tr>";
    foreach($results as $item) {
      echo "<tr>
        <td>" . $item->Name . "</td>
        <td>" . $item->Continent . "</td>
        <td>" . $item->Region . "</td>
        <td>" . $item->Population . "</td>
      </tr>";
    }
    echo "</table>";
}

?>