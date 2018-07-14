
<?php 
try {
$bdd= new PDO('mysql:host=localhost;dbname=test;charset=utf8','root','');
array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
}

catch (Exception $e)
{
die('erreur :'.$e->getMessage());
}
$data=' ';
$reponse = $bdd->query('SELECT nom FROM jeux_video WHERE possesseur=\'' . $_GET['possesseur'] . '\'');

$monfichier= fopen('uploads/compteur.txt','r+');
$ligne=fgets($monfichier);
while($ligne):
	$ligne=fgets($monfichier);
endwhile;



while($donnees=$reponse->fetch()){

	
	fputs($monfichier,$donnees['nom']."\n ");
	$data=$data.$donnees['nom'];
	


}


fclose($monfichier);
$reponse->closeCursor();

?>


<?php echo $data ?>



