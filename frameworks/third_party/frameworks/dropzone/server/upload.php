<?php
	/**
	 * For the dropzone example host this file and be sure to modify the
	 * dropzone options url property to match the endpoint of this (or 
	 * another) upload handler.
	 */

	switch($_SERVER['REQUEST_METHOD']) {
		case 'OPTIONS':
			header('Access-Control-Allow-Origin: *');
			header('Access-Control-Allow-Methods: POST, OPTIONS'); 
			header('Access-Control-Allow-Headers: accept, cache-control, x-requested-with, content-type');
			exit();
		case 'POST':
			header('Access-Control-Allow-Origin: *');
			if ($_FILES["file"]["error"] > 0) {
			  	echo "Error: " . $_FILES["file"]["error"] . "<br>";
			}
			else {
			  	echo "Upload: " . $_FILES["file"]["name"] . "<br>";
			  	echo "Type: " . $_FILES["file"]["type"] . "<br>";
			  	echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
			  	echo "Stored in: " . $_FILES["file"]["tmp_name"];
			}
			exit();
		default:
			header("HTTP/1.0 400 Error");
			exit();
	}
	
?>