<?php
//header('Content-Type: application/json');
$sep = DIRECTORY_SEPARATOR;
$path = rtrim($_GET['path'], $sep) . $sep;
$list = array(); //main array

if (is_dir($path)) {
    if ($dh = opendir($path)) {
        while (($name = readdir($dh)) != false) {
                $pathName = $path . $name;
                $list3 = [
                    'name' => $name,
                    'path' => $pathName,
                    'isDir' => is_dir($pathName),
                    'size' => is_dir($pathName) ? -1 : filesize($pathName)
                ];
                array_push($list, $list3);
        }
    }
    $return_array = array('files' => $list);
    echo json_encode($return_array);
}
