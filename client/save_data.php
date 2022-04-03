<?php

if (isset($_POST['image_name']))
{
    $encript_pass = filter_var($_POST['encript_pass'], FILTER_SANITIZE_STRING);
    $image_name = $_POST['image_name'];
    $image_data = $_POST['image_data'];
    
    //Build query string
    $data = http_build_query([
        'encript_pass' => $encript_pass,
        'image_name' => $image_name,
        'image_data' => $image_data
    ]);
 
    // build the curl request 
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'http://127.0.0.1/MEGA/server/');

    //$token = base64_encode("$encript_pass:$image_name");
    /*
    curl_setopt( $ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/x-www-form-urlencoded',
        "Authorization: Basic $token"
    ]);
    */

    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);

    // return response
    $response = json_decode($response, true);

    $res = $response['message'];

    if ($res == 'Success')
    {
        echo json_encode(array('success' => 1));
    }
    else
    {
        echo json_encode(array('success' => 0));
    }
    //echo $response['message'];
    //echo "<br/>";
    //echo ($response['data']);
  }
  
?>