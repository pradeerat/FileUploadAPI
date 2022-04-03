<?php

// Required headers
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
//header("Access-Control-Max-Age: 3600");
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

// Retrieve data
$post_data = file_get_contents('php://input');

// Decode query string
parse_str($post_data, $output);
$encript_pass = $output['encript_pass'];
$image_name = $output['image_name'];
$image_data = $output['image_data'];

// Upload file to a folder
file_put_contents('upload/'.$image_name, $image_data);

if (!empty($post_data))
{
    echo json_encode(array('message'=> 'Success', 'data'=> $image_name));
}
else
{
    echo json_encode(array('message'=> 'Failed', 'data'=> $image_name));
}

?>